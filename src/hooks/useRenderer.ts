'use client';

import { useCallback } from 'react';
import confetti from 'canvas-confetti';
import { useStudioStore } from '@/store/useStudioStore';
import { useHistoryStore } from '@/store/useHistoryStore';
import { renderOnClient } from '@/lib/client/clientRenderer';
import { RenderResult } from '@/types/renderer';

export function useRenderer() {
  const {
    html,
    css,
    js,
    format,
    width,
    height,
    deviceScaleFactor,
    transparentBackground,
    duration,
    fps,
    delay,
    quality,
    selector,
    engine,
    setRendering,
    setRenderProgress,
    setError,
    setLastResult,
    setActiveModal,
  } = useStudioStore();

  const { addResult } = useHistoryStore();

  const render = useCallback(
    async (previewElement?: HTMLElement | null) => {
      try {
        setRendering(true, 'Initializing render pipeline...', 10);

        if (engine === 'client' && previewElement && (format === 'png' || format === 'jpeg')) {
          // Client-side instant snapshot
          setRenderProgress(40, 'Capturing DOM state with Canvas...');
          const result = await renderOnClient(previewElement, {
            html,
            format,
            width,
            height,
            quality,
            deviceScaleFactor,
          });

          setRenderProgress(100, 'Render complete!');
          addResult(result);
          setLastResult(result);
          setRendering(false);
          setActiveModal('result');

          confetti({
            particleCount: 60,
            spread: 70,
            origin: { y: 0.6 },
          });

          return result;
        }

        // Server API render pipeline
        setRenderProgress(25, 'Connecting to Headless Chromium engine...');

        // Fake progressive indicator for realistic UX feedback
        const progressTimer = setInterval(() => {
          setRenderProgress((prev) => {
            if (prev < 80) return prev + 5;
            return prev;
          });
        }, 400);

        if (format === 'mp4' || format === 'gif') {
          setRenderProgress(45, `Sampling ${Math.round(duration * fps)} frames at ${fps} FPS...`);
        } else {
          setRenderProgress(50, 'Rasterizing viewport to high-res buffer...');
        }

        const response = await fetch('/api/render?json=true', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            html,
            css: css || undefined,
            js: js || undefined,
            format,
            width,
            height,
            deviceScaleFactor,
            transparentBackground,
            duration,
            fps,
            delay,
            quality,
            selector: selector || undefined,
          }),
        });

        clearInterval(progressTimer);

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData.error || `Server responded with HTTP ${response.status}`);
        }

        setRenderProgress(90, 'Transcoding buffer via FFmpeg...');
        const data = await response.json();

        // Convert base64 dataUrl back to Blob for local download and preview
        const fetchBlob = await fetch(data.dataUrl);
        const blob = await fetchBlob.blob();

        const result: RenderResult = {
          id: `render_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
          url: data.dataUrl,
          format: data.format,
          width: data.width,
          height: data.height,
          duration: data.duration,
          fps: data.fps,
          fileSizeBytes: data.sizeBytes,
          createdAt: Date.now(),
          name: `export_${data.width}x${data.height}_${Date.now()}.${data.format}`,
          blob,
        };

        setRenderProgress(100, 'Success!');
        addResult(result);
        setLastResult(result);
        setRendering(false);
        setActiveModal('result');

        // Confetti burst
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#6366f1', '#a855f7', '#06b6d4', '#10b981'],
        });

        return result;
      } catch (err: unknown) {
        console.error('Render execution failure:', err);
        const message = err instanceof Error ? err.message : 'Render failed';
        setError(message);
        return null;
      }
    },
    [
      html,
      css,
      js,
      format,
      width,
      height,
      deviceScaleFactor,
      transparentBackground,
      duration,
      fps,
      delay,
      quality,
      selector,
      engine,
      setRendering,
      setRenderProgress,
      setError,
      setLastResult,
      setActiveModal,
      addResult,
    ]
  );

  return { render };
}
