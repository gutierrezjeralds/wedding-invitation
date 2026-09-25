import React, { useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Box, Container, Stack, Divider, Typography, Accordion, AccordionSummary, AccordionDetails, Paper } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { Text, PageTitle } from '../utils/CustomComponents';
import ParallaxBanner from '../utils/ParallaxBanner';

// import kinpoImg from '../../assets/images/kinpo.jpg';
// import passportImg from '../../assets/images/passport.jpg';
// import travelImg from '../../assets/images/travel.jpg';
// import handsImg from '../../assets/images/hands.jpg';
import imgParallax1 from "../../assets/img/story/parallax1.jpg"

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
                    p: 1.2,
                    pb: 3,
                    bgcolor: '#FFFFFF',
                    borderRadius: '2px',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                    position: 'relative',
                }}
            >
                {/* Washi Tape Effect at top center */}
                {hasTape && (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: -12,
                            left: '50%',
                            transform: 'translateX(-50%) rotate(-2deg)',
                            width: 50,
                            height: 18,
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

    const handleAccordionChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const chaptersData = [
        {
            id: '01',
            title: oI18n("page_story_section1_chapter1_title"),
            content: oI18n("page_story_section1_chapter1_content")
        },
        {
            id: '02',
            title: oI18n("page_story_section1_chapter2_title"),
            content: oI18n("page_story_section1_chapter2_content")
        },
        {
            id: '03',
            title: oI18n("page_story_section1_chapter3_title"),
            content: oI18n("page_story_section1_chapter3_content")
        },
        {
            id: '04',
            title: oI18n("page_story_section1_chapter4_title"),
            content: oI18n("page_story_section1_chapter4_content")
        }
    ];

    return (
        <React.Fragment>
            <Box className="bg-vintage">
                <Container maxWidth="lg" className="py-5">
                    {/* Page Title */}
                    <PageTitle title={oI18n("page_story_title")} subtitle={oI18n("page_story_subtitle")} />

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' },
                            gap: { xs: 6, md: 8 },
                            alignItems: 'flex-start',
                        }}
                    >
                        {/* LEFT COLUMN: Text Content & Accordion Chapters */}
                        <Box sx={{ flex: 1, width: '100%' }}>
                            {/* Header Section */}
                            <Text
                                variant="caption"
                                className="text-uppercase fw-bold d-block fs-8 mb-1 text-gold"
                                letterSpacing="largest"
                                i18nKey="page_story_content_tagline"
                            />

                            <Text
                                variant="h3"
                                className="cormorant-garamond-regular mb-2"
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

                            <Text
                                variant="body1"
                                className="mb-2"
                                i18nKey="page_story_content_subtitle"
                            />

                            {/* Chapters Header */}
                            <Text
                                variant="h4"
                                className="mb-1 cormorant-garamond-regular"
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
                                                        gap: 2,
                                                        m: 0,
                                                    },
                                                }}
                                            >
                                                <Text className="fw-bold fs-6" sx={{color: '#A08053', minWidth: 28}}>
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
                                                        p: 2.5,
                                                        bgcolor: '#FAF5ED',
                                                        border: '1px solid #ECE3D7',
                                                        borderRadius: 1,
                                                        ml: 5, // Indents nicely under the title
                                                    }}
                                                >
                                                    <Text
                                                        variant="body2"
                                                        className="fs-7"
                                                        i18nKey={chapter.content}
                                                    />
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
                                minHeight: { xs: 480, sm: 580 },
                                mt: { xs: 2, md: 0 },
                            }}
                        >
                            {/* 1. Top-Left Polaroid (Kinpo Office) */}
                            <PolaroidCard
                                // src={kinpoImg}
                                alt="Kinpo Company"
                                rotation="-8deg"
                                sx={{
                                    width: { xs: '55%', sm: '48%' },
                                    top: 0,
                                    left: '5%',
                                    zIndex: 2,
                                }}
                            />

                            {/* 2. Top-Right Polaroid (Passport) */}
                            <PolaroidCard
                                // src={passportImg}
                                alt="Travel Passport"
                                rotation="6deg"
                                sx={{
                                    width: { xs: '52%', sm: '46%' },
                                    top: '30px',
                                    right: '2%',
                                    zIndex: 1,
                                }}
                            />

                            {/* 3. Center-Main Polaroid (Scenery View) */}
                            <PolaroidCard
                                // src={travelImg}
                                alt="Lake View Adventure"
                                rotation="-2deg"
                                hasTape
                                sx={{
                                    width: { xs: '65%', sm: '58%' },
                                    top: '150px',
                                    left: '12%',
                                    zIndex: 3,
                                }}
                            />

                            {/* 4. Bottom-Right Polaroid (Holding Hands) */}
                            <PolaroidCard
                                // src={handsImg}
                                alt="Holding Hands"
                                rotation="4deg"
                                sx={{
                                    width: { xs: '55%', sm: '48%' },
                                    top: '240px',
                                    right: '0%',
                                    zIndex: 2,
                                }}
                            />

                            {/* Handwritten Script Accent (Bottom Right) */}
                            <Box
                                sx={{
                                    position: 'absolute',
                                    bottom: 0,
                                    right: '5%',
                                    zIndex: 4,
                                    textAlign: 'right',
                                    pointerEvents: 'none',
                                }}
                            >
                                <Text
                                    sx={{
                                        fontFamily: '"Caveat", "Dancing Script", cursive',
                                        fontSize: { xs: '1.8rem', sm: '2.4rem' },
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
                title={oI18n("page_story_section2_parallax_title")}
                subtitle={oI18n("page_story_section2_parallax_subtitle")}
                height="320px"
            />
            <Box className="bg-vintage">
                <Container maxWidth="lg" className="py-5">

                </Container>
            </Box>
        </React.Fragment>
    );
}