import React, { useEffect, useState } from 'react';
import {
    Box,
    Container,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Paper,
    Tab,
    Tabs,
    ImageList,
    ImageListItem,
    Dialog,
    IconButton,
} from '@mui/material';
import {
    ExpandMore,
    Close,
    ArrowBackIosNew,
    ArrowForwardIos,
} from '@mui/icons-material';
import { Text, PageTitle } from '../utils/CustomComponents';
import ParallaxBanner from '../utils/ParallaxBanner';
import { CONTENT_STORY } from '../utils/Constants';

import imgParallax from "../../assets/img/parallax/story.jpg";

// Reusable Polaroid Card Sub-Component
function PolaroidCard({ src, alt, rotation = '0deg', hasTape = false, sx = {} }) {
    return (
        <Box
            sx={{
                position: 'absolute',
                transform: `rotate(${rotation})`,
                transition: 'transform 0.3s ease, z-index 0.3s ease',
                '&:hover': {
                    transform: `rotate(0deg) scale(1.03)`,
                    zIndex: 10,
                },
                ...sx,
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    p: { xs: 0.8, sm: 1.2 },
                    pb: { xs: 2, sm: 3 },
                    bgcolor: 'background.paper',
                    borderRadius: '2px',
                    boxShadow: '0 8px 24px rgba(107, 29, 47, 0.08)',
                    position: 'relative',
                }}
            >
                {hasTape && (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: -10,
                            left: '50%',
                            transform: 'translateX(-50%) rotate(-2deg)',
                            width: { xs: 35, sm: 50 },
                            height: { xs: 14, sm: 18 },
                            bgcolor: 'rgba(212, 175, 55, 0.35)',
                            backdropFilter: 'blur(2px)',
                            border: '1px solid rgba(212, 175, 55, 0.2)',
                            zIndex: 2,
                        }}
                    />
                )}

                <Box
                    component="img"
                    src={src}
                    alt={alt}
                    sx={{
                        width: '100%',
                        height: 'auto',
                        aspectRatio: '4/3',
                        objectFit: 'cover',
                        display: 'block',
                    }}
                />
            </Paper>
        </Box>
    );
}

export default function Story() {
    const sCloudflareBaseUrl = "https://wedding-images-api.jeraldandsheila.workers.dev/api/images";
    const [expanded, setExpanded] = useState('panel01');
    const [galleryTab, setGalleryTab] = useState(0);
    const [imgHighlights, setImgHighlights] = useState([]);
    const [imgGalleryTogether, setImgGalleryTogether] = useState([]);
    const [imgGalleryProposal, setImgGalleryProposal] = useState([]);
    const [imgGalleryPrenup, setImgGalleryPrenup] = useState([]);
    const [randomLayout, setRandomLayout] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(0);

    const handleAccordionChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleTabChange = (event, newValue) => {
        setGalleryTab(newValue);
        setSelectedImage(0);
        setLightboxOpen(false);
        setRandomLayout(Math.floor(Math.random() * 3));
    };

    const galleryByTab = [
        imgGalleryTogether,
        imgGalleryProposal,
        imgGalleryPrenup,
    ];

    const currentGallery = galleryByTab[galleryTab] || [];

    const openLightbox = (index) => {
        setSelectedImage(index);
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
    };

    const previousImage = () => {
        setSelectedImage((prev) =>
            prev === 0 ? currentGallery.length - 1 : prev - 1
        );
    };

    const nextImage = () => {
        setSelectedImage((prev) =>
            prev === currentGallery.length - 1 ? 0 : prev + 1
        );
    };

    useEffect(() => {
        fetch(sCloudflareBaseUrl + "/story/highlights")
        .then((res) => res.json())
        .then(setImgHighlights);
    }, []);

    useEffect(() => {
        fetch(sCloudflareBaseUrl + "/story/gallery/together")
        .then((res) => res.json())
        .then(setImgGalleryTogether);
    }, []);

    useEffect(() => {
        fetch(sCloudflareBaseUrl + "/story/gallery/proposal")
        .then((res) => res.json())
        .then(setImgGalleryProposal);
    }, []);

    useEffect(() => {
        fetch(sCloudflareBaseUrl + "/story/gallery/prenup")
        .then((res) => res.json())
        .then(setImgGalleryPrenup);
    }, []);

    const highlightStyles = [
        {
            rotation: "-6deg",
            hasTape: true,
            sx: {
                width: { xs: "55%", sm: "48%" },
                top: 0,
                left: "2%",
                zIndex: 2,
            },
        },
        {
            rotation: "5deg",
            hasTape: true,
            sx: {
                width: { xs: "52%", sm: "46%" },
                top: { xs: "20px", sm: "30px" },
                right: "2%",
                zIndex: 1,
            },
        },
        {
            rotation: "-2deg",
            hasTape: true,
            sx: {
                width: { xs: "65%", sm: "58%" },
                top: { xs: "110px", sm: "150px" },
                left: "10%",
                zIndex: 3,
            },
        },
        {
            rotation: "4deg",
            hasTape: true,
            sx: {
                width: { xs: "55%", sm: "48%" },
                top: { xs: "180px", sm: "240px" },
                right: "0%",
                zIndex: 2,
            },
        },
    ];

    return (
        <React.Fragment>
            <Box sx={{ bgcolor: 'background.default' }}>
                <Container maxWidth="lg" className="py-5">
                    {/* Page Title */}
                    <PageTitle title={CONTENT_STORY.TITLE} subtitle={CONTENT_STORY.SUBTITLE} />

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' },
                            gap: { xs: 4, sm: 6, md: 8 },
                            alignItems: 'flex-start',
                        }}
                    >
                        {/* LEFT COLUMN: Text Content & Accordion Chapters */}
                        <Box sx={{ flex: 1, width: '100%' }}>
                            <Text
                                variant="caption"
                                sx={{ color: 'primary.main', fontWeight: 700, display: 'block', mb: 1, letterSpacing: '0.15em', textTransform: 'uppercase' }}
                                textKey={CONTENT_STORY.SECTION1_CONTENT_TAGLINE}
                            />

                            <Text
                                variant="h2"
                                sx={{ color: 'primary.main', mb: 2, fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' } }}
                                textKey={CONTENT_STORY.SECTION1_CONTENT_TITLE}
                            />

                            <Box
                                sx={{
                                    width: 40,
                                    height: 2,
                                    bgcolor: 'primary.main',
                                    mb: 3,
                                    opacity: 0.6,
                                }}
                            />

                            <Text variant="body1" sx={{ mb: 3, display: 'block' }} textKey={CONTENT_STORY.SECTION1_CONTENT_SUBTITLE} />

                            {/* Accordion Chapters */}
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                                {CONTENT_STORY.SECTION1_CHAPTER.map((chapter) => {
                                    const panelId = `panel${chapter.ID}`;
                                    const isCurrentExpanded = expanded === panelId;

                                    return (
                                        <Accordion
                                            key={chapter.ID}
                                            expanded={isCurrentExpanded}
                                            onChange={handleAccordionChange(panelId)}
                                            elevation={0}
                                            disableGutters
                                            sx={{
                                                bgcolor: 'transparent',
                                                '&:before': { display: 'none' },
                                                borderBottom: '1px solid rgba(107, 29, 47, 0.15)',
                                            }}
                                        >
                                            <AccordionSummary
                                                expandIcon={<ExpandMore sx={{ color: 'primary.main' }} />}
                                                sx={{
                                                    px: 0,
                                                    py: 1,
                                                    '& .MuiAccordionSummary-content': {
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: { xs: 1.5, sm: 2 },
                                                        m: 0,
                                                    },
                                                }}
                                            >
                                                <Text sx={{ color: 'primary.main', fontWeight: 700, minWidth: 24, fontSize: '1rem' }}>
                                                    {chapter.ID}
                                                </Text>
                                                <Text variant="h5" sx={{ color: 'secondary.main', fontSize: '1.25rem' }}>
                                                    {chapter.TITLE}
                                                </Text>
                                            </AccordionSummary>

                                            <AccordionDetails sx={{ px: 0, pt: 0, pb: 2 }}>
                                                <Paper
                                                    elevation={0}
                                                    sx={{
                                                        p: { xs: 2, sm: 2.5 },
                                                        bgcolor: 'background.paper',
                                                        border: '1px solid rgba(107, 29, 47, 0.15)',
                                                        borderRadius: 2,
                                                        ml: { xs: 0, sm: 4 },
                                                    }}
                                                >
                                                    <Text variant="body1" sx={{ color: 'text.primary' }} textKey={chapter.BODY} />
                                                </Paper>
                                            </AccordionDetails>
                                        </Accordion>
                                    );
                                })}
                            </Box>
                        </Box>

                        {/* RIGHT COLUMN: Tilted Photo Collage */}
                        <Box
                            sx={{
                                flex: 1,
                                width: '100%',
                                position: 'relative',
                                minHeight: { xs: 360, sm: 480, md: 540 },
                                mt: { xs: 2, md: 0 },
                            }}
                        >
                            {highlightStyles.map((style, index) => {
                                const image = imgHighlights[index];

                                if (!image) {
                                    return null;
                                }

                                return (
                                    <PolaroidCard
                                        key={image.key || image.url || index}
                                        src={image.url}
                                        alt={image.name || `Story Highlights ${index + 1}`}
                                        rotation={style.rotation}
                                        hasTape={style.hasTape}
                                        sx={style.sx}
                                    />
                                );
                            })}

                            {/* Handwritten Script Accent */}
                            <Box
                                sx={{
                                    position: 'absolute',
                                    bottom: { xs: -10, sm: 0 },
                                    right: '5%',
                                    zIndex: 4,
                                    textAlign: 'right',
                                    pointerEvents: 'none',
                                }}
                            >
                                <Text
                                    sx={{
                                        fontFamily: '"Great Vibes", cursive',
                                        fontSize: { xs: '2rem', sm: '2.8rem', md: '3.2rem' },
                                        color: 'primary.main',
                                        lineHeight: 1.1,
                                        transform: 'rotate(-6deg)',
                                    }}
                                    textKey={CONTENT_STORY.SECTION1_HIGHLIGHT}
                                />
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Box>

            <ParallaxBanner
                image={imgParallax}
                title={CONTENT_STORY.SECTION2_PARALLAX_TITLE}
                subtitle={CONTENT_STORY.SECTION2_PARALLAX_SUBTITLE}
                height="350px"
            />

            <Box sx={{ bgcolor: 'background.default' }}>
                {/* Moments Gallery Section */}
                <Container maxWidth="lg" className="py-5">
                    <Box sx={{ textAlign: 'center', mb: { xs: 3, sm: 4 } }}>
                        <Text
                            variant="h2"
                            sx={{ color: 'primary.main', mb: 1, fontSize: { xs: '3rem', sm: '3.5rem' } }}
                            textKey={CONTENT_STORY.SECTION2_GALLERY_TITLE}
                        />
                        <Text
                            variant="caption"
                            sx={{ px: 2, color: 'text.secondary', display: 'block' }}
                            textKey={CONTENT_STORY.SECTION2_GALLERY_SUBTITLE}
                        />
                    </Box>

                    {/* Responsive Category Tabs */}
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            mb: { xs: 3, sm: 4 },
                            borderBottom: 1,
                            borderColor: 'divider',
                        }}
                    >
                        <Tabs
                            value={galleryTab}
                            onChange={handleTabChange}
                            variant="scrollable"
                            scrollButtons="auto"
                            allowScrollButtonsMobile
                            sx={{
                                minHeight: { xs: 40, sm: 48 },
                                '& .MuiTab-root': {
                                    fontSize: { xs: '0.85rem', sm: '0.95rem' },
                                    fontWeight: 600,
                                    textTransform: 'none',
                                    px: { xs: 1.5, sm: 3 },
                                    py: { xs: 1, sm: 1.5 },
                                    minHeight: { xs: 40, sm: 48 },
                                    whiteSpace: 'nowrap',
                                    color: 'text.primary',
                                    '&.Mui-selected': {
                                        color: 'primary.main',
                                    },
                                },
                                '& .MuiTabs-indicator': {
                                    backgroundColor: 'primary.main',
                                    height: 3,
                                    borderRadius: '3px 3px 0 0',
                                },
                                /* STYLED SCROLL BUTTONS */
                                '& .MuiTabScrollButton-root': {
                                    width: 32,
                                    height: 32,
                                    borderRadius: '50%',
                                    bgcolor: 'rgba(107, 29, 47, 0.1)',
                                    color: 'primary.main',
                                    alignSelf: 'center',
                                    mx: 0.5,
                                    transition: 'all 0.2s ease',
                                    opacity: 0.9,
                                    '&:hover': {
                                        bgcolor: 'primary.main',
                                        color: 'primary.contrastText',
                                        opacity: 1,
                                    },
                                    '&.Mui-disabled': {
                                        opacity: 0.3,
                                        bgcolor: 'transparent',
                                    },
                                },
                            }}
                        >
                            <Tab label={CONTENT_STORY.SECTION_GALLER_TAB1_TITLE} />
                            <Tab label={CONTENT_STORY.SECTION_GALLER_TAB2_TITLE} />
                            <Tab label={CONTENT_STORY.SECTION_GALLER_TAB3_TITLE} />
                        </Tabs>
                    </Box>

                    {/* Photo Gallery */}
                    {currentGallery.length > 0 ? (
                        <ImageList
                            variant="quilted"
                            cols={4}
                            rowHeight={180}
                            gap={8}
                            sx={{
                                width: '100%',
                                m: 0,
                            }}
                        >
                            {currentGallery.map((item, index) => {
                                const layoutSets = [
                                    [
                                        { cols: 2, rows: 2 },
                                        { cols: 1, rows: 1 },
                                        { cols: 1, rows: 1 },
                                        { cols: 1, rows: 1 },
                                        { cols: 1, rows: 1 },
                                    ],
                                    [
                                        { cols: 2, rows: 1 },
                                        { cols: 1, rows: 2 },
                                        { cols: 1, rows: 2 },
                                        { cols: 2, rows: 1 },
                                        { cols: 2, rows: 1 },
                                    ],
                                    [
                                        { cols: 1, rows: 2 },
                                        { cols: 2, rows: 2 },
                                        { cols: 1, rows: 1 },
                                        { cols: 1, rows: 1 },
                                        { cols: 2, rows: 1 },
                                    ],
                                ];

                                const layout = layoutSets[randomLayout][index] || {
                                    cols: 1,
                                    rows: 1,
                                };

                                return (
                                    <ImageListItem
                                        key={item.key || item.url || index}
                                        cols={layout.cols}
                                        rows={layout.rows}
                                        onClick={() => openLightbox(index)}
                                        sx={{
                                            cursor: 'pointer',
                                            overflow: 'hidden',
                                            borderRadius: { xs: 1, sm: 1.5 },
                                            position: 'relative',
                                            '& img': {
                                                transition: 'transform 0.4s ease, filter 0.4s ease',
                                            },
                                            '&:hover img': {
                                                transform: 'scale(1.035)',
                                                filter: 'brightness(0.92)',
                                            },
                                            '&:focus-visible': {
                                                outline: '2px solid',
                                                outlineColor: 'primary.main',
                                                outlineOffset: '-2px',
                                            },
                                        }}
                                    >
                                        <img
                                            src={item.url}
                                            alt={item.name || `Gallery image ${index + 1}`}
                                            loading="lazy"
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                display: 'block',
                                            }}
                                        />
                                    </ImageListItem>
                                );
                            })}
                        </ImageList>
                    ) : (
                        <Box
                            sx={{
                                minHeight: 220,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'text.secondary',
                            }}
                        >
                            <Text variant="body1" textKey="Loading photos..." />
                        </Box>
                    )}

                    {/* Lightbox */}
                    <Dialog
                        open={lightboxOpen}
                        onClose={closeLightbox}
                        fullScreen
                        sx={{
                            '& .MuiDialog-paper': {
                                m: 0,
                                width: '100%',
                                height: '100%',
                                maxWidth: '100%',
                                maxHeight: '100%',
                                bgcolor: 'rgba(25, 21, 18, 0.97)',
                            },
                        }}
                    >
                        {/* Close */}
                        <IconButton
                            aria-label="Close gallery"
                            onClick={closeLightbox}
                            sx={{
                                position: 'absolute',
                                top: { xs: 12, sm: 20 },
                                right: { xs: 12, sm: 24 },
                                zIndex: 20,
                                color: '#fff',
                                bgcolor: 'rgba(255,255,255,0.10)',
                                '&:hover': {
                                    bgcolor: 'rgba(255,255,255,0.20)',
                                },
                            }}
                        >
                            <Close />
                        </IconButton>

                        {/* Image counter */}
                        {currentGallery.length > 0 && (
                            <Box
                                component="span"
                                sx={{
                                    position: 'absolute',
                                    top: { xs: 18, sm: 26 },
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    zIndex: 20,
                                    color: 'rgba(255,255,255,0.85)',
                                    fontSize: { xs: '0.8rem', sm: '0.9rem' },
                                    letterSpacing: '0.08em',
                                    fontFamily: '"Montserrat", sans-serif',
                                }}
                            >
                                {selectedImage + 1} / {currentGallery.length}
                            </Box>
                        )}

                        {/* Previous */}
                        {currentGallery.length > 1 && (
                            <IconButton
                                aria-label="Previous image"
                                onClick={previousImage}
                                sx={{
                                    position: 'absolute',
                                    left: { xs: 8, sm: 28 },
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    zIndex: 20,
                                    color: '#fff',
                                    bgcolor: 'rgba(255,255,255,0.10)',
                                    '&:hover': {
                                        bgcolor: 'rgba(255,255,255,0.20)',
                                    },
                                }}
                            >
                                <ArrowBackIosNew
                                    sx={{
                                        fontSize: { xs: 18, sm: 24 },
                                    }}
                                />
                            </IconButton>
                        )}

                        {/* Selected image */}
                        {currentGallery[selectedImage] && (
                            <Box
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    p: { xs: 7, sm: 9, md: 10 },
                                }}
                            >
                                <Box
                                    component="img"
                                    src={currentGallery[selectedImage].url}
                                    alt={currentGallery[selectedImage].name || `Gallery image ${selectedImage + 1}`}
                                    sx={{
                                        maxWidth: '100%',
                                        maxHeight: '100%',
                                        width: 'auto',
                                        height: 'auto',
                                        objectFit: 'contain',
                                        userSelect: 'none',
                                    }}
                                />
                            </Box>
                        )}

                        {/* Next */}
                        {currentGallery.length > 1 && (
                            <IconButton
                                aria-label="Next image"
                                onClick={nextImage}
                                sx={{
                                    position: 'absolute',
                                    right: { xs: 8, sm: 28 },
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    zIndex: 20,
                                    color: '#fff',
                                    bgcolor: 'rgba(255,255,255,0.10)',
                                    '&:hover': {
                                        bgcolor: 'rgba(255,255,255,0.20)',
                                    },
                                }}
                            >
                                <ArrowForwardIos
                                    sx={{
                                        fontSize: { xs: 18, sm: 24 },
                                    }}
                                />
                            </IconButton>
                        )}
                    </Dialog>
                </Container>
            </Box>
        </React.Fragment>
    );
}