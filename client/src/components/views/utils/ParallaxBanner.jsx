import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { Text } from './CustomComponents';

export default function ParallaxBanner({
    image,
    title,
    subtitle,
    height = '350px',
    overlayColor = 'rgba(0, 0, 0, 0.35)',
}) {
    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                height: height,
                backgroundImage: `url(${image})`,
                backgroundAttachment: 'fixed', // Keeps image fixed during scroll
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                // Fallback for mobile devices where fixed attachments are restricted
                '@supports (-webkit-touch-callout: none)': {
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
                                fontSize: { xs: '2rem', sm: '2.8rem' },
                            }}
                            i18nKey={title}
                        />
                    )}
                    {subtitle && (
                        <Text
                            variant="subtitle1"
                            sx={{
                                letterSpacing: 3,
                                textTransform: 'uppercase',
                                fontSize: '0.8rem',
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