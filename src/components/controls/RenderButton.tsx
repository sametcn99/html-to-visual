'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import Alert from '@mui/material/Alert';

import { useStudioStore } from '@/store/useStudioStore';

interface RenderButtonProps {
  onRender: () => void;
}

export default function RenderButton({ onRender }: RenderButtonProps) {
  const { isRendering, renderProgress, renderStage, format, error, setError } = useStudioStore();

  const isMotion = format === 'mp4' || format === 'gif';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mt: 'auto', pt: 2 }}>
      {error && (
        <Alert
          severity="error"
          onClose={() => setError(null)}
          sx={{
            fontSize: '0.75rem',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#fca5a5',
          }}
        >
          {error}
        </Alert>
      )}

      {isRendering && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.8, px: 0.5 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '0.72rem' }}>
              {renderStage || 'Processing...'}
            </Typography>
            <Typography variant="caption" sx={{ color: '#818cf8', fontWeight: 700, fontFamily: 'monospace' }}>
              {renderProgress}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={renderProgress}
            sx={{
              height: 6,
              borderRadius: 3,
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              '& .MuiLinearProgress-bar': {
                background: isMotion
                  ? 'linear-gradient(90deg, #6366f1, #a855f7, #ec4899)'
                  : 'linear-gradient(90deg, #6366f1, #3b82f6)',
              },
            }}
          />
        </Box>
      )}

      <Button
        variant="contained"
        size="large"
        disabled={isRendering}
        onClick={onRender}
        startIcon={
          isRendering ? (
            <CircularProgress size={18} sx={{ color: '#fff' }} />
          ) : (
            <AutoFixHighIcon sx={{ color: '#fff' }} />
          )
        }
        sx={{
          py: 1.4,
          fontSize: '0.95rem',
          fontWeight: 800,
          letterSpacing: '0.04em',
          background: isMotion
            ? 'linear-gradient(135deg, #a855f7 0%, #6366f1 50%, #4f46e5 100%)'
            : 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
          boxShadow: isMotion
            ? '0 0 25px rgba(168, 85, 247, 0.4), 0 4px 15px rgba(0, 0, 0, 0.4)'
            : '0 0 25px rgba(99, 102, 241, 0.4), 0 4px 15px rgba(0, 0, 0, 0.4)',
          '&:hover': {
            background: isMotion
              ? 'linear-gradient(135deg, #c084fc 0%, #818cf8 50%, #6366f1 100%)'
              : 'linear-gradient(135deg, #818cf8 0%, #6366f1 100%)',
            boxShadow: '0 0 35px rgba(99, 102, 241, 0.6), 0 6px 20px rgba(0, 0, 0, 0.5)',
          },
          '&.Mui-disabled': {
            background: '#1e293b',
            color: '#64748b',
          },
        }}
      >
        {isRendering ? (
          'RENDERING...'
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', gap: 1 }}>
            <span>EXPORT {format.toUpperCase()}</span>
            <Box
              component="kbd"
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.16)',
                borderRadius: 1,
                px: 0.8,
                py: 0.2,
                fontSize: '0.65rem',
                fontFamily: 'monospace',
                color: '#fff',
                display: { xs: 'none', sm: 'inline-block' },
              }}
            >
              Ctrl+↵
            </Box>
          </Box>
        )}
      </Button>
    </Box>
  );
}
