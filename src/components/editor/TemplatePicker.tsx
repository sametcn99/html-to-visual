'use client';

import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import MovieIcon from '@mui/icons-material/Movie';
import ImageIcon from '@mui/icons-material/Image';
import AnimationIcon from '@mui/icons-material/Animation';

import GlassCard from '@/components/common/GlassCard';
import { TEMPLATES } from '@/lib/templates';
import { useStudioStore } from '@/store/useStudioStore';
import { HtmlTemplate } from '@/types/renderer';

export default function TemplatePicker() {
  const { activeModal, setActiveModal, loadTemplate } = useStudioStore();
  const open = activeModal === 'templates';

  const handleSelect = (tmpl: HtmlTemplate) => {
    loadTemplate({
      html: tmpl.html,
      width: tmpl.width,
      height: tmpl.height,
      format: tmpl.formatRecommendation,
      duration: tmpl.defaultDuration,
      fps: tmpl.defaultFps,
    });
    setActiveModal(null);
  };

  return (
    <Dialog
      open={open}
      onClose={() => setActiveModal(null)}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: '#0a0e1a',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: 3,
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          py: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
          <AutoAwesomeIcon sx={{ color: '#a855f7' }} />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Curated Visual Templates
          </Typography>
        </Box>
        <IconButton size="small" onClick={() => setActiveModal(null)} sx={{ color: '#94a3b8' }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ py: 3 }}>
        <Typography variant="body2" sx={{ color: '#94a3b8', mb: 3 }}>
          Pick a starter template optimized for high-performance rendering. These templates feature CSS keyframes, glassmorphism, glowing borders, and motion choreography.
        </Typography>

        <Grid container spacing={2.5}>
          {TEMPLATES.map((tmpl) => {
            const isMotion = tmpl.formatRecommendation === 'mp4' || tmpl.formatRecommendation === 'gif';

            return (
              <Grid item xs={12} sm={6} key={tmpl.id}>
                <GlassCard
                  sx={{
                    p: 2.5,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    '&:hover': {
                      borderColor: 'rgba(99, 102, 241, 0.5)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 28px rgba(0, 0, 0, 0.5), 0 0 20px rgba(99, 102, 241, 0.2)',
                    },
                  }}
                  onClick={() => handleSelect(tmpl)}
                >
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                      <Chip
                        size="small"
                        icon={isMotion ? <MovieIcon sx={{ fontSize: '14px !important' }} /> : <ImageIcon sx={{ fontSize: '14px !important' }} />}
                        label={`REC: ${tmpl.formatRecommendation.toUpperCase()}`}
                        sx={{
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          backgroundColor: isMotion ? 'rgba(168, 85, 247, 0.15)' : 'rgba(99, 102, 241, 0.15)',
                          color: isMotion ? '#c084fc' : '#818cf8',
                        }}
                      />
                      <Typography variant="caption" sx={{ color: '#64748b', fontFamily: 'monospace' }}>
                        {tmpl.width} × {tmpl.height}
                      </Typography>
                    </Box>

                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#f8fafc', mb: 0.8 }}>
                      {tmpl.title}
                    </Typography>

                    <Typography variant="body2" sx={{ color: '#94a3b8', mb: 2.5, lineHeight: 1.5 }}>
                      {tmpl.description}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 1.5, borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                      <AnimationIcon sx={{ fontSize: 16, color: '#06b6d4' }} />
                      <Typography variant="caption" sx={{ color: '#cbd5e1' }}>
                        {tmpl.defaultDuration ? `${tmpl.defaultDuration}s @ ${tmpl.defaultFps}fps` : 'Static Snapshot'}
                      </Typography>
                    </Box>
                    <Button
                      size="small"
                      variant="contained"
                      sx={{
                        fontSize: '0.75rem',
                        py: 0.4,
                        px: 1.5,
                      }}
                    >
                      Use Template
                    </Button>
                  </Box>
                </GlassCard>
              </Grid>
            );
          })}
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
