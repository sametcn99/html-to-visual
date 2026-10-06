'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';

import { useStudioStore } from '@/store/useStudioStore';

export default function AnimationControls() {
  const { duration, fps, delay, setAnimationParams, format } = useStudioStore();

  const isMotion = format === 'mp4' || format === 'gif';
  if (!isMotion) return null;

  const totalFrames = Math.round(duration * fps);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        p: 2,
        borderRadius: 2,
        backgroundColor: 'rgba(168, 85, 247, 0.05)',
        border: '1px solid rgba(168, 85, 247, 0.2)',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <MovieFilterIcon sx={{ fontSize: 18, color: '#c084fc' }} />
          <Typography
            variant="caption"
            sx={{ color: '#c084fc', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}
          >
            Motion & Timeline
          </Typography>
        </Box>
        <Typography variant="caption" sx={{ color: '#94a3b8', fontFamily: 'monospace' }}>
          {totalFrames} frames total
        </Typography>
      </Box>

      {/* Duration Slider */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="caption" sx={{ color: '#cbd5e1' }}>
            Duration (seconds)
          </Typography>
          <Typography variant="caption" sx={{ color: '#c084fc', fontWeight: 700 }}>
            {duration}s
          </Typography>
        </Box>
        <Slider
          size="small"
          value={duration}
          min={0.5}
          max={10}
          step={0.5}
          onChange={(_, val) => setAnimationParams({ duration: val as number })}
          sx={{
            color: '#a855f7',
            '& .MuiSlider-track': {
              background: 'linear-gradient(90deg, #6366f1, #a855f7)',
            },
          }}
        />
      </Box>

      {/* Frame Rate (FPS) Selector */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.8 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="caption" sx={{ color: '#cbd5e1' }}>
            Frame Rate (FPS)
          </Typography>
          <Typography variant="caption" sx={{ color: '#c084fc', fontWeight: 700 }}>
            {fps} FPS
          </Typography>
        </Box>
        <ToggleButtonGroup
          size="small"
          value={fps}
          exclusive
          onChange={(_, val) => val && setAnimationParams({ fps: val })}
          fullWidth
          sx={{
            backgroundColor: '#0a0d16',
            '& .MuiToggleButton-root': {
              py: 0.5,
              fontSize: '0.75rem',
              color: '#94a3b8',
              borderColor: 'rgba(255, 255, 255, 0.08)',
              '&.Mui-selected': {
                backgroundColor: 'rgba(168, 85, 247, 0.25)',
                color: '#c084fc',
                fontWeight: 700,
              },
            },
          }}
        >
          <ToggleButton value={15}>15</ToggleButton>
          <ToggleButton value={24}>24 Cine</ToggleButton>
          <ToggleButton value={30}>30 Std</ToggleButton>
          <ToggleButton value={60}>60 Fluid</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Start Delay Slider */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="caption" sx={{ color: '#cbd5e1' }}>
            Pre-recording Delay
          </Typography>
          <Typography variant="caption" sx={{ color: '#94a3b8', fontFamily: 'monospace' }}>
            {delay}ms
          </Typography>
        </Box>
        <Slider
          size="small"
          value={delay}
          min={0}
          max={2000}
          step={50}
          onChange={(_, val) => setAnimationParams({ delay: val as number })}
          sx={{ color: '#818cf8' }}
        />
      </Box>
    </Box>
  );
}
