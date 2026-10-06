'use client';

import { createTheme, alpha } from '@mui/material/styles';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6366f1', // Indigo glow
      light: '#818cf8',
      dark: '#4f46e5',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#a855f7', // Purple neon
      light: '#c084fc',
      dark: '#7e22ce',
      contrastText: '#ffffff',
    },
    info: {
      main: '#06b6d4', // Cyan accent
      light: '#22d3ee',
      dark: '#0891b2',
    },
    success: {
      main: '#10b981', // Emerald
      light: '#34d399',
      dark: '#059669',
    },
    warning: {
      main: '#f59e0b', // Amber
      light: '#fbbf24',
      dark: '#d97706',
    },
    error: {
      main: '#ef4444', // Rose red
      light: '#f87171',
      dark: '#dc2626',
    },
    background: {
      default: '#07090e', // Deep cosmic black
      paper: '#0f1422',   // Elevated dark panel
    },
    text: {
      primary: '#f1f5f9',
      secondary: '#94a3b8',
      disabled: '#475569',
    },
    divider: 'rgba(255, 255, 255, 0.08)',
    action: {
      hover: 'rgba(255, 255, 255, 0.05)',
      selected: 'rgba(99, 102, 241, 0.16)',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 800,
      letterSpacing: '-0.025em',
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h5: {
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h6: {
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    subtitle1: {
      fontSize: '0.95rem',
      fontWeight: 500,
    },
    body2: {
      fontSize: '0.8125rem',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#07090e',
          color: '#f1f5f9',
          scrollbarColor: '#1e293b #07090e',
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            width: 8,
            height: 8,
            backgroundColor: '#07090e',
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            borderRadius: 8,
            backgroundColor: '#1e293b',
            minHeight: 24,
            border: '2px solid #07090e',
            '&:hover': {
              backgroundColor: '#334155',
            },
          },
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#0f1422',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.36)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '6px 14px',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
          boxShadow: '0 0 20px rgba(99, 102, 241, 0.35)',
          '&:hover': {
            background: 'linear-gradient(135deg, #818cf8 0%, #6366f1 100%)',
            boxShadow: '0 0 26px rgba(99, 102, 241, 0.55)',
            transform: 'translateY(-1px)',
          },
        },
        containedSecondary: {
          background: 'linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)',
          boxShadow: '0 0 20px rgba(168, 85, 247, 0.35)',
          '&:hover': {
            background: 'linear-gradient(135deg, #c084fc 0%, #a855f7 100%)',
            boxShadow: '0 0 26px rgba(168, 85, 247, 0.55)',
            transform: 'translateY(-1px)',
          },
        },
        outlined: {
          borderColor: 'rgba(255, 255, 255, 0.14)',
          '&:hover': {
            borderColor: 'rgba(255, 255, 255, 0.3)',
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 600,
          border: '1px solid rgba(255, 255, 255, 0.08)',
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          color: '#6366f1',
          height: 6,
        },
        thumb: {
          width: 14,
          height: 14,
          backgroundColor: '#fff',
          boxShadow: '0 0 10px rgba(99, 102, 241, 0.6)',
          '&:hover, &.Mui-focusVisible': {
            boxShadow: '0 0 14px rgba(99, 102, 241, 0.9)',
          },
        },
        rail: {
          backgroundColor: 'rgba(255, 255, 255, 0.12)',
        },
        track: {
          background: 'linear-gradient(90deg, #6366f1, #a855f7)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#0a0d16',
            borderRadius: 8,
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.1)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.25)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#6366f1',
              boxShadow: '0 0 12px rgba(99, 102, 241, 0.25)',
            },
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#182032',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          color: '#f8fafc',
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.5)',
          fontSize: '0.75rem',
          borderRadius: 6,
        },
        arrow: {
          color: '#182032',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#0d121f',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 35px rgba(99, 102, 241, 0.1)',
          backdropFilter: 'blur(16px)',
          borderRadius: 14,
        },
      },
    },
  },
});
