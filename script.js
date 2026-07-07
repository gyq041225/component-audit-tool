// ---------- Icons (Lucide-style, 1.5px stroke, currentColor) ----------
const ICONS = {
  logo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><path d="M14 17.5h7M17.5 14v7"/></svg>',
  image: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>',
  figma: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5"/><path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12z"/><path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0"/><path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0"/><path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5"/></svg>',
  history: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>',
  clipboard: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M9 12h6M9 16h4"/></svg>',
  target: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/></svg>',
  alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="m21.7 18-8-14a2 2 0 0 0-3.4 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3z"/><line x1="12" x2="12" y1="9" y2="13"/><circle cx="12" cy="17" r="0.5" fill="currentColor"/></svg>',
  layers: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="m12.83 2.18-9 4a2 2 0 0 0 0 3.64l9 4a2 2 0 0 0 1.66 0l9-4a2 2 0 0 0 0-3.64l-9-4a2 2 0 0 0-1.66 0Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/></svg>',
  bulb: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1V18h6v-1.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2Z"/></svg>',
  palette: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r="0.5" fill="currentColor"/><circle cx="17.5" cy="10.5" r="0.5" fill="currentColor"/><circle cx="8.5" cy="7.5" r="0.5" fill="currentColor"/><circle cx="6.5" cy="12.5" r="0.5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.9 0 1.5-.7 1.5-1.5v-1c0-.4.1-.7.4-.9.3-.2.6-.4 1-.4h1.5c2.8 0 5-2.2 5-5C21.5 6.6 17.2 2 12 2z"/></svg>',
  type: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" x2="15" y1="20" y2="20"/><line x1="12" x2="12" y1="4" y2="20"/></svg>',
  camera: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3.5"/></svg>',
  file: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
  play: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><polygon points="6 3 20 12 6 21 6 3" fill="currentColor" stroke="none"/></svg>',
  loader: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" class="icon-spin"><path d="M12 2v4"/><path d="m16.2 7.8 2.9-2.9"/><path d="M18 12h4"/><path d="m16.2 16.2 2.9 2.9"/><path d="M12 18v4"/><path d="m4.9 19.1 2.9-2.9"/><path d="M2 12h4"/><path d="m4.9 4.9 2.9 2.9"/></svg>',
  download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>',
  refresh: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  minus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>',
  bolt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/></svg>',
  dumbbell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M14.4 14.4 9.6 9.6M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l-1.768 1.767a2 2 0 1 1 2.828 2.829zM5.343 2.515a2 2 0 1 1 2.829 2.828l1.767-1.768a2 2 0 1 1 2.829 2.829L6.404 12.768a2 2 0 1 1-2.829-2.829l1.768-1.767a2 2 0 1 1-2.828-2.829z"/></svg>',
  coin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M8 12h8M12 8v8"/></svg>',
  package: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="M3.3 7 12 12l8.7-5"/><path d="M12 22V12"/></svg>',
  sparkle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/></svg>',
};

function icon(name, cls = 'icon') {
  const svg = ICONS[name];
  if (!svg) return '';
  return svg.replace('<svg ', `<svg class="${cls}" `);
}

function hydrateIcons(root = document) {
  root.querySelectorAll('[data-icon]').forEach((el) => {
    if (el.dataset.iconHydrated === '1') return;
    const name = el.dataset.icon;
    el.innerHTML = icon(name);
    el.dataset.iconHydrated = '1';
  });
}

document.addEventListener('DOMContentLoaded', () => hydrateIcons());

let selectedImageBase64 = null;
let selectedImageType = null;
let analysisResult = null;
let currentMode = 'image';
let currentSpecMode = 'text';
let specFileData = null;

// ---------- History ----------
const HISTORY_KEY = 'component-audit-history';
const HISTORY_MAX = 10;
const THUMB_MAX_SIZE = 60 * 1024; // 60KB

function loadHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (_) {
    return [];
  }
}

function saveHistory(list) {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(list));
  } catch (e) {
    if (e.name === 'QuotaExceededError' && list.length > 1) {
      saveHistory(list.slice(0, list.length - 1));
    }
  }
  updateHistoryBadge();
}

function updateHistoryBadge() {
  const count = loadHistory().length;
  const badge = document.getElementById('historyCount');
  if (!badge) return;
  if (count === 0) {
    badge.style.display = 'none';
  } else {
    badge.style.display = 'inline-flex';
    badge.textContent = count;
  }
}

async function makeThumbnail(base64, mimeType, maxWidth = 240) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxWidth / img.width);
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL('image/jpeg', 0.7));
    };
    img.onerror = () => resolve(null);
    img.src = `data:${mimeType};base64,${base64}`;
  });
}

async function addHistory({ source, name, fullData, thumbnail }) {
  const record = {
    id: `h_${Math.random().toString(36).slice(2, 10)}_${performance.now().toFixed(0)}`,
    createdAt: new Date().toISOString(),
    source,
    name,
    thumbnail,
    summary: fullData?.analysis?.summary || null,
    hasSpec: !!fullData?.hasSpec,
    data: fullData,
  };

  const list = loadHistory();
  list.unshift(record);
  const trimmed = list.slice(0, HISTORY_MAX);
  saveHistory(trimmed);
}

