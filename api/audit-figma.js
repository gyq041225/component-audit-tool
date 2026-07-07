const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { parseFigmaUrl, fetchFigmaFile, extractDesignData } = require('../lib/figma');
const { extractSpecText, truncateSpec } = require('../lib/spec');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

function loadPrompt(name) {
  const candidates = [
    path.join(__dirname, '..', 'prompts', name),
    path.join(process.cwd(), 'prompts', name),
  ];
  for (const p of candidates) {
    try {
      return fs.readFileSync(p, 'utf-8');
    } catch (_) {}
  }
  throw new Error(`Prompt file not found: ${name}`);
}

const figmaAuditPrompt = loadPrompt('figma-audit.prompt.md');
const specAuditPrompt = loadPrompt('spec-audit.prompt.md');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { figmaUrl, figmaToken } = req.body || {};

    if (!figmaUrl) {
      return res.status(400).json({ error: '请提供 Figma 链接' });
    }

    const token = figmaToken || process.env.FIGMA_TOKEN;
    if (!token) {
      return res.status(400).json({ error: '未配置 Figma Token。请在环境变量里设置 FIGMA_TOKEN,或在前端粘贴你自己的 token' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: 'GEMINI_API_KEY not configured' });
    }

    const { fileKey } = parseFigmaUrl(figmaUrl);
    const fileData = await fetchFigmaFile(fileKey, token);
    const designData = extractDesignData(fileData);

    const compactData = {
      fileName: designData.fileName,
      pages: designData.pages,
      stats: designData.stats,
      colors: designData.colors.slice(0, 25),
      fontSizes: designData.fontSizes.slice(0, 20),
      fontFamilies: designData.fontFamilies.slice(0, 12),
      cornerRadii: designData.cornerRadii.slice(0, 15),
      spacings: designData.spacings.slice(0, 15),
      componentSets: designData.componentSets.slice(0, 25),
      topComponents: designData.components.slice(0, 40),
    };

    const spec = await buildSpecSection(req.body);
    const basePrompt = spec.hasSpec ? specAuditPrompt : figmaAuditPrompt;

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash-lite',
      generationConfig: {
        responseMimeType: 'application/json',
        maxOutputTokens: 12288,
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

    return res.json({
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
    return res.status(500).json({ error: error.message || 'Figma analysis failed' });
  }
};

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

function safeParseJSON(text) {
  if (!text) return null;
  try { return JSON.parse(text); } catch (_) {}
  const match = text.match(/\{[\s\S]*\}/);
  const candidate = match ? match[0] : text;
  try { return JSON.parse(candidate); } catch (_) {}
  const repaired = repairTruncatedJSON(candidate);
  if (repaired) {
    try { return JSON.parse(repaired); } catch (_) {}
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
