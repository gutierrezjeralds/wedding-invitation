import React, { useState } from 'react';
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

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';

export default function AdminLoginModal({ open, onSuccess, onCancel }) {
  const [passwordInput, setPasswordInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      sessionStorage.setItem('isAdminAuthenticated', 'true');
      setErrorMsg('');
      onSuccess(); // Let parent know authentication passed
    } else {
      setErrorMsg('Incorrect password. Please try again.');
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onCancel}
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
            onClick={onCancel}
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