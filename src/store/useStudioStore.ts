import { create } from 'zustand';
import { VisualFormat, RenderEngine, ViewportPreset, RenderResult } from '@/types/renderer';

interface StudioState {
  // Code & content
  html: string;
  css: string;
  js: string;
  
  // Visual configuration
  format: VisualFormat;
  width: number;
  height: number;
  deviceScaleFactor: number;
  transparentBackground: boolean;
  selector: string;
  
  // Animation & video configuration
  duration: number; // seconds
  fps: number;
  delay: number; // ms
  quality: number;
  
  // Studio Viewport state
  zoom: number;
  pan: { x: number; y: number };
  preset: ViewportPreset;
  showGrid: boolean;
  engine: RenderEngine;
  
  // Execution & rendering status
  isRendering: boolean;
  renderProgress: number; // 0 - 100
  renderStage: string;
  error: string | null;
  lastResult: RenderResult | null;
  
  // Modals & UI panels
  activeModal: 'docs' | 'shortcuts' | 'result' | 'settings' | 'templates' | null;
  isHistoryOpen: boolean;

  // Actions
  setHtml: (code: string) => void;
  setCss: (code: string) => void;
  setJs: (code: string) => void;
  setFormat: (format: VisualFormat) => void;
  setDimensions: (width: number, height: number, preset?: ViewportPreset) => void;
  setScale: (scale: number) => void;
  setTransparentBackground: (transparent: boolean) => void;
  setSelector: (selector: string) => void;
  setAnimationParams: (params: { duration?: number; fps?: number; delay?: number; quality?: number }) => void;
  setZoom: (zoom: number | ((prev: number) => number)) => void;
  setPan: (pan: { x: number; y: number } | ((prev: { x: number; y: number }) => { x: number; y: number })) => void;
  resetPan: () => void;
  setPreset: (preset: ViewportPreset) => void;
  toggleGrid: () => void;
  setEngine: (engine: RenderEngine) => void;
  setRendering: (isRendering: boolean, stage?: string, progress?: number) => void;
  setRenderProgress: (progress: number | ((prev: number) => number), stage?: string) => void;
  setError: (error: string | null) => void;
  setLastResult: (result: RenderResult | null) => void;
  setActiveModal: (modal: StudioState['activeModal']) => void;
  setHistoryOpen: (open: boolean) => void;
  loadTemplate: (template: { html: string; width?: number; height?: number; format?: VisualFormat; duration?: number; fps?: number }) => void;
  resetStudio: () => void;
}

const DEFAULT_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    html, body {
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    body {
      display: flex;
      align-items: stretch;
      justify-content: stretch;
      background: radial-gradient(circle at 50% 50%, #1e1b4b 0%, #030712 100%);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      padding: 28px;
    }
    .card {
      width: 100%;
      height: 100%;
      padding: 36px 40px;
      background: rgba(17, 24, 39, 0.82);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 20px;
      backdrop-filter: blur(20px);
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 40px rgba(99, 102, 241, 0.2);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      animation: float 4s ease-in-out infinite;
    }
    .header-content {
      display: flex;
      flex-direction: column;
    }
    .badge {
      align-self: flex-start;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 14px;
      background: rgba(99, 102, 241, 0.15);
      border: 1px solid rgba(99, 102, 241, 0.4);
      color: #818cf8;
      border-radius: 9999px;
      font-size: 13px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 14px;
    }
    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #34d399;
      box-shadow: 0 0 10px #34d399;
      animation: pulse 2s infinite;
    }
    h1 {
      font-size: 34px;
      font-weight: 800;
      color: #ffffff;
      line-height: 1.2;
      margin-bottom: 12px;
      letter-spacing: -0.02em;
      background: linear-gradient(135deg, #ffffff 0%, #c7d2fe 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    p {
      color: #94a3b8;
      font-size: 15px;
      line-height: 1.6;
      margin-bottom: 20px;
      max-width: 900px;
    }
    .stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding-top: 18px;
    }
    .stat-item h3 {
      font-size: 24px;
      font-weight: 700;
      color: #f8fafc;
      margin-bottom: 2px;
    }
    .stat-item span {
      font-size: 13px;
      color: #64748b;
      font-weight: 500;
    }
    @keyframes float {
      0%, 100% {
        transform: translateY(0px) rotate(0deg);
      }
      50% {
        transform: translateY(-8px) rotate(0.3deg);
      }
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(0.85); }
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="header-content">
      <div class="badge">
        <span class="dot"></span>
        Real-Time Visual Rendering
      </div>
      <h1>Turn HTML & CSS into Visual Magic</h1>
      <p>Capture pixel-perfect static images or render silky smooth 60fps MP4 videos and high-fidelity animated GIFs with zero frame loss.</p>
    </div>
    <div class="stats">
      <div class="stat-item">
        <h3>60 FPS</h3>
        <span>Fluid Motion</span>
      </div>
      <div class="stat-item">
        <h3>4K UHD</h3>
        <span>Crisp Export</span>
      </div>
      <div class="stat-item">
        <h3>REST API</h3>
        <span>Developer Ready</span>
      </div>
    </div>
  </div>
</body>
</html>`;

export const useStudioStore = create<StudioState>((set) => ({
  html: DEFAULT_HTML,
  css: '',
  js: '',
  format: 'png',
  width: 1200,
  height: 630,
  deviceScaleFactor: 2,
  transparentBackground: false,
  selector: '',
  
  duration: 3,
  fps: 30,
  delay: 200,
  quality: 90,
  
  zoom: 0.55,
  pan: { x: 0, y: 0 },
  preset: 'twitter-banner',
  showGrid: true,
  engine: 'server',
  
  isRendering: false,
  renderProgress: 0,
  renderStage: '',
  error: null,
  lastResult: null,
  
  activeModal: null,
  isHistoryOpen: false,

  setHtml: (html) => set({ html }),
  setCss: (css) => set({ css }),
  setJs: (js) => set({ js }),
  setFormat: (format) => set({ format }),
  setDimensions: (width, height, preset = 'custom') => set({ width, height, preset }),
  setScale: (deviceScaleFactor) => set({ deviceScaleFactor }),
  setTransparentBackground: (transparentBackground) => set({ transparentBackground }),
  setSelector: (selector) => set({ selector }),
  setAnimationParams: (params) => set((state) => ({ ...state, ...params })),
  setZoom: (zoom) =>
    set((state) => ({
      zoom: typeof zoom === 'function' ? Math.min(2.5, Math.max(0.2, zoom(state.zoom))) : Math.min(2.5, Math.max(0.2, zoom)),
    })),
  setPan: (pan) =>
    set((state) => ({
      pan: typeof pan === 'function' ? pan(state.pan) : pan,
    })),
  resetPan: () => set({ pan: { x: 0, y: 0 } }),
  setPreset: (preset) => set({ preset }),
  toggleGrid: () => set((state) => ({ showGrid: !state.showGrid })),
  setEngine: (engine) => set({ engine }),
  setRendering: (isRendering, stage = '', progress = 0) =>
    set({ isRendering, renderStage: stage, renderProgress: progress, error: null }),
  setRenderProgress: (progress, stage) =>
    set((state) => ({
      renderProgress: typeof progress === 'function' ? progress(state.renderProgress) : progress,
      renderStage: stage ?? state.renderStage,
    })),
  setError: (error) => set({ error, isRendering: false }),
  setLastResult: (lastResult) => set({ lastResult }),
  setActiveModal: (activeModal) => set({ activeModal }),
  setHistoryOpen: (isHistoryOpen) => set({ isHistoryOpen }),
  loadTemplate: (template) =>
    set((state) => ({
      html: template.html,
      width: template.width ?? state.width,
      height: template.height ?? state.height,
      format: template.format ?? state.format,
      duration: template.duration ?? state.duration,
      fps: template.fps ?? state.fps,
    })),
  resetStudio: () =>
    set({
      html: DEFAULT_HTML,
      css: '',
      js: '',
      format: 'png',
      width: 1200,
      height: 630,
      zoom: 0.55,
      pan: { x: 0, y: 0 },
      preset: 'twitter-banner',
      error: null,
    }),
}));