function deleteHistory(id) {
  const list = loadHistory().filter(r => r.id !== id);
  saveHistory(list);
  renderHistoryList();
}

function clearHistory() {
  if (!confirm('确定要清空所有历史记录吗?')) return;
  localStorage.removeItem(HISTORY_KEY);
  updateHistoryBadge();
  renderHistoryList();
}

function toggleHistory() {
  const drawer = document.getElementById('historyDrawer');
  const backdrop = document.getElementById('historyBackdrop');
  const willOpen = !drawer.classList.contains('open');
  drawer.classList.toggle('open', willOpen);
  backdrop.classList.toggle('open', willOpen);
  if (willOpen) renderHistoryList();
}

function renderHistoryList() {
  const list = loadHistory();
  const empty = document.getElementById('historyEmpty');
  const listEl = document.getElementById('historyList');
  const clearBtn = document.getElementById('clearHistoryBtn');

  if (list.length === 0) {
    empty.style.display = 'block';
    listEl.style.display = 'none';
    if (clearBtn) clearBtn.style.display = 'none';
    return;
  }

  empty.style.display = 'none';
  listEl.style.display = 'flex';
  if (clearBtn) clearBtn.style.display = 'inline-flex';

  listEl.innerHTML = list.map(r => {
    const time = new Date(r.createdAt);
    const timeStr = `${time.getMonth() + 1}月${time.getDate()}日 ${String(time.getHours()).padStart(2, '0')}:${String(time.getMinutes()).padStart(2, '0')}`;
    const score = r.summary?.consistency_score;
    const quality = r.summary?.overallQuality;
    const sourceIconName = r.source === 'figma' ? 'figma' : 'camera';
    const sourceLabel = r.source === 'figma' ? 'Figma' : '截图';
    const specTag = r.hasSpec ? `<span class="history-tag">${icon('clipboard', 'icon icon-xs')} 规范</span>` : '';

    return `
      <div class="history-item" onclick="openHistory('${r.id}')">
        ${r.thumbnail
          ? `<img class="history-thumb" src="${r.thumbnail}" alt="thumb" />`
          : `<div class="history-thumb-placeholder">${icon(sourceIconName)}</div>`}
        <div class="history-body">
          <div class="history-name" title="${escapeHtml(r.name || '未命名')}">${escapeHtml(r.name || '未命名')}</div>
          <div class="history-meta">
            <span class="history-meta-inline">${icon(sourceIconName, 'icon icon-xs')} ${sourceLabel}</span>
            <span>·</span>
            <span>${timeStr}</span>
            ${score != null ? `<span>·</span><span class="history-meta-inline">${icon('target', 'icon icon-xs')} ${score}%</span>` : ''}
            ${specTag}
          </div>
          ${quality ? `<div class="history-quality">${localize(QUALITY_LABELS, quality, quality)}</div>` : ''}
        </div>
        <button class="history-delete" onclick="event.stopPropagation(); deleteHistory('${r.id}')" title="删除">${icon('x')}</button>
      </div>
    `;
  }).join('');
}

function openHistory(id) {
  const list = loadHistory();
  const record = list.find(r => r.id === id);
  if (!record) return;

  toggleHistory();

  analysisResult = record.data?.analysis;

  if (record.source === 'image' && record.thumbnail) {
    const m = record.thumbnail.match(/^data:(image\/[^;]+);base64,(.+)$/);
    if (m) {
      selectedImageBase64 = m[2];
      selectedImageType = m[1];
    }
  } else {
    selectedImageBase64 = null;
    selectedImageType = null;
  }

  renderResults(record.data.analysis, record.data);

  document.getElementById('resultSection').style.display = 'block';
  document.getElementById('errorSection').style.display = 'none';

  setTimeout(() => {
    document.getElementById('resultSection').scrollIntoView({ behavior: 'smooth' });
  }, 100);
}

document.addEventListener('DOMContentLoaded', updateHistoryBadge);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const drawer = document.getElementById('historyDrawer');
    if (drawer && drawer.classList.contains('open')) toggleHistory();
  }
});

function switchSpecMode(mode) {
  currentSpecMode = mode;
  document.querySelectorAll('.spec-tab').forEach((tab) => {
    tab.classList.toggle('active', tab.dataset.spec === mode);
  });
  document.getElementById('specTextMode').style.display = mode === 'text' ? 'block' : 'none';
  document.getElementById('specFileMode').style.display = mode === 'file' ? 'block' : 'none';
}

function clearSpecFile() {
  specFileData = null;
  document.getElementById('specFileInput').value = '';
  document.getElementById('specFileInfo').style.display = 'none';
  document.getElementById('specUploadZone').style.display = 'block';
}

function getSpecPayload() {
  if (currentSpecMode === 'text') {
    const text = document.getElementById('specTextInput').value.trim();
    return text ? { specText: text } : {};
  }
  if (specFileData) {
    return {
      specFileBase64: specFileData.base64,
      specFileType: specFileData.type,
      specFileName: specFileData.name,
    };
  }
  return {};
}

function switchMode(mode) {
  currentMode = mode;
  document.querySelectorAll('.mode-tab').forEach((tab) => {
    tab.classList.toggle('active', tab.dataset.mode === mode);
  });
  document.getElementById('imageMode').style.display = mode === 'image' ? 'block' : 'none';
  document.getElementById('figmaMode').style.display = mode === 'figma' ? 'block' : 'none';
  document.getElementById('resultSection').style.display = 'none';
  document.getElementById('errorSection').style.display = 'none';
}

// Upload Zone Setup
const uploadZone = document.getElementById('uploadZone');
const imageInput = document.getElementById('imageInput');

uploadZone.addEventListener('click', () => imageInput.click());

uploadZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  uploadZone.classList.add('dragover');
});

uploadZone.addEventListener('dragleave', () => {
  uploadZone.classList.remove('dragover');
});

uploadZone.addEventListener('drop', (e) => {
  e.preventDefault();
  uploadZone.classList.remove('dragover');
  const files = e.dataTransfer.files;
  if (files.length > 0) {
    handleImageSelect(files[0]);
  }
});

imageInput.addEventListener('change', (e) => {
  if (e.target.files.length > 0) {
    handleImageSelect(e.target.files[0]);
  }
});

async function handleImageSelect(file) {
  if (!file.type.startsWith('image/')) {
    alert('请选择图片文件');
    return;
  }

  const compressed = await compressImage(file, 1600, 0.85);

  selectedImageBase64 = compressed.dataUrl.split(',')[1];
  selectedImageType = compressed.type;

  const fileInfoDiv = document.getElementById('fileInfo');
  document.getElementById('previewImage').src = compressed.dataUrl;
  document.getElementById('fileName').textContent = `文件名：${file.name}`;
  const origKB = (file.size / 1024).toFixed(1);
  const newKB = (compressed.sizeBytes / 1024).toFixed(1);
  const info = compressed.compressed
    ? `${origKB} KB → ${newKB} KB (已压缩到 ${compressed.width}px 宽)`
    : `${origKB} KB`;
  document.getElementById('fileSize').textContent = `大小：${info}`;

  uploadZone.style.display = 'none';
  fileInfoDiv.style.display = 'flex';
}

function compressImage(file, maxWidth, quality) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      const img = new Image();
      img.onload = () => {
        if (img.width <= maxWidth && file.size < 2 * 1024 * 1024) {
          resolve({
            dataUrl,
            type: file.type,
            sizeBytes: file.size,
            width: img.width,
            compressed: false,
          });
          return;
        }
        const scale = Math.min(1, maxWidth / img.width);
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const outType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
        const outUrl = canvas.toDataURL(outType, quality);
        const bytes = Math.round((outUrl.length - outUrl.indexOf(',') - 1) * 3 / 4);
        resolve({
          dataUrl: outUrl,
          type: outType,
          sizeBytes: bytes,
          width: canvas.width,
          compressed: true,
        });
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  });
}

function resetUpload() {
  selectedImageBase64 = null;
  selectedImageType = null;
  imageInput.value = '';
  document.getElementById('fileInfo').style.display = 'none';
  uploadZone.style.display = 'flex';
}

function resetAll() {
  resetUpload();
  document.getElementById('resultSection').style.display = 'none';
  document.getElementById('errorSection').style.display = 'none';
}

async function startAnalysis() {
  const analyzeBtn = document.getElementById('analyzeBtn');
  const btnText = document.getElementById('btnText');
  const btnSpinner = document.getElementById('btnSpinner');

  let endpoint;
  let body;

  if (currentMode === 'image') {
    if (!selectedImageBase64) {
      alert('请先选择图片');
      return;
    }
    endpoint = '/api/audit';
    body = { imageBase64: selectedImageBase64, imageType: selectedImageType, ...getSpecPayload() };
  } else {
    const figmaUrl = document.getElementById('figmaUrlInput').value.trim();
    const figmaToken = document.getElementById('figmaTokenInput').value.trim();
    if (!figmaUrl) {
      alert('请粘贴 Figma 文件链接');
      return;
    }
    if (!/figma\.com\/(file|design|proto)\//.test(figmaUrl)) {
      alert('链接格式不对,应该是 figma.com/file/... 或 figma.com/design/...');
      return;
    }
    endpoint = '/api/audit-figma';
    body = { figmaUrl, ...getSpecPayload() };
    if (figmaToken) body.figmaToken = figmaToken;
  }

  analyzeBtn.disabled = true;
  btnText.style.display = 'none';
  btnSpinner.style.display = 'inline';

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    let data;
    try {
      data = await response.json();
    } catch (e) {
      if (response.status === 504 || response.status === 502) {
        throw new Error('分析超时(60 秒上限)。这个 Figma 文件太大,请试试更小的文件或单个页面');
      }
      throw new Error(`服务返回异常(${response.status}),请稍后重试`);
    }

    if (!response.ok) {
      throw new Error(data.error || '分析失败');
    }

    analysisResult = data.analysis;
    renderResults(data.analysis, data);

    // Save to history (fire and forget)
    (async () => {
      try {
        let thumbnail = null;
        let name = '未命名';
        let source = 'image';

        if (currentMode === 'image' && selectedImageBase64) {
          thumbnail = await makeThumbnail(selectedImageBase64, selectedImageType);
          const fileNameEl = document.getElementById('fileName');
          name = fileNameEl?.textContent?.replace('文件名：', '') || '截图分析';
        } else if (currentMode === 'figma') {
          source = 'figma';
          name = data.fileName || document.getElementById('figmaUrlInput')?.value || 'Figma 文件';
        }

        await addHistory({ source, name, fullData: data, thumbnail });
      } catch (err) {
        console.warn('Failed to save history:', err);
      }
    })();

    document.getElementById('resultSection').style.display = 'block';
    document.getElementById('errorSection').style.display = 'none';

    // Scroll to results
    setTimeout(() => {
      document.getElementById('resultSection').scrollIntoView({ behavior: 'smooth' });
    }, 100);
  } catch (error) {
    console.error('Analysis error:', error);
    showError(error.message || '分析过程中出错，请重试');
    document.getElementById('errorSection').style.display = 'block';
    document.getElementById('resultSection').style.display = 'none';
  } finally {
    analyzeBtn.disabled = false;
    btnText.style.display = 'inline';
    btnSpinner.style.display = 'none';
  }
}

