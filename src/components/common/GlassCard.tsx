'use client';

import React from 'react';
import Paper, { PaperProps } from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

interface GlassCardProps extends PaperProps {
  glow?: 'primary' | 'secondary' | 'none';
  blur?: number;
}

const StyledPaper = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'glow' && prop !== 'blur',
})<GlassCardProps>(({ glow = 'none', blur = 16 }) => ({
  backgroundColor: 'rgba(15, 20, 34, 0.75)',
  backdropFilter: `blur(${blur}px)`,
  WebkitBackdropFilter: `blur(${blur}px)`,
  border: '1px solid rgba(255, 255, 255, 0.08)',
  borderRadius: 12,
  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  ...(glow === 'primary' && {
    borderColor: 'rgba(99, 102, 241, 0.3)',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.4), 0 0 20px rgba(99, 102, 241, 0.15)',
  }),
  ...(glow === 'secondary' && {
    borderColor: 'rgba(168, 85, 247, 0.3)',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.4), 0 0 20px rgba(168, 85, 247, 0.15)',
  }),
}));

export default function GlassCard({ children, ...props }: GlassCardProps) {
  return <StyledPaper {...props}>{children}</StyledPaper>;
}
