# Component Audit Tool

用 AI 分析设计稿的组件一致性、找出重复、检查是否符合设计规范。

## 功能

- 📸 **上传截图** — Gemini Vision 识别组件、评估一致性
- 🎨 **Figma 链接** — 直接读 Figma 文件,精确提取颜色/字号/圆角/组件(数值 100% 准)
- 📋 **规范对比** — 上传设计规范文档,AI 逐条检查合规性
- 📥 **导出报告** — 完整 JSON,方便交付或存档

## 本地开发

### 1. 装依赖

```bash
npm install
```

### 2. 配置环境变量

```bash
cp .env.example .env
```

编辑 `.env`:

```
GEMINI_API_KEY=你的Gemini API Key      # 必填,去 https://aistudio.google.com/apikey 拿
FIGMA_TOKEN=figd_xxxxx                 # 可选,后端 Figma 分析用
PORT=3000
```

### 3. 启动

```bash
npm start
```

**中国大陆用户注意** — Gemini 需要科学上网。启动时带代理:

```bash
HTTPS_PROXY=http://127.0.0.1:7890 npm start
```

打开 http://localhost:3000

## 部署到 Vercel

### 方式 A:通过 GitHub 自动部署(推荐)

1. 把代码推到 GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/<你的用户名>/component-audit-tool.git
   git push -u origin main
   ```
2. 打开 https://vercel.com,用 GitHub 登录
3. 点 "Add New Project" → 选择这个仓库
4. **Environment Variables** 里加两个:
   - `GEMINI_API_KEY` = 你的 Gemini key
   - `FIGMA_TOKEN` = 你的 Figma token(可选)
5. 点 Deploy,大约 1 分钟部署完成
6. 拿到 `xxx.vercel.app` 域名,粘到你作品集就能用

> Vercel 服务器在海外,直连 Gemini,**不需要代理**。

### 方式 B:Vercel CLI

```bash
npm install -g vercel
vercel        # 首次部署,按提示登录
vercel --prod # 上线
```

上线后到 Vercel 控制台设置环境变量。

## 换电脑迁移

```bash
git clone https://github.com/<你的用户名>/component-audit-tool.git
cd component-audit-tool
npm install
cp .env.example .env
# 编辑 .env 填 API key
npm start
```

线上部署完全不受换电脑影响 — Vercel 自动跟着 GitHub 走。

## 技术栈

- **后端**:Node.js + Express(本地) / Vercel Serverless Functions(线上)
- **前端**:纯 HTML + CSS + JS
- **AI**:Google Gemini 2.5 Flash(vision + JSON mode)
- **Figma 集成**:Figma REST API

## 项目结构

```
component-audit-tool/
├── api/                       # Vercel Serverless Functions
│   ├── audit.js               #   截图分析
│   ├── audit-figma.js         #   Figma 分析
│   └── health.js
├── lib/
│   ├── figma.js               # Figma 文件解析
│   └── spec.js                # 规范文档解析(PDF/JSON/TXT)
├── prompts/
│   ├── audit.prompt.md        # 截图审计 prompt
│   ├── figma-audit.prompt.md  # Figma 数据审计 prompt
│   └── spec-audit.prompt.md   # 带规范对比的审计 prompt
├── public/                    # 前端
│   ├── index.html
│   ├── script.js
│   └── style.css
├── index.js                   # 本地开发 Express 入口
├── vercel.json                # Vercel 配置
└── .env.example
```

## 使用场景

- ✅ 设计评审前,快速审计一致性
- ✅ 交付给开发前,生成规范化文档
- ✅ 检查设计稿是否符合公司 DS 规范
- ✅ 作品集展示 AI × 设计工具化能力

## 免费额度

- **Gemini**:免费 tier 每分钟 15 次、每天 1500 次(足够作品集演示)
- **Vercel**:免费 tier 每月 100GB 带宽、无限次部署
- **Figma API**:完全免费

## 常见问题

**Q: 上传的图会不会有大小限制?**
A: Vercel 免费版单次请求限 4.5MB。前端自动把大图压到 1600px 宽,一般够用。

**Q: 我 API key 会被别人看到吗?**
A: `.env` 已经加入 `.gitignore`,不会推到 GitHub。Vercel 环境变量只在服务端可见。

**Q: 别人访问我的网站会消耗我的 API 额度吗?**
A: 会。如果担心被薅羊毛,可以:1) 加访问密码 2) 用 Vercel Analytics 监控 3) 让访客填自己的 key。

**Q: 分析结果不准怎么办?**
A: Figma 模式的数据是精确的;截图模式受图片清晰度影响。设计稿建议 1200px+ 宽度。

## 许可证

MIT

---

**Made by Yaqi Gou · Powered by Google Gemini**
