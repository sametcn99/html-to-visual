import { toPng, toJpeg, toBlob } from 'html-to-image';
import { RenderRequestOptions, RenderResult } from '@/types/renderer';
import { getMimeType } from '@/lib/utils';

export async function renderOnClient(
  element: HTMLElement,
  options: RenderRequestOptions
): Promise<RenderResult> {
  const { format, width, height, quality = 90 } = options;

  if (format === 'mp4' || format === 'gif') {
    // For video/gif on client-side, we can use MediaRecorder stream recording
    return recordElementAsVideo(element, options);
  }

  let blob: Blob | null = null;
  const pixelRatio = options.deviceScaleFactor || 2;

  const htmlToImageOptions = {
    quality: quality / 100,
    pixelRatio,
    width,
    height,
    style: {
      transform: 'none',
    },
  };

  if (format === 'jpeg') {
    const dataUrl = await toJpeg(element, htmlToImageOptions);
    const res = await fetch(dataUrl);
    blob = await res.blob();
  } else {
    // png or webp
    const dataUrl = await toPng(element, htmlToImageOptions);
    const res = await fetch(dataUrl);
    blob = await res.blob();
  }

  if (!blob) {
    throw new Error('Failed to generate image blob on client.');
  }

  const url = URL.createObjectURL(blob);
  const id = `render_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

  return {
    id,
    url,
    format,
    width,
    height,
    fileSizeBytes: blob.size,
    createdAt: Date.now(),
    name: `visual_${Date.now()}.${format}`,
    blob,
  };
}

async function recordElementAsVideo(
  element: HTMLElement,
  options: RenderRequestOptions
): Promise<RenderResult> {
  const { format, width, height, duration = 3, fps = 30 } = options;
  const mimeType = 'video/webm';

  // Create canvas for frame projection
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Could not initialize 2D context on recording canvas');
  }

  const stream = canvas.captureStream(fps);
  const recordedChunks: Blob[] = [];

  const mediaRecorder = new MediaRecorder(stream, {
    mimeType: MediaRecorder.isTypeSupported(mimeType) ? mimeType : '',
  });

  mediaRecorder.ondataavailable = (event) => {
    if (event.data.size > 0) {
      recordedChunks.push(event.data);
    }
  };

  const recordingPromise = new Promise<Blob>((resolve, reject) => {
    mediaRecorder.onstop = () => {
      const finalBlob = new Blob(recordedChunks, { type: 'video/webm' });
      resolve(finalBlob);
    };
    mediaRecorder.onerror = (e) => reject(e);
  });

  mediaRecorder.start();

  // Capture frames continuously for the duration
  const frameInterval = 1000 / fps;
  const totalFrames = Math.round(duration * fps);
  let frameCount = 0;

  const intervalId = setInterval(async () => {
    try {
      const frameBlob = await toBlob(element, { pixelRatio: 1, width, height });
      if (frameBlob) {
        const img = new Image();
        img.src = URL.createObjectURL(frameBlob);
        await img.decode();
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        URL.revokeObjectURL(img.src);
      }
    } catch {
      // Ignore intermediate dropped frame
    }

    frameCount++;
    if (frameCount >= totalFrames) {
      clearInterval(intervalId);
      if (mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
      }
    }
  }, frameInterval);

  const videoBlob = await recordingPromise;
  const url = URL.createObjectURL(videoBlob);
  const id = `render_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

  return {
    id,
    url,
    format: format === 'gif' ? 'gif' : 'mp4',
    width,
    height,
    duration,
    fps,
    fileSizeBytes: videoBlob.size,
    createdAt: Date.now(),
    name: `visual_${Date.now()}.${format === 'gif' ? 'webm' : 'mp4'}`,
    blob: videoBlob,
  };
}
