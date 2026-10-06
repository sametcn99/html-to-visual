'use client';

import React from 'react';
import Tooltip, { TooltipProps } from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface ActionTooltipProps extends Omit<TooltipProps, 'title'> {
  title: string;
  shortcut?: string;
  children: React.ReactElement;
}

export default function ActionTooltip({ title, shortcut, children, ...props }: ActionTooltipProps) {
  return (
    <Tooltip
      arrow
      title={
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 0.2 }}>
          <Typography variant="caption" sx={{ fontWeight: 500 }}>
            {title}
          </Typography>
          {shortcut && (
            <Box
              component="kbd"
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.12)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                borderRadius: 1,
                px: 0.6,
                py: 0.1,
                fontSize: '0.65rem',
                fontFamily: 'monospace',
                color: '#cbd5e1',
              }}
            >
              {shortcut}
            </Box>
          )}
        </Box>
      }
      {...props}
    >
      {children}
    </Tooltip>
  );
}
