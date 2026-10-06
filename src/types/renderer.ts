export type VisualFormat = 'png' | 'jpeg' | 'webp' | 'gif' | 'mp4';

export type RenderEngine = 'server' | 'client';

export type ViewportPreset =
  | 'custom'
  | 'twitter-banner'
  | 'instagram-post'
  | 'instagram-story'
  | 'youtube-thumbnail'
  | 'dribbble-shot'
  | 'full-hd'
  | 'mobile-portrait';

export interface ViewportDimensionPreset {
  id: ViewportPreset;
  label: string;
  width: number;
  height: number;
  description: string;
}

export interface RenderRequestOptions {
  html: string;
  css?: string;
  js?: string;
  format: VisualFormat;
  width: number;
  height: number;
  deviceScaleFactor?: number;
  transparentBackground?: boolean;
  selector?: string;
  
  // Animation / Video options
  duration?: number; // duration in seconds (0.5s - 15s)
  fps?: number;      // frames per second (10 - 60)
  delay?: number;    // wait time before recording in ms
  quality?: number;  // 1-100 (for jpeg/webp/mp4)
}

export interface RenderResult {
  id: string;
  url: string;
  format: VisualFormat;
  width: number;
  height: number;
  duration?: number;
  fps?: number;
  fileSizeBytes: number;
  createdAt: number;
  name: string;
  blob?: Blob;
}

export interface RenderProgressState {
  isRendering: boolean;
  progress: number; // 0 - 100
  stage: string;   // e.g. "Launching headless browser...", "Capturing frames...", "Encoding video..."
  error: string | null;
}

export interface HtmlTemplate {
  id: string;
  title: string;
  description: string;
  category: 'animated' | 'marketing' | 'ui' | 'particles' | 'social';
  formatRecommendation: VisualFormat;
  defaultDuration?: number;
  defaultFps?: number;
  html: string;
  width: number;
  height: number;
}
