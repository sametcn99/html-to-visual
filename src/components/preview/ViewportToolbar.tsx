'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import GridOnIcon from '@mui/icons-material/GridOn';
import GridOffIcon from '@mui/icons-material/GridOff';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';

import ActionTooltip from '@/components/common/ActionTooltip';
import { VIEWPORT_PRESETS } from '@/lib/utils';
import { useStudioStore } from '@/store/useStudioStore';
import { ViewportPreset } from '@/types/renderer';

interface ViewportToolbarProps {
  onRefreshIframe: () => void;
}

export default function ViewportToolbar({ onRefreshIframe }: ViewportToolbarProps) {
  const {
    preset,
    width,
    height,
    zoom,
    showGrid,
    setDimensions,
    setZoom,
    resetPan,
    toggleGrid,
  } = useStudioStore();

  const handlePresetSelect = (selectedId: string) => {
    if (selectedId === 'custom') {
      setDimensions(width, height, 'custom');
      return;
    }
    const found = VIEWPORT_PRESETS.find((p) => p.id === selectedId);
    if (found) {
      setDimensions(found.width, found.height, found.id as ViewportPreset);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 2,
        py: 0.8,
        backgroundColor: '#0a0d16',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        zIndex: 5,
        gap: 1.5,
        overflowX: 'auto',
      }}
    >
      {/* Preset Selector */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <AspectRatioIcon sx={{ fontSize: 18, color: '#818cf8' }} />
        <Select
          size="small"
          value={preset}
          onChange={(e) => handlePresetSelect(e.target.value)}
          sx={{
            minWidth: 200,
            height: 32,
            fontSize: '0.8rem',
            '& .MuiSelect-select': { py: 0.6 },
          }}
        >
          {VIEWPORT_PRESETS.map((p) => (
            <MenuItem key={p.id} value={p.id} sx={{ fontSize: '0.8rem' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', gap: 2 }}>
                <span>{p.label}</span>
                <span style={{ color: '#64748b', fontFamily: 'monospace' }}>
                  {p.width}×{p.height}
                </span>
              </Box>
            </MenuItem>
          ))}
          <MenuItem value="custom" sx={{ fontSize: '0.8rem' }}>
            Custom Dimensions
          </MenuItem>
        </Select>
      </Box>

      {/* Center resolution summary */}
      <Box sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'center', gap: 1 }}>
        <Typography variant="caption" sx={{ color: '#94a3b8', fontFamily: 'monospace' }}>
          {width} × {height} px ({Math.round(zoom * 100)}% zoom)
        </Typography>
      </Box>

      {/* Zoom and Stage Controls */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <ButtonGroup size="small" variant="outlined" sx={{ height: 28 }}>
          <ActionTooltip title="Zoom Out">
            <Button onClick={() => setZoom((z) => Math.max(0.2, z - 0.1))} sx={{ px: 0.8 }}>
              <ZoomOutIcon fontSize="small" />
            </Button>
          </ActionTooltip>
          <Button
            onClick={() => setZoom(1)}
            sx={{ px: 1, fontSize: '0.75rem', fontFamily: 'monospace', minWidth: 48 }}
          >
            {Math.round(zoom * 100)}%
          </Button>
          <ActionTooltip title="Zoom In">
            <Button onClick={() => setZoom((z) => Math.min(2.0, z + 0.1))} sx={{ px: 0.8 }}>
              <ZoomInIcon fontSize="small" />
            </Button>
          </ActionTooltip>
        </ButtonGroup>

        <ActionTooltip title="Center Canvas View">
          <IconButton
            size="small"
            onClick={resetPan}
            sx={{
              color: '#94a3b8',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              p: 0.6,
              '&:hover': { color: '#818cf8', borderColor: 'rgba(99, 102, 241, 0.4)' },
            }}
          >
            <CenterFocusStrongIcon fontSize="small" />
          </IconButton>
        </ActionTooltip>

        <ActionTooltip title={showGrid ? 'Hide Transparent Grid' : 'Show Transparent Grid'}>
          <IconButton
            size="small"
            onClick={toggleGrid}
            sx={{
              color: showGrid ? '#818cf8' : '#64748b',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              p: 0.6,
            }}
          >
            {showGrid ? <GridOnIcon fontSize="small" /> : <GridOffIcon fontSize="small" />}
          </IconButton>
        </ActionTooltip>

        <ActionTooltip title="Re-render Preview Sandbox">
          <IconButton
            size="small"
            onClick={onRefreshIframe}
            sx={{
              color: '#94a3b8',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              p: 0.6,
              '&:hover': { color: '#f1f5f9' },
            }}
          >
            <RestartAltIcon fontSize="small" />
          </IconButton>
        </ActionTooltip>
      </Box>
    </Box>
  );
}
