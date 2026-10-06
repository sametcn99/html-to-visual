import puppeteer from 'puppeteer';
import { promises as fs } from 'fs';
import fsSync from 'fs';
import path from 'path';

async function generateAssets() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: fsSync.existsSync(chromePath) ? chromePath : undefined,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  // 1. Generate 512x512 App Icon
  await page.setViewport({ width: 512, height: 512, deviceScaleFactor: 1 });
  await page.setContent(`<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:transparent;display:flex;align-items:center;justify-content:center;height:100vh;overflow:hidden;">
  <div style="width:460px;height:460px;border-radius:110px;background:linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%);display:flex;align-items:center;justify-content:center;box-shadow:0 20px 60px rgba(99,102,241,0.5);">
    <svg width="260" height="260" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="16 18 22 12 16 6"></polyline>
      <polyline points="8 6 2 12 8 18"></polyline>
      <circle cx="12" cy="12" r="3" fill="#ffffff"></circle>
    </svg>
  </div>
</body>
</html>`);

  const publicDir = path.resolve('public');
  await fs.mkdir(publicDir, { recursive: true });

  await page.screenshot({
    path: path.join(publicDir, 'icon-512.png'),
    omitBackground: true,
  });

  // 2. Generate 192x192 App Icon
  await page.setViewport({ width: 192, height: 192, deviceScaleFactor: 1 });
  await page.screenshot({
    path: path.join(publicDir, 'icon-192.png'),
    omitBackground: true,
  });

  // 3. Generate OG Preview Image (1200x630)
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
  await page.setContent(`<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#07090e;font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;overflow:hidden;">
  <div style="width:1040px;padding:60px;background:#0f1424;border:1px solid rgba(255,255,255,0.15);border-radius:32px;box-shadow:0 30px 80px rgba(0,0,0,0.8),0 0 60px rgba(99,102,241,0.25);">
    <div style="display:inline-block;padding:8px 18px;border-radius:999px;background:rgba(99,102,241,0.2);color:#818cf8;border:1px solid rgba(99,102,241,0.5);font-size:14px;font-weight:700;margin-bottom:24px;">
      AUTONOMOUS VISUAL RENDERING STUDIO & REST API
    </div>
    <h1 style="font-size:62px;color:#fff;margin:0 0 16px;letter-spacing:-0.03em;font-weight:800;line-height:1.1;">html-to-visual</h1>
    <p style="font-size:24px;color:#94a3b8;margin:0 0 36px;line-height:1.5;">Transform HTML, CSS & Keyframes into 60fps MP4, Ultra-Crisp GIFs, and Retina PNGs.</p>
    <div style="display:flex;gap:16px;">
      <span style="padding:10px 20px;border-radius:10px;background:#1e293b;color:#f8fafc;font-weight:600;font-size:16px;">⚡ MP4 Video</span>
      <span style="padding:10px 20px;border-radius:10px;background:#1e293b;color:#f8fafc;font-weight:600;font-size:16px;">✨ 60 FPS GIF</span>
      <span style="padding:10px 20px;border-radius:10px;background:#1e293b;color:#f8fafc;font-weight:600;font-size:16px;">🎯 Retina PNG</span>
      <span style="padding:10px 20px;border-radius:10px;background:#1e293b;color:#f8fafc;font-weight:600;font-size:16px;">🚀 REST API</span>
    </div>
  </div>
</body>
</html>`);

  await page.screenshot({
    path: path.join(publicDir, 'og-image.png'),
  });

  await browser.close();
  console.log('Successfully generated public branding assets!');
}

generateAssets().catch(console.error);
