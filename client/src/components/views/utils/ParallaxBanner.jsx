import React from 'react';
import { Box, Container } from '@mui/material';
import { Text } from './CustomComponents';

export default function ParallaxBanner({
    image,
    title,
    subtitle,
    height = { xs: '260px', sm: '320px', md: '380px' },
    overlayColor = 'rgba(0, 0, 0, 0.35)',
}) {
    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                height: height,
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                clipPath: 'inset(0 0 0 0)', // Creates a viewport clipping boundary for mobile fixed layer

                /* HARDWARE-ACCELERATED PARALLAX LAYER FOR REAL PHONES */
                '&::before': {
                    content: '""',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${image})`,
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    willChange: 'transform',
                    zIndex: -2,
                    // Ensures performance optimization on iOS WebKit
                    WebkitTransform: 'translate3d(0, 0, 0)',
                    transform: 'translate3d(0, 0, 0)',
                },

                /* DARK OVERLAY LAYER */
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: overlayColor,
                    zIndex: -1,
                },
            }}
        >
            {(title || subtitle) && (
                <Container
                    maxWidth="sm"
                    sx={{
                        position: 'relative',
                        zIndex: 2,
                        textAlign: 'center',
                        color: '#FFFFFF',
                        px: 2,
                    }}
                >
                    {title && (
                        <Text
                            variant="h3"
                            sx={{
                                fontFamily: '"Cormorant Garamond", "Playfair Display", serif',
                                fontStyle: 'italic',
                                fontWeight: 400,
                                mb: subtitle ? 1 : 0,
                                textShadow: '0 2px 4px rgba(0,0,0,0.4)',
                                fontSize: { xs: '1.75rem', sm: '2.3rem', md: '2.8rem' },
                            }}
                            textKey={title}
                        />
                    )}
                    {subtitle && (
                        <Text
                            variant="subtitle1"
                            sx={{
                                letterSpacing: { xs: 2, sm: 3 },
                                textTransform: 'uppercase',
                                fontSize: { xs: '0.75rem', sm: '0.85rem' },
                                fontWeight: 500,
                                opacity: 0.9,
                            }}
                            textKey={subtitle}
                        />
                    )}
                </Container>
            )}
        </Box>
    );
}