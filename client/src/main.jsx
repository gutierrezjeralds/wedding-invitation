import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import './locale/i18n'; // Initializes i18n auto-detection on load
import './components/assets/sass/screen.scss';

import DynamicThemeProvider from './components/views/utils/ThemeWrapper';
import { MediaProvider } from './components/views/utils/MediaContext';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DynamicThemeProvider>
      <MediaProvider>
        <BrowserRouter>
          <CssBaseline />
          <App />
        </BrowserRouter>
      </MediaProvider>
    </DynamicThemeProvider>
  </React.StrictMode>
);