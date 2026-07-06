const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { extractSpecText, truncateSpec } = require('../lib/spec');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const auditPrompt = fs.readFileSync(
  path.join(process.cwd(), 'prompts', 'audit.prompt.md'),
  'utf-8'
);

const specAuditPrompt = fs.readFileSync(
  path.join(process.cwd(), 'prompts', 'spec-audit.prompt.md'),
  'utf-8'
);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { imageBase64, imageType } = req.body || {};

    if (!imageBase64 || !imageType) {
      return res.status(400).json({ error: 'Missing image data' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: 'GEMINI_API_KEY not configured' });
    }

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
        inlineData: { mimeType: imageType, data: imageBase64 },
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

    return res.json({
      success: true,
      analysis,
      hasSpec: spec.hasSpec,
      specMeta: spec.specMeta,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Audit error:', error);
    return res.status(500).json({
      error: error.message || 'Analysis failed',
    });
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
