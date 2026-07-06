function parseFigmaUrl(url) {
  const match = url.match(/figma\.com\/(?:file|design|proto)\/([a-zA-Z0-9]+)/);
  if (!match) {
    throw new Error('无法解析 Figma 链接,请确认是 figma.com/file/... 或 figma.com/design/... 格式');
  }
  const fileKey = match[1];
  const nodeIdMatch = url.match(/node-id=([^&]+)/);
  const nodeId = nodeIdMatch ? decodeURIComponent(nodeIdMatch[1]).replace('-', ':') : null;
  return { fileKey, nodeId };
}

async function fetchFigmaFile(fileKey, token) {
  const url = `https://api.figma.com/v1/files/${fileKey}?geometry=paths`;
  const res = await fetch(url, {
    headers: { 'X-Figma-Token': token },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Figma API 错误 ${res.status}: ${text.slice(0, 200)}`);
  }
  return res.json();
}

function rgbaToHex(color) {
  if (!color) return null;
  const r = Math.round((color.r || 0) * 255);
  const g = Math.round((color.g || 0) * 255);
  const b = Math.round((color.b || 0) * 255);
  const a = color.a === undefined ? 1 : color.a;
  const hex = '#' + [r, g, b].map((n) => n.toString(16).padStart(2, '0')).join('').toUpperCase();
  return a < 1 ? `${hex} (${Math.round(a * 100)}%)` : hex;
}

function extractDesignData(fileData) {
  const colors = new Map();
  const fontSizes = new Map();
  const fontFamilies = new Map();
  const cornerRadii = new Map();
  const spacings = new Map();
  const components = [];
  const componentSets = new Map();

  function walk(node, pageContext) {
    if (!node) return;

    if (node.type === 'COMPONENT' || node.type === 'INSTANCE') {
      components.push({
        name: node.name,
        type: node.type,
        page: pageContext,
        size: node.absoluteBoundingBox
          ? `${Math.round(node.absoluteBoundingBox.width)}×${Math.round(node.absoluteBoundingBox.height)}`
          : null,
      });
    }

    if (node.fills && Array.isArray(node.fills)) {
      node.fills.forEach((fill) => {
        if (fill.type === 'SOLID' && fill.visible !== false) {
          const hex = rgbaToHex(fill.color);
          if (hex) colors.set(hex, (colors.get(hex) || 0) + 1);
        }
      });
    }

    if (node.strokes && Array.isArray(node.strokes)) {
      node.strokes.forEach((stroke) => {
        if (stroke.type === 'SOLID' && stroke.visible !== false) {
          const hex = rgbaToHex(stroke.color);
          if (hex) colors.set(hex, (colors.get(hex) || 0) + 1);
        }
      });
    }

    if (node.type === 'TEXT' && node.style) {
      const size = Math.round(node.style.fontSize || 0);
      if (size) fontSizes.set(size, (fontSizes.get(size) || 0) + 1);
      const family = node.style.fontFamily;
      if (family) {
        const key = `${family} ${node.style.fontWeight || ''}`.trim();
        fontFamilies.set(key, (fontFamilies.get(key) || 0) + 1);
      }
    }

    if (typeof node.cornerRadius === 'number') {
      const r = Math.round(node.cornerRadius);
      cornerRadii.set(r, (cornerRadii.get(r) || 0) + 1);
    } else if (node.rectangleCornerRadii) {
      node.rectangleCornerRadii.forEach((r) => {
        const rr = Math.round(r);
        cornerRadii.set(rr, (cornerRadii.get(rr) || 0) + 1);
      });
    }

    if (typeof node.itemSpacing === 'number') {
      const s = Math.round(node.itemSpacing);
      spacings.set(s, (spacings.get(s) || 0) + 1);
    }
    ['paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom'].forEach((k) => {
      if (typeof node[k] === 'number') {
        const s = Math.round(node[k]);
        spacings.set(s, (spacings.get(s) || 0) + 1);
      }
    });

    if (Array.isArray(node.children)) {
      node.children.forEach((c) => walk(c, pageContext));
    }
  }

  if (fileData.document && Array.isArray(fileData.document.children)) {
    fileData.document.children.forEach((page) => {
      walk(page, page.name || '未命名页面');
    });
  }

  if (fileData.componentSets) {
    Object.entries(fileData.componentSets).forEach(([id, set]) => {
      componentSets.set(set.name, {
        description: set.description || '',
      });
    });
  }

  function toSortedArray(map) {
    return Array.from(map.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([value, count]) => ({ value, count }));
  }

  return {
    fileName: fileData.name,
    lastModified: fileData.lastModified,
    pages: (fileData.document?.children || []).map((p) => p.name),
    colors: toSortedArray(colors),
    fontSizes: toSortedArray(fontSizes),
    fontFamilies: toSortedArray(fontFamilies),
    cornerRadii: toSortedArray(cornerRadii),
    spacings: toSortedArray(spacings),
    components: components.slice(0, 200),
    componentSets: Array.from(componentSets.entries()).map(([name, info]) => ({ name, ...info })),
    stats: {
      totalColors: colors.size,
      totalFontSizes: fontSizes.size,
      totalFontFamilies: fontFamilies.size,
      totalCornerRadii: cornerRadii.size,
      totalComponents: components.length,
      totalComponentSets: componentSets.size,
    },
  };
}

module.exports = { parseFigmaUrl, fetchFigmaFile, extractDesignData };
