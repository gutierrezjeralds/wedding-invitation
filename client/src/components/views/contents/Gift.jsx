import React, { useState } from 'react';
import {
    Container,
    Paper,
    Box,
    Button,
    Chip,
    Stack,
    Typography
} from '@mui/material';
import {
    CardGiftcard,
    ContentCopy,
    Check,
    Home,
    Celebration,
    LocationOn,
    Download
} from '@mui/icons-material';
import { Text, PageTitle } from '../utils/CustomComponents';
import { CONTENT_GIFT } from '../utils/Constants';
import { useMedia } from '../utils/MediaContext';

export default function Gifts() {
    // Mongoose / Cloudflare Media Assets
    const { getAsset, getGalleryAssets } = useMedia();
    const sPageBackgroundDesktop = getAsset('gifts', 'background', 'desktop');
    const sPageBackgroundMobile = getAsset('gifts', 'background', 'mobile');

    // Fetch dynamic QR assets from MediaContext
    const rawQrAssets = getGalleryAssets('gifts', 'qr');
    const qrList = Array.isArray(rawQrAssets)
        ? rawQrAssets
        : typeof rawQrAssets === 'object' && rawQrAssets !== null
        ? Object.values(rawQrAssets)
        : [rawQrAssets].filter(Boolean);

    const [copiedField, setCopiedField] = useState('');

    const handleCopy = (text, fieldKey) => {
        navigator.clipboard.writeText(text);
        setCopiedField(fieldKey);
        setTimeout(() => setCopiedField(''), 2000);
    };

    // Triggers direct browser image download
    const handleDownloadQr = async (imageUrl, index) => {
        const fileName = `Wedding_Gift_QR_${index + 1}.png`;
        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            // Fallback for direct URL opening if fetch fails
            window.open(imageUrl, '_blank');
        }
    };

    const sHomeAddress = CONTENT_GIFT.HOUSE_ADDRESS;

    return (
        <React.Fragment>
            <Box
                className="page-background"
                sx={{
                    '--bg-desktop': `url(${sPageBackgroundDesktop})`,
                    '--bg-mobile': `url(${sPageBackgroundMobile})`,
                    backgroundColor: 'background.default',
                }}
            >
                <Container maxWidth="lg" className="py-5">
                    {/* Page Title */}
                    <PageTitle 
                        title={CONTENT_GIFT.TITLE} 
                        subtitle={CONTENT_GIFT.SUBTITLE} 
                    />

                    {/* Sincere Intro Card */}
                    <Paper
                        elevation={0}
                        sx={{
                            p: { xs: 3, sm: 4 },
                            mt: 3,
                            mb: 4,
                            borderRadius: 6,
                            bgcolor: 'background.paper',
                            border: '1px solid rgba(107, 29, 47, 0.2)',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.02)',
                            textAlign: 'center'
                        }}
                    >
                        <CardGiftcard sx={{ fontSize: 36, color: 'primary.main', mb: 1 }} />
                        <Text
                            variant="h5"
                            sx={{ color: 'primary.main', mb: 1.5 }}
                            textKey={CONTENT_GIFT.NOTE_TITLE}
                        />
                        <Text
                            variant="body1"
                            sx={{
                                color: 'text.primary',
                                lineHeight: 1.7,
                                maxWidth: '680px',
                                mx: 'auto'
                            }}
                            textKey={CONTENT_GIFT.NOTE_BODY}
                        />
                    </Paper>

                    {/* PROMINENT VENUE GIFT BANNER */}
                    <Paper
                        elevation={0}
                        sx={{
                            p: { xs: 2.5, sm: 3 },
                            mb: 5,
                            borderRadius: 4,
                            bgcolor: 'rgba(107, 29, 47, 0.05)',
                            border: '2px solid rgba(107, 29, 47, 0.3)',
                            textAlign: 'center',
                            boxShadow: '0 4px 16px rgba(107, 29, 47, 0.05)'
                        }}
                    >
                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            alignItems="center"
                            justifyContent="center"
                            spacing={1.5}
                        >
                            <Celebration sx={{ color: 'primary.main', fontSize: 28 }} />
                            <Text
                                variant="h6"
                                sx={{
                                    fontFamily: '"Cormorant Garamond", serif',
                                    fontWeight: 700,
                                    color: 'primary.main',
                                    letterSpacing: '0.02em',
                                    fontSize: { xs: '1.1rem', sm: '1.3rem' }
                                }}
                                textKey={CONTENT_GIFT.VENUE_NOTE}
                            />
                        </Stack>
                    </Paper>

                    {/* DIGITAL FUND (DYNAMIC QR GRID WITH API CATEGORY LABELS) */}
                    <Box sx={{ mb: 6 }}>
                        <Box sx={{ textAlign: 'center', mb: 3 }}>
                            <Text
                                variant="caption"
                                sx={{
                                    letterSpacing: '0.2em',
                                    textTransform: 'uppercase',
                                    fontWeight: 700,
                                    display: 'block'
                                }}
                                textKey={CONTENT_GIFT.DIGITAL_TITLE}
                            />
                            <Text
                                variant="h5"
                                sx={{ mt: 0.5, color: 'primary.main' }}
                                textKey={CONTENT_GIFT.DIGITAL_SUBTITLE}
                            />
                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                justifyContent: 'center',
                                gap: 3,
                                width: '100%'
                            }}
                        >
                            {qrList.map((qrItem, index) => {
                                const qrImageUrl = typeof qrItem === 'string' ? qrItem : qrItem?.url || qrItem?.src;
                                const qrCategory = typeof qrItem === 'object' && qrItem?.category ? qrItem.category : null;

                                return (
                                    <Paper
                                        key={index}
                                        elevation={0}
                                        sx={{
                                            width: { xs: '100%', sm: 260 },
                                            maxWidth: 280,
                                            p: 2.5,
                                            borderRadius: 5,
                                            bgcolor: 'background.paper',
                                            border: '1px solid rgba(107, 29, 47, 0.2)',
                                            textAlign: 'center',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            {/* Dynamic Category Label Badge */}
                                            {qrCategory && (
                                                <Chip
                                                    label={qrCategory.toUpperCase()}
                                                    size="small"
                                                    sx={{
                                                        bgcolor: 'rgba(107, 29, 47, 0.1)',
                                                        color: 'primary.main',
                                                        fontWeight: 700,
                                                        fontSize: '0.65rem',
                                                        letterSpacing: '0.1em',
                                                        mb: 2,
                                                        px: 1
                                                    }}
                                                />
                                            )}

                                            <Box
                                                component="img"
                                                src={qrImageUrl}
                                                alt={`Gift QR ${index + 1}`}
                                                sx={{
                                                    width: 190,
                                                    height: 190,
                                                    borderRadius: 3,
                                                    border: '1px solid rgba(107, 29, 47, 0.15)',
                                                    mb: 2,
                                                    objectFit: 'contain',
                                                    bgcolor: '#fff',
                                                    p: 1
                                                }}
                                            />
                                        </Box>

                                        <Button
                                            fullWidth
                                            variant="outlined"
                                            size="small"
                                            startIcon={<Download />}
                                            onClick={() => handleDownloadQr(qrImageUrl, index)}
                                            sx={{
                                                borderColor: 'primary.main',
                                                color: 'primary.main',
                                                fontFamily: '"Cormorant Garamond", serif',
                                                fontWeight: 600,
                                                '&:hover': { bgcolor: 'primary.main', color: 'primary.contrastText', borderColor: 'primary.main' }
                                            }}
                                        >
                                            {CONTENT_GIFT.DOWLOAD_QR}
                                        </Button>
                                    </Paper>
                                );
                            })}
                        </Box>
                    </Box>

                    {/* HOUSE & HOME ESSENTIALS (SINGLE HOME DELIVERY ADDRESS CARD) */}
                    <Paper
                        elevation={0}
                        sx={{
                            p: { xs: 3, sm: 4 },
                            borderRadius: 6,
                            bgcolor: 'background.paper',
                            border: '1px dashed rgba(107, 29, 47, 0.4)'
                        }}
                    >
                        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
                            <Box
                                sx={{
                                    p: 1.5,
                                    borderRadius: '50%',
                                    bgcolor: 'primary.main',
                                    color: 'primary.contrastText',
                                    display: 'flex'
                                }}
                            >
                                <Home />
                            </Box>
                            <Box>
                                <Text
                                    variant="h6"
                                    sx={{
                                        color: 'primary.main',
                                        fontFamily: '"Cormorant Garamond", serif',
                                        fontWeight: 700,
                                        lineHeight: 1.2
                                    }}
                                    textKey={CONTENT_GIFT.HOUSE_TITLE}
                                />
                                <Text
                                    variant="caption"
                                    sx={{ color: 'text.secondary', display: 'block', mt: 0.5 }}
                                    textKey={CONTENT_GIFT.HOUSE_SUBTITLE}
                                />
                            </Box>
                        </Stack>

                        <Paper
                            elevation={0}
                            sx={{
                                width: '100%',
                                p: 3,
                                borderRadius: 4,
                                bgcolor: 'background.default',
                                border: '1px solid rgba(107, 29, 47, 0.15)',
                                display: 'flex',
                                flexDirection: { xs: 'column', sm: 'row' },
                                alignItems: { xs: 'flex-start', sm: 'center' },
                                justifyContent: 'space-between',
                                gap: 2
                            }}
                        >
                            <Box sx={{ flex: 1 }}>
                                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                                    <LocationOn sx={{ color: 'primary.main', fontSize: 20 }} />
                                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main' }}>
                                        {CONTENT_GIFT.HOUSE_ADDRESS_TITLE}
                                    </Typography>
                                </Stack>
                                <Typography variant="body2" sx={{ color: 'text.primary', lineHeight: 1.5 }}>
                                    {sHomeAddress}
                                </Typography>
                            </Box>
                            <Button
                                variant="outlined"
                                size="small"
                                startIcon={copiedField === 'home_addr' ? <Check /> : <ContentCopy />}
                                onClick={() => handleCopy(sHomeAddress, 'home_addr')}
                                sx={{
                                    borderColor: 'primary.main',
                                    color: 'primary.main',
                                    fontSize: '0.75rem',
                                    minWidth: { xs: '100%', sm: '160px' },
                                    whiteSpace: 'nowrap',
                                    '&:hover': { bgcolor: 'primary.main', color: 'primary.contrastText' }
                                }}
                            >
                                {copiedField === 'home_addr' ? 'Address Copied!' : 'Copy Home Address'}
                            </Button>
                        </Paper>
                    </Paper>
                </Container>
            </Box>
        </React.Fragment>
    );
}