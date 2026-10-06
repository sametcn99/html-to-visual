'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useStudioStore } from '@/store/useStudioStore';

export function useCanvasPan(workspaceRef: React.RefObject<HTMLDivElement | null>) {
  const { pan, setPan, resetPan } = useStudioStore();
  const [isPanning, setIsPanning] = useState(false);
  const [isSpacePressed, setIsSpacePressed] = useState(false);

  const dragStartRef = useRef<{
    startX: number;
    startY: number;
    startPanX: number;
    startPanY: number;
  } | null>(null);

  // 1. Listen for Spacebar toggle (for Photoshop/Figma-style Space+Drag)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = (document.activeElement?.tagName || '').toLowerCase();
      const isInput = activeTag === 'input' || activeTag === 'textarea';

      if (e.code === 'Space' && !e.repeat && !isInput) {
        setIsSpacePressed(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        setIsSpacePressed(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // 2. Start pan on pointer down
  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      // Allow panning if:
      // - Middle mouse button (button === 1)
      // - Spacebar is held
      // - Or clicked directly on the workspace backdrop (not on resizing handles or frame)
      const isMiddleClick = e.button === 1;
      const isTargetBackdrop = e.target === workspaceRef.current;

      if (isMiddleClick || isSpacePressed || isTargetBackdrop) {
        e.preventDefault();
        dragStartRef.current = {
          startX: e.clientX,
          startY: e.clientY,
          startPanX: pan.x,
          startPanY: pan.y,
        };
        setIsPanning(true);
      }
    },
    [isSpacePressed, pan, workspaceRef]
  );

  // 3. Pointer move & up listeners
  useEffect(() => {
    if (!isPanning) return;

    const handlePointerMove = (e: PointerEvent) => {
      if (!dragStartRef.current) return;

      const deltaX = e.clientX - dragStartRef.current.startX;
      const deltaY = e.clientY - dragStartRef.current.startY;

      setPan({
        x: Math.round(dragStartRef.current.startPanX + deltaX),
        y: Math.round(dragStartRef.current.startPanY + deltaY),
      });
    };

    const handlePointerUp = () => {
      setIsPanning(false);
      dragStartRef.current = null;
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isPanning, setPan]);

  return {
    isPanning,
    isSpacePressed,
    handlePointerDown,
    resetPan,
  };
}
