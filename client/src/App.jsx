import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, CircularProgress } from '@mui/material';
import { ContentProvider, useContent } from './components/views/utils/ConstantContent';
import DynamicThemeProvider from './components/views/utils/ThemeWrapper';
import { MediaProvider } from './components/views/utils/MediaContext';

// Pages
import Header from './components/views/Header';
import Footer from './components/views/Footer';
import Envelope from './components/views/contents/Envelope';
import Cover from './components/views/contents/Cover';
import Home from './components/views/contents/Home';
import Story from './components/views/contents/Story';
import Wedding from './components/views/contents/Wedding';
import Entourage from './components/views/contents/Entourage';
import Attire from './components/views/contents/Attire';
import Faq from './components/views/contents/Faq';
import Gift from './components/views/contents/Gift';
import RSVP from './components/views/contents/Rsvp';
import Proposal from './components/views/contents/Proposal';

// Admin Imports
import AdminLoginModal from './components/views/contents/admin/LoginModal';
import AdminLayout from './components/views/contents/admin/AdminLayout';
import AdminHome from './components/views/contents/admin/Home';
import ContentManager from './components/views/contents/admin/ContentManager';
import CountdownConfig from './components/views/contents/admin/CountdownManager'
import MediaManager from './components/views/contents/admin/MediaManager';
import MusicManager from './components/views/contents/admin/MusicManager';
import RsvpReport from './components/views/contents/admin/RsvpReport';
import ThemeSettings from './components/views/contents/admin/ThemeSettings';

import ScrollToTop from './components/views/utils/ScrollToTop';
import BackgroundMusic from './components/views/utils/BackgroundMusic';
import WeddingDetailsFab from './components/views/utils/WeddingDetailsFab';

// ============================================================
// Protected Route Component using the separate Modal
// ============================================================
function AdminProtectedRoute({ children }) {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('isAdminAuthenticated') === 'true';
  });

  const handleCancel = () => {
    navigate('/', { replace: true });
  };

  if (isAuthenticated) {
    return children;
  }

  return (
    <AdminLoginModal
      open={!isAuthenticated}
      onSuccess={() => setIsAuthenticated(true)}
      onCancel={handleCancel}
    />
  );
}

// ============================================================
// Main App Routes
// ============================================================
function AppRoutes() {
  const [hasMusicVisible, setHasMusicVisible] = useState(true);
  const { loading } = useContent();
  const location = useLocation();

  // Show a full-screen loading spinner until all page content is preloaded
  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: '#faf8f5',
        }}
      >
        <CircularProgress color="primary" />
        <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
          Loading wedding invitation...
        </Typography>
      </Box>
    );
  }

  // Array of paths where public Header/Footer should NOT appear
  const isProposalPath = location.pathname.startsWith('/proposal');
  const isAdminPath = location.pathname.startsWith('/admin');
  const hideHeaderOnPaths = ['/', '/envelope', '/home', '/cover'];
  const showHeader = !hideHeaderOnPaths.includes(location.pathname) && !isProposalPath && !isAdminPath;

  return (
    <React.Fragment>
      <ScrollToTop />
      {showHeader && <Header />}

      <Routes>
        {/* Default Landing */}
        <Route path="/" element={<Navigate to="/envelope" replace />} />

        <Route path="/envelope" element={<Envelope />} />
        <Route path="/cover" element={<Cover />} />
        <Route path="/home" element={<Home />} />
        <Route path="/story" element={<Story />} />
        <Route path="/wedding" element={<Wedding />} />
        <Route path="/entourage" element={<Entourage />} />
        <Route path="/attire" element={<Attire />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/gift" element={<Gift />} />
        <Route path="/rsvp" element={<RSVP />} />

        {/* Proposal */}
        <Route path="/proposal/:sId/:sName" element={<Proposal />} />

        {/* Protected Admin Routes with Sidebar Layout */}
        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <AdminLayout />
            </AdminProtectedRoute>
          }
        >
          <Route index element={<AdminHome />} />
          <Route path="content" element={<ContentManager />} />
          <Route path="countdown" element={<CountdownConfig />} />
          <Route path="media" element={<MediaManager />} />
          <Route path="music" element={<MusicManager />} />
          <Route path="rsvp" element={<RsvpReport />} />
          <Route path="theme" element={<ThemeSettings />} />
        </Route>

        {/* Fallback routing */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {showHeader && <Footer />}

      <WeddingDetailsFab isAdminPath={isAdminPath} hasMusic={hasMusicVisible} />
      <BackgroundMusic isAdminPath={isAdminPath} onMusicStateChange={setHasMusicVisible} />
    </React.Fragment>
  );
}

export default function App() {
  return (
    <ContentProvider>
      <DynamicThemeProvider>
        <MediaProvider>
          <AppRoutes />
        </MediaProvider>
      </DynamicThemeProvider>
    </ContentProvider>
  );
}