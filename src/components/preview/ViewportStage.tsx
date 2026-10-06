'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ViewportToolbar from './ViewportToolbar';
import ResizeHandles from './ResizeHandles';
import { useStudioStore } from '@/store/useStudioStore';
import { useDebounce } from '@/hooks/useDebounce';
import { useCanvasResize } from '@/hooks/useCanvasResize';
import { useCanvasPan } from '@/hooks/useCanvasPan';

interface ViewportStageProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export default function ViewportStage({ containerRef }: ViewportStageProps) {
  const {
    html,
    css,
    js,
    width,
    height,
    zoom,
    setZoom,
    pan,
    setPan,
    showGrid,
    transparentBackground,
  } = useStudioStore();

  const [refreshKey, setRefreshKey] = useState(0);
  const [isCtrlOrMetaActive, setIsCtrlOrMetaActive] = useState(false);
  const workspaceRef = useRef<HTMLDivElement | null>(null);

  const { isResizing, activeHandle, startResize } = useCanvasResize();
  const { isPanning, isSpacePressed, handlePointerDown } = useCanvasPan(workspaceRef);

  const debouncedHtml = useDebounce(html, 300);
  const debouncedCss = useDebounce(css, 300);
  const debouncedJs = useDebounce(js, 300);

  const combinedSrcDoc = useMemo(() => {
    let result = debouncedHtml;
    if (debouncedCss) {
      result += `\n<style>\n${debouncedCss}\n</style>`;
    }
    if (debouncedJs) {
      result += `\n<script>\n${debouncedJs}\n</script>`;
    }
    return result;
  }, [debouncedHtml, debouncedCss, debouncedJs]);

  const handleRefresh = () => {
    setRefreshKey((k) => k + 1);
  };

