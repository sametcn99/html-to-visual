'use client';

import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';
import HistoryIcon from '@mui/icons-material/History';
import CodeIcon from '@mui/icons-material/Code';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import GitHubIcon from '@mui/icons-material/GitHub';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SettingsIcon from '@mui/icons-material/Settings';

import BrandLogo from '@/components/common/BrandLogo';
import ActionTooltip from '@/components/common/ActionTooltip';
import { useStudioStore } from '@/store/useStudioStore';
import { useHistoryStore } from '@/store/useHistoryStore';
import { usePWA } from '@/hooks/usePWA';

export default function AppHeader() {
  const { setActiveModal, setHistoryOpen, format, engine } = useStudioStore();
  const { history } = useHistoryStore();
  const { isInstallable, promptInstall } = usePWA();

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: 'rgba(9, 13, 22, 0.88)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        zIndex: 1100,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', minHeight: 64, px: { xs: 2, md: 3 } }}>
        {/* Left: Brand Identity & Active Format Badge */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
          <BrandLogo />
          <Chip
            size="small"
            label={`${format.toUpperCase()} EXPORT`}
            sx={{
              backgroundColor: 'rgba(99, 102, 241, 0.12)',
              color: '#818cf8',
              borderColor: 'rgba(99, 102, 241, 0.3)',
              fontWeight: 700,
              fontSize: '0.72rem',
              letterSpacing: '0.04em',
              display: { xs: 'none', sm: 'inline-flex' },
            }}
          />
          <Chip
            size="small"
            label={engine === 'server' ? 'ENGINE: SERVER HEADLESS' : 'ENGINE: CLIENT BROWSER'}
            variant="outlined"
            sx={{
              color: '#94a3b8',
              borderColor: 'rgba(255, 255, 255, 0.1)',
              fontSize: '0.68rem',
              display: { xs: 'none', md: 'inline-flex' },
            }}
          />
        </Box>

        {/* Right: Actions, Modals, PWA & GitHub */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 1.5 } }}>
          {/* Preset Templates */}
          <ActionTooltip title="Browse Animated & Static Templates">
            <Button
              size="small"
              variant="outlined"
              startIcon={<AutoAwesomeIcon sx={{ color: '#c084fc' }} />}
              onClick={() => setActiveModal('templates')}
              sx={{
                borderColor: 'rgba(168, 85, 247, 0.3)',
                color: '#e2e8f0',
                '&:hover': {
                  borderColor: '#a855f7',
                  backgroundColor: 'rgba(168, 85, 247, 0.1)',
                },
              }}
            >
              Templates
            </Button>
          </ActionTooltip>

          {/* API Docs Button */}
          <ActionTooltip title="REST API & Automation Endpoints">
            <Button
              size="small"
              variant="outlined"
              startIcon={<CodeIcon sx={{ color: '#06b6d4' }} />}
              onClick={() => setActiveModal('docs')}
              sx={{
                borderColor: 'rgba(6, 182, 212, 0.3)',
                color: '#e2e8f0',
                '&:hover': {
                  borderColor: '#06b6d4',
                  backgroundColor: 'rgba(6, 182, 212, 0.1)',
                },
              }}
            >
              API Docs
            </Button>
          </ActionTooltip>

          {/* Render History Drawer Trigger */}
          <ActionTooltip title="Session Render History">
            <IconButton
              size="small"
              onClick={() => setHistoryOpen(true)}
              sx={{
                color: '#94a3b8',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                '&:hover': { color: '#fff', borderColor: 'rgba(255, 255, 255, 0.2)' },
              }}
            >
              <Badge badgeContent={history.length} color="primary" max={99}>
                <HistoryIcon fontSize="small" />
              </Badge>
            </IconButton>
          </ActionTooltip>

          {/* PWA Install Trigger */}
          {isInstallable && (
            <ActionTooltip title="Install html-to-visual as Desktop / Mobile App">
              <IconButton
                size="small"
                onClick={promptInstall}
                sx={{
                  color: '#10b981',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  backgroundColor: 'rgba(16, 185, 129, 0.08)',
                  '&:hover': { backgroundColor: 'rgba(16, 185, 129, 0.18)' },
                }}
              >
                <DownloadForOfflineIcon fontSize="small" />
              </IconButton>
            </ActionTooltip>
          )}

          {/* Keyboard Shortcuts */}
          <ActionTooltip title="Keyboard Shortcuts" shortcut="?">
            <IconButton
              size="small"
              onClick={() => setActiveModal('shortcuts')}
              sx={{
                color: '#94a3b8',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                '&:hover': { color: '#fff', borderColor: 'rgba(255, 255, 255, 0.2)' },
              }}
            >
              <HelpOutlineIcon fontSize="small" />
            </IconButton>
          </ActionTooltip>

          {/* Settings */}
          <ActionTooltip title="Engine Settings">
            <IconButton
              size="small"
              onClick={() => setActiveModal('settings')}
              sx={{
                color: '#94a3b8',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                '&:hover': { color: '#fff', borderColor: 'rgba(255, 255, 255, 0.2)' },
              }}
            >
              <SettingsIcon fontSize="small" />
            </IconButton>
          </ActionTooltip>

          {/* Official GitHub Link */}
          <ActionTooltip title="Star on GitHub (github.com/sametcn99/html-to-visual)">
            <Button
              component={Link}
              href="https://github.com/sametcn99/html-to-visual"
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              variant="contained"
              startIcon={<GitHubIcon fontSize="small" />}
              sx={{
                background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                color: '#f8fafc',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #334155 0%, #1e293b 100%)',
                  borderColor: 'rgba(255, 255, 255, 0.35)',
                },
              }}
            >
              GitHub
            </Button>
          </ActionTooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
