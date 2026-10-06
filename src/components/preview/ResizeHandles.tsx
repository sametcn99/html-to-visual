'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ResizeHandleType } from '@/hooks/useCanvasResize';
import { useStudioStore } from '@/store/useStudioStore';

interface ResizeHandlesProps {
  isResizing: boolean;
  activeHandle: ResizeHandleType | null;
  onStartResize: (e: React.PointerEvent, handle: ResizeHandleType) => void;
}

export default function ResizeHandles({
  isResizing,
  activeHandle,
  onStartResize,
}: ResizeHandlesProps) {
  const { width, height } = useStudioStore();

  const cornerDotStyle = (handle: ResizeHandleType, cursor: string) => ({
    position: 'absolute' as const,
    width: 14,
    height: 14,
    backgroundColor: '#ffffff',
    border: '2.5px solid #6366f1',
    borderRadius: '4px',
    boxShadow:
      activeHandle === handle
        ? '0 0 16px #6366f1, 0 0 24px rgba(99, 102, 241, 0.8)'
        : '0 0 8px rgba(0, 0, 0, 0.6), 0 0 8px rgba(99, 102, 241, 0.6)',
    cursor,
    zIndex: 25,
    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
    '&:hover': {
      transform: 'scale(1.3)',
      boxShadow: '0 0 16px #818cf8, 0 0 24px rgba(99, 102, 241, 0.9)',
      borderColor: '#a855f7',
    },
  });

  const edgeHandleStyle = (cursor: string) => ({
    position: 'absolute' as const,
    zIndex: 20,
    cursor,
    transition: 'background-color 0.2s ease',
    '&:hover': {
      backgroundColor: 'rgba(99, 102, 241, 0.25)',
    },
  });

  return (
    <>
      {/* Resizing active overlay to block iframe pointer theft */}
      {isResizing && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            zIndex: 30,
            cursor:
              activeHandle === 'right' || activeHandle === 'left'
                ? 'ew-resize'
                : activeHandle === 'top' || activeHandle === 'bottom'
                ? 'ns-resize'
                : activeHandle === 'bottom-right' || activeHandle === 'top-left'
                ? 'nwse-resize'
                : 'nesw-resize',
          }}
        />
      )}

      {/* Floating Dimension Badge */}
      <Box
        sx={{
          position: 'absolute',
          bottom: -40,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 35,
          backgroundColor: isResizing ? 'rgba(99, 102, 241, 0.95)' : 'rgba(15, 23, 42, 0.9)',
          backdropFilter: 'blur(12px)',
          border: isResizing ? '1px solid #818cf8' : '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: 999,
          px: 1.8,
          py: 0.4,
          boxShadow: isResizing
            ? '0 0 20px rgba(99, 102, 241, 0.6), 0 8px 16px rgba(0, 0, 0, 0.4)'
            : '0 8px 16px rgba(0, 0, 0, 0.4)',
          pointerEvents: 'none',
          userSelect: 'none',
          transition: 'all 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <Typography
          variant="caption"
          sx={{
            fontWeight: 800,
            fontFamily: 'monospace',
            color: '#ffffff',
            fontSize: '0.78rem',
            letterSpacing: '0.04em',
          }}
        >
          {width} × {height} px
        </Typography>
        <Typography
          variant="caption"
          sx={{
            fontWeight: 600,
            color: isResizing ? '#e0e7ff' : '#94a3b8',
            fontSize: '0.7rem',
          }}
        >
          ({(width / height).toFixed(2)}:1)
        </Typography>
      </Box>

      {/* Edge Handles */}
      {/* Right Edge */}
      <Box
        onPointerDown={(e) => onStartResize(e, 'right')}
        sx={{
          ...edgeHandleStyle('ew-resize'),
          top: 0,
          right: -7,
          width: 14,
          height: '100%',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            right: 4,
            transform: 'translateY(-50%)',
            width: 4,
            height: 36,
            borderRadius: 2,
            backgroundColor: 'rgba(99, 102, 241, 0.7)',
            boxShadow: '0 0 8px rgba(99, 102, 241, 0.5)',
          }}
        />
      </Box>

      {/* Left Edge */}
      <Box
        onPointerDown={(e) => onStartResize(e, 'left')}
        sx={{
          ...edgeHandleStyle('ew-resize'),
          top: 0,
          left: -7,
          width: 14,
          height: '100%',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: 4,
            transform: 'translateY(-50%)',
            width: 4,
            height: 36,
            borderRadius: 2,
            backgroundColor: 'rgba(99, 102, 241, 0.7)',
            boxShadow: '0 0 8px rgba(99, 102, 241, 0.5)',
          }}
        />
      </Box>

      {/* Bottom Edge */}
      <Box
        onPointerDown={(e) => onStartResize(e, 'bottom')}
        sx={{
          ...edgeHandleStyle('ns-resize'),
          bottom: -7,
          left: 0,
          width: '100%',
          height: 14,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            left: '50%',
            bottom: 4,
            transform: 'translateX(-50%)',
            height: 4,
            width: 36,
            borderRadius: 2,
            backgroundColor: 'rgba(99, 102, 241, 0.7)',
            boxShadow: '0 0 8px rgba(99, 102, 241, 0.5)',
          }}
        />
      </Box>

      {/* Top Edge */}
      <Box
        onPointerDown={(e) => onStartResize(e, 'top')}
        sx={{
          ...edgeHandleStyle('ns-resize'),
          top: -7,
          left: 0,
          width: '100%',
          height: 14,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            left: '50%',
            top: 4,
            transform: 'translateX(-50%)',
            height: 4,
            width: 36,
            borderRadius: 2,
            backgroundColor: 'rgba(99, 102, 241, 0.7)',
            boxShadow: '0 0 8px rgba(99, 102, 241, 0.5)',
          }}
        />
      </Box>

      {/* Corner Grips */}
      {/* Bottom-Right */}
      <Box
        onPointerDown={(e) => onStartResize(e, 'bottom-right')}
        sx={{
          ...cornerDotStyle('bottom-right', 'nwse-resize'),
          bottom: -7,
          right: -7,
        }}
      />

      {/* Bottom-Left */}
      <Box
        onPointerDown={(e) => onStartResize(e, 'bottom-left')}
        sx={{
          ...cornerDotStyle('bottom-left', 'nesw-resize'),
          bottom: -7,
          left: -7,
        }}
      />

      {/* Top-Right */}
      <Box
        onPointerDown={(e) => onStartResize(e, 'top-right')}
        sx={{
          ...cornerDotStyle('top-right', 'nesw-resize'),
          top: -7,
          right: -7,
        }}
      />

      {/* Top-Left */}
      <Box
        onPointerDown={(e) => onStartResize(e, 'top-left')}
        sx={{
          ...cornerDotStyle('top-left', 'nwse-resize'),
          top: -7,
          left: -7,
        }}
      />
    </>
  );
}
