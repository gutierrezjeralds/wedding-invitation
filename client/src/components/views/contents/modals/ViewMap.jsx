import * as React from 'react';
import { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    IconButton,
    Tabs,
    Tab,
    Stack,
    Paper,
    Button,
    Box,
    Chip,
    useMediaQuery,
    useTheme
} from '@mui/material';
import { Close, ContentCopy, Check, OpenInNew, ZoomIn, ZoomOut, RestartAlt } from '@mui/icons-material';
import { CONTENT } from '../../utils/Constants';

// Assets
import imgMap from "../../../assets/img/wedding/map.png";
import imgChurchLandmark from "../../../assets/img/wedding/church_map.png";
import imgReceptionLandmark from "../../../assets/img/wedding/reception_map.png";

export default function ViewMapModal({ open, handleClose, defaultTab = 'church' }) {
    const [mapTab, setMapTab] = useState(defaultTab);
    const [copiedAddress, setCopiedAddress] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [zoomLevel, setZoomLevel] = useState(1);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // Sync tab when modal opens or defaultTab changes
    useEffect(() => {
        if (open) {
            setMapTab(defaultTab);
            setCopiedAddress(false);
            setPreviewImage(null);
            setZoomLevel(1);
        }
    }, [open, defaultTab]);

    const handleCopyAddress = (address) => {
        navigator.clipboard.writeText(address);
        setCopiedAddress(true);
        setTimeout(() => setCopiedAddress(false), 2000);
    };

    const handleOpenPreview = (img) => {
        setPreviewImage(img);
        setZoomLevel(1);
    };

    // Gradual zoom adjustments (+0.25 increment)
    const handleZoomIn = () => {
        setZoomLevel((prev) => Math.min(Number((prev + 0.25).toFixed(2)), 2.5));
    };

    const handleZoomOut = () => {
        setZoomLevel((prev) => Math.max(Number((prev - 0.25).toFixed(2)), 1));
    };

    const handleResetZoom = () => {
        setZoomLevel(1);
    };

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="sm"
                fullWidth
                PaperProps={{ style: { borderRadius: 20 } }}
            >
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
                    <Tabs
                        value={mapTab}
                        onChange={(e, val) => {
                            setMapTab(val);
                            setCopiedAddress(false);
                        }}
                        textColor="inherit"
                        TabIndicatorProps={{ style: { backgroundColor: '#7A1C31' } }}
                    >
                        <Tab label="Church" value="church" sx={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 700 }} />
                        <Tab label="Reception" value="reception" sx={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 700 }} />
                    </Tabs>
                    <IconButton onClick={handleClose}>
                        <Close />
                    </IconButton>
                </DialogTitle>

                <DialogContent dividers sx={{ p: 2 }}>
                    <Stack spacing={2} alignItems="center">
                        {/* Inline-block / Side-by-Side Thumbnail Images */}
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: 2,
                                width: '100%'
                            }}
                        >
                            {/* 1. Small Full Map Image */}
                            <Box
                                component="img"
                                src={imgMap}
                                alt="Full Wedding Location Map"
                                onClick={() => handleOpenPreview(imgMap)}
                                sx={{
                                    display: 'inline-block',
                                    width: 120,
                                    height: 120,
                                    objectFit: 'cover',
                                    borderRadius: 3,
                                    cursor: 'pointer',
                                    border: '2px solid #7A1C31',
                                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                        boxShadow: '0 6px 16px rgba(122, 28, 49, 0.3)',
                                    },
                                }}
                            />

                            {/* 2. Small Landmark Image */}
                            <Box
                                component="img"
                                src={mapTab === 'church' ? imgChurchLandmark : imgReceptionLandmark}
                                alt={mapTab === 'church' ? "Church Landmark" : "Reception Landmark"}
                                onClick={() => handleOpenPreview(mapTab === 'church' ? imgChurchLandmark : imgReceptionLandmark)}
                                sx={{
                                    display: 'inline-block',
                                    width: 120,
                                    height: 120,
                                    objectFit: 'cover',
                                    borderRadius: 3,
                                    cursor: 'pointer',
                                    border: '2px solid #7A1C31',
                                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                        boxShadow: '0 6px 16px rgba(122, 28, 49, 0.3)',
                                    },
                                }}
                            />
                        </Box>

                        {/* 3. Tab Text Details */}
                        <Box className="w-100 mt-2">
                            {mapTab === 'church' ? (
                                <Stack spacing={1.5}>
                                    <Typography variant="h5" sx={{ fontFamily: 'Cormorant Garamond, serif', color: '#7A1C31', fontWeight: 600 }}>
                                        {CONTENT.TITLE_CHURCH}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#5E7A65' }}>{CONTENT.TITLE_CHURCH_ADDRESS}</Typography>
                                    <Paper elevation={0} sx={{ p: 2, bgcolor: '#faf8f5', border: '1px solid rgba(212, 175, 55, 0.25)', borderRadius: 3 }}>
                                        <Typography variant="body2" sx={{ mb: 1 }}><strong>Schedule:</strong> Assembly 9:30 AM | Ceremony 10:00 AM</Typography>
                                        <Typography variant="body2"><strong>Parking:</strong> On-site parish parking available.</Typography>
                                    </Paper>
                                </Stack>
                            ) : (
                                <Stack spacing={1.5}>
                                    <Typography variant="h5" sx={{ fontFamily: 'Cormorant Garamond, serif', color: '#7A1C31', fontWeight: 600 }}>
                                        {CONTENT.TITLE_RECEPTION}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#5E7A65' }}>{CONTENT.TITLE_RECEPTION_ADDRESS}</Typography>
                                    <Paper elevation={0} sx={{ p: 2, bgcolor: '#faf8f5', border: '1px solid rgba(212, 175, 55, 0.25)', borderRadius: 3 }}>
                                        <Typography variant="body2" sx={{ mb: 1 }}><strong>Schedule:</strong> Cocktails 12:00 PM | Banquet 1:00 PM PST</Typography>
                                        <Typography variant="body2"><strong>Note:</strong> Dedicated valet &amp; guest parking entrance.</Typography>
                                    </Paper>
                                </Stack>
                            )}
                        </Box>
                    </Stack>
                </DialogContent>

                <DialogActions sx={{ p: 2.5 }}>
                    <Button
                        startIcon={copiedAddress ? <Check /> : <ContentCopy />}
                        onClick={() => handleCopyAddress(mapTab === 'church' ? CONTENT.TITLE_CHURCH_ADDRESS : CONTENT.TITLE_RECEPTION_ADDRESS)}
                        sx={{ color: '#7A1C31' }}
                    >
                        {copiedAddress ? 'Copied!' : 'Copy Address'}
                    </Button>
                    <Button
                        variant="contained"
                        endIcon={<OpenInNew />}
                        href={mapTab === 'church' ? 'https://maps.app.goo.gl/tmLKneFTiHy9P35h7' : 'https://maps.app.goo.gl/JZLukWRvemwTk1VR9'}
                        target="_blank"
                        sx={{ bgcolor: '#7A1C31', '&:hover': { bgcolor: '#8B263E', color: '#D9A6A4' } }}
                    >
                        {CONTENT.BUTTON_VIEWMAP}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Lightbox Modal with Full Multi-Directional Scrolling and Uncropped Zoom */}
            <Dialog
                open={Boolean(previewImage)}
                onClose={() => setPreviewImage(null)}
                fullScreen={isMobile}
                maxWidth="lg"
                fullWidth
                PaperProps={{
                    style: {
                        backgroundColor: 'rgba(0, 0, 0, 0.94)',
                        boxShadow: 'none',
                        margin: isMobile ? 0 : 16,
                    }
                }}
            >
                {/* Fixed Control Bar */}
                <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        zIndex: 30,
                        bgcolor: 'rgba(0, 0, 0, 0.75)',
                        backdropFilter: 'blur(8px)',
                        borderRadius: 3,
                        px: 1,
                        py: 0.5
                    }}
                >
                    <Chip
                        label={`${Math.round(zoomLevel * 100)}%`}
                        size="small"
                        className='d-none'
                        sx={{
                            color: '#fff',
                            bgcolor: 'rgba(255, 255, 255, 0.2)',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            height: 24
                        }}
                    />
                    <IconButton onClick={handleZoomIn} disabled={zoomLevel >= 2.5} sx={{ color: '#fff' }}>
                        <ZoomIn />
                    </IconButton>
                    <IconButton onClick={handleZoomOut} disabled={zoomLevel <= 1} sx={{ color: '#fff' }}>
                        <ZoomOut />
                    </IconButton>
                    {zoomLevel > 1 && (
                        <IconButton onClick={handleResetZoom} sx={{ color: '#fff' }}>
                            <RestartAlt />
                        </IconButton>
                    )}
                    <IconButton onClick={() => setPreviewImage(null)} sx={{ color: '#fff' }}>
                        <Close />
                    </IconButton>
                </Stack>

                {/* Main Scroll Container (Allows 2D scrolling top/bottom/left/right) */}
                <Box
                    sx={{
                        width: '100%',
                        height: isMobile ? '100vh' : '85vh',
                        overflow: 'auto',
                        p: zoomLevel > 1 ? 4 : 2,
                        boxSizing: 'border-box'
                    }}
                >
                    {/* Dynamic Scaled Canvas Holder (Scales actual document flow size so scrollbars adjust automatically) */}
                    <Box
                        sx={{
                            minWidth: zoomLevel === 1 ? '100%' : `${zoomLevel * 100}%`,
                            minHeight: zoomLevel === 1 ? '100%' : `${zoomLevel * 100}%`,
                            display: 'flex',
                            alignItems: 'center',
                            justify: 'center',
                            transition: 'all 0.2s ease-out',
                        }}
                    >
                        <Box
                            component="img"
                            src={previewImage}
                            alt="Enlarged Preview"
                            sx={{
                                width: zoomLevel === 1 ? 'auto' : `${zoomLevel * 100}%`,
                                height: 'auto',
                                maxWidth: zoomLevel === 1 ? '100%' : 'none',
                                maxHeight: zoomLevel === 1 ? (isMobile ? '85vh' : '75vh') : 'none',
                                objectFit: 'contain',
                                borderRadius: 2,
                                transition: 'all 0.2s ease-out'
                            }}
                        />
                    </Box>
                </Box>
            </Dialog>
        </React.Fragment>
    );
}