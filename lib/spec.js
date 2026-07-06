const pdf = require('pdf-parse');

async function extractSpecText({ specText, specFileBase64, specFileType, specFileName }) {
  if (specText && specText.trim()) {
    return { text: specText.trim(), source: 'text' };
  }
  if (!specFileBase64) return null;

  const buf = Buffer.from(specFileBase64, 'base64');
  const type = (specFileType || '').toLowerCase();
  const name = (specFileName || '').toLowerCase();

  if (type === 'application/pdf' || name.endsWith('.pdf')) {
    const parsed = await pdf(buf);
    return { text: parsed.text.trim(), source: 'pdf', pages: parsed.numpages };
  }

  if (type === 'application/json' || name.endsWith('.json')) {
    const raw = buf.toString('utf-8');
    try {
      const parsed = JSON.parse(raw);
      return { text: JSON.stringify(parsed, null, 2), source: 'json' };
    } catch (_) {
      return { text: raw, source: 'json-raw' };
    }
  }

  return { text: buf.toString('utf-8'), source: 'text-file' };
}

function truncateSpec(text, maxChars = 12000) {
  if (!text) return '';
  if (text.length <= maxChars) return text;
  return text.slice(0, maxChars) + '\n\n[规范内容较长,已截取前部分]';
}

module.exports = { extractSpecText, truncateSpec };
