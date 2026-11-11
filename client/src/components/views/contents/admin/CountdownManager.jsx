import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Stack,
  Slider,
  TextField,
  FormControlLabel,
  Switch,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
  Divider,
  Grid,
  Container,
  CircularProgress
} from '@mui/material';
import {
  AutoAwesome,
  Save,
  Restore,
  Park,
  EmojiEvents,
  Style,
  CheckCircle
} from '@mui/icons-material';
import { PageTitle } from '../../utils/CustomComponents';

// --- Botanical Side Leaf Sprig SVG ---
function GardenLeafBranch({ color = '#C5A059', scale = 1, flipped = false }) {
  return (
    <svg
      viewBox="0 0 70 140"
      width={45 * scale}
      height={90 * scale}
      style={{
        transform: flipped ? 'scaleX(-1)' : 'none',
        filter: `drop-shadow(0px 2px 6px ${color}40)`,
        transition: 'all 0.3s ease',
      }}
      fill="none"
    >
      <path
        d="M 15 125 C 28 88 32 52 42 15"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M 42 15 C 36 3 48 -2 50 12 C 45 22 42 15 42 15 Z" fill={color} />
      <path d="M 38 30 C 54 22 62 30 48 40 C 38 38 38 30 38 30 Z" fill={color} />
      <path d="M 34 38 C 18 28 12 38 24 45 C 32 42 34 38 34 38 Z" fill={color} />
      <path d="M 32 58 C 52 50 58 60 42 70 C 32 66 32 58 32 58 Z" fill={color} />
      <path d="M 28 65 C 10 55 4 65 18 74 C 28 70 28 65 28 65 Z" fill={color} />
      <path d="M 24 88 C 45 82 50 94 34 100 C 24 94 24 88 24 88 Z" fill={color} />
      <path d="M 20 95 C 2 85 -3 98 12 104 C 22 100 20 95 20 95 Z" fill={color} />
      <circle cx="36" cy="26" r="2.5" fill={color} opacity="0.9" />
      <circle cx="28" cy="50" r="2.8" fill={color} opacity="0.9" />
      <circle cx="22" cy="78" r="2.2" fill={color} opacity="0.9" />
    </svg>
  );
}

// --- Royal Victorian Filigree Crest ---
function RoyalFiligreeCrest({ color = '#C5A059', flipped = false, width = 200 }) {
  return (
    <svg
      width={width}
      height={width * 0.2}
      viewBox="0 0 200 40"
      fill="none"
      style={{
        transform: flipped ? 'scaleY(-1)' : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      <path
        d="M 100 4 C 94 14 88 22 100 36 C 112 22 106 14 100 4 Z"
        fill={color}
      />
      <path
        d="M 100 12 C 92 18 88 22 100 28 C 112 22 108 18 100 12 Z"
        fill="#FFF"
        opacity="0.35"
      />
      <path
        d="M 92 22 C 68 22 48 12 28 18 C 16 22 10 32 2 24 C -4 16 4 8 12 12 C 20 16 26 10 38 8 C 58 6 78 16 90 20"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M 108 22 C 132 22 152 12 172 18 C 184 22 190 32 198 24 C 204 16 196 8 188 12 C 180 16 174 10 162 8 C 142 6 122 16 110 20"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path d="M 68 14 C 58 8 48 12 58 18 Z" fill={color} />
      <path d="M 132 14 C 142 8 152 12 142 18 Z" fill={color} />
      <circle cx="100" cy="38" r="2.2" fill={color} />
    </svg>
  );
}

export default function AdminCountdownConfig() {
  // Config State
  const [themeStyle, setThemeStyle] = useState('garden'); // 'garden' | 'royal' | 'celestial' | 'editorial'
  const [primaryColor, setPrimaryColor] = useState('#6B1D2F');
  const [goldColor, setGoldColor] = useState('#C5A059');
  const [labelColor, setLabelColor] = useState('#4A3B32');
  const [bgOpacity, setBgOpacity] = useState(0.92);
  const [borderRadius, setBorderRadius] = useState(16);
  const [showOrnaments, setShowOrnaments] = useState(true);
  const [enableGlow, setEnableGlow] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);

  const sampleTime = { days: 247, hours: 15, minutes: 11, seconds: 9 };
  const timeUnits = [
    { label: 'DAYS', value: sampleTime.days },
    { label: 'HOURS', value: sampleTime.hours },
    { label: 'MINUTES', value: sampleTime.minutes },
    { label: 'SECONDS', value: sampleTime.seconds },
  ];

  const handleApplyPreset = (preset) => {
    setThemeStyle(preset);
    if (preset === 'garden') {
      setPrimaryColor('#6B1D2F');
      setGoldColor('#C5A059');
      setLabelColor('#4A3B32');
      setBorderRadius(16);
      setBgOpacity(0.92);
    } else if (preset === 'royal') {
      setPrimaryColor('#58111A');
      setGoldColor('#D4AF37');
      setLabelColor('#382823');
      setBorderRadius(8);
      setBgOpacity(0.96);
    } else if (preset === 'celestial') {
      setPrimaryColor('#7B1E38');
      setGoldColor('#E2C071');
      setLabelColor('#5C4A42');
      setBorderRadius(24);
      setBgOpacity(0.85);
    } else if (preset === 'editorial') {
      setPrimaryColor('#1A1A1A');
      setGoldColor('#C5A059');
      setLabelColor('#666666');
      setBorderRadius(4);
      setBgOpacity(0.98);
    }
  };

  const handleSaveConfig = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setToastOpen(true);
    }, 600);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <PageTitle
        title="Countdown Timer Style"
        subtitle="Dynamically customize the visual theme, colors, opacity, and botanical leaf sprigs of your website timer."
      />

      {/* ======================================================== */}
      {/* --- LIVE PREVIEW AREA --- */}
      {/* ======================================================== */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, sm: 6 },
          mb: 4,
          borderRadius: 4,
          bgcolor: 'rgba(255, 255, 255, 0.75)',
          border: '1px solid rgba(197, 160, 89, 0.3)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Typography variant="overline" sx={{ letterSpacing: '0.25em', color: goldColor, fontWeight: 700, mb: 3, display: 'block' }}>
          — Live Website Preview —
        </Typography>

        {themeStyle === 'royal' && showOrnaments && (
          <Box display="flex" justifyContent="center" mb={1.5}>
            <RoyalFiligreeCrest color={goldColor} width={180} />
          </Box>
        )}

        <Box sx={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '100%', maxWidth: '685px', mx: 'auto' }}>
          {showOrnaments && themeStyle === 'garden' && (
            <Box sx={{ position: 'absolute', left: { xs: '-10px', sm: '-40px' }, top: '50%', transform: 'translateY(-50%)', zIndex: 2 }}>
              <GardenLeafBranch color={goldColor} scale={1} />
            </Box>
          )}
          {showOrnaments && themeStyle === 'garden' && (
            <Box sx={{ position: 'absolute', right: { xs: '-10px', sm: '-40px' }, top: '50%', transform: 'translateY(-50%)', zIndex: 2 }}>
              <GardenLeafBranch color={goldColor} scale={1} flipped={true} />
            </Box>
          )}

          <Paper
            elevation={0}
            sx={{
              width: '100%',
              bgcolor: `rgba(255, 255, 255, ${bgOpacity})`,
              borderRadius: `${borderRadius}px`,
              border: themeStyle === 'editorial' ? `2px solid ${primaryColor}` : `1.5px solid ${goldColor}`,
              py: 3.5,
              px: 2,
              boxShadow: enableGlow ? `inset 0 2px 10px rgba(0,0,0,0.04), 0 8px 30px ${goldColor}25` : 'none',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            {timeUnits.map((unit, idx) => (
              <React.Fragment key={unit.label}>
                <Box sx={{ flex: 1, textAlign: 'center' }}>
                  <Typography
                    sx={{
                      fontFamily: themeStyle === 'celestial' ? '"Great Vibes", cursive' : '"Cormorant Garamond", serif',
                      fontSize: { xs: '1.8rem', sm: '2.8rem' },
                      color: primaryColor,
                      fontWeight: themeStyle === 'celestial' ? 400 : 500,
                      lineHeight: 1,
                    }}
                  >
                    {String(unit.value).padStart(2, '0')}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      display: 'block',
                      mt: 1,
                      letterSpacing: '0.22em',
                      color: labelColor,
                      fontWeight: 600,
                      fontSize: { xs: '0.55rem', sm: '0.7rem' },
                    }}
                  >
                    {unit.label}
                  </Typography>
                </Box>
                {idx < timeUnits.length - 1 && (
                  <Box sx={{ width: '1px', height: '42px', bgcolor: goldColor, opacity: 0.35 }} />
                )}
              </React.Fragment>
            ))}
          </Paper>
        </Box>

        {themeStyle === 'royal' && showOrnaments && (
          <Box display="flex" justifyContent="center" mt={1.5}>
            <RoyalFiligreeCrest color={goldColor} width={180} flipped={true} />
          </Box>
        )}
      </Paper>

      {/* ======================================================== */}
      {/* --- CUSTOMIZATION CONTROLS PANEL --- */}
      {/* ======================================================== */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, sm: 4 },
          borderRadius: 3,
          bgcolor: '#FFFFFF',
          border: '1px solid rgba(107, 29, 47, 0.12)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', mb: 3 }}>
          <Typography variant="h6" sx={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 700, color: '#6B1D2F' }}>
            Countdown Visual Settings
          </Typography>
          <Tooltip title="Reset to Defaults">
            <IconButton onClick={() => handleApplyPreset('garden')} size="small" color="primary" sx={{ flexShrink: 0 }}>
              <Restore />
            </IconButton>
          </Tooltip>
        </Box>

        {/* PRESET THEME BUTTONS */}
        <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 700 }}>
          Choose Preset Design Theme:
        </Typography>
        <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap sx={{ mb: 4 }}>
          {[
            { id: 'garden', label: '1. Enchanted Garden', icon: <Park fontSize="small" /> },
            { id: 'royal', label: '2. Royal Filigree', icon: <EmojiEvents fontSize="small" /> },
            { id: 'celestial', label: '3. Celestial Fairy', icon: <AutoAwesome fontSize="small" /> },
            { id: 'editorial', label: '4. Minimalist Monogram', icon: <Style fontSize="small" /> },
          ].map((preset) => (
            <Button
              key={preset.id}
              variant={themeStyle === preset.id ? 'contained' : 'outlined'}
              onClick={() => handleApplyPreset(preset.id)}
              startIcon={preset.icon}
              sx={{
                borderRadius: 2.5,
                px: 2.5,
                py: 1,
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.85rem',
                bgcolor: themeStyle === preset.id ? '#6B1D2F' : 'transparent',
                color: themeStyle === preset.id ? '#FFF' : '#3A2E2B',
                borderColor: themeStyle === preset.id ? '#6B1D2F' : 'rgba(107, 29, 47, 0.25)',
                '&:hover': {
                  bgcolor: themeStyle === preset.id ? '#8B263E' : 'rgba(107, 29, 47, 0.05)',
                }
              }}
            >
              {preset.label}
            </Button>
          ))}
        </Stack>

        <Divider sx={{ mb: 3 }} />

        {/* COLOR PICKERS */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={4}>
            <Typography variant="caption" sx={{ color: '#666', fontWeight: 600, display: 'block', mb: 0.5 }}>
              Number Color (Burgundy/Wine)
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
              <Box
                component="input"
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                sx={{
                  width: '40px',
                  height: '40px',
                  minWidth: '40px',
                  p: 0.5,
                  borderRadius: '6px',
                  border: '1px solid rgba(0, 0, 0, 0.23)',
                  bgcolor: '#fff',
                  cursor: 'pointer',
                  '&::-webkit-color-swatch-wrapper': { p: 0 },
                  '&::-webkit-color-swatch': { border: 'none', borderRadius: '4px' }
                }}
              />
              <TextField 
                size="small" 
                value={primaryColor} 
                onChange={(e) => setPrimaryColor(e.target.value)} 
                fullWidth 
                sx={{ '& .MuiOutlinedInput-root': { height: '40px' } }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="caption" sx={{ color: '#666', fontWeight: 600, display: 'block', mb: 0.5 }}>
              Gold Accent / Border Color
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
              <Box
                component="input"
                type="color"
                value={goldColor}
                onChange={(e) => setGoldColor(e.target.value)}
                sx={{
                  width: '40px',
                  height: '40px',
                  minWidth: '40px',
                  p: 0.5,
                  borderRadius: '6px',
                  border: '1px solid rgba(0, 0, 0, 0.23)',
                  bgcolor: '#fff',
                  cursor: 'pointer',
                  '&::-webkit-color-swatch-wrapper': { p: 0 },
                  '&::-webkit-color-swatch': { border: 'none', borderRadius: '4px' }
                }}
              />
              <TextField 
                size="small" 
                value={goldColor} 
                onChange={(e) => setGoldColor(e.target.value)} 
                fullWidth 
                sx={{ '& .MuiOutlinedInput-root': { height: '40px' } }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="caption" sx={{ color: '#666', fontWeight: 600, display: 'block', mb: 0.5 }}>
              Label Text Color
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
              <Box
                component="input"
                type="color"
                value={labelColor}
                onChange={(e) => setLabelColor(e.target.value)}
                sx={{
                  width: '40px',
                  height: '40px',
                  minWidth: '40px',
                  p: 0.5,
                  borderRadius: '6px',
                  border: '1px solid rgba(0, 0, 0, 0.23)',
                  bgcolor: '#fff',
                  cursor: 'pointer',
                  '&::-webkit-color-swatch-wrapper': { p: 0 },
                  '&::-webkit-color-swatch': { border: 'none', borderRadius: '4px' }
                }}
              />
              <TextField 
                size="small" 
                value={labelColor} 
                onChange={(e) => setLabelColor(e.target.value)} 
                fullWidth 
                sx={{ '& .MuiOutlinedInput-root': { height: '40px' } }}
              />
            </Box>
          </Grid>
        </Grid>

        {/* SLIDERS & SWITCHES */}
        <Grid container spacing={4} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="caption" sx={{ color: '#666', fontWeight: 600 }}>
              Background Fill Opacity ({Math.round(bgOpacity * 100)}%)
            </Typography>
            <Slider value={bgOpacity} min={0.2} max={1} step={0.05} onChange={(e, val) => setBgOpacity(val)} sx={{ color: '#6B1D2F' }} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="caption" sx={{ color: '#666', fontWeight: 600 }}>
              Corner Radius ({borderRadius}px)
            </Typography>
            <Slider value={borderRadius} min={0} max={32} step={2} onChange={(e, val) => setBorderRadius(val)} sx={{ color: '#6B1D2F' }} />
          </Grid>
        </Grid>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
          <FormControlLabel
            control={<Switch checked={showOrnaments} onChange={(e) => setShowOrnaments(e.target.checked)} color="primary" />}
            label="Enable SVG Ornaments & Leaf Sprigs"
          />
          <FormControlLabel
            control={<Switch checked={enableGlow} onChange={(e) => setEnableGlow(e.target.checked)} color="primary" />}
            label="Enable Soft Ambient Glow Shadow"
          />
        </Stack>

        <Divider sx={{ my: 4 }} />

        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" spacing={2}>
          <Button
            variant="contained"
            size="large"
            startIcon={saving ? <CircularProgress size={20} color="inherit" /> : <Save />}
            onClick={handleSaveConfig}
            disabled={saving}
            sx={{
              bgcolor: '#6B1D2F',
              color: '#ffffff',
              px: 5,
              borderRadius: 2.5,
              fontWeight: 700,
              textTransform: 'none',
              boxShadow: '0 4px 12px rgba(107, 29, 47, 0.2)',
              '&:hover': {
                bgcolor: '#8B263E',
              },
            }}
          >
            {saving ? 'Publishing...' : 'Save & Publish Changes'}
          </Button>
        </Stack>
      </Paper>

      <Snackbar
        open={toastOpen}
        autoHideDuration={3000}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setToastOpen(false)} severity="success" icon={<CheckCircle fontSize="inherit" />} sx={{ width: '100%', borderRadius: 2 }}>
          Countdown style settings successfully saved and published!
        </Alert>
      </Snackbar>
    </Container>
  );
}