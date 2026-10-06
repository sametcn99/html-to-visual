'use client';

import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';
import SettingsIcon from '@mui/icons-material/Settings';

import { useStudioStore } from '@/store/useStudioStore';

interface HealthData {
  status: string;
  engine: string;
  capabilities: {
    ffmpeg: { available: boolean; version: string };
    maxDurationSeconds: number;
    maxFps: number;
    maxResolution: string;
    staticFormats: string[];
    motionFormats: string[];
  };
}

export default function SettingsModal() {
  const { activeModal, setActiveModal, engine, setEngine } = useStudioStore();
  const [healthData, setHealthData] = useState<HealthData | null>(null);

  const open = activeModal === 'settings';

  useEffect(() => {
    if (open) {
      fetch('/api/health')
        .then((r) => r.json())
        .then((d) => setHealthData(d))
        .catch(() => {});
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={() => setActiveModal(null)}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: '#0a0d17',
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
          <SettingsIcon sx={{ color: '#818cf8' }} />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Studio & Engine Configuration
          </Typography>
        </Box>
        <IconButton size="small" onClick={() => setActiveModal(null)} sx={{ color: '#94a3b8' }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ py: 3 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: '#f1f5f9' }}>
          Rendering Engine Execution Mode
        </Typography>
        <Typography variant="body2" sx={{ color: '#94a3b8', mb: 2 }}>
          Select where the rendering pipeline executes. Headless Chromium provides true sub-pixel typography, full CSS/SVG animation fidelity, and FFmpeg encoding.
        </Typography>

        <RadioGroup value={engine} onChange={(e) => setEngine(e.target.value as 'server' | 'client')}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1.5,
              mb: 3,
            }}
          >
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                backgroundColor: engine === 'server' ? 'rgba(99, 102, 241, 0.1)' : 'rgba(255, 255, 255, 0.02)',
                border: engine === 'server' ? '1px solid rgba(99, 102, 241, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
                cursor: 'pointer',
              }}
              onClick={() => setEngine('server')}
            >
              <FormControlLabel
                value="server"
                control={<Radio size="small" sx={{ color: '#6366f1' }} />}
                label={
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#fff' }}>
                      Server Pipeline (Headless Chromium + FFmpeg)
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                      High-fidelity 60fps video capture, multi-pass palettegen GIF, and Retina PNG rasterization. Recommended for all exports.
                    </Typography>
                  </Box>
                }
              />
            </Box>

            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                backgroundColor: engine === 'client' ? 'rgba(99, 102, 241, 0.1)' : 'rgba(255, 255, 255, 0.02)',
                border: engine === 'client' ? '1px solid rgba(99, 102, 241, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
                cursor: 'pointer',
              }}
              onClick={() => setEngine('client')}
            >
              <FormControlLabel
                value="client"
                control={<Radio size="small" sx={{ color: '#6366f1' }} />}
                label={
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#fff' }}>
                      Client Browser Engine (Canvas & MediaStream)
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                      Renders directly inside your local browser tab. Works 100% offline in PWA mode with zero server dependencies.
                    </Typography>
                  </Box>
                }
              />
            </Box>
          </Box>
        </RadioGroup>

        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.08)', my: 2 }} />

        {/* Server capabilities diagnostics */}
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5, color: '#f1f5f9' }}>
          Server System Diagnostics
        </Typography>

        {healthData ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              p: 2,
              borderRadius: 2,
              backgroundColor: '#050811',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              fontSize: '0.8rem',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>Engine Status:</span>
              <Chip size="small" label={healthData.status} color="success" sx={{ height: 20, fontSize: '0.7rem' }} />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>Native FFmpeg:</span>
              <span style={{ color: '#10b981', fontWeight: 600 }}>
                {healthData.capabilities?.ffmpeg?.available ? 'Available' : 'Unavailable'}
              </span>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>Motion Max Duration:</span>
              <span style={{ color: '#f1f5f9', fontFamily: 'monospace' }}>
                {healthData.capabilities?.maxDurationSeconds}s @ {healthData.capabilities?.maxFps} FPS
              </span>
            </Box>
          </Box>
        ) : (
          <Typography variant="caption" sx={{ color: '#64748b' }}>
            Fetching server diagnostics...
          </Typography>
        )}
      </DialogContent>
    </Dialog>
  );
}
