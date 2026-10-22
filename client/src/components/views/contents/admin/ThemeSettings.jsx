import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Stack,
  Alert,
  Divider,
  CircularProgress
} from '@mui/material';
import { useThemeUpdater } from '../../utils/ThemeWrapper';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export default function ThemeSettings() {
  const { fetchTheme } = useThemeUpdater();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/theme`)
      .then(async (res) => {
        const contentType = res.headers.get('content-type');
        if (res.ok && contentType && contentType.includes('application/json')) {
          return res.json();
        }
        return null;
      })
      .then((data) => {
        if (data && data.success) {
          setFormData(data.data);
        }
      })
      .catch((err) => console.error('Error fetching theme settings:', err))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    try {
      const res = await fetch(`${API_BASE_URL}/api/theme`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (result.success) {
        setSuccess(true);
        fetchTheme(); // Refreshes global theme across the app
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (err) {
      console.error('Error saving theme', err);
    }
  };

  if (loading || !formData) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress sx={{ color: 'primary.main' }} />
      </Box>
    );
  }

  return (
    <Paper sx={{ p: { xs: 3, sm: 5 }, maxWidth: 800, mx: 'auto', mt: 4, mb: 6, borderRadius: 3 }}>
      <Typography variant="h5" sx={{ mb: 1, color: 'primary.main', fontSize: '1.8rem' }}>
        Customize Theme & Typography
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
        Modify your website’s global color palette and font settings. Changes will reflect instantly across all pages.
      </Typography>

      {success && <Alert severity="success" sx={{ mb: 3 }}>Theme updated successfully! Changes applied globally.</Alert>}

      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={4}>
          
          {/* ================= PALETTE COLORS ================= */}
          <Box>
            <Typography variant="h6" sx={{ mb: 2, color: 'secondary.main' }}>Palette Colors</Typography>
            <Stack spacing={2.5}>
              {/* Primary Main */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
                <TextField
                  label="Primary Color"
                  type="color"
                  value={formData.palette?.primaryMain || '#6B1D2F'}
                  onChange={(e) => handleChange('palette', 'primaryMain', e.target.value)}
                  sx={{ width: { xs: '100%', sm: 150 } }}
                />
                <TextField
                  fullWidth
                  label="Primary Main Hex"
                  value={formData.palette?.primaryMain || ''}
                  onChange={(e) => handleChange('palette', 'primaryMain', e.target.value)}
                />
              </Stack>

              {/* Secondary Main */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
                <TextField
                  label="Secondary Color"
                  type="color"
                  value={formData.palette?.secondaryMain || '#8F3948'}
                  onChange={(e) => handleChange('palette', 'secondaryMain', e.target.value)}
                  sx={{ width: { xs: '100%', sm: 150 } }}
                />
                <TextField
                  fullWidth
                  label="Secondary Main Hex"
                  value={formData.palette?.secondaryMain || ''}
                  onChange={(e) => handleChange('palette', 'secondaryMain', e.target.value)}
                />
              </Stack>

              {/* Text Primary */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
                <TextField
                  label="Text Primary"
                  type="color"
                  value={formData.palette?.textPrimary || '#3B2F2F'}
                  onChange={(e) => handleChange('palette', 'textPrimary', e.target.value)}
                  sx={{ width: { xs: '100%', sm: 150 } }}
                />
                <TextField
                  fullWidth
                  label="Text Primary Hex"
                  value={formData.palette?.textPrimary || ''}
                  onChange={(e) => handleChange('palette', 'textPrimary', e.target.value)}
                />
              </Stack>

              {/* Background Default */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
                <TextField
                  label="Background Default"
                  type="color"
                  value={formData.palette?.backgroundDefault || '#FAF7F2'}
                  onChange={(e) => handleChange('palette', 'backgroundDefault', e.target.value)}
                  sx={{ width: { xs: '100%', sm: 150 } }}
                />
                <TextField
                  fullWidth
                  label="Background Default Hex"
                  value={formData.palette?.backgroundDefault || ''}
                  onChange={(e) => handleChange('palette', 'backgroundDefault', e.target.value)}
                />
              </Stack>
            </Stack>
          </Box>

          <Divider />

          {/* ================= TYPOGRAPHY & FONTS ================= */}
          <Box>
            <Typography variant="h6" sx={{ mb: 2, color: 'secondary.main' }}>Typography & Font Settings</Typography>
            <Stack spacing={2.5}>
              {/* Global Font Family */}
              <TextField
                fullWidth
                label="Global Font Family"
                value={formData.typography?.fontFamily || ''}
                onChange={(e) => handleChange('typography', 'fontFamily', e.target.value)}
                helperText='Example: "Montserrat", sans-serif'
              />

              {/* H1 Settings */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  label="H1 Color"
                  type="color"
                  value={formData.typography?.h1Color || '#6B1D2F'}
                  onChange={(e) => handleChange('typography', 'h1Color', e.target.value)}
                  sx={{ width: { xs: '100%', sm: 150 } }}
                />
                <TextField
                  fullWidth
                  label="H1 Desktop Font Size"
                  value={formData.typography?.h1FontSizeDesktop || ''}
                  onChange={(e) => handleChange('typography', 'h1FontSizeDesktop', e.target.value)}
                  helperText="Example: 6rem"
                />
                <TextField
                  fullWidth
                  label="H1 Mobile Font Size"
                  value={formData.typography?.h1FontSizeMobile || ''}
                  onChange={(e) => handleChange('typography', 'h1FontSizeMobile', e.target.value)}
                  helperText="Example: 3rem"
                />
              </Stack>

              {/* H2 Settings */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  label="H2 Color"
                  type="color"
                  value={formData.typography?.h2Color || '#6B1D2F'}
                  onChange={(e) => handleChange('typography', 'h2Color', e.target.value)}
                  sx={{ width: { xs: '100%', sm: 150 } }}
                />
                <TextField
                  fullWidth
                  label="H2 Desktop Font Size"
                  value={formData.typography?.h2FontSizeDesktop || ''}
                  onChange={(e) => handleChange('typography', 'h2FontSizeDesktop', e.target.value)}
                  helperText="Example: 4rem"
                />
                <TextField
                  fullWidth
                  label="H2 Mobile Font Size"
                  value={formData.typography?.h2FontSizeMobile || ''}
                  onChange={(e) => handleChange('typography', 'h2FontSizeMobile', e.target.value)}
                  helperText="Example: 3.5rem"
                />
              </Stack>

              {/* Subheading Colors */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  label="H5 Subtitle Color"
                  type="color"
                  value={formData.typography?.h5Color || '#8F3948'}
                  onChange={(e) => handleChange('typography', 'h5Color', e.target.value)}
                  sx={{ width: { xs: '100%', sm: 150 } }}
                />
                <TextField
                  fullWidth
                  label="H5 Color Hex"
                  value={formData.typography?.h5Color || ''}
                  onChange={(e) => handleChange('typography', 'h5Color', e.target.value)}
                />
              </Stack>
            </Stack>
          </Box>

          <Button 
            type="submit" 
            variant="contained" 
            size="large" 
            sx={{ py: 1.5, bgcolor: 'primary.main', fontWeight: 600, fontSize: '1rem', letterSpacing: '0.05em' }}
          >
            Save & Apply Theme
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}