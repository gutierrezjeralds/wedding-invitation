import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CircularProgress, Box } from '@mui/material';

const ThemeUpdateContext = createContext(null);

export function useThemeUpdater() {
  const context = useContext(ThemeUpdateContext);
  // Safe fallback to prevent crashes if rendered outside the provider
  return context || { fetchTheme: () => {} };
}

export default function DynamicThemeProvider({ children }) {
  const [themeConfig, setThemeConfig] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTheme = async () => {
    try {
      const res = await fetch('/api/theme');
      const result = await res.json();
      if (result.success) {
        setThemeConfig(result.data);
      }
    } catch (err) {
      console.error('Failed to load dynamic theme, falling back to default', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTheme();
  }, []);

  const theme = useMemo(() => {
    const defaultTheme = createTheme();
    const p = themeConfig?.palette || {};
    const t = themeConfig?.typography || {};

    return createTheme({
      palette: {
        primary: {
          main: p.primaryMain || '#6B1D2F',
          contrastText: p.primaryContrastText || '#FFFFFF',
        },
        secondary: {
          main: p.secondaryMain || '#8F3948',
          contrastText: p.secondaryContrastText || '#2B1B17',
        },
        text: {
          primary: p.textPrimary || '#3B2F2F',
          secondary: p.textSecondary || '#000000',
        },
        background: {
          default: p.backgroundDefault || '#FAF7F2',
          paper: p.backgroundPaper || '#FFFFFF',
        },
      },
      typography: {
        fontFamily: t.fontFamily || '"Montserrat", sans-serif',
        h1: {
          fontFamily: '"Great Vibes", cursive',
          color: t.h1Color || '#6B1D2F',
          fontWeight: 400,
          lineHeight: 1.2,
          fontSize: t.h1FontSizeDesktop || '6rem',
          [defaultTheme.breakpoints.down('sm')]: {
            fontSize: t.h1FontSizeMobile || '3rem',
          },
        },
        h2: {
          fontFamily: '"Great Vibes", cursive',
          color: t.h2Color || '#6B1D2F',
          fontWeight: 400,
          lineHeight: 1.2,
          fontSize: t.h2FontSizeDesktop || '4rem',
          [defaultTheme.breakpoints.down('sm')]: {
            fontSize: t.h2FontSizeMobile || '3.5rem',
          },
        },
        h5: {
          fontFamily: '"Cormorant Garamond", serif',
          color: t.h5Color || '#8F3948',
          fontWeight: 600,
          lineHeight: 1.4,
        },
        h6: {
          fontFamily: '"Cormorant SC", serif',
          color: t.h6Color || '#3B2F2F',
          fontWeight: 700,
          lineHeight: 1.4,
        },
        body1: {
          fontFamily: '"Montserrat", sans-serif',
          color: p.textPrimary || '#3B2F2F',
          fontSize: '1rem',
          lineHeight: 1.6,
        },
        caption: {
          fontFamily: '"Cormorant Garamond", serif',
          color: p.textSecondary || '#000000',
          fontSize: '0.95rem',
          fontStyle: 'italic',
          lineHeight: 1.4,
        },
      },
      components: {
        MuiTypography: {
          defaultProps: {
            variantMapping: {
              h2: 'h1',
              h5: 'div',
            },
          },
        },
      },
    });
  }, [themeConfig]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: '#FAF7F2' }}>
        <CircularProgress sx={{ color: '#6B1D2F' }} />
      </Box>
    );
  }

  return (
    <ThemeUpdateContext.Provider value={{ fetchTheme }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeUpdateContext.Provider>
  );
}