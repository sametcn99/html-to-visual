'use client';

import React from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DownloadIcon from '@mui/icons-material/Download';
import HistoryIcon from '@mui/icons-material/History';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { useStudioStore } from '@/store/useStudioStore';
import { useHistoryStore } from '@/store/useHistoryStore';
import { formatBytes, triggerDownload } from '@/lib/utils';
import GlassCard from '@/components/common/GlassCard';

import { RenderResult } from '@/types/renderer';

export default function RenderHistoryDrawer() {
  const { isHistoryOpen, setHistoryOpen, setLastResult, setActiveModal } = useStudioStore();
  const { history, removeResult, clearHistory } = useHistoryStore();

  const handleInspect = (item: RenderResult) => {
    setLastResult(item);
    setActiveModal('result');
  };

  return (
    <Drawer
      anchor="right"
      open={isHistoryOpen}
      onClose={() => setHistoryOpen(false)}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 380 },
          backgroundColor: '#0a0d16',
          borderLeft: '1px solid rgba(255, 255, 255, 0.08)',
          p: 2.5,
        },
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <HistoryIcon sx={{ color: '#818cf8' }} />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Render History
          </Typography>
          <Chip size="small" label={history.length} sx={{ fontWeight: 700, fontSize: '0.7rem' }} />
        </Box>
        <IconButton size="small" onClick={() => setHistoryOpen(false)} sx={{ color: '#94a3b8' }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      {history.length > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button
            size="small"
            startIcon={<DeleteOutlineIcon fontSize="small" />}
            onClick={clearHistory}
            sx={{ color: '#ef4444', fontSize: '0.75rem' }}
          >
            Clear History
          </Button>
        </Box>
      )}

      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.06)', mb: 2 }} />

      {/* History Items List */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, overflowY: 'auto', flex: 1 }}>
        {history.length === 0 ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: 240,
              color: '#64748b',
              gap: 1,
              textAlign: 'center',
            }}
          >
            <HistoryIcon sx={{ fontSize: 36, opacity: 0.5 }} />
            <Typography variant="body2">No visuals rendered in this session yet.</Typography>
            <Typography variant="caption">Exported PNG, MP4, and GIFs will appear here.</Typography>
          </Box>
        ) : (
          history.map((item) => {
            const isVideo = item.format === 'mp4';

            return (
              <GlassCard
                key={item.id}
                sx={{
                  p: 1.8,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1.2,
                  position: 'relative',
                }}
              >
                {/* Media Preview Box */}
                <Box
                  sx={{
                    width: '100%',
                    height: 120,
                    borderRadius: 1.5,
                    backgroundColor: '#030509',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                  }}
                >
                  {isVideo ? (
                    <video
                      src={item.url}
                      muted
                      loop
                      autoPlay
                      playsInline
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={item.url}
                      alt={item.name}
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  )}
                </Box>

                {/* Details */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: '0.82rem', color: '#f1f5f9' }}>
                      {item.format.toUpperCase()} Visual
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#64748b', fontFamily: 'monospace' }}>
                      {item.width}×{item.height} • {formatBytes(item.fileSizeBytes)}
                    </Typography>
                  </Box>
                  <Chip
                    size="small"
                    label={item.duration ? `${item.duration}s` : 'Static'}
                    sx={{
                      fontSize: '0.65rem',
                      height: 20,
                      backgroundColor: 'rgba(255, 255, 255, 0.06)',
                      color: '#cbd5e1',
                    }}
                  />
                </Box>

                {/* Actions */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, pt: 1, borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <IconButton size="small" onClick={() => handleInspect(item)} sx={{ color: '#94a3b8' }}>
                    <VisibilityIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" onClick={() => triggerDownload(item.url, item.name)} sx={{ color: '#818cf8' }}>
                    <DownloadIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" onClick={() => removeResult(item.id)} sx={{ color: '#ef4444' }}>
                    <DeleteOutlineIcon fontSize="small" />
                  </IconButton>
                </Box>
              </GlassCard>
            );
          })
        )}
      </Box>
    </Drawer>
  );
}
