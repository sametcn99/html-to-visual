import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  let ffmpegInstalled = false;
  let ffmpegVersion = '';

  try {
    const { stdout } = await execAsync('ffmpeg -version');
    ffmpegInstalled = true;
    ffmpegVersion = stdout.split('\n')[0] || '';
  } catch {
    ffmpegInstalled = false;
  }

  return NextResponse.json({
    status: 'healthy',
    engine: 'Chromium Headless & Native FFmpeg',
    capabilities: {
      staticFormats: ['png', 'jpeg', 'webp'],
      motionFormats: ['mp4', 'gif'],
      maxResolution: '3840x2160 (4K UHD)',
      maxFps: 60,
      maxDurationSeconds: 15,
      ffmpeg: {
        available: ffmpegInstalled,
        version: ffmpegVersion,
      },
    },
    version: '1.0.0',
    repository: 'https://github.com/sametcn99/html-to-visual',
    timestamp: new Date().toISOString(),
  });
}
