'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import type { Monaco } from '@monaco-editor/react';
import EditorToolbar from './EditorToolbar';
import { useStudioStore } from '@/store/useStudioStore';

// Dynamically import Monaco Editor to avoid SSR window issues
const Editor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        backgroundColor: '#07090e',
        color: '#64748b',
        gap: 1.5,
      }}
    >
      <CircularProgress size={20} sx={{ color: '#6366f1' }} />
      <span>Loading Code Studio...</span>
    </Box>
  ),
});

export default function HtmlEditor() {
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('html');
  const { html, css, js, setHtml, setCss, setJs } = useStudioStore();

  const getCurrentCode = () => {
    if (activeTab === 'html') return html;
    if (activeTab === 'css') return css;
    return js;
  };

  const handleEditorChange = (value?: string) => {
    const val = value ?? '';
    if (activeTab === 'html') setHtml(val);
    else if (activeTab === 'css') setCss(val);
    else setJs(val);
  };

  const handleEditorWillMount = (monaco: Monaco) => {
    monaco.editor.defineTheme('html-to-visual-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: '', foreground: 'f1f5f9', background: '07090e' },
        { token: 'comment', foreground: '64748b', fontStyle: 'italic' },
        { token: 'keyword', foreground: '818cf8', fontStyle: 'bold' },
        { token: 'keyword.css', foreground: 'a78bfa' },
        { token: 'string', foreground: '34d399' },
        { token: 'string.html', foreground: '34d399' },
        { token: 'string.css', foreground: '38bdf8' },
        { token: 'number', foreground: 'fbbf24' },
        { token: 'tag', foreground: '818cf8', fontStyle: 'bold' },
        { token: 'tag.html', foreground: '818cf8', fontStyle: 'bold' },
        { token: 'attribute.name', foreground: '38bdf8' },
        { token: 'attribute.name.html', foreground: '38bdf8' },
        { token: 'attribute.value', foreground: '34d399' },
        { token: 'attribute.value.html', foreground: '34d399' },
        { token: 'attribute.value.css', foreground: 'f472b6' },
        { token: 'type', foreground: 'c084fc' },
        { token: 'delimiter', foreground: '94a3b8' },
        { token: 'delimiter.html', foreground: '6366f1' },
      ],
      colors: {
        'editor.background': '#07090e',
        'editor.foreground': '#f1f5f9',
        'editor.lineHighlightBackground': '#0f1422',
        'editor.lineHighlightBorder': '#00000000',
        'editorLineNumber.foreground': '#334155',
        'editorLineNumber.activeForeground': '#818cf8',
        'editorCursor.foreground': '#818cf8',
        'editor.selectionBackground': '#6366f13d',
        'editor.inactiveSelectionBackground': '#6366f120',
        'editor.selectionHighlightBackground': '#6366f128',
        'editorIndentGuide.background': '#1e293b40',
        'editorIndentGuide.activeBackground': '#6366f160',
        'editorBracketMatch.background': '#6366f125',
        'editorBracketMatch.border': '#6366f180',
        'editorGutter.background': '#07090e',
        'scrollbarSlider.background': '#1e293b80',
        'scrollbarSlider.hoverBackground': '#334155aa',
        'scrollbarSlider.activeBackground': '#6366f180',
        'editorWidget.background': '#0f1422',
        'editorWidget.border': '#6366f140',
        'editorSuggestWidget.background': '#0f1422',
        'editorSuggestWidget.border': '#1e293b',
        'editorSuggestWidget.foreground': '#f1f5f9',
        'editorSuggestWidget.selectedBackground': '#6366f130',
        'editorSuggestWidget.highlightForeground': '#818cf8',
      },
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: '#07090e',
        borderRight: '1px solid rgba(255, 255, 255, 0.08)',
        overflow: 'hidden',
      }}
    >
      <EditorToolbar activeTab={activeTab} onTabChange={setActiveTab} />

      <Box sx={{ flex: 1, minHeight: 0, position: 'relative' }}>
        <Editor
          height="100%"
          language={activeTab === 'html' ? 'html' : activeTab === 'css' ? 'css' : 'javascript'}
          value={getCurrentCode()}
          theme="html-to-visual-dark"
          beforeMount={handleEditorWillMount}
          onChange={handleEditorChange}
          options={{
            fontSize: 13,
            fontFamily: "'Fira Code', 'JetBrains Mono', Menlo, Monaco, Consolas, monospace",
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            automaticLayout: true,
            tabSize: 2,
            padding: { top: 14, bottom: 14 },
            lineNumbersMinChars: 3,
            renderLineHighlight: 'all',
            cursorBlinking: 'smooth',
            smoothScrolling: true,
          }}
        />
      </Box>
    </Box>
  );
}
