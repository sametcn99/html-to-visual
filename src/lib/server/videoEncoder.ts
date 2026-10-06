import { promises as fs } from 'fs';
import path from 'path';
import os from 'os';
import { spawn } from 'child_process';

interface EncodeVideoOptions {
  frames: Buffer[];
  fps: number;
  format: 'mp4' | 'gif';
  width: number;
  height: number;
}

export async function encodeFramesToMedia({
  frames,
  fps,
  format,
  width,
  height,
}: EncodeVideoOptions): Promise<Buffer> {
  if (frames.length === 0) {
    throw new Error('No frames provided for encoding');
  }

  // Create temporary scratch directory
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'h2v-render-'));

  try {
    // Write all frames to disk in parallel batches
    const writePromises = frames.map((buffer, index) => {
      const frameName = `frame_${String(index).padStart(5, '0')}.png`;
      const framePath = path.join(tempDir, frameName);
      return fs.writeFile(framePath, buffer);
    });

    await Promise.all(writePromises);

    const inputPattern = path.join(tempDir, 'frame_%05d.png');
    const outputPath = path.join(tempDir, `output.${format}`);

    // Build FFmpeg arguments
    const ffmpegArgs: string[] = ['-framerate', String(fps), '-i', inputPattern];

    if (format === 'mp4') {
      // Ensure width and height are divisible by 2 for yuv420p libx264
      const safeWidth = width % 2 === 0 ? width : width + 1;
      const safeHeight = height % 2 === 0 ? height : height + 1;

      ffmpegArgs.push(
        '-vf',
        `scale=${safeWidth}:${safeHeight}:flags=lanczos`,
        '-c:v',
        'libx264',
        '-pix_fmt',
        'yuv420p',
        '-preset',
        'fast',
        '-crf',
        '20',
        '-movflags',
        '+faststart',
        '-y',
        outputPath
      );
    } else if (format === 'gif') {
      // Professional two-pass palette generation for ultra-crisp GIF
      ffmpegArgs.push(
        '-filter_complex',
        `[0:v] fps=${fps},scale=${width}:${height}:flags=lanczos,split [a][b];[a] palettegen=reserve_transparent=on:stats_mode=diff [p];[b][p] paletteuse=dither=bayer:bayer_scale=5:diff_mode=rectangle`,
        '-y',
        outputPath
      );
    }

    // Execute FFmpeg
    await runFFmpeg(ffmpegArgs);

    // Read resulting buffer
    const outputBuffer = await fs.readFile(outputPath);
    return outputBuffer;
  } finally {
    // Clean up temporary workspace safely
    try {
      await fs.rm(tempDir, { recursive: true, force: true });
    } catch (cleanupErr) {
      console.warn('Failed to clean up temp render directory:', cleanupErr);
    }
  }
}

function runFFmpeg(args: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    // Spawn system ffmpeg
    const proc = spawn('ffmpeg', args);
    let stderrData = '';

    proc.stderr.on('data', (chunk) => {
      stderrData += chunk.toString();
    });

    proc.on('error', (err) => {
      reject(new Error(`Failed to spawn FFmpeg: ${err.message}. Ensure FFmpeg is installed.`));
    });

    proc.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(
          new Error(
            `FFmpeg exited with code ${code}. Details:\n${stderrData.slice(-500)}`
          )
        );
      }
    });
  });
}
