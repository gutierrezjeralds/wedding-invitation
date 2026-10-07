import { createTheme } from '@mui/material/styles';
const defaultTheme = createTheme();
const theme = createTheme({
  palette: {
    primary: {
      main: '#6B1D2F',       // Wine Red
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#8F3948',       // Burgundy
      contrastText: '#2B1B17',
    },
    text: {
      primary: '#3B2F2F',    // Espresso (Body Text)
      secondary: '#000000',  // Black (Captions & Accents)
    },
    background: {
      default: '#FAF7F2',    // Warm Ivory
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: '"Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    
    // Title Header (Default variant: h2, rendering component: h1)
    h1: {
      fontFamily: '"Great Vibes", cursive',
      color: '#6B1D2F',      // Wine Red (Primary)
      fontWeight: 400,
      lineHeight: 1.2,
      fontSize: '6rem', // Default desktop font size

      // Responsive font size for mobile (down to 'sm' breakpoint)
      [defaultTheme.breakpoints.down('sm')]: {
        fontSize: '3rem', // Matches standard h2 scale on mobile
      },
    },

    // Title Header (Default variant: h2, rendering component: h1)
    h2: {
      fontFamily: '"Great Vibes", cursive',
      color: '#6B1D2F',      // Wine Red (Primary)
      fontWeight: 400,
      lineHeight: 1.2,
    },

    // Sub Title Header 1, rendering component: div
    h5: {
      fontFamily: '"Cormorant Garamond", serif',
      color: '#8F3948',      // Burgundy (Secondary)
      fontWeight: 600,
      lineHeight: 1.4,
    },

    // Sub Title Header 2
    h6: {
      fontFamily: '"Cormorant SC", serif',
      color: '#3B2F2F',      // Espresso
      fontWeight: 700,
      lineHeight: 1.4,
    },

    // Body Text
    body1: {
      fontFamily: '"Montserrat", sans-serif',
      color: '#3B2F2F',      // Espresso
      fontSize: '1rem',
      lineHeight: 1.6,
    },

    // Captions & Small Labels
    caption: {
      fontFamily: '"Cormorant Garamond", serif',
      color: '#000000',      // Black
      fontSize: '0.95rem',
      fontStyle: 'italic',
      lineHeight: 1.4,
    },
  },
  components: {
    // Default Prop Overrides across the entire application
    MuiTypography: {
      defaultProps: {
        // Enforce component & variant mappings globally
        variantMapping: {
          h2: 'h1',          // When variant="h2" is used, render <h1> tag in DOM
          h5: 'div',         // When variant="h5" is used, render <div> tag in DOM
        },
      },
    },
  },
});

export default theme;