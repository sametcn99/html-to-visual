'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useStudioStore } from '@/store/useStudioStore';

export type ResizeHandleType =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

export function useCanvasResize() {
  const { width, height, zoom, setDimensions } = useStudioStore();
  const [isResizing, setIsResizing] = useState(false);
  const [activeHandle, setActiveHandle] = useState<ResizeHandleType | null>(null);

  const dragStartRef = useRef<{
    startX: number;
    startY: number;
    startWidth: number;
    startHeight: number;
    handle: ResizeHandleType;
    aspectRatio: number;
  } | null>(null);

  const startResize = useCallback(
    (e: React.PointerEvent, handle: ResizeHandleType) => {
      e.preventDefault();
      e.stopPropagation();

      dragStartRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        startWidth: width,
        startHeight: height,
        handle,
        aspectRatio: width / height,
      };

      setIsResizing(true);
      setActiveHandle(handle);
    },
    [width, height]
  );

  useEffect(() => {
    if (!isResizing) return;

    const handlePointerMove = (e: PointerEvent) => {
      if (!dragStartRef.current) return;

      const { startX, startY, startWidth, startHeight, handle, aspectRatio } =
        dragStartRef.current;

      // Adjust delta by current zoom factor so movement matches cursor 1:1
      const deltaX = (e.clientX - startX) / zoom;
      const deltaY = (e.clientY - startY) / zoom;

      let newWidth = startWidth;
      let newHeight = startHeight;

      const isShiftHeld = e.shiftKey;

      switch (handle) {
        case 'right':
          newWidth = startWidth + deltaX;
          break;
        case 'left':
          newWidth = startWidth - deltaX;
          break;
        case 'bottom':
          newHeight = startHeight + deltaY;
          break;
        case 'top':
          newHeight = startHeight - deltaY;
          break;
        case 'bottom-right':
          newWidth = startWidth + deltaX;
          newHeight = isShiftHeld ? newWidth / aspectRatio : startHeight + deltaY;
          break;
        case 'bottom-left':
          newWidth = startWidth - deltaX;
          newHeight = isShiftHeld ? newWidth / aspectRatio : startHeight + deltaY;
          break;
        case 'top-right':
          newWidth = startWidth + deltaX;
          newHeight = isShiftHeld ? newWidth / aspectRatio : startHeight - deltaY;
          break;
        case 'top-left':
          newWidth = startWidth - deltaX;
          newHeight = isShiftHeld ? newWidth / aspectRatio : startHeight - deltaY;
          break;
      }

      // Clamp dimensions to safe bounds [100px - 3840px]
      const clampedWidth = Math.min(3840, Math.max(100, Math.round(newWidth)));
      const clampedHeight = Math.min(2160, Math.max(100, Math.round(newHeight)));

      setDimensions(clampedWidth, clampedHeight, 'custom');
    };

    const handlePointerUp = () => {
      setIsResizing(false);
      setActiveHandle(null);
      dragStartRef.current = null;
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isResizing, zoom, setDimensions]);

  return {
    isResizing,
    activeHandle,
    startResize,
  };
}
