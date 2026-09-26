import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Box,
    Container,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Paper,
    Grid,
    Tab,
    Tabs,
    Card,
    CardMedia,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { Text, PageTitle } from '../utils/CustomComponents';
import ParallaxBanner from '../utils/ParallaxBanner';

// import kinpoImg from '../../assets/images/kinpo.jpg';
// import passportImg from '../../assets/images/passport.jpg';
// import travelImg from '../../assets/images/travel.jpg';
// import handsImg from '../../assets/images/hands.jpg';
import imgParallax1 from "../../assets/img/story/parallax1.jpg"

// Gallery items
const galleryItems = {
    0: [
        { id: 1, title: 'First Trip Together', src: 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?auto=format&fit=crop&w=600&q=80' },
        { id: 2, title: 'Coffee Dates', src: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=600&q=80' },
        { id: 3, title: 'Weekend Getaways', src: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=600&q=80' },
    ],
    1: [
        { id: 1, title: 'The Surprising Moment', src: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=600&q=80' },
        { id: 2, title: 'She Said Yes!', src: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=600&q=80' },
        { id: 3, title: 'Celebrating Together', src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80' },
    ],
    2: [
        { id: 1, title: 'Golden Hour Vows', src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80' },
        { id: 2, title: 'Beachside Romance', src: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80' },
        { id: 3, title: 'Under the Stars', src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=600&q=80' },
    ],
};

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
                    bgcolor: '#FFFFFF',
                    borderRadius: '2px',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
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
                            bgcolor: 'rgba(220, 215, 200, 0.7)',
                            backdropFilter: 'blur(2px)',
                            border: '1px solid rgba(200, 190, 170, 0.4)',
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
    const { t: oI18n } = useTranslation();
    const [expanded, setExpanded] = useState('panel01');
    const [galleryTab, setGalleryTab] = useState(0);

    const handleAccordionChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleTabChange = (event, newValue) => {
        setGalleryTab(newValue);
    };

    const chaptersData = [
        {
            id: '01',
            title: oI18n('page_story_section1_chapter1_title'),
            content: oI18n('page_story_section1_chapter1_content'),
        },
        {
            id: '02',
            title: oI18n('page_story_section1_chapter2_title'),
            content: oI18n('page_story_section1_chapter2_content'),
        },
        {
            id: '03',
            title: oI18n('page_story_section1_chapter3_title'),
            content: oI18n('page_story_section1_chapter3_content'),
        },
        {
            id: '04',
            title: oI18n('page_story_section1_chapter4_title'),
            content: oI18n('page_story_section1_chapter4_content'),
        },
    ];

    return (
        <React.Fragment>
            <Box className="bg-vintage">
                <Container maxWidth="lg" className="py-5">
                    {/* Page Title */}
                    <PageTitle title={oI18n('page_story_title')} subtitle={oI18n('page_story_subtitle')} />

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
                                className="text-uppercase fw-bold d-block fs-8 mb-1 text-gold"
                                letterSpacing="largest"
                                i18nKey="page_story_content_tagline"
                            />

                            <Text
                                variant="h3"
                                className="cormorant-garamond-regular mb-2"
                                sx={{ fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' } }}
                                i18nKey="page_story_content_title"
                            />

                            <Box
                                sx={{
                                    width: 40,
                                    height: 2,
                                    bgcolor: '#A08053',
                                    mb: 3,
                                }}
                            />

                            <Text variant="body1" className="mb-2" i18nKey="page_story_content_subtitle" />

                            <Text
                                variant="h4"
                                className="mb-1 cormorant-garamond-regular"
                                sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}
                                i18nKey="page_story_section1_title"
                            />

                            <Text
                                variant="caption"
                                className="text-uppercase mb-3 d-block fw-bold text-gold"
                                i18nKey="page_story_section1_tagline"
                            />

                            {/* Accordion Chapters */}
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                                {chaptersData.map((chapter) => {
                                    const panelId = `panel${chapter.id}`;
                                    const isCurrentExpanded = expanded === panelId;

                                    return (
                                        <Accordion
                                            key={chapter.id}
                                            expanded={isCurrentExpanded}
                                            onChange={handleAccordionChange(panelId)}
                                            elevation={0}
                                            disableGutters
                                            sx={{
                                                bgcolor: 'transparent',
                                                '&:before': { display: 'none' },
                                                borderBottom: '1px solid #E3DDD3',
                                            }}
                                        >
                                            <AccordionSummary
                                                expandIcon={<ExpandMore sx={{ color: '#6E6B67' }} />}
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
                                                <Text className="fw-bold fs-6" sx={{ color: '#A08053', minWidth: 24 }}>
                                                    {chapter.id}
                                                </Text>
                                                <Text className="cormorant-garamond-regular fs-5">
                                                    {chapter.title}
                                                </Text>
                                            </AccordionSummary>

                                            <AccordionDetails sx={{ px: 0, pt: 0, pb: 2 }}>
                                                <Paper
                                                    elevation={0}
                                                    sx={{
                                                        p: { xs: 2, sm: 2.5 },
                                                        bgcolor: '#FAF5ED',
                                                        border: '1px solid #ECE3D7',
                                                        borderRadius: 1,
                                                        ml: { xs: 0, sm: 4 }, // Responsive Indentation
                                                    }}
                                                >
                                                    <Text variant="body2" className="fs-7" i18nKey={chapter.content} />
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
                            <PolaroidCard
                                alt="Kinpo Company"
                                rotation="-6deg"
                                sx={{
                                    width: { xs: '55%', sm: '48%' },
                                    top: 0,
                                    left: '2%',
                                    zIndex: 2,
                                }}
                            />

                            <PolaroidCard
                                alt="Travel Passport"
                                rotation="5deg"
                                sx={{
                                    width: { xs: '52%', sm: '46%' },
                                    top: { xs: '20px', sm: '30px' },
                                    right: '2%',
                                    zIndex: 1,
                                }}
                            />

                            <PolaroidCard
                                alt="Lake View Adventure"
                                rotation="-2deg"
                                hasTape
                                sx={{
                                    width: { xs: '65%', sm: '58%' },
                                    top: { xs: '110px', sm: '150px' },
                                    left: '10%',
                                    zIndex: 3,
                                }}
                            />

                            <PolaroidCard
                                alt="Holding Hands"
                                rotation="4deg"
                                sx={{
                                    width: { xs: '55%', sm: '48%' },
                                    top: { xs: '180px', sm: '240px' },
                                    right: '0%',
                                    zIndex: 2,
                                }}
                            />

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
                                        fontFamily: '"Caveat", "Dancing Script", cursive',
                                        fontSize: { xs: '1.5rem', sm: '2.2rem', md: '2.4rem' },
                                        color: '#7D6A53',
                                        lineHeight: 1.1,
                                        transform: 'rotate(-6deg)',
                                    }}
                                    i18nKey="page_story_section1_highlight"
                                />
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Box>

            <ParallaxBanner
                image={imgParallax1}
                title={oI18n('page_story_section2_parallax_title')}
                subtitle={oI18n('page_story_section2_parallax_subtitle')}
                height="320px"
            />

            <Box className="bg-vintage">
                {/* Moments Gallery Section */}
                <Container maxWidth="lg" className="py-5">
                    <Box sx={{ textAlign: 'center', mb: { xs: 3, sm: 4 } }}>
                        <Typography
                            variant="h4"
                            className="pinyon-script-regular"
                            sx={{ color: '#5a4632', fontSize: { xs: '2rem', sm: '2.5rem' } }}
                        >
                            Our Favorite Moments
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ px: 2 }}>
                            A glimpse into our journey through the years
                        </Typography>
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
                            textColor="primary"
                            indicatorColor="primary"
                            sx={{
                                minHeight: { xs: 40, sm: 48 },
                                '& .MuiTabs-scrollButtons': {
                                    color: '#A08053',
                                },
                                '& .MuiTab-root': {
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    fontSize: { xs: '0.85rem', sm: '0.95rem' },
                                    px: { xs: 1.5, sm: 3 },
                                    py: { xs: 1, sm: 1.5 },
                                    minHeight: { xs: 40, sm: 48 },
                                    whiteSpace: 'nowrap',
                                },
                            }}
                        >
                            <Tab label="Life, Together" />
                            <Tab label="The Proposal — A Promise Forever" />
                            <Tab label="Prenup Shoot — Moments Before the Vows" />
                        </Tabs>
                    </Box>

                    {/* Photo Grid */}
                    <Grid container spacing={{ xs: 2, sm: 3 }}>
                        {galleryItems[galleryTab].map((item) => (
                            <Grid item xs={12} sm={6} md={4} key={item.id}>
                                <Card
                                    elevation={2}
                                    sx={{
                                        borderRadius: 2,
                                        overflow: 'hidden',
                                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            boxShadow: 4,
                                        },
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        sx={{
                                            height: { xs: 220, sm: 260 },
                                            objectFit: 'cover',
                                        }}
                                        image={item.src}
                                        alt={item.title}
                                    />
                                    <Box sx={{ p: 2, textAlign: 'center', backgroundColor: '#fff' }}>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#4a3b2c' }}>
                                            {item.title}
                                        </Typography>
                                    </Box>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>
        </React.Fragment>
    );
}