'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GitHubIcon from '@mui/icons-material/GitHub';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useStudioStore } from '@/store/useStudioStore';
import { usePWA } from '@/hooks/usePWA';

export default function AppFooter() {
  const { width, height, format, fps, duration, isRendering, renderStage, renderProgress } =
    useStudioStore();
  const { isOnline, isInstalled } = usePWA();

  const isMotion = format === 'mp4' || format === 'gif';

  return (
    <Box
      component="footer"
      sx={{
        height: 38,
        minHeight: 38,
        backgroundColor: '#070a12',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 2.5,
        fontSize: '0.75rem',
        color: '#64748b',
        userSelect: 'none',
        zIndex: 1000,
      }}
    >
      {/* Left: Engine & Render State */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
          <FiberManualRecordIcon
            sx={{
              fontSize: 10,
              color: isRendering ? '#6366f1' : isOnline ? '#10b981' : '#f59e0b',
              animation: isRendering ? 'pulse 1s infinite' : 'none',
              '@keyframes pulse': {
                '0%, 100%': { opacity: 1, transform: 'scale(1)' },
                '50%': { opacity: 0.4, transform: 'scale(0.8)' },
              },
            }}
          />
          <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600 }}>
            {isRendering ? `${renderStage} (${renderProgress}%)` : isOnline ? 'Engine Ready' : 'Offline Mode'}
          </Typography>
        </Box>

        {isInstalled && (
          <Typography variant="caption" sx={{ color: '#38bdf8', display: { xs: 'none', sm: 'inline' } }}>
            • PWA Standalone
          </Typography>
        )}
      </Box>

      {/* Center: Dimensions & Motion Details */}
      <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2.5 }}>
        <Typography variant="caption" sx={{ color: '#cbd5e1', fontFamily: 'monospace' }}>
          Canvas: <strong style={{ color: '#818cf8' }}>{width} × {height}px</strong> ({(width / height).toFixed(2)}:1)
        </Typography>

        {isMotion && (
          <Typography variant="caption" sx={{ color: '#cbd5e1', fontFamily: 'monospace' }}>
            Motion: <strong style={{ color: '#c084fc' }}>{duration}s</strong> @ <strong style={{ color: '#c084fc' }}>{fps} FPS</strong>
          </Typography>
        )}
      </Box>

      {/* Right: GitHub repository link */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Typography variant="caption" sx={{ color: '#64748b' }}>
          Open Source
        </Typography>
        <Link
          href="https://github.com/sametcn99/html-to-visual"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.6,
            color: '#94a3b8',
            textDecoration: 'none',
            fontSize: '0.75rem',
            '&:hover': { color: '#f1f5f9' },
          }}
        >
          <GitHubIcon sx={{ fontSize: 14 }} />
          <span>github.com/sametcn99/html-to-visual</span>
        </Link>
      </Box>
    </Box>
  );
}
