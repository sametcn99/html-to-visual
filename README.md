# html-to-visual

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-15.x-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.x-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Bun](https://img.shields.io/badge/Runtime-Bun_v1.4+-fbf0df?style=for-the-badge&logo=bun&logoColor=black)](https://bun.sh/)
[![MUI Dark Theme](https://img.shields.io/badge/MUI-v6_Dark_Only-007FFF?style=for-the-badge&logo=mui)](https://mui.com/)
[![Zustand](https://img.shields.io/badge/State-Zustand-orange?style=for-the-badge)](https://zustand-demo.pmnd.rs/)
[![Puppeteer](https://img.shields.io/badge/Chromium-Puppeteer-00D8A2?style=for-the-badge&logo=puppeteer)](https://pptr.dev/)
[![FFmpeg](https://img.shields.io/badge/Encoder-FFmpeg_9.0-007808?style=for-the-badge&logo=ffmpeg)](https://ffmpeg.org/)
[![PWA](https://img.shields.io/badge/PWA-Ready-purple?style=for-the-badge&logo=pwa)](https://web.dev/progressive-web-apps/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

**Turn HTML snippets, CSS animations, and keyframes into high-resolution PNG, JPG, WEBP, 60fps MP4 videos, and palette-optimized GIFs.**

[Live Studio Workbench](https://github.com/sametcn99/html-to-visual) • [REST API Reference](#-rest-api-documentation) • [Templates Gallery](#-starter-templates) • [Architecture](#-architecture)

</div>

---

## 🌟 Overview

**html-to-visual** is an autonomous media generation studio and developer API designed to convert HTML, CSS, JavaScript, and complex web animations into production-grade visual assets.

While rasterizing static HTML into PNG/JPEG is trivial, capturing smooth **60fps MP4 videos** and **cinematic animated GIFs** from web animations presents major challenges with frame timing, color banding, and stutter. **html-to-visual** solves this using an innovative dual-engine architecture:

1. **Headless Frame Synchronizer**: Samples high-frequency compositor frames directly from headless Chromium at exact timeline intervals.
2. **Two-Pass FFmpeg Palettegen Filter**: Eliminates GIF dithering speckles and color banding by computing an optimal custom 256-color palette per animation before palette mapping.
3. **Lossless Video Pipeline**: Encodes raw frame streams into hardware-accelerated H.264 (yuv420p) with faststart MP4 flags for instant web playback.
4. **Developer-First REST API**: Enables headless automated rendering from CI/CD, webhooks, command-line scripts, Discord bots, and backend microservices.
5. **Standalone PWA & Client Fallback**: Can be installed as a native desktop/mobile app and operates with client-side canvas fallback when offline.

---

## ✨ Features

- **Direct Application Studio**: No landing page fluff. Open the app and start creating immediately in a focused 3-column workbench.
- **Strict MUI Dark Theme**: Designed exclusively with deep cosmic blacks (`#07090e`), electric indigo accents (`#6366f1`), glassmorphism, and neon glow effects.
- **Supported Visual Formats**:
  - `PNG` — Lossless raster with transparent alpha channel support.
  - `JPG` — Compressed high-resolution snapshots with customizable quality (1-100).
  - `WEBP` — Next-gen web imagery with high compression ratio.
  - `MP4` — H.264 1080p/4K 60fps video with smooth CSS keyframes & JS animation rendering.
  - `GIF` — Two-pass palettegen animated GIFs with zero color artifacts.
- **Developer REST API**: Programmatic endpoint (`POST /api/render`) returning direct binary media streams or JSON payloads with Base64 data URLs.
- **Monaco Code Studio**: VS Code-powered syntax editor with HTML, CSS, and JS tabs, auto-completion, line numbers, and file upload.
- **Interactive Viewport Sandbox**: Zoom from 20% to 200%, transparent checkerboard toggles, aspect ratio presets (Twitter, Instagram 1:1, Story 9:16, YouTube 16:9, Dribbble 4:3, Full HD 1080p).
- **Curated Animated Templates**: Cyberpunk Hologram, Aurora Gradient Flow, Developer Terminal Window, and SaaS Growth Badges.
- **PWA Ready**: Offline service worker caching, Web App Manifest, and native app install prompts.
- **Zustand State Management**: Atomic and predictable state transitions for studio parameters, history logs, and rendering pipelines.

---

## 🏗️ Architecture

```
html-to-visual/
├── public/
│   ├── sw.js                     # PWA Service Worker (offline fallback)
│   ├── icon-192.png              # Maskable app icon
│   └── icon-512.png              # High-res splash icon
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── render/route.ts   # Core REST Rendering API (Puppeteer + FFmpeg)
│   │   │   └── health/route.ts   # Engine health and capabilities
│   │   ├── layout.tsx            # Root layout with SEO and Dark Theme Registry
│   │   ├── page.tsx              # Main application studio
│   │   ├── manifest.ts           # PWA Web App Manifest
│   │   ├── robots.ts             # Search engine crawler policies
│   │   └── sitemap.ts            # Dynamic XML sitemap
│   ├── components/
│   │   ├── common/               # BrandLogo, GlassCard, ActionTooltip
│   │   ├── layout/               # AppHeader, AppFooter, WorkspaceContainer
│   │   ├── editor/               # HtmlEditor (Monaco), EditorToolbar, TemplatePicker
│   │   ├── preview/              # ViewportStage, ViewportToolbar
│   │   ├── controls/             # ExportPanel, DimensionControls, AnimationControls, RenderButton
│   │   ├── modals/               # ExportResultModal, ApiDocsModal, KeyboardShortcutsModal, SettingsModal
│   │   └── history/              # RenderHistoryDrawer
│   ├── hooks/
│   │   ├── useRenderer.ts        # Orchestrates Server and Client rendering pipelines
│   │   ├── usePWA.ts             # PWA installation prompts and lifecycle
│   │   ├── useKeyboardShortcuts.ts # Global hotkeys (Ctrl+Enter, Esc, ?)
│   │   └── useDebounce.ts        # Debounced live preview iframe updates
│   ├── lib/
│   │   ├── server/
│   │   │   ├── browserPool.ts    # Headless Chromium instance manager
│   │   │   └── videoEncoder.ts   # FFmpeg frame encoder & palettegen engine
│   │   ├── client/
│   │   │   └── clientRenderer.ts # Browser Canvas & MediaRecorder engine
│   │   ├── templates.ts          # Starter animated HTML/CSS blueprints
│   │   └── utils.ts              # File helpers, presets, and clipboard utilities
│   ├── store/
│   │   ├── useStudioStore.ts     # Primary Zustand state (code, options, modal states)
│   │   └── useHistoryStore.ts    # Persistent render history store
│   ├── theme/
│   │   ├── darkTheme.ts          # Strict MUI Dark Theme specifications
│   │   └── ThemeRegistry.tsx     # Emotion SSR Cache & ThemeProvider
│   └── types/
│       └── renderer.ts           # Shared TypeScript interfaces
├── package.json
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites

- **Bun**: `v1.4+` (Primary JavaScript runtime & package manager)
- **FFmpeg**: Installed and accessible in your system `PATH` (used for MP4 and GIF encoding).
  - *macOS*: `brew install ffmpeg`
  - *Ubuntu/Debian*: `sudo apt-get install -y ffmpeg`
  - *Windows*: `winget install Gyan.FFmpeg` or `choco install ffmpeg`

### Installation

```bash
# Clone the repository
git clone https://github.com/sametcn99/html-to-visual.git
cd html-to-visual

# Install dependencies using Bun
bun install

# Install Chrome for Puppeteer
bunx puppeteer browsers install chrome

# Run development server
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚡ REST API Documentation

The REST API allows you to programmatically generate visuals from any programming language or terminal command.

### Endpoint: `POST /api/render`

#### Request Body (JSON)

| Field | Type | Default | Description |
|---|---|---|---|
| `html` | `string` | **Required** | Raw HTML markup string to render. |
| `css` | `string` | `""` | Optional extra CSS stylesheet injected into document. |
| `js` | `string` | `""` | Optional extra JavaScript code executed on page load. |
| `format` | `string` | `"png"` | Target format: `png`, `jpeg`, `webp`, `gif`, `mp4`. |
| `width` | `number` | `1200` | Canvas width in pixels (100 to 3840). |
| `height` | `number` | `630` | Canvas height in pixels (100 to 2160). |
| `deviceScaleFactor` | `number` | `2` | Resolution scale factor (1x, 2x, or 3x Retina). |
| `duration` | `number` | `3.0` | Motion recording duration in seconds (0.5 to 15.0). |
| `fps` | `number` | `30` | Motion frame rate: `15`, `24`, `30`, or `60` FPS. |
| `delay` | `number` | `200` | Pre-recording wait time in milliseconds. |
| `quality` | `number` | `90` | Compression quality for JPEG/WEBP (1 to 100). |
| `transparentBackground` | `boolean` | `false` | Enable transparent background (PNG and GIF). |
| `selector` | `string` | `""` | Optional CSS selector targeting a specific DOM element. |

---

### API Usage Examples

#### 1. Generate an MP4 Video (cURL)

```bash
curl -X POST http://localhost:3000/api/render \
  -H "Content-Type: application/json" \
  -d '{
    "html": "<html><body><h1 style=\"animation: spin 3s infinite;\">Dynamic Motion</h1><style>@keyframes spin { 100% { transform: scale(1.2); } }</style></body></html>",
    "format": "mp4",
    "width": 1280,
    "height": 720,
    "duration": 3.0,
    "fps": 60
  }' \
  --output animation.mp4
```

#### 2. Generate a 60fps Crisp Animated GIF (cURL)

```bash
curl -X POST http://localhost:3000/api/render \
  -H "Content-Type: application/json" \
  -d '{
    "html": "<div style=\"width:100%;height:100%;background:#090d16;color:#818cf8;display:flex;align-items:center;justify-content:center;\"><h1>Neon GIF</h1></div>",
    "format": "gif",
    "width": 800,
    "height": 800,
    "duration": 2.5,
    "fps": 30
  }' \
  --output graphic.gif
```

#### 3. Node.js / TypeScript Integration

```typescript
import fs from 'fs/promises';

async function exportVisual() {
  const res = await fetch('http://localhost:3000/api/render', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      html: '<div style="color:white;background:#0f172a;padding:40px;">Social Card</div>',
      format: 'png',
      width: 1200,
      height: 630,
      deviceScaleFactor: 2,
    }),
  });

  const buffer = await res.arrayBuffer();
  await fs.writeFile('social_card.png', Buffer.from(buffer));
  console.log('Saved social_card.png');
}

exportVisual();
```

#### 4. Python 3 (`requests`) Integration

```python
import requests

payload = {
    "html": """
    <div style="background: #030712; color: #6366f1; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
        <h2>Automated Render API</h2>
    </div>
    """,
    "format": "mp4",
    "width": 1920,
    "height": 1080,
    "duration": 3.0,
    "fps": 60
}

response = requests.post("http://localhost:3000/api/render", json=payload)
if response.status_code == 200:
    with open("visual_output.mp4", "wb") as f:
        f.write(response.content)
    print("Video saved to visual_output.mp4")
```

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Description |
|---|---|
| `Ctrl + Enter` / `Cmd + Enter` | Trigger Visual Render (Export active format) |
| `Escape` | Close any open modal or drawer |
| `?` | Toggle Keyboard Shortcuts Modal |
| `Ctrl + Z` / `Cmd + Z` | Undo in Monaco Editor |

---

## 🎨 Theme & UI Design Philosophy

- **Cosmic Palette**: Uses `#07090e` for the body and `#0a0d16` for elevation panels, paired with electric indigo (`#6366f1`) and violet (`#a855f7`) gradients.
- **Glassmorphism**: Soft frosted cards with subtle `1px solid rgba(255, 255, 255, 0.08)` borders and high-blur drop shadows.
- **No Light Mode Clutter**: Built strictly for developers who work in dark mode.

---

## 📱 Progressive Web App (PWA)

- **Installable**: One-click install as a standalone desktop application via Chrome/Edge or mobile via Safari/Chrome.
- **Service Worker**: Cache static assets and shell components for quick startup.
- **Client Fallback**: If offline or server is unavailable, the studio can switch to browser-based rendering mode.

---

## 🚀 Running the Project

```bash
# Start development server with Bun
bun dev

# Or build and launch production server
bun run build
bun start
```

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

Repository: [github.com/sametcn99/html-to-visual](https://github.com/sametcn99/html-to-visual)
