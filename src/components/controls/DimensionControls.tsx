'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import Tooltip from '@mui/material/Tooltip';

import { useStudioStore } from '@/store/useStudioStore';

export default function DimensionControls() {
  const {
    width,
    height,
    deviceScaleFactor,
    transparentBackground,
    setDimensions,
    setScale,
    setTransparentBackground,
    format,
  } = useStudioStore();

  const handleWidthChange = (val: number) => {
    setDimensions(Math.max(50, Math.min(3840, val)), height, 'custom');
  };

  const handleHeightChange = (val: number) => {
    setDimensions(width, Math.max(50, Math.min(2160, val)), 'custom');
  };

  const isMotion = format === 'mp4' || format === 'gif';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography
        variant="caption"
        sx={{ color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}
      >
        Dimensions & Canvas
      </Typography>

      {/* Width and Height Inputs */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
        <TextField
          size="small"
          label="Width (px)"
          type="number"
          value={width}
          onChange={(e) => handleWidthChange(parseInt(e.target.value) || 100)}
          inputProps={{ min: 100, max: 3840, step: 10 }}
        />
        <TextField
          size="small"
          label="Height (px)"
          type="number"
          value={height}
          onChange={(e) => handleHeightChange(parseInt(e.target.value) || 100)}
          inputProps={{ min: 100, max: 2160, step: 10 }}
        />
      </Box>

      {/* Interactive Drag Hint */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          px: 1.2,
          py: 0.8,
          borderRadius: 1.5,
          backgroundColor: 'rgba(99, 102, 241, 0.08)',
          border: '1px dashed rgba(99, 102, 241, 0.3)',
        }}
      >
        <Box
          sx={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            backgroundColor: '#818cf8',
            boxShadow: '0 0 6px #818cf8',
          }}
        />
        <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '0.72rem' }}>
          Drag canvas borders or corner dots to interactively resize dimensions.
        </Typography>
      </Box>

      {/* Scale multiplier (Retina) */}
      {!isMotion && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.8 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="caption" sx={{ color: '#cbd5e1' }}>
              Resolution Scale
            </Typography>
            <Typography variant="caption" sx={{ color: '#818cf8', fontWeight: 700 }}>
              {deviceScaleFactor}x ({width * deviceScaleFactor} × {height * deviceScaleFactor}px)
            </Typography>
          </Box>
          <ToggleButtonGroup
            size="small"
            value={deviceScaleFactor}
            exclusive
            onChange={(_, val) => val && setScale(val)}
            fullWidth
            sx={{
              backgroundColor: '#0a0d16',
              '& .MuiToggleButton-root': {
                py: 0.5,
                fontSize: '0.75rem',
                color: '#94a3b8',
                borderColor: 'rgba(255, 255, 255, 0.08)',
                '&.Mui-selected': {
                  backgroundColor: 'rgba(99, 102, 241, 0.2)',
                  color: '#818cf8',
                  fontWeight: 700,
                },
              },
            }}
          >
            <ToggleButton value={1}>1x Standard</ToggleButton>
            <ToggleButton value={2}>2x Retina</ToggleButton>
            <ToggleButton value={3}>3x Ultra</ToggleButton>
          </ToggleButtonGroup>
        </Box>
      )}

      {/* Transparency switch */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 1,
          py: 0.5,
          borderRadius: 1.5,
          backgroundColor: '#0a0e19',
          border: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        <Typography variant="caption" sx={{ color: '#cbd5e1' }}>
          Transparent Background
        </Typography>
        <Switch
          size="small"
          checked={transparentBackground}
          onChange={(e) => setTransparentBackground(e.target.checked)}
          disabled={format === 'jpeg' || format === 'mp4'}
          sx={{
            '& .MuiSwitch-switchBase.Mui-checked': {
              color: '#6366f1',
            },
          }}
        />
      </Box>
    </Box>
  );
}
