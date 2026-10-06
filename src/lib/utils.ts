import { ViewportDimensionPreset, ViewportPreset } from '@/types/renderer';

export const VIEWPORT_PRESETS: ViewportDimensionPreset[] = [
  {
    id: 'twitter-banner',
    label: 'Twitter / OpenGraph Card',
    width: 1200,
    height: 630,
    description: '1200 x 630 (1.91:1) — Ideal for social link previews & banners',
  },
  {
    id: 'instagram-post',
    label: 'Instagram / Square Post',
    width: 1080,
    height: 1080,
    description: '1080 x 1080 (1:1) — High-res social feed visual',
  },
  {
    id: 'instagram-story',
    label: 'Story / Reel / TikTok (9:16)',
    width: 1080,
    height: 1920,
    description: '1080 x 1920 (9:16) — Vertical motion video or story snapshot',
  },
  {
    id: 'youtube-thumbnail',
    label: 'YouTube Thumbnail (16:9)',
    width: 1280,
    height: 720,
    description: '1280 x 720 (16:9) — High-impact video cover',
  },
  {
    id: 'dribbble-shot',
    label: 'Dribbble / UI Shot (4:3)',
    width: 1600,
    height: 1200,
    description: '1600 x 1200 (4:3) — Showcase portfolios and clean UI shots',
  },
  {
    id: 'full-hd',
    label: 'Full HD 1080p',
    width: 1920,
    height: 1080,
    description: '1920 x 1080 (16:9) — Crisp desktop presentation & motion loop',
  },
  {
    id: 'mobile-portrait',
    label: 'Mobile Viewport (iPhone)',
    width: 390,
    height: 844,
    description: '390 x 844 — Realistic mobile screen capture',
  },
];

export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export function triggerDownload(url: string, filename: string): void {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return successful;
    }
  } catch (err) {
    console.error('Failed to copy to clipboard', err);
    return false;
  }
}

export function getMimeType(format: string): string {
  switch (format.toLowerCase()) {
    case 'png':
      return 'image/png';
    case 'jpeg':
    case 'jpg':
      return 'image/jpeg';
    case 'webp':
      return 'image/webp';
    case 'gif':
      return 'image/gif';
    case 'mp4':
      return 'video/mp4';
    default:
      return 'application/octet-stream';
  }
}
