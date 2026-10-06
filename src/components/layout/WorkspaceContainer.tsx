'use client';

import React, { useRef } from 'react';
import Box from '@mui/material/Box';
import HtmlEditor from '@/components/editor/HtmlEditor';
import ViewportStage from '@/components/preview/ViewportStage';
import ExportPanel from '@/components/controls/ExportPanel';
import { useRenderer } from '@/hooks/useRenderer';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

export default function WorkspaceContainer() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { render } = useRenderer();

  const handleRender = () => {
    render(containerRef.current);
  };

  // Register global hotkey Ctrl+Enter / Cmd+Enter
  useKeyboardShortcuts(handleRender);

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          md: '380px 1fr 340px',
          lg: '440px 1fr 360px',
        },
        height: 'calc(100vh - 64px - 38px)',
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Column 1: Code Studio */}
      <Box sx={{ height: '100%', overflow: 'hidden' }}>
        <HtmlEditor />
      </Box>

      {/* Column 2: Viewport Preview Sandbox */}
      <Box sx={{ height: '100%', overflow: 'hidden', minWidth: 0 }}>
        <ViewportStage containerRef={containerRef} />
      </Box>

      {/* Column 3: Export Controls */}
      <Box sx={{ height: '100%', overflow: 'hidden' }}>
        <ExportPanel onRender={handleRender} />
      </Box>
    </Box>
  );
}
