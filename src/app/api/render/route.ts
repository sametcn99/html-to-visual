import { NextRequest, NextResponse } from 'next/server';
import { getBrowser } from '@/lib/server/browserPool';
import { encodeFramesToMedia } from '@/lib/server/videoEncoder';
import { RenderRequestOptions, VisualFormat } from '@/types/renderer';
import { getMimeType } from '@/lib/utils';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60; // 60s max execution

export async function POST(req: NextRequest) {
  try {
    let body: RenderRequestOptions;

    const contentType = req.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      body = await req.json();
    } else {
      const rawText = await req.text();
      try {
        body = JSON.parse(rawText);
      } catch {
        body = { html: rawText, format: 'png', width: 1200, height: 630 };
      }
    }

    const {
      html,
      css,
      js,
      format = 'png',
      width = 1200,
      height = 630,
      deviceScaleFactor = format === 'mp4' || format === 'gif' ? 1 : 2,
      transparentBackground = false,
      selector,
      duration = 3,
      fps = 30,
      delay = 200,
      quality = 90,
    } = body;

    if (!html || typeof html !== 'string') {
      return NextResponse.json(
        { error: 'Bad Request: "html" string parameter is required.' },
        { status: 400 }
      );
    }

    // Validate format
    const validFormats: VisualFormat[] = ['png', 'jpeg', 'webp', 'gif', 'mp4'];
    const targetFormat = (format.toLowerCase() as VisualFormat) || 'png';
    if (!validFormats.includes(targetFormat)) {
      return NextResponse.json(
        { error: `Invalid format "${format}". Supported formats: ${validFormats.join(', ')}` },
        { status: 400 }
      );
    }

    // Clamp dimensions to safe bounds
    const safeWidth = Math.min(Math.max(100, Math.round(width)), 3840);
    const safeHeight = Math.min(Math.max(100, Math.round(height)), 2160);
    const safeFps = Math.min(Math.max(10, Math.round(fps)), 60);
    const safeDuration = Math.min(Math.max(0.5, Number(duration)), 15);

    // Launch page from shared browser
    const browser = await getBrowser();
    const page = await browser.newPage();

    try {
      await page.setViewport({
        width: safeWidth,
        height: safeHeight,
        deviceScaleFactor: Math.min(Math.max(1, deviceScaleFactor), 3),
      });

      // Prepare complete HTML with custom injected styles and scripts
      let fullHtml = html;
      if (css) {
        fullHtml += `<style>\n${css}\n</style>`;
      }
      if (js) {
        fullHtml += `<script>\n${js}\n</script>`;
      }

      await page.setContent(fullHtml, {
        waitUntil: 'domcontentloaded',
        timeout: 15000,
      });

      // Allow fonts or initial animations to start
      if (delay > 0) {
        await new Promise((resolve) => setTimeout(resolve, Math.min(delay, 5000)));
      }

      let outputBuffer: Buffer;

      if (targetFormat === 'mp4' || targetFormat === 'gif') {
        // --- MOTION / VIDEO / GIF CAPTURE ---
        const totalFrames = Math.round(safeDuration * safeFps);
        const frameIntervalMs = 1000 / safeFps;
        const frames: Buffer[] = [];

        // Capture frames in rapid sync loop
        for (let i = 0; i < totalFrames; i++) {
          const startTime = Date.now();
          const frameBuffer = await page.screenshot({
            type: 'png',
            omitBackground: transparentBackground && targetFormat === 'gif',
          });
          frames.push(Buffer.from(frameBuffer));

          const elapsed = Date.now() - startTime;
          const waitTime = Math.max(0, frameIntervalMs - elapsed);
          if (waitTime > 0 && i < totalFrames - 1) {
            await new Promise((resolve) => setTimeout(resolve, waitTime));
          }
        }

        // Encode frames using native FFmpeg pipeline
        outputBuffer = await encodeFramesToMedia({
          frames,
          fps: safeFps,
          format: targetFormat,
          width: safeWidth,
          height: safeHeight,
        });
      } else {
        // --- STATIC IMAGE CAPTURE ---
        const screenshotOptions: Record<string, unknown> = {
          type: targetFormat === 'jpeg' ? 'jpeg' : targetFormat === 'webp' ? 'webp' : 'png',
          omitBackground: transparentBackground && targetFormat === 'png',
        };

        if (targetFormat === 'jpeg' || targetFormat === 'webp') {
          screenshotOptions.quality = Math.min(Math.max(1, quality), 100);
        }

        if (selector) {
          const element = await page.$(selector);
          if (element) {
            outputBuffer = Buffer.from(await element.screenshot(screenshotOptions));
          } else {
            outputBuffer = Buffer.from(await page.screenshot(screenshotOptions));
          }
        } else {
          outputBuffer = Buffer.from(await page.screenshot(screenshotOptions));
        }
      }

      const mimeType = getMimeType(targetFormat);

      // Check whether caller asked for JSON or raw stream
      const acceptHeader = req.headers.get('accept') || '';
      const wantsJson =
        req.nextUrl.searchParams.get('json') === 'true' ||
        acceptHeader.includes('application/json');

      if (wantsJson) {
        const base64 = outputBuffer.toString('base64');
        const dataUrl = `data:${mimeType};base64,${base64}`;

        return NextResponse.json({
          success: true,
          format: targetFormat,
          width: safeWidth,
          height: safeHeight,
          duration: targetFormat === 'mp4' || targetFormat === 'gif' ? safeDuration : undefined,
          fps: targetFormat === 'mp4' || targetFormat === 'gif' ? safeFps : undefined,
          sizeBytes: outputBuffer.length,
          dataUrl,
        });
      }

      // Return direct binary file stream
      return new NextResponse(new Uint8Array(outputBuffer), {
        status: 200,
        headers: {
          'Content-Type': mimeType,
          'Content-Length': String(outputBuffer.length),
          'Content-Disposition': `inline; filename="rendered.${targetFormat}"`,
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      });
    } finally {
      await page.close().catch(() => {});
    }
  } catch (error: unknown) {
    console.error('Render API error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error during rendering';
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
