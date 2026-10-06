'use client';

import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Chip from '@mui/material/Chip';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import CodeIcon from '@mui/icons-material/Code';

import { useStudioStore } from '@/store/useStudioStore';
import { copyToClipboard } from '@/lib/utils';

export default function ApiDocsModal() {
  const { activeModal, setActiveModal } = useStudioStore();
  const [tabIndex, setTabIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const open = activeModal === 'docs';

  const curlExample = `# 1. Render Animated MP4 Video directly to file:
curl -X POST https://your-domain.com/api/render \\
  -H "Content-Type: application/json" \\
  -d '{
    "html": "<html><body><h1 style=\\"animation: spin 2s infinite\\">Motion</h1><style>@keyframes spin { 100% { transform: rotate(360deg); } }</style></body></html>",
    "format": "mp4",
    "width": 1200,
    "height": 630,
    "duration": 3.0,
    "fps": 30
  }' \\
  --output rendered_video.mp4

# 2. Render Crisp 60fps GIF with Palettegen:
curl -X POST https://your-domain.com/api/render \\
  -H "Content-Type: application/json" \\
  -d '{
    "html": "<div style=\\"width:100%;height:100%;background:#0a0d16;color:#6366f1\\">Fluid GIF</div>",
    "format": "gif",
    "width": 800,
    "height": 800,
    "duration": 2.0,
    "fps": 30
  }' \\
  --output animation.gif

# 3. Render High-Resolution PNG with JSON Response:
curl -X POST "https://your-domain.com/api/render?json=true" \\
  -H "Content-Type: application/json" \\
  -d '{
    "html": "<div class=\\"card\\">Hello World</div>",
    "format": "png",
    "width": 1200,
    "height": 630,
    "deviceScaleFactor": 2
  }'`;

  const nodeExample = `// Node.js / Next.js / TypeScript Example
import fs from 'fs/promises';

async function generateVisual() {
  const response = await fetch('https://your-domain.com/api/render', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      html: '<div style="color:white;background:#0f172a;padding:50px">Dynamic Social Card</div>',
      format: 'png',
      width: 1200,
      height: 630,
      deviceScaleFactor: 2,
    }),
  });

  if (!response.ok) {
    throw new Error(\`Render failed: \${response.statusText}\`);
  }

  const arrayBuffer = await response.arrayBuffer();
  await fs.writeFile('social_card.png', Buffer.from(arrayBuffer));
  console.log('Successfully saved social_card.png!');
}

generateVisual();`;

  const pythonExample = `# Python 3 (requests) Example
import requests

payload = {
    "html": """
    <div style="background: radial-gradient(#6366f1, #000); width:100%; height:100%; display:flex; align-items:center; justify-content:center; color:white; font-size:40px;">
        Automated Python Render
    </div>
    """,
    "format": "mp4",
    "width": 1280,
    "height": 720,
    "duration": 3.0,
    "fps": 30
}

response = requests.post("https://your-domain.com/api/render", json=payload)

if response.status_code == 200:
    with open("output.mp4", "wb") as f:
        f.write(response.content)
    print("Video rendered successfully to output.mp4")
else:
    print(f"Error: {response.text}")`;

  const getActiveCode = () => {
    if (tabIndex === 0) return curlExample;
    if (tabIndex === 1) return nodeExample;
    return pythonExample;
  };

  const handleCopy = async () => {
    const ok = await copyToClipboard(getActiveCode());
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

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
          <CodeIcon sx={{ color: '#06b6d4' }} />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            html-to-visual Developer REST API
          </Typography>
          <Chip size="small" label="POST /api/render" color="info" sx={{ fontWeight: 700, fontSize: '0.7rem' }} />
        </Box>
        <IconButton size="small" onClick={() => setActiveModal(null)} sx={{ color: '#94a3b8' }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ py: 3 }}>
        <Typography variant="body2" sx={{ color: '#94a3b8', mb: 2 }}>
          Seamlessly integrate programmatic visual creation into your pipelines, GitHub actions, discord bots, and webhooks. Returns binary media stream by default, or JSON with base64 data URL when <code>?json=true</code> or <code>Accept: application/json</code> is provided.
        </Typography>

        {/* Code Tabs */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
          <Tabs
            value={tabIndex}
            onChange={(_, val) => setTabIndex(val)}
            sx={{
              minHeight: 32,
              '& .MuiTabs-indicator': { backgroundColor: '#06b6d4' },
            }}
          >
            <Tab label="cURL / CLI" sx={{ minHeight: 32, py: 0.5, fontSize: '0.8rem', fontWeight: 600 }} />
            <Tab label="Node.js / TypeScript" sx={{ minHeight: 32, py: 0.5, fontSize: '0.8rem', fontWeight: 600 }} />
            <Tab label="Python" sx={{ minHeight: 32, py: 0.5, fontSize: '0.8rem', fontWeight: 600 }} />
          </Tabs>

          <Button
            size="small"
            startIcon={copied ? <CheckIcon sx={{ color: '#10b981' }} /> : <ContentCopyIcon fontSize="small" />}
            onClick={handleCopy}
            sx={{ color: copied ? '#10b981' : '#94a3b8', fontSize: '0.75rem' }}
          >
            {copied ? 'Copied!' : 'Copy Code'}
          </Button>
        </Box>

        {/* Code Snippet Box */}
        <Box
          component="pre"
          sx={{
            backgroundColor: '#03060d',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: 2,
            p: 2.5,
            fontSize: '0.82rem',
            fontFamily: "'Fira Code', Consolas, monospace",
            color: '#e2e8f0',
            overflowX: 'auto',
            maxHeight: 320,
            lineHeight: 1.6,
          }}
        >
          {getActiveCode()}
        </Box>

        {/* Schema parameters table */}
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mt: 3, mb: 1.5, color: '#f8fafc' }}>
          Payload Parameters Reference
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '160px 100px 1fr',
            gap: 1.5,
            p: 2,
            borderRadius: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            fontSize: '0.8rem',
          }}
        >
          <Box sx={{ fontWeight: 700, color: '#818cf8', fontFamily: 'monospace' }}>html (string)</Box>
          <Box sx={{ color: '#ef4444', fontWeight: 600 }}>Required</Box>
          <Box sx={{ color: '#94a3b8' }}>Full HTML document or snippet markup to render.</Box>

          <Box sx={{ fontWeight: 700, color: '#818cf8', fontFamily: 'monospace' }}>format (string)</Box>
          <Box sx={{ color: '#64748b' }}>Optional</Box>
          <Box sx={{ color: '#94a3b8' }}><code>png</code> | <code>jpeg</code> | <code>webp</code> | <code>gif</code> | <code>mp4</code> (Default: png).</Box>

          <Box sx={{ fontWeight: 700, color: '#818cf8', fontFamily: 'monospace' }}>duration (number)</Box>
          <Box sx={{ color: '#64748b' }}>Optional</Box>
          <Box sx={{ color: '#94a3b8' }}>Animation recording length in seconds (0.5 to 15.0). Default: 3.0.</Box>

          <Box sx={{ fontWeight: 700, color: '#818cf8', fontFamily: 'monospace' }}>fps (number)</Box>
          <Box sx={{ color: '#64748b' }}>Optional</Box>
          <Box sx={{ color: '#94a3b8' }}>Sampling frame rate (10 to 60 FPS). Default: 30.</Box>

          <Box sx={{ fontWeight: 700, color: '#818cf8', fontFamily: 'monospace' }}>deviceScaleFactor</Box>
          <Box sx={{ color: '#64748b' }}>Optional</Box>
          <Box sx={{ color: '#94a3b8' }}>Retina device pixel ratio (1, 2, or 3). Default: 2 for static.</Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
