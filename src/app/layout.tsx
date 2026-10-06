import type { Metadata } from 'next';
import ThemeRegistry from '@/theme/ThemeRegistry';

export const metadata: Metadata = {
  metadataBase: new URL('https://html-to-visual.vercel.app'),
  title: {
    default: 'html-to-visual — High-Performance HTML to Visual & Motion Video Converter',
    template: '%s | html-to-visual',
  },
  description:
    'Turn HTML, CSS, and animations into pristine PNG, JPG, WEBP, 60fps MP4 videos, and high-fidelity animated GIFs. Featuring Headless Chromium, FFmpeg palettegen, PWA installability, and developer REST API.',
  keywords: [
    'html to image',
    'html to video',
    'html to mp4',
    'html to gif',
    'css animation to video',
    'headless chromium screenshot',
    'ffmpeg render api',
    'social media card generator',
    'html canvas renderer',
    'developer api',
  ],
  authors: [{ name: 'Samet', url: 'https://github.com/sametcn99/html-to-visual' }],
  creator: 'sametcn99',
  publisher: 'html-to-visual',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://html-to-visual.vercel.app',
    siteName: 'html-to-visual',
    title: 'html-to-visual — High-Performance HTML to Image & Motion Video Converter',
    description:
      'Programmatic and visual studio for converting HTML, CSS, and animations to PNG, JPG, WEBP, 60fps MP4, and animated GIFs.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'html-to-visual studio preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'html-to-visual — Convert HTML to MP4, GIF & Images',
    description:
      'Developer studio & REST API for converting animated HTML/CSS into 60fps MP4 and crisp GIFs.',
    creator: '@sametcn99',
    images: ['/og-image.png'],
  },
  manifest: '/manifest.webmanifest',
  icons: {
    icon: '/favicon.ico',
    apple: '/icon-192.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'html-to-visual',
    url: 'https://html-to-visual.vercel.app',
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'All',
    description:
      'Convert HTML and CSS animations to PNG, JPG, WEBP, MP4, and animated GIFs via visual studio or REST API.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    author: {
      '@type': 'Person',
      name: 'Samet',
      url: 'https://github.com/sametcn99',
    },
  };

  return (
    <html lang="en" style={{ colorScheme: 'dark' }}>
      <head>
        <meta name="theme-color" content="#6366f1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body style={{ margin: 0, padding: 0, overflow: 'hidden', backgroundColor: '#07090e' }}>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