function renderResults(analysis, fullData) {
  if (fullData?.source === 'figma') {
    renderFigmaBanner(fullData);
    hideAnnotations();
  } else {
    const banner = document.getElementById('figmaBanner');
    if (banner) banner.style.display = 'none';
    renderAnnotations(analysis);
  }

  renderCompliance(analysis);

  // Hero Summary
  const score = analysis.summary?.consistency_score;
  document.getElementById('summaryComponents').textContent = analysis.summary?.component_count ?? '-';
  document.getElementById('summaryConsistency').textContent = score != null ? `${score}%` : '-';
  document.getElementById('summaryMaturity').textContent = analysis.summary?.maturity_level != null ? `${analysis.summary.maturity_level}/10` : '-';
  document.getElementById('summaryQuality').textContent = localize(QUALITY_LABELS, analysis.summary?.overallQuality, '-');
  updateHeroRing(score);
  renderIssueStatsBar(analysis.issues || []);

  // Issues
  if (analysis.issues && analysis.issues.length > 0) {
    const issuesList = document.getElementById('issuesList');
    issuesList.innerHTML = analysis.issues
      .map(
        (issue) => `
      <div class="issue-item ${issue.severity}">
        <div class="issue-header">
          <span class="issue-severity">${localize(SEVERITY_LABELS, issue.severity, issue.severity)}</span>
          <span class="issue-type">${localize(ISSUE_TYPE_LABELS, issue.type, issue.type)}</span>
        </div>
        <div class="issue-desc">${issue.description}</div>
        <div class="issue-affected">受影响组件：${issue.affectedComponents?.join(', ') || '不详'}</div>
      </div>
    `
      )
      .join('');
    document.getElementById('issuesSection').style.display = 'block';
  }

  // Components
  if (analysis.components && analysis.components.length > 0) {
    const componentsList = document.getElementById('componentsList');
    componentsList.innerHTML = analysis.components
      .map((comp) => {
        const cat = normalizeCategory(comp.category);
        const color = colorForCategory(comp.category);
        const cons = typeof comp.consistency === 'number' ? comp.consistency : 0;
        const consColor = scoreColor(cons);
        return `
      <div class="component-item" style="--comp-color: ${color}">
        <div class="component-color-bar"></div>
        <div class="component-header">
          <div class="component-title-row">
            <span class="component-name">${escapeHtml(comp.name || '')}</span>
            <span class="component-badge" style="background:${color}22;color:${color};border-color:${color}55">${labelForCategory(comp.category)}</span>
          </div>
          <div class="component-instances">×${comp.instances || 0}</div>
        </div>
        <div class="component-consistency-row">
          <div class="component-consistency-bar">
            <div class="component-consistency-fill" style="width:${cons}%;background:${consColor}"></div>
          </div>
          <div class="component-consistency-num" style="color:${consColor}">${cons}%</div>
        </div>
        ${comp.variants?.length ? `<div class="component-variants">${comp.variants.map(v => `<span class="variant-chip">${escapeHtml(v)}</span>`).join('')}</div>` : ''}
        ${comp.notes ? `<div class="component-notes">${escapeHtml(comp.notes)}</div>` : ''}
      </div>
    `;
      })
      .join('');
    document.getElementById('componentsSection').style.display = 'block';
  }

  // Suggestions
  if (analysis.suggestions && analysis.suggestions.length > 0) {
    const suggestionsList = document.getElementById('suggestionsList');
    suggestionsList.innerHTML = analysis.suggestions
      .map(
        (sug) => `
      <div class="suggestion-item suggestion-${sug.priority || 'low'}">
        <div class="suggestion-head">
          <span class="suggestion-priority-badge suggestion-${sug.priority || 'low'}">${localize(PRIORITY_LABELS, sug.priority, sug.priority)}</span>
          <span class="suggestion-title">${escapeHtml(sug.title || '')}</span>
        </div>
        <div class="suggestion-desc">${escapeHtml(sug.description || '')}</div>
        <div class="suggestion-footer">
          <span class="suggestion-tag">${icon('coin', 'icon icon-xs')} ${escapeHtml(sug.impact || '')}</span>
          <span class="suggestion-tag">${effortIcon(sug.effort)} ${localize(EFFORT_LABELS, sug.effort, sug.effort)}</span>
        </div>
      </div>
    `
      )
      .join('');
    document.getElementById('suggestionsSection').style.display = 'block';
  }

  // Colors - big swatch grid
  if (analysis.colorPalette && analysis.colorPalette.length > 0) {
    const maxFreq = Math.max(...analysis.colorPalette.map(c => c.frequency || 1));
    const colorGrid = document.getElementById('colorGrid');
    colorGrid.innerHTML = analysis.colorPalette
      .map((color) => {
        const freq = color.frequency || 0;
        const percent = Math.round((freq / maxFreq) * 100);
        const isLight = isLightColor(color.hex);
        return `
      <div class="color-tile" style="background: ${color.hex}; color: ${isLight ? '#0B0D14' : '#fff'}">
        <div class="color-tile-top">
          <div class="color-tile-hex">${color.hex}</div>
          <div class="color-tile-name">${escapeHtml(color.name || '')}</div>
        </div>
        <div class="color-tile-bottom">
          <div class="color-tile-usage" title="${escapeHtml(color.usage || '')}">${escapeHtml(color.usage || '')}</div>
          <div class="color-tile-freq">
            <div class="color-tile-freq-bar" style="width:${percent}%; background:${isLight ? 'rgba(0,0,0,0.35)' : 'rgba(255,255,255,0.5)'}"></div>
            <div class="color-tile-freq-num">×${freq}</div>
          </div>
        </div>
      </div>
    `;
      })
      .join('');
    document.getElementById('colorSection').style.display = 'block';
  }

  // Typography - live preview
  if (analysis.typography && analysis.typography.length > 0) {
    const typographyList = document.getElementById('typographyList');
    typographyList.innerHTML = analysis.typography
      .map((typo) => {
        const sizes = Array.isArray(typo.sizes) ? typo.sizes.filter(s => s != null).sort((a,b) => b - a) : [];
        const previewSize = sizes[0] || 16;
        const weight = Array.isArray(typo.weights) && typo.weights.length ? typo.weights[0] : 500;
        return `
      <div class="typo-item">
        <div class="typo-preview" style="font-size:${Math.min(previewSize, 42)}px; font-weight:${weight}">
          永 Aa 设计系统 · Design System
        </div>
        <div class="typo-info">
          <div class="typo-name">${escapeHtml(typo.name || '未命名')}</div>
          <div class="typo-meta">
            ${sizes.length ? `<span class="typo-chip">字号 ${sizes.join(' / ')}px</span>` : ''}
            ${Array.isArray(typo.weights) && typo.weights.length ? `<span class="typo-chip">字重 ${typo.weights.join(' / ')}</span>` : ''}
          </div>
          ${typo.usage ? `<div class="typo-usage">${escapeHtml(typo.usage)}</div>` : ''}
        </div>
      </div>
    `;
      })
      .join('');
    document.getElementById('typographySection').style.display = 'block';
  }
}

