'use client';

import React from 'react';
import Box from '@mui/material/Box';

import AppHeader from '@/components/layout/AppHeader';
import WorkspaceContainer from '@/components/layout/WorkspaceContainer';
import AppFooter from '@/components/layout/AppFooter';
import ExportResultModal from '@/components/modals/ExportResultModal';
import ApiDocsModal from '@/components/modals/ApiDocsModal';
import TemplatePicker from '@/components/editor/TemplatePicker';
import KeyboardShortcutsModal from '@/components/modals/KeyboardShortcutsModal';
import SettingsModal from '@/components/modals/SettingsModal';
import RenderHistoryDrawer from '@/components/history/RenderHistoryDrawer';

export default function HomePage() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        backgroundColor: '#07090e',
      }}
    >
      {/* Studio Header Bar */}
      <AppHeader />

      {/* Main 3-Pane Visual Workspace */}
      <Box sx={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
        <WorkspaceContainer />
      </Box>

      {/* Bottom Status & Specs Bar */}
      <AppFooter />

      {/* Dialog Modals and Drawers */}
      <ExportResultModal />
      <ApiDocsModal />
      <TemplatePicker />
      <KeyboardShortcutsModal />
      <SettingsModal />
      <RenderHistoryDrawer />
    </Box>
  );
}
