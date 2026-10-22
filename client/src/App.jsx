import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  Alert
} from '@mui/material';
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
import RsvpReport from './components/views/contents/admin/RsvpReport';
import ScrollToTop from './components/views/utils/ScrollToTop';
import BackgroundMusic from './components/views/utils/BackgroundMusic';
// import { useDrivePhotos } from './components/views/utils/GDrive';

// Password configuration (defaults to 'admin123' or environment variable)
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';

// ============================================================
// Protected Route Component with Password Popup Modal
// ============================================================
function AdminProtectedRoute({ children }) {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('isAdminAuthenticated') === 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      sessionStorage.setItem('isAdminAuthenticated', 'true');
      setIsAuthenticated(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Incorrect password. Please try again.');
    }
  };

  const handleCancel = () => {
    navigate('/', { replace: true });
  };

  // If already authenticated, display admin page directly
  if (isAuthenticated) {
    return children;
  }

  // Otherwise, display Password Authentication Modal
  return (
    <Dialog
      open={!isAuthenticated}
      onClose={handleCancel}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 1,
          border: '1px solid rgba(107, 29, 47, 0.2)',
          bgcolor: 'background.paper',
        },
      }}
    >
      <DialogTitle
        sx={{
          fontFamily: '"Cormorant Garamond", serif',
          fontWeight: 700,
          color: 'primary.main',
          fontSize: '1.5rem',
          textAlign: 'center',
          pb: 1,
        }}
      >
        Admin Access Required
      </DialogTitle>

      <Box component="form" onSubmit={handlePasswordSubmit}>
        <DialogContent>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, textAlign: 'center' }}>
            Please enter the password to access the administrator dashboard.
          </Typography>

          {errorMsg && (
            <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
              {errorMsg}
            </Alert>
          )}

          <TextField
            autoFocus
            fullWidth
            type="password"
            label="Password"
            variant="outlined"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: 'background.default',
                '& fieldset': { borderColor: 'rgba(107, 29, 47, 0.2)' },
                '&:hover fieldset': { borderColor: 'primary.main' },
                '&.Mui-focused fieldset': { borderColor: 'primary.main' },
              },
              '& .MuiInputLabel-root.Mui-focused': { color: 'primary.main' },
            }}
          />
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2, justifyContent: 'space-between' }}>
          <Button
            onClick={handleCancel}
            sx={{ color: 'text.secondary', fontWeight: 600 }}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="contained"
            sx={{
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              px: 3,
              fontWeight: 600,
              borderRadius: 2,
              '&:hover': { bgcolor: 'secondary.main' },
            }}
          >
            Unlock
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}

// ============================================================
// Main App Component
// ============================================================
export default function App() {
  const location = useLocation();

  // Array of paths where the Header should NOT appear
  const isProposalPath = location.pathname.startsWith('/proposal');
  const hideHeaderOnPaths = ['/', '/envelope', '/home', '/cover', '/admin', '/admin/rsvp'];
  const showHeader = !hideHeaderOnPaths.includes(location.pathname) && !isProposalPath;

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

        {/* Protected Admin Routes */}
        <Route path="/admin" element={<Navigate to="/admin/rsvp" replace />} />
        <Route
          path="/admin/rsvp"
          element={
            <AdminProtectedRoute>
              <RsvpReport />
            </AdminProtectedRoute>
          }
        />

        {/* Fallback routing */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {showHeader && <Footer />}
    </React.Fragment>
  );
}