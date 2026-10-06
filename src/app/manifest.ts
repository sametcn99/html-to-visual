import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'html-to-visual — Studio & API',
    short_name: 'html-to-visual',
    description: 'Convert HTML and CSS animations to PNG, JPG, WEBP, MP4, and animated GIFs.',
    start_url: '/',
    display: 'standalone',
    background_color: '#07090e',
    theme_color: '#6366f1',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}
