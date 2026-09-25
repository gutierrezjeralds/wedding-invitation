import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Box, Container, Typography, Divider, Stack } from '@mui/material';
import { Favorite, LocationOn, CalendarToday } from '@mui/icons-material';
import { Text } from './utils/CustomComponents';

export default function WeddingFooter() {
    const { t: oI18n } = useTranslation();

    return (
        <Box
            component="footer"
            sx={{
                bgcolor: 'background.paper',
                color: 'text.primary',
                pt: 6,
                pb: 6,
                mt: 'auto',
                borderTop: '1px solid',
                borderColor: 'divider',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <Container maxWidth="md">
                <Stack
                    spacing={3}
                    alignItems="center"
                    justifyContent="center"
                    sx={{ width: '100%', textAlign: 'center' }}
                >
                    
                    {/* Header: Names & Tagline */}
                    <Box sx={{ width: '100%', textAlign: 'center' }}>
                        <Text
                            letterSpacing="wide"
                            variant="h4"
                            className="great-vibes-regular"
                            sx={{ textAlign: 'center' }}
                            i18nKey="title_name"
                        />
                        <Text
                            variant="subtitle2"
                            color="text.secondary"
                            className="mt-3"
                            sx={{
                                letterSpacing: 2,
                                textTransform: 'uppercase',
                                fontSize: '0.75rem',
                                textAlign: 'center',
                            }}
                            i18nKey="footer_qoute"
                        />
                    </Box>

                    {/* Monogram Heart Divider */}
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', gap: 2 }}>
                        <Divider sx={{ width: 80, borderColor: '#d4af37', opacity: 0.5 }} />
                        <Favorite sx={{ fontSize: 18, color: '#d4af37' }} />
                        <Divider sx={{ width: 80, borderColor: '#d4af37', opacity: 0.5 }} />
                    </Box>

                    {/* Date & Location */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: { xs: 1.5, sm: 4 },
                            width: '100%',
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                            <CalendarToday sx={{ fontSize: 18, color: 'text.secondary' }} />
                            <Text
                                variant="body2"
                                color="text.secondary"
                                i18nKey="title_date_v2"
                            />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                            <LocationOn sx={{ fontSize: 18, color: 'text.secondary' }} />
                            <Text
                                variant="body2"
                                color="text.secondary"
                                i18nKey="title_church"
                            />
                        </Box>
                    </Box>

                    {/* Hashtag */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                        <Text
                            variant="caption"
                            sx={{
                                color: '#d4af37',
                                fontWeight: 600,
                                letterSpacing: 2,
                                textTransform: 'uppercase',
                                textAlign: 'center',
                            }}
                            i18nKey="title_hashtag"
                        />
                    </Box>

                    <Divider sx={{ width: '100%', opacity: 0.3, my: 1 }} />

                    {/* Bottom Copyright */}
                    <Text
                        variant="caption"
                        color="text.secondary"
                        sx={{ textAlign: 'center', width: '100%' }}
                        i18nKey={`${oI18n("footer_bottom")} • ${new Date().getFullYear()}`}
                    />
                </Stack>
            </Container>
        </Box>
    );
}