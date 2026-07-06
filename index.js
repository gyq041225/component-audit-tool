require('dotenv').config();

if (process.env.HTTPS_PROXY || process.env.HTTP_PROXY) {
  const { ProxyAgent, setGlobalDispatcher } = require('undici');
  const proxyUrl = process.env.HTTPS_PROXY || process.env.HTTP_PROXY;
  setGlobalDispatcher(new ProxyAgent(proxyUrl));
  console.log('Using proxy:', proxyUrl);
}

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { parseFigmaUrl, fetchFigmaFile, extractDesignData } = require('./lib/figma');
const { extractSpecText, truncateSpec } = require('./lib/spec');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(express.static('public'));

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const auditPrompt = fs.readFileSync(
  path.join(__dirname, 'prompts', 'audit.prompt.md'),
  'utf-8'
);

const figmaAuditPrompt = fs.readFileSync(
  path.join(__dirname, 'prompts', 'figma-audit.prompt.md'),
  'utf-8'
);

const specAuditPrompt = fs.readFileSync(
  path.join(__dirname, 'prompts', 'spec-audit.prompt.md'),
  'utf-8'
);

async function buildSpecSection(body) {
  const spec = await extractSpecText({
    specText: body.specText,
    specFileBase64: body.specFileBase64,
    specFileType: body.specFileType,
    specFileName: body.specFileName,
  });
  if (!spec || !spec.text) return { specBlock: '', hasSpec: false };
  const truncated = truncateSpec(spec.text);
  return {
    hasSpec: true,
    specBlock: `\n\n## Design Specification (来源: ${spec.source})\n\n${truncated}\n\n---\n\n请严格对照上述规范来审计下面的设计数据。\n`,
    specMeta: { source: spec.source, chars: spec.text.length },
  };
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

function safeParseJSON(text) {
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch (_) {}
  const match = text.match(/\{[\s\S]*\}/);
  const candidate = match ? match[0] : text;
  try {
    return JSON.parse(candidate);
  } catch (_) {}
  const repaired = repairTruncatedJSON(candidate);
  if (repaired) {
    try {
      return JSON.parse(repaired);
    } catch (_) {}
  }
  return null;
}

function repairTruncatedJSON(text) {
  let result = text.replace(/,\s*$/, '');
  const stack = [];
  let inString = false;
  let escape = false;
  for (let i = 0; i < result.length; i++) {
    const ch = result[i];
    if (escape) { escape = false; continue; }
    if (ch === '\\') { escape = true; continue; }
    if (ch === '"') { inString = !inString; continue; }
    if (inString) continue;
    if (ch === '{' || ch === '[') stack.push(ch);
    else if (ch === '}' || ch === ']') stack.pop();
  }
  if (inString) result += '"';
  result = result.replace(/,\s*$/, '');
  while (stack.length) {
    const open = stack.pop();
    result += open === '{' ? '}' : ']';
  }
  return result;
}

app.post('/api/audit', async (req, res) => {
  try {
    const { imageBase64, imageType } = req.body;

    if (!imageBase64 || !imageType) {
      return res.status(400).json({ error: 'Missing image data' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: 'GEMINI_API_KEY not configured' });
    }

    console.log('Starting audit analysis with Gemini...');

    const spec = await buildSpecSection(req.body);
    const basePrompt = spec.hasSpec ? specAuditPrompt : auditPrompt;
    const finalPrompt = `${basePrompt}${spec.specBlock}`;

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      generationConfig: {
        responseMimeType: 'application/json',
        maxOutputTokens: 16384,
      },
    });

    const result = await model.generateContent([
      { text: finalPrompt },
      {
        inlineData: {
          mimeType: imageType,
          data: imageBase64,
        },
      },
    ]);

    const analysisText = result.response.text();
    const analysis = safeParseJSON(analysisText);
    if (!analysis) {
      return res.status(500).json({
        error: '解析 AI 返回结果失败',
        raw: analysisText.slice(0, 500),
      });
    }

    res.json({
      success: true,
      analysis,
      hasSpec: spec.hasSpec,
      specMeta: spec.specMeta,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Audit error:', error);
    res.status(500).json({
      error: error.message || 'Analysis failed',
      details: error.toString(),
    });
  }
});

app.post('/api/audit-figma', async (req, res) => {
  try {
    const { figmaUrl, figmaToken } = req.body || {};

    if (!figmaUrl) {
      return res.status(400).json({ error: '请提供 Figma 链接' });
    }

    const token = figmaToken || process.env.FIGMA_TOKEN;
    if (!token) {
      return res.status(400).json({ error: '未配置 Figma Token。请在 .env 里设置 FIGMA_TOKEN,或在前端粘贴你自己的 token' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: 'GEMINI_API_KEY not configured' });
    }

    console.log('Fetching Figma file:', figmaUrl);
    const { fileKey } = parseFigmaUrl(figmaUrl);
    const fileData = await fetchFigmaFile(fileKey, token);
    const designData = extractDesignData(fileData);
    console.log('Extracted design tokens:', designData.stats);

    const compactData = {
      fileName: designData.fileName,
      pages: designData.pages,
      stats: designData.stats,
      colors: designData.colors.slice(0, 40),
      fontSizes: designData.fontSizes.slice(0, 30),
      fontFamilies: designData.fontFamilies.slice(0, 20),
      cornerRadii: designData.cornerRadii.slice(0, 20),
      spacings: designData.spacings.slice(0, 20),
      componentSets: designData.componentSets.slice(0, 40),
      topComponents: designData.components.slice(0, 60),
    };

    const spec = await buildSpecSection(req.body);
    const basePrompt = spec.hasSpec ? specAuditPrompt : figmaAuditPrompt;

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      generationConfig: {
        responseMimeType: 'application/json',
        maxOutputTokens: 32768,
      },
    });

    const payload = `${basePrompt}${spec.specBlock}\n\n## Design Data From Figma\n\n注意:这个文件包含 ${designData.stats.totalColors} 种颜色、${designData.stats.totalFontSizes} 种字号、${designData.stats.totalComponents} 个组件实例。以下是按使用频次排序的 Top 数据(已截取,请基于此代表性样本分析)。\n\n\`\`\`json\n${JSON.stringify(compactData, null, 2)}\n\`\`\``;

    const result = await model.generateContent(payload);
    const analysisText = result.response.text();

    const analysis = safeParseJSON(analysisText);
    if (!analysis) {
      return res.status(500).json({
        error: 'AI 返回的 JSON 无法解析,可能被截断。请重试或换个更小的 Figma 文件',
        raw: analysisText.slice(0, 500),
      });
    }

    res.json({
      success: true,
      source: 'figma',
      fileName: designData.fileName,
      pages: designData.pages,
      stats: designData.stats,
      rawTokens: {
        colors: designData.colors.slice(0, 30),
        fontSizes: designData.fontSizes,
        fontFamilies: designData.fontFamilies,
        cornerRadii: designData.cornerRadii,
        spacings: designData.spacings.slice(0, 20),
      },
      analysis,
      hasSpec: spec.hasSpec,
      specMeta: spec.specMeta,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Figma audit error:', error);
    res.status(500).json({
      error: error.message || 'Figma analysis failed',
    });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Component Audit Tool running on http://localhost:${PORT}`);
  console.log('Ready to analyze design files with Gemini...');
});
