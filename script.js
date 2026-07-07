let selectedImageBase64 = null;
let selectedImageType = null;
let analysisResult = null;
let currentMode = 'image';
let currentSpecMode = 'text';
let specFileData = null;

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
  } else {
    const banner = document.getElementById('figmaBanner');
    if (banner) banner.style.display = 'none';
  }

  renderCompliance(analysis);

  // Summary
  document.getElementById('summaryComponents').textContent = analysis.summary?.component_count || '-';
  document.getElementById('summaryConsistency').textContent = `${analysis.summary?.consistency_score || '-'}%`;
  document.getElementById('summaryMaturity').textContent = `${analysis.summary?.maturity_level || '-'}/10`;

  const qualityMap = {
    excellent: '优秀',
    good: '良好',
    fair: '一般',
    needs_work: '需要改进',
  };
  document.getElementById('summaryQuality').textContent = qualityMap[analysis.summary?.overallQuality] || '-';

  // Issues
  if (analysis.issues && analysis.issues.length > 0) {
    const issuesList = document.getElementById('issuesList');
    issuesList.innerHTML = analysis.issues
      .map(
        (issue) => `
      <div class="issue-item ${issue.severity}">
        <div class="issue-header">
          <span class="issue-severity">${issue.severity}</span>
          <span class="issue-type">${issue.type}</span>
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
      .map(
        (comp) => `
      <div class="component-item">
        <div class="component-header">
          <span class="component-name">${comp.name}</span>
          <span class="component-badge">${comp.category}</span>
        </div>
        <div class="component-meta">
          <span>📍 ${comp.instances} 个实例</span>
          <span>🎯 一致性 ${comp.consistency}%</span>
        </div>
        <div class="component-variants">
          变体：${comp.variants?.join(', ') || '无'}
        </div>
        ${comp.notes ? `<div style="margin-top: 8px; font-size: 13px; color: var(--color-text-mute);">${comp.notes}</div>` : ''}
      </div>
    `
      )
      .join('');
    document.getElementById('componentsSection').style.display = 'block';
  }

  // Suggestions
  if (analysis.suggestions && analysis.suggestions.length > 0) {
    const suggestionsList = document.getElementById('suggestionsList');
    suggestionsList.innerHTML = analysis.suggestions
      .map(
        (sug) => `
      <div class="suggestion-item">
        <div class="suggestion-priority">${sug.priority}</div>
        <div class="suggestion-title">${sug.title}</div>
        <div class="suggestion-desc">${sug.description}</div>
        <div class="suggestion-impact">💰 预期收益：${sug.impact} · 工作量：${sug.effort}</div>
      </div>
    `
      )
      .join('');
    document.getElementById('suggestionsSection').style.display = 'block';
  }

  // Colors
  if (analysis.colorPalette && analysis.colorPalette.length > 0) {
    const colorGrid = document.getElementById('colorGrid');
    colorGrid.innerHTML = analysis.colorPalette
      .map(
        (color) => `
      <div class="color-item">
        <div class="color-swatch" style="background-color: ${color.hex}; border-color: ${color.hex}80;"></div>
        <div class="color-info">
          <div class="color-name">${color.name}</div>
          <div class="color-hex">${color.hex}</div>
          <div class="color-usage">使用 ${color.frequency} 次</div>
        </div>
      </div>
    `
      )
      .join('');
    document.getElementById('colorSection').style.display = 'block';
  }

  // Typography
  if (analysis.typography && analysis.typography.length > 0) {
    const typographyList = document.getElementById('typographyList');
    typographyList.innerHTML = analysis.typography
      .map(
        (typo) => `
      <div class="typography-item">
        <div class="typography-name">${typo.name}</div>
        <div class="typography-details">
          <span>字号：${typo.sizes?.join(', ') || '-'}</span>
          <span>字重：${typo.weights?.join(', ') || '-'}</span>
          <span>使用：${typo.usage}</span>
        </div>
      </div>
    `
      )
      .join('');
    document.getElementById('typographySection').style.display = 'block';
  }
}

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
    document.getElementById('specFileName').textContent = `📄 ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
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
    const icon = c.status === 'pass' ? '✅' : c.status === 'fail' ? '❌' : '⚠️';
    return `
      <div class="compliance-item ${c.status}">
        <div class="compliance-head">
          <span class="compliance-icon">${icon}</span>
          <span class="compliance-rule">${escapeHtml(c.rule || '')}</span>
          ${c.severity ? `<span class="compliance-severity ${c.severity}">${c.severity}</span>` : ''}
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
    <div class="figma-banner-title">🎨 精确数据来自 Figma 文件</div>
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
