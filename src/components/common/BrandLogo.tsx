'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function BrandLogo() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, textDecoration: 'none', userSelect: 'none' }}>
      <Box
        sx={{
          position: 'relative',
          width: 38,
          height: 38,
          borderRadius: 2.2,
          background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 20px rgba(99, 102, 241, 0.45), inset 0 1px 1px rgba(255, 255, 255, 0.4)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          '&:hover': {
            transform: 'scale(1.06) rotate(-3deg)',
          },
        }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
          <circle cx="12" cy="12" r="3" fill="#ffffff" />
        </svg>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography
          variant="h6"
          component="span"
          sx={{
            fontWeight: 800,
            fontSize: '1.15rem',
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            background: 'linear-gradient(90deg, #ffffff 0%, #cbd5e1 50%, #818cf8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          html-to-visual
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: '#64748b',
            fontSize: '0.68rem',
            fontWeight: 600,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          Studio & API Engine
        </Typography>
      </Box>
    </Box>
  );
}
