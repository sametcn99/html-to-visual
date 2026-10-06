'use client';

import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import { useStudioStore } from '@/store/useStudioStore';
import { formatBytes, triggerDownload, copyToClipboard } from '@/lib/utils';

export default function ExportResultModal() {
  const { activeModal, setActiveModal, lastResult } = useStudioStore();
  const [copied, setCopied] = useState(false);

  const open = activeModal === 'result' && !!lastResult;

  if (!lastResult) return null;

  const handleDownload = () => {
    triggerDownload(lastResult.url, lastResult.name);
  };

  const handleCopyUrl = async () => {
    const ok = await copyToClipboard(lastResult.url);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const isVideo = lastResult.format === 'mp4';
  const isGif = lastResult.format === 'gif';

  return (
    <Dialog
      open={open}
      onClose={() => setActiveModal(null)}
      maxWidth="md"
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
          <CheckCircleOutlineIcon sx={{ color: '#10b981' }} />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Render Complete
          </Typography>
          <Chip
            size="small"
            label={lastResult.format.toUpperCase()}
            sx={{
              backgroundColor: 'rgba(99, 102, 241, 0.2)',
              color: '#818cf8',
              fontWeight: 700,
            }}
          />
        </Box>
        <IconButton size="small" onClick={() => setActiveModal(null)} sx={{ color: '#94a3b8' }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ py: 3 }}>
        {/* Preview Container */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#030509',
            borderRadius: 2,
            border: '1px solid rgba(255, 255, 255, 0.08)',
            p: 2,
            minHeight: 280,
            maxHeight: 460,
            overflow: 'hidden',
            mb: 2.5,
          }}
        >
          {isVideo ? (
            <video
              src={lastResult.url}
              controls
              autoPlay
              loop
              playsInline
              style={{
                maxWidth: '100%',
                maxHeight: '420px',
                borderRadius: '8px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.8)',
              }}
            />
          ) : (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={lastResult.url}
              alt="Rendered output"
              style={{
                maxWidth: '100%',
                maxHeight: '420px',
                borderRadius: '8px',
                objectFit: 'contain',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.8)',
              }}
            />
          )}
        </Box>

        {/* Specs metadata */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(4, 1fr)' },
            gap: 1.5,
            p: 2,
            borderRadius: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
          }}
        >
          <Box>
            <Typography variant="caption" sx={{ color: '#64748b' }}>
              Dimensions
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 700, color: '#f1f5f9', fontFamily: 'monospace' }}>
              {lastResult.width} × {lastResult.height}px
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" sx={{ color: '#64748b' }}>
              File Size
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 700, color: '#f1f5f9', fontFamily: 'monospace' }}>
              {formatBytes(lastResult.fileSizeBytes)}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" sx={{ color: '#64748b' }}>
              Format
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 700, color: '#f1f5f9' }}>
              {lastResult.format.toUpperCase()} {isGif ? '(Palettegen)' : ''}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" sx={{ color: '#64748b' }}>
              Motion
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 700, color: '#f1f5f9', fontFamily: 'monospace' }}>
              {lastResult.duration ? `${lastResult.duration}s @ ${lastResult.fps}fps` : 'Static Snapshot'}
            </Typography>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2, borderTop: '1px solid rgba(255, 255, 255, 0.08)', gap: 1 }}>
        <Button
          variant="outlined"
          startIcon={copied ? <CheckIcon sx={{ color: '#10b981' }} /> : <ContentCopyIcon />}
          onClick={handleCopyUrl}
          sx={{ color: copied ? '#10b981' : '#cbd5e1' }}
        >
          {copied ? 'Copied Data URL' : 'Copy Data URL'}
        </Button>
        <Button
          variant="contained"
          startIcon={<DownloadIcon />}
          onClick={handleDownload}
          sx={{
            background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
            px: 3,
          }}
        >
          Download File
        </Button>
      </DialogActions>
    </Dialog>
  );
}
