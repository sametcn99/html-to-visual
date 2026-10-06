'use client';

import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardIcon from '@mui/icons-material/Keyboard';

import { useStudioStore } from '@/store/useStudioStore';

export default function KeyboardShortcutsModal() {
  const { activeModal, setActiveModal } = useStudioStore();
  const open = activeModal === 'shortcuts';

  const shortcuts = [
    { key: 'Ctrl + Enter / Cmd + Enter', desc: 'Trigger Visual Render (Export active format)' },
    { key: 'Space + Drag / Middle Click', desc: 'Pan / Drag infinite canvas workspace' },
    { key: 'Ctrl + Mouse Wheel', desc: 'Zoom in / out on the canvas' },
    { key: 'Mouse Wheel / Touchpad', desc: 'Pan canvas vertically and horizontally' },
    { key: 'Escape', desc: 'Close any active modal or drawer' },
    { key: '?', desc: 'Toggle keyboard shortcuts cheat sheet' },
    { key: 'Ctrl + Z / Cmd + Z', desc: 'Undo code changes in editor' },
    { key: 'Ctrl + Y / Cmd + Shift + Z', desc: 'Redo code changes in editor' },
  ];

  return (
    <Dialog
      open={open}
      onClose={() => setActiveModal(null)}
      maxWidth="xs"
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
          <KeyboardIcon sx={{ color: '#818cf8' }} />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Keyboard Shortcuts
          </Typography>
        </Box>
        <IconButton size="small" onClick={() => setActiveModal(null)} sx={{ color: '#94a3b8' }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ py: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {shortcuts.map((s, idx) => (
            <Box
              key={idx}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 1.2,
                borderRadius: 1.5,
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              <Typography variant="body2" sx={{ color: '#cbd5e1' }}>
                {s.desc}
              </Typography>
              <Box
                component="kbd"
                sx={{
                  bgcolor: 'rgba(99, 102, 241, 0.15)',
                  border: '1px solid rgba(99, 102, 241, 0.4)',
                  color: '#818cf8',
                  borderRadius: 1,
                  px: 1,
                  py: 0.3,
                  fontSize: '0.75rem',
                  fontFamily: 'monospace',
                  fontWeight: 700,
                }}
              >
                {s.key}
              </Box>
            </Box>
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
}