  // 1. Detect Ctrl / Cmd key down to disable iframe pointer events for wheel passthrough
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Control' || e.key === 'Meta') {
        setIsCtrlOrMetaActive(true);
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Control' || e.key === 'Meta') {
        setIsCtrlOrMetaActive(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // 2. Intercept Wheel events on workspace:
  // - Ctrl + Wheel: Zoom canvas
  // - Wheel / Touchpad scroll without Ctrl: Pan canvas smoothly (No scrollbars needed!)
  useEffect(() => {
    const workspace = workspaceRef.current;
    if (!workspace) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (e.ctrlKey || e.metaKey) {
        // Zoom
        const step = e.deltaY < 0 ? 0.08 : -0.08;
        setZoom((prev) => {
          const next = Math.min(2.5, Math.max(0.15, prev + step));
          return Math.round(next * 100) / 100;
        });
      } else {
        // Pan
        setPan((prev) => ({
          x: Math.round(prev.x - e.deltaX),
          y: Math.round(prev.y - e.deltaY),
        }));
      }
    };

    workspace.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      workspace.removeEventListener('wheel', handleWheel);
    };
  }, [setZoom, setPan]);

  const isInteracting = isResizing || isCtrlOrMetaActive || isPanning || isSpacePressed;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        backgroundColor: '#05070d',
        position: 'relative',
        overflow: 'hidden',
        userSelect: isInteracting ? 'none' : 'auto',
      }}
    >
      <ViewportToolbar onRefreshIframe={handleRefresh} />

      {/* Infinite Canvas Workspace Stage (Strictly NO Scrollbars) */}
      <Box
        ref={workspaceRef}
        onPointerDown={handlePointerDown}
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden', // Completely eliminates scrollbars
          position: 'relative',
          backgroundColor: '#05070d',
          cursor: isPanning ? 'grabbing' : isSpacePressed ? 'grab' : 'default',
          ...(showGrid && {
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
            backgroundPosition: `${pan.x}px ${pan.y}px`,
          }),
        }}
      >
        {/* Frame container with interactive pan translate and zoom */}
        <Box
          ref={containerRef}
          sx={{
            width: width,
            height: height,
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: 'center center',
            transition: isResizing || isPanning ? 'none' : 'transform 0.1s ease-out',
            boxShadow: isResizing
              ? '0 25px 70px -10px rgba(0, 0, 0, 0.95), 0 0 50px rgba(99, 102, 241, 0.45)'
              : '0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 40px rgba(99, 102, 241, 0.15)',
            border: isResizing ? '1.5px solid #818cf8' : '1px solid rgba(255, 255, 255, 0.16)',
            borderRadius: 2,
            position: 'relative',
            flexShrink: 0,
            overflow: 'visible',
            touchAction: 'none',
          }}
        >
          {/* Inner sandbox clipping container */}
          <Box
            sx={{
              width: '100%',
              height: '100%',
              borderRadius: 2,
              overflow: 'hidden',
              position: 'relative',
              ...(transparentBackground
                ? {
                    backgroundImage:
                      'linear-gradient(45deg, #182032 25%, transparent 25%), linear-gradient(-45deg, #182032 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #182032 75%), linear-gradient(-45deg, transparent 75%, #182032 75%)',
                    backgroundSize: '20px 20px',
                    backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
                    backgroundColor: '#0b0f19',
                  }
                : {
                    backgroundColor: '#000',
                  }),
            }}
          >
            {/* Inner sandbox iframe */}
            <iframe
              key={refreshKey}
              srcDoc={combinedSrcDoc}
              title="Visual Sandbox Preview"
              sandbox="allow-scripts allow-same-origin"
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                backgroundColor: transparentBackground ? 'transparent' : undefined,
                display: 'block',
                pointerEvents: isInteracting ? 'none' : 'auto',
              }}
            />
          </Box>

          {/* Drag Resize Handles & Floating Dimensions Indicator */}
          <ResizeHandles
            isResizing={isResizing}
            activeHandle={activeHandle}
            onStartResize={startResize}
          />
        </Box>

        {/* Floating Navigation Shortcut Hints */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 14,
            right: 16,
            display: { xs: 'none', sm: 'inline-flex' },
            alignItems: 'center',
            gap: 1.4,
            px: 1.4,
            py: 0.5,
            borderRadius: '9999px',
            backgroundColor: 'rgba(10, 15, 26, 0.82)',
            border: '1px solid rgba(255, 255, 255, 0.09)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
            pointerEvents: 'none',
            userSelect: 'none',
            zIndex: 10,
          }}
        >
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.8, flexShrink: 0 }}>
            <Box
              component="kbd"
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.07)',
                border: '1px solid rgba(255, 255, 255, 0.13)',
                borderRadius: '5px',
                px: 0.8,
                py: 0.25,
                fontSize: '0.68rem',
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                fontWeight: 600,
                color: '#cbd5e1',
                lineHeight: 1,
                letterSpacing: '0.02em',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
                whiteSpace: 'nowrap',
              }}
            >
              Space + Drag
            </Box>
            <Typography
              variant="caption"
              sx={{
                color: '#94a3b8',
                fontSize: '0.72rem',
                fontWeight: 500,
                letterSpacing: '0.01em',
                whiteSpace: 'nowrap',
              }}
            >
              Pan
            </Typography>
          </Box>

          <Box sx={{ width: '1px', height: 12, bgcolor: 'rgba(255, 255, 255, 0.12)', flexShrink: 0 }} />

          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.8, flexShrink: 0 }}>
            <Box
              component="kbd"
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.07)',
                border: '1px solid rgba(255, 255, 255, 0.13)',
                borderRadius: '5px',
                px: 0.8,
                py: 0.25,
                fontSize: '0.68rem',
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                fontWeight: 600,
                color: '#cbd5e1',
                lineHeight: 1,
                letterSpacing: '0.02em',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
                whiteSpace: 'nowrap',
              }}
            >
              Ctrl + Scroll
            </Box>
            <Typography
              variant="caption"
              sx={{
                color: '#94a3b8',
                fontSize: '0.72rem',
                fontWeight: 500,
                letterSpacing: '0.01em',
                whiteSpace: 'nowrap',
              }}
            >
              Zoom
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
