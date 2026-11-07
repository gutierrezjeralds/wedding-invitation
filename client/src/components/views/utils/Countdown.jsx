import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { useContent } from '../utils/ConstantContent';

export default function LuxuryCountdownTimer() {
  // Retrieval from context cache
  const { getPageContent } = useContent();
  const CONTENT = getPageContent('global');

  // Extract wedding date from CONTENT with fallback to default
  const targetDateString = CONTENT?.WEDDING_DATE;
  const targetTimestamp = new Date(targetDateString).getTime();

  // Dynamically derive motif/color settings from ATTIRE_COLORS if available
  const attireColors = CONTENT?.ATTIRE_COLORS;
  let primaryColor = '#7A1424'; // Default Wine Red
  let labelColor = '#8F3948';   // Default Accent
  let borderColor = '#F7E7CE';  // Default Gold Border

  if (attireColors && typeof attireColors === 'object') {
    const colorValues = Object.values(attireColors);
    if (colorValues.length > 0 && colorValues[0]?.HEX) {
      primaryColor = colorValues[0].HEX;
    }
  }

  // ==========================================
  // 🎨 GLOBAL CONFIGURATION
  // ==========================================
  const GLOBAL_CONFIG = {
    TARGET_DATE: targetDateString,
    
    // Color Palette bound dynamically from ATTIRE_COLORS / Theme
    NUMBER_COLOR: primaryColor,
    LABEL_COLOR: labelColor,
    BORDER_COLOR: borderColor,
    COLON_COLOR: primaryColor,
    CARD_BACKGROUND: 'rgba(255, 255, 255, 0.05)', // Transparent Glass Fill

    // Sizing & Scaling (Adjust values to scale the entire component)
    SIZE: {
      numberFontSize: { xs: '1.5rem', sm: '1.8rem', md: '1.8rem' }, // Number text size
      labelFontSize: { xs: '0.45rem', sm: '0.55rem' },              // Label text size
      cardPadding: { xs: 1.5, sm: 1.5, md: 1.5 },                     // Card internal padding
      minCardWidth: { xs: 65, sm: 65, md: 80 },                   // Minimum card width
      colonSize: { xs: '2rem', sm: '2rem' },                    // Separator colon size
      gap: { xs: 1, sm: 1, md: 1 },                               // Gap between cards
    },
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const now = new Date().getTime();
    const difference = targetTimestamp - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetTimestamp]);

  const timeUnits = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: timeLeft.hours },
    { label: 'MINUTES', value: timeLeft.minutes },
    { label: 'SECONDS', value: timeLeft.seconds },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center', // Centers horizontally
        alignItems: 'center',     // Centers vertically
        width: '100%',             // Takes full parent width for proper centering
        mx: 'auto',                // Margin auto horizontal centering
        gap: GLOBAL_CONFIG.SIZE.gap,
        flexWrap: 'nowrap',
        py: 2,
      }}
    >
      {timeUnits.map((unit, index) => (
        <React.Fragment key={unit.label}>
          <Paper
            elevation={0}
            sx={{
              background: GLOBAL_CONFIG.CARD_BACKGROUND,
              backdropFilter: 'blur(12px)',
              border: `1px solid ${GLOBAL_CONFIG.BORDER_COLOR}`,
              borderRadius: '8px',
              p: GLOBAL_CONFIG.SIZE.cardPadding,
              minWidth: GLOBAL_CONFIG.SIZE.minCardWidth,
              textAlign: 'center',
              boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.25)',
              transition: 'transform 0.3s ease, border-color 0.3s ease',
              '&:hover': {
                transform: 'translateY(-3px)',
                borderColor: GLOBAL_CONFIG.BORDER_COLOR,
              },
            }}
          >
            <Typography
              sx={{
                fontFamily: '"Cormorant Garamond", "Playfair Display", serif',
                fontSize: GLOBAL_CONFIG.SIZE.numberFontSize,
                fontWeight: 500,
                lineHeight: 1,
                color: GLOBAL_CONFIG.NUMBER_COLOR,
                letterSpacing: '0.02em',
              }}
            >
              {String(unit.value).padStart(2, '0')}
            </Typography>

            <Typography
              variant="caption"
              sx={{
                display: 'block',
                mt: 1,
                fontSize: GLOBAL_CONFIG.SIZE.labelFontSize,
                letterSpacing: '0.25em',
                color: GLOBAL_CONFIG.LABEL_COLOR,
                fontWeight: 600,
                textTransform: 'uppercase',
              }}
            >
              {unit.label}
            </Typography>
          </Paper>

          {/* Separator Colon */}
          {index < timeUnits.length - 1 && (
            <Typography
              sx={{
                color: GLOBAL_CONFIG.COLON_COLOR,
                fontSize: GLOBAL_CONFIG.SIZE.colonSize,
                opacity: 0.6,
                fontWeight: 300,
              }}
            >
              :
            </Typography>
          )}
        </React.Fragment>
      ))}
    </Box>
  );
}