function isLightColor(hex) {
  if (!hex || !hex.startsWith('#')) return false;
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
  if (full.length < 6) return false;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 155;
}

const CATEGORY_COLORS = {
  button:       '#EF4444',
  card:         '#3B82F6',
  input:        '#10B981',
  navigation:   '#A855F7',
  nav:          '#A855F7',
  icon:         '#F59E0B',
  text:         '#64748B',
  form:         '#14B8A6',
  modal:        '#EC4899',
  status:       '#22C55E',
  data_display: '#0EA5E9',
  datadisplay:  '#0EA5E9',
  chart:        '#0EA5E9',
  table:        '#0EA5E9',
  list:         '#8B5CF6',
  tag:          '#F97316',
  badge:        '#F97316',
  avatar:       '#EAB308',
  image:        '#EAB308',
  progress:     '#84CC16',
  header:       '#06B6D4',
  footer:       '#06B6D4',
  sidebar:      '#7C3AED',
  toolbar:      '#7C3AED',
  other:        '#6366F1',
};

const CATEGORY_LABELS = {
  button:       '按钮',
  card:         '卡片',
  input:        '输入框',
  navigation:   '导航',
  nav:          '导航',
  icon:         '图标',
  text:         '文本',
  form:         '表单',
  modal:        '弹窗',
  status:       '状态',
  data_display: '数据展示',
  datadisplay:  '数据展示',
  chart:        '图表',
  table:        '表格',
  list:         '列表',
  tag:          '标签',
  badge:        '徽章',
  avatar:       '头像',
  image:        '图片',
  progress:     '进度',
  header:       '页头',
  footer:       '页脚',
  sidebar:      '侧边栏',
  toolbar:      '工具栏',
  other:        '其他',
};

function normalizeCategory(cat) {
  return String(cat || 'other').toLowerCase().replace(/[\s-]/g, '_');
}

function colorForCategory(cat) {
  return CATEGORY_COLORS[normalizeCategory(cat)] || CATEGORY_COLORS.other;
}

function labelForCategory(cat) {
  return CATEGORY_LABELS[normalizeCategory(cat)] || cat || '其他';
}

const ISSUE_TYPE_LABELS = {
  inconsistent_color:      '颜色不一致',
  inconsistent_spacing:    '间距不一致',
  inconsistent_typography: '字体不一致',
  inconsistent_radius:     '圆角不一致',
  inconsistent_size:       '尺寸不一致',
  duplicate_component:     '重复组件',
  missing_variant:         '缺少变体',
  missing_token:           '缺少设计 Token',
  spec_violation:          '违反规范',
  accessibility:           '可访问性问题',
  alignment:               '对齐问题',
  hierarchy:               '层级问题',
};

const SEVERITY_LABELS = {
  critical: '严重',
  high:     '高',
  medium:   '中',
  low:      '低',
};

const PRIORITY_LABELS = {
  high:   '高优先级',
  medium: '中优先级',
  low:    '低优先级',
};

const EFFORT_LABELS = {
  quick:   '快速',
  medium:  '中等',
  complex: '复杂',
};

const SUGGESTION_CATEGORY_LABELS = {
  consolidation:    '整合合并',
  standardization:  '标准化',
  expansion:        '扩展',
  align_to_spec:    '对齐规范',
};

const QUALITY_LABELS = {
  excellent:   '优秀',
  good:        '良好',
  fair:        '一般',
  needs_work:  '需要改进',
};

function localize(map, key, fallback) {
  if (!key) return fallback || '';
  const norm = String(key).toLowerCase().replace(/[\s-]/g, '_');
  return map[norm] || key;
}

function effortIcon(effort) {
  const k = String(effort || '').toLowerCase();
  if (k === 'quick') return icon('bolt', 'icon icon-xs');
  if (k === 'complex') return icon('dumbbell', 'icon icon-xs');
  return icon('clock', 'icon icon-xs');
}

function scoreColor(score) {
  if (score == null) return '#64748B';
  if (score >= 85) return '#10B981';
  if (score >= 70) return '#3B82F6';
  if (score >= 50) return '#F59E0B';
  return '#EF4444';
}

function updateHeroRing(score) {
  const el = document.getElementById('heroRingFill');
  if (!el) return;
  const s = typeof score === 'number' ? Math.max(0, Math.min(100, score)) : 0;
  const R = 52;
  const C = 2 * Math.PI * R;
  const offset = C * (1 - s / 100);
  el.style.strokeDasharray = C.toFixed(2);
  el.style.strokeDashoffset = offset.toFixed(2);
  el.style.stroke = scoreColor(score);
  const numEl = document.getElementById('summaryConsistency');
  if (numEl) numEl.style.color = scoreColor(score);
}

function renderIssueStatsBar(issues) {
  const bar = document.getElementById('issueStatsBar');
  if (!bar) return;
  if (!issues || issues.length === 0) {
    bar.style.display = 'none';
    return;
  }
  const counts = { critical: 0, high: 0, medium: 0, low: 0 };
  issues.forEach(i => {
    const s = (i.severity || 'low').toLowerCase();
    if (counts[s] != null) counts[s]++;
  });
  const total = issues.length;
  const configs = [
    { key: 'critical', label: '严重', color: '#DC2626', emoji: '🔴' },
    { key: 'high',     label: '高',   color: '#F97316', emoji: '🟠' },
    { key: 'medium',   label: '中',   color: '#F59E0B', emoji: '🟡' },
    { key: 'low',      label: '低',   color: '#3B82F6', emoji: '🔵' },
  ];
  bar.innerHTML = `
    <div class="isb-head">
      <span class="isb-title">共发现 <b>${total}</b> 个问题</span>
    </div>
    <div class="isb-track">
      ${configs.map(c => counts[c.key] > 0
        ? `<div class="isb-seg" style="flex: ${counts[c.key]}; background: ${c.color}" title="${c.label}: ${counts[c.key]}"></div>`
        : '').join('')}
    </div>
    <div class="isb-legend">
      ${configs.map(c => `
        <span class="isb-chip ${counts[c.key] === 0 ? 'is-zero' : ''}">
          <span class="isb-dot" style="background: ${c.color}"></span>
          <span>${c.label}</span>
          <b>${counts[c.key]}</b>
        </span>
      `).join('')}
    </div>
  `;
  bar.style.display = 'block';
}

let annotationState = { boxes: [], imgW: 0, imgH: 0 };

function hideAnnotations() {
  document.getElementById('annotationSection').style.display = 'none';
}

function renderAnnotations(analysis) {
  const section = document.getElementById('annotationSection');
  const boxes = collectBoxes(analysis);
  if (boxes.length === 0 || !selectedImageBase64) {
    section.style.display = 'none';
    return;
  }

  const img = document.getElementById('annotationImage');
  img.src = `data:${selectedImageType};base64,${selectedImageBase64}`;
  img.onload = () => {
    annotationState = { boxes, imgW: img.naturalWidth, imgH: img.naturalHeight };
    drawAnnotations();
    renderLegend(boxes);
  };
  section.style.display = 'block';

  const toggleBoxes = document.getElementById('toggleAnnotations');
  const toggleLabels = document.getElementById('toggleLabels');
  toggleBoxes.onchange = drawAnnotations;
  toggleLabels.onchange = drawAnnotations;
}

function collectBoxes(analysis) {
  const out = [];
  const components = analysis?.components || [];
  components.forEach((comp) => {
    const bboxes = comp.bboxes || [];
    bboxes.forEach((b, idx) => {
      if (!Array.isArray(b.bbox) || b.bbox.length !== 4) return;
      const [ymin, xmin, ymax, xmax] = b.bbox;
      if ([ymin, xmin, ymax, xmax].some(v => typeof v !== 'number')) return;
      out.push({
        ymin, xmin, ymax, xmax,
        label: b.label || comp.name,
        category: comp.category,
        color: colorForCategory(comp.category),
        componentName: comp.name,
        consistency: comp.consistency,
      });
    });
  });
  return out;
}

function drawAnnotations() {
  const canvas = document.getElementById('annotationCanvas');
  const img = document.getElementById('annotationImage');
  const showBoxes = document.getElementById('toggleAnnotations').checked;
  const showLabels = document.getElementById('toggleLabels').checked;

  const displayW = img.clientWidth;
  const displayH = img.clientHeight;
  const dpr = window.devicePixelRatio || 1;
  canvas.width = displayW * dpr;
  canvas.height = displayH * dpr;
  canvas.style.width = displayW + 'px';
  canvas.style.height = displayH + 'px';

  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, displayW, displayH);

  if (!showBoxes) return;

  annotationState.boxes.forEach((b, i) => {
    const x = (b.xmin / 1000) * displayW;
    const y = (b.ymin / 1000) * displayH;
    const w = ((b.xmax - b.xmin) / 1000) * displayW;
    const h = ((b.ymax - b.ymin) / 1000) * displayH;

    ctx.fillStyle = b.color + '22';
    ctx.fillRect(x, y, w, h);

    ctx.strokeStyle = b.color;
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, w, h);

    if (showLabels) {
      ctx.font = '600 11px -apple-system, sans-serif';
      const text = b.label || 'component';
      const metrics = ctx.measureText(text);
      const padX = 6, padY = 4;
      const bgW = metrics.width + padX * 2;
      const bgH = 18;
      const bgX = Math.max(0, x);
      const bgY = Math.max(0, y - bgH);
      ctx.fillStyle = b.color;
      ctx.fillRect(bgX, bgY, bgW, bgH);
      ctx.fillStyle = 'white';
      ctx.fillText(text, bgX + padX, bgY + bgH - padY - 1);
    }
  });
}

function renderLegend(boxes) {
  const legend = document.getElementById('annotationLegend');
  const byCat = {};
  boxes.forEach(b => {
    const key = (b.category || 'other').toLowerCase();
    byCat[key] = (byCat[key] || 0) + 1;
  });
  legend.innerHTML = Object.entries(byCat)
    .sort((a, b) => b[1] - a[1])
    .map(([cat, count]) => `
      <span class="legend-item">
        <span class="legend-dot" style="background: ${colorForCategory(cat)}"></span>
        <span class="legend-label">${labelForCategory(cat)}</span>
        <span class="legend-count">${count}</span>
      </span>
    `).join('');
}

window.addEventListener('resize', () => {
  if (annotationState.boxes.length) drawAnnotations();
});

function setupSpecFileInput() {
  const zone = document.getElementById('specUploadZone');
  const input = document.getElementById('specFileInput');
  if (!zone || !input) return;

  zone.addEventListener('click', () => input.click());
  zone.addEventListener('dragover', (e) => { e.preventDefault(); zone.classList.add('dragover'); });
  zone.addEventListener('dragleave', () => zone.classList.remove('dragover'));
  zone.addEventListener('drop', (e) => {
    e.preventDefault();
    zone.classList.remove('dragover');
    if (e.dataTransfer.files[0]) handleSpecFile(e.dataTransfer.files[0]);
  });
  input.addEventListener('change', (e) => {
    if (e.target.files[0]) handleSpecFile(e.target.files[0]);
  });
}

function handleSpecFile(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const base64 = e.target.result.split(',')[1];
    specFileData = { base64, type: file.type, name: file.name };
    const info = document.getElementById('specFileName');
    info.innerHTML = `${icon('file', 'icon icon-xs')} <span>${escapeHtml(file.name)} (${(file.size / 1024).toFixed(1)} KB)</span>`;
    document.getElementById('specFileInfo').style.display = 'flex';
    document.getElementById('specUploadZone').style.display = 'none';
  };
  reader.readAsDataURL(file);
}

document.addEventListener('DOMContentLoaded', setupSpecFileInput);

function renderCompliance(analysis) {
  const section = document.getElementById('complianceSection');
  const checks = analysis.complianceChecks;
  if (!Array.isArray(checks) || checks.length === 0) {
    section.style.display = 'none';
    return;
  }

  const passCount = checks.filter(c => c.status === 'pass').length;
  const failCount = checks.filter(c => c.status === 'fail').length;
  const unclearCount = checks.filter(c => c.status === 'unclear').length;
  const rate = analysis.summary?.complianceRate ?? Math.round((passCount / checks.length) * 100);

  document.getElementById('complianceSummary').innerHTML = `
    <div class="compliance-meter">
      <div class="compliance-rate">
        <span class="compliance-rate-num">${rate}%</span>
        <span class="compliance-rate-label">合规率</span>
      </div>
      <div class="compliance-stats">
        <div class="cs-item cs-pass"><span>${passCount}</span> 通过</div>
        <div class="cs-item cs-fail"><span>${failCount}</span> 违反</div>
        <div class="cs-item cs-unclear"><span>${unclearCount}</span> 无法判定</div>
      </div>
    </div>
  `;

  const order = { fail: 0, unclear: 1, pass: 2 };
  const sorted = [...checks].sort((a, b) => (order[a.status] ?? 3) - (order[b.status] ?? 3));

  document.getElementById('complianceList').innerHTML = sorted.map(c => {
    const statusIcon = c.status === 'pass' ? icon('check') : c.status === 'fail' ? icon('x') : icon('minus');
    return `
      <div class="compliance-item ${c.status}">
        <div class="compliance-head">
          <span class="compliance-icon compliance-${c.status}">${statusIcon}</span>
          <span class="compliance-rule">${escapeHtml(c.rule || '')}</span>
          ${c.severity ? `<span class="compliance-severity ${c.severity}">${localize(SEVERITY_LABELS, c.severity, c.severity)}</span>` : ''}
        </div>
        <div class="compliance-meta">
          <div><strong>规范要求:</strong> ${escapeHtml(c.specValue || '未提供')}</div>
          <div><strong>实际发现:</strong> ${escapeHtml(c.actualValue || '未提供')}</div>
        </div>
        ${c.note ? `<div class="compliance-note">${escapeHtml(c.note)}</div>` : ''}
      </div>
    `;
  }).join('');

  section.style.display = 'block';
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}

function renderFigmaBanner(data) {
  let banner = document.getElementById('figmaBanner');
  if (!banner) {
    banner = document.createElement('div');
    banner.id = 'figmaBanner';
    banner.className = 'figma-banner';
    const resultSection = document.getElementById('resultSection');
    resultSection.insertBefore(banner, resultSection.firstChild);
  }
  const s = data.stats || {};
  const topColors = (data.rawTokens?.colors || []).slice(0, 8);
  const fontSizes = data.rawTokens?.fontSizes || [];
  const radii = data.rawTokens?.cornerRadii || [];

  banner.innerHTML = `
    <div class="figma-banner-title">${icon('figma', 'icon icon-xs')} 精确数据来自 Figma 文件</div>
    <div class="figma-banner-name">${data.fileName || ''} · ${data.pages?.length || 0} 个页面</div>
    <div class="figma-banner-grid">
      <div><span class="fb-num">${s.totalColors || 0}</span><span class="fb-label">种颜色</span></div>
      <div><span class="fb-num">${s.totalFontSizes || 0}</span><span class="fb-label">种字号</span></div>
      <div><span class="fb-num">${s.totalCornerRadii || 0}</span><span class="fb-label">种圆角</span></div>
      <div><span class="fb-num">${s.totalComponents || 0}</span><span class="fb-label">个组件实例</span></div>
      <div><span class="fb-num">${s.totalComponentSets || 0}</span><span class="fb-label">个组件定义</span></div>
    </div>
    ${topColors.length ? `
      <div class="fb-tokens">
        <div class="fb-tokens-label">Top 颜色（实际使用频次）</div>
        <div class="fb-color-strip">
          ${topColors.map(c => `<div class="fb-color-chip" title="${c.value} · ${c.count} 次" style="background:${c.value}"><span>${c.value}</span><em>${c.count}×</em></div>`).join('')}
        </div>
      </div>` : ''}
    ${fontSizes.length ? `
      <div class="fb-tokens">
        <div class="fb-tokens-label">字号（px · 使用频次）</div>
        <div class="fb-chip-row">
          ${fontSizes.map(f => `<span class="fb-chip">${f.value}px<em>${f.count}×</em></span>`).join('')}
        </div>
      </div>` : ''}
    ${radii.length ? `
      <div class="fb-tokens">
        <div class="fb-tokens-label">圆角（px · 使用频次）</div>
        <div class="fb-chip-row">
          ${radii.map(r => `<span class="fb-chip">${r.value}px<em>${r.count}×</em></span>`).join('')}
        </div>
      </div>` : ''}
  `;
  banner.style.display = 'block';
}

function showError(message) {
  document.getElementById('errorMessage').textContent = message;
}

function exportReport() {
  if (!analysisResult) return;

  const dataStr = JSON.stringify(analysisResult, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `component-audit-${Date.now()}.json`;
  link.click();
  URL.revokeObjectURL(url);
}
