'use client';

import React, { useRef } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CheckIcon from '@mui/icons-material/Check';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import ActionTooltip from '@/components/common/ActionTooltip';
import { useStudioStore } from '@/store/useStudioStore';
import { copyToClipboard } from '@/lib/utils';

interface EditorToolbarProps {
  activeTab: 'html' | 'css' | 'js';
  onTabChange: (tab: 'html' | 'css' | 'js') => void;
}

export default function EditorToolbar({ activeTab, onTabChange }: EditorToolbarProps) {
  const { html, css, js, setHtml, resetStudio } = useStudioStore();
  const [copied, setCopied] = React.useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCopy = async () => {
    const code = activeTab === 'html' ? html : activeTab === 'css' ? css : js;
    const ok = await copyToClipboard(code);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setHtml(content);
      }
    };
    reader.readAsText(file);
    // Reset file input
    e.target.value = '';
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 1.5,
        py: 0.8,
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        backgroundColor: '#0c101c',
      }}
    >
      {/* Code Type Tabs */}
      <Tabs
        value={activeTab}
        onChange={(_, val) => onTabChange(val)}
        sx={{
          minHeight: 32,
          '& .MuiTabs-indicator': {
            backgroundColor: '#6366f1',
            height: 2,
          },
        }}
      >
        <Tab
          value="html"
          label="HTML"
          sx={{
            minHeight: 32,
            py: 0.5,
            px: 1.5,
            fontSize: '0.78rem',
            fontWeight: 700,
            color: '#94a3b8',
            '&.Mui-selected': { color: '#818cf8' },
          }}
        />
        <Tab
          value="css"
          label="CSS"
          sx={{
            minHeight: 32,
            py: 0.5,
            px: 1.5,
            fontSize: '0.78rem',
            fontWeight: 700,
            color: '#94a3b8',
            '&.Mui-selected': { color: '#818cf8' },
          }}
        />
        <Tab
          value="js"
          label="JS"
          sx={{
            minHeight: 32,
            py: 0.5,
            px: 1.5,
            fontSize: '0.78rem',
            fontWeight: 700,
            color: '#94a3b8',
            '&.Mui-selected': { color: '#818cf8' },
          }}
        />
      </Tabs>

      {/* Editor Actions */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".html,.htm"
          style={{ display: 'none' }}
          onChange={handleFileUpload}
        />

        <ActionTooltip title="Upload HTML File">
          <IconButton
            size="small"
            onClick={() => fileInputRef.current?.click()}
            sx={{
              color: '#94a3b8',
              '&:hover': { color: '#f1f5f9' },
            }}
          >
            <UploadFileIcon fontSize="small" />
          </IconButton>
        </ActionTooltip>

        <ActionTooltip title={copied ? 'Copied!' : 'Copy Code'}>
          <IconButton
            size="small"
            onClick={handleCopy}
            sx={{
              color: copied ? '#10b981' : '#94a3b8',
              '&:hover': { color: '#f1f5f9' },
            }}
          >
            {copied ? <CheckIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
          </IconButton>
        </ActionTooltip>

        <ActionTooltip title="Reset to Default Template">
          <IconButton
            size="small"
            onClick={resetStudio}
            sx={{
              color: '#94a3b8',
              '&:hover': { color: '#ef4444' },
            }}
          >
            <RestartAltIcon fontSize="small" />
          </IconButton>
        </ActionTooltip>
      </Box>
    </Box>
  );
}
