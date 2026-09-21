import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Box, Container, Typography, Link, Divider, IconButton, Stack } from '@mui/material';
import { Favorite, Instagram, LocationOn, CalendarToday } from '@mui/icons-material';
import { Text } from './utils/MUIComponents';

export default function WeddingFooter() {
    const { t: oI18n } = useTranslation();

    return (
        <Box
            className="mt-5"
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
            }}
        >
            <Container maxWidth="md">
                <Stack spacing={3} alignItems="center" textAlign="center">
                    
                    {/* Header: Names & Tagline */}
                    <Box>
                        <Text letterSpacing="wide" variant="h4" className="great-vibes-regular">
                            <Trans 
                                i18nKey="title_name"
                                components={{
                                    span: <span className="pinyon-script-regular" />
                                }}
                            />
                        </Text>
                        <Typography
                            variant="subtitle2"
                            color="text.secondary"
                            className="mt-3"
                            sx={{
                                letterSpacing: 2,
                                textTransform: 'uppercase',
                                fontSize: '0.75rem',
                            }}
                        >
                            {oI18n("footer_qoute")}
                        </Typography>
                    </Box>

                    {/* Monogram Heart Divider */}
                    <Stack direction="row" alignItems="center" justifyContent="center" spacing={2} sx={{ width: '100%' }}>
                        <Divider sx={{ width: 80, borderColor: '#d4af37', opacity: 0.5 }} />
                        <Favorite sx={{ fontSize: 18, color: '#d4af37'}} />
                        <Divider sx={{ width: 80, borderColor: '#d4af37', opacity: 0.5 }} />
                    </Stack>

                    {/* Date & Location */}
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={{ xs: 1, sm: 4 }}
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <CalendarToday sx={{ fontSize: 18, color: 'text.secondary' }} />
                            <Typography variant="body2" color="text.secondary">
                                {oI18n("title_date_v2")}
                            </Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <LocationOn sx={{ fontSize: 18, color: 'text.secondary' }} />
                            <Typography variant="body2" color="text.secondary">
                                {oI18n("title_church")}
                            </Typography>
                        </Stack>
                    </Stack>

                    {/* Hashtag */}
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography
                            variant="caption"
                            sx={{
                                color: '#d4af37',
                                fontWeight: 600,
                                letterSpacing: 2,
                                textTransform: 'uppercase',
                            }}
                        >
                            {oI18n("title_hashtag")}
                        </Typography>
                    </Stack>

                    <Divider sx={{ width: '100%', opacity: 0.3, my: 1 }} />

                    {/* Bottom Copyright */}
                    <Typography variant="caption" color="text.secondary">
                        {oI18n("footer_bottom")} • {new Date().getFullYear()}
                    </Typography>
                </Stack>
            </Container>
        </Box>
    );
}