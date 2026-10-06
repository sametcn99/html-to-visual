'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import ImageIcon from '@mui/icons-material/Image';
import MovieIcon from '@mui/icons-material/Movie';
import AnimationIcon from '@mui/icons-material/Animation';
import TuneIcon from '@mui/icons-material/Tune';

import DimensionControls from './DimensionControls';
import AnimationControls from './AnimationControls';
import RenderButton from './RenderButton';
import { useStudioStore } from '@/store/useStudioStore';
import { VisualFormat } from '@/types/renderer';

interface ExportPanelProps {
  onRender: () => void;
}

export default function ExportPanel({ onRender }: ExportPanelProps) {
  const { format, setFormat, selector, setSelector, engine, setEngine } = useStudioStore();

  const handleFormatChange = (_: unknown, newFormat: VisualFormat | null) => {
    if (newFormat) {
      setFormat(newFormat);
    }
  };

  return (
    <Box
      sx={{
        width: { xs: '100%', md: 360 },
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#0a0d16',
        borderLeft: '1px solid rgba(255, 255, 255, 0.08)',
        p: 2.5,
        gap: 2.5,
        overflowY: 'auto',
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TuneIcon sx={{ fontSize: 18, color: '#818cf8' }} />
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#f8fafc' }}>
            Export Configuration
          </Typography>
        </Box>
        <Chip
          size="small"
          label={format === 'mp4' || format === 'gif' ? 'Motion Engine' : 'Raster Engine'}
          sx={{
            fontSize: '0.68rem',
            fontWeight: 700,
            backgroundColor:
              format === 'mp4' || format === 'gif'
                ? 'rgba(168, 85, 247, 0.15)'
                : 'rgba(99, 102, 241, 0.15)',
            color: format === 'mp4' || format === 'gif' ? '#c084fc' : '#818cf8',
          }}
        />
      </Box>

      {/* Target Format Selector */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography
          variant="caption"
          sx={{ color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}
        >
          Target Visual Format
        </Typography>

        <ToggleButtonGroup
          value={format}
          exclusive
          onChange={handleFormatChange}
          fullWidth
          sx={{
            backgroundColor: '#07090e',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            p: 0.5,
            borderRadius: 2,
            gap: 0.5,
            '& .MuiToggleButton-root': {
              border: 'none',
              borderRadius: 1.5,
              py: 0.7,
              px: 1,
              color: '#94a3b8',
              fontWeight: 700,
              fontSize: '0.75rem',
              '&.Mui-selected': {
                backgroundColor:
                  format === 'mp4' || format === 'gif'
                    ? 'rgba(168, 85, 247, 0.25)'
                    : 'rgba(99, 102, 241, 0.25)',
                color: format === 'mp4' || format === 'gif' ? '#c084fc' : '#818cf8',
              },
            },
          }}
        >
          <ToggleButton value="png">PNG</ToggleButton>
          <ToggleButton value="jpeg">JPG</ToggleButton>
          <ToggleButton value="webp">WEBP</ToggleButton>
          <ToggleButton value="gif">GIF</ToggleButton>
          <ToggleButton value="mp4">MP4</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.06)' }} />

      {/* Dimensions Controls */}
      <DimensionControls />

      {/* Animation Controls (MP4 & GIF) */}
      <AnimationControls />

      {/* CSS Selector Targeting */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.8 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography
            variant="caption"
            sx={{ color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}
          >
            Target CSS Selector
          </Typography>
          <Typography variant="caption" sx={{ color: '#64748b', fontSize: '0.68rem' }}>
            Optional
          </Typography>
        </Box>
        <TextField
          size="small"
          placeholder=".card or #export-root"
          value={selector}
          onChange={(e) => setSelector(e.target.value)}
          inputProps={{ style: { fontFamily: 'monospace', fontSize: '0.8rem' } }}
        />
      </Box>

      {/* Render Action Trigger */}
      <RenderButton onRender={onRender} />
    </Box>
  );
}
