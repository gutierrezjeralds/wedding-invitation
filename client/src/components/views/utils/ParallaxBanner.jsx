import React from 'react';
import { Box, Container } from '@mui/material';
import { Text } from './CustomComponents';

export default function ParallaxBanner({
    image,
    title,
    subtitle,
    height = { xs: '250px', sm: '300px', md: '350px' }, // Responsive heights
    overlayColor = 'rgba(0, 0, 0, 0.35)',
}) {
    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                height: height,
                backgroundImage: `url(${image})`,
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                
                // Parallax fixed attachment on desktop screens
                '@media (min-width: 900px)': {
                    backgroundAttachment: 'fixed',
                },

                // Mobile fallback ensuring clean background behavior on touch devices
                '@media (max-width: 899px)': {
                    backgroundAttachment: 'scroll',
                },

                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: overlayColor,
                    zIndex: 1,
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
                                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                                fontSize: { xs: '1.75rem', sm: '2.4rem', md: '2.8rem' },
                            }}
                            i18nKey={title}
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
                            i18nKey={subtitle}
                        />
                    )}
                </Container>
            )}
        </Box>
    );
}