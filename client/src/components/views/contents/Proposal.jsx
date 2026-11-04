import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Container, Box, Stack, Card, CardMedia } from '@mui/material';
import { Text } from '../utils/CustomComponents';
import { useMedia } from '../utils/MediaContext';
import { fetchPageContent } from '../utils/ConstantContent';

// Assets
import imgChurch from "../../assets/img/proposal/church.png";
import imgTitleName from "../../assets/img/proposal/title_name.png";
import imgFooter from "../../assets/img/proposal/footer.png";

// Import Swiper React components & required modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Proposal() {
    const { sId, sName } = useParams();
    const _sName = sName?.toLowerCase();
    const _sId = sId?.toUpperCase();
    const { getAsset, getGalleryAssets } = useMedia();

    // Section Backgrounds dynamically retrieved from MongoDB via composite categories
    const sBackgroundDesktop1 = getAsset('proposal', 'background', 'section1-desktop');
    const sBackgroundMobile1 = getAsset('proposal', 'background', 'section1-mobile');

    const sBackgroundDesktop2 = getAsset('proposal', 'background', 'section2-desktop');
    const sBackgroundMobile2 = getAsset('proposal', 'background', 'section2-mobile');

    const sBackgroundDesktop3 = getAsset('proposal', 'background', 'section3-desktop');
    const sBackgroundMobile3 = getAsset('proposal', 'background', 'section3-mobile');

    const sBackgroundDesktop4 = getAsset('proposal', 'background', 'section4-desktop');
    const sBackgroundMobile4 = getAsset('proposal', 'background', 'section4-mobile');
            
    const [CONTENT, setGlobalContent] = useState(null);
    const [CONTENT_PROPOSAL, setContent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadAllData() {
            const [globalData, contentData] = await Promise.all([
                fetchPageContent('global'),
                fetchPageContent('proposal')
            ]);

            setGlobalContent(globalData);
            setContent(contentData);
            setLoading(false);
        }
        loadAllData();
    }, []);

    let oLetter = null;
    let oText = [];

    // Get Proper Object
    if (sId && (sId.includes("entourage") || sId.includes("parents"))) {
        const sIds = _sId.split("-");
        oLetter = CONTENT_PROPOSAL?.[sIds[0]]?.[sIds[1]]?.LETTER?.[_sName];
        oText = CONTENT_PROPOSAL?.[sIds[0]]?.[sIds[1]];
    } else {
        oLetter = CONTENT_PROPOSAL?.[_sId]?.LETTER?.[_sName];
        oText = CONTENT_PROPOSAL?.[_sId];
    }

    if (oLetter) {
        const sIds = (sId?.toLowerCase()).split("-");
        const sIdLower = sIds[0];
        const sIdSubLower = sIds[1];

        let imgAttireDress = [];
        let imgAttirePalette = [];

        // Pull attire dresses & palettes dynamically from MediaContext
        if (sIdLower === "principal" || sIdLower === "secondary") {
            imgAttireDress = getGalleryAssets('attire', 'gallery', 'principal');
            imgAttirePalette = getGalleryAssets('attire', 'palette', 'principal');
        } else if (sIdLower === "entourage") {
            if (sIdSubLower === "bridemaids" || sIdSubLower === "groomsmen") {
                imgAttireDress = getGalleryAssets('attire', 'gallery', 'entourage');
            } else {
                imgAttireDress = getGalleryAssets('attire', 'gallery', 'parents');
            }
            imgAttirePalette = getGalleryAssets('attire', 'palette', 'guest');
        } else if (sIdLower === "parents") {
            imgAttireDress = getGalleryAssets('attire', 'gallery', 'parents');
            imgAttirePalette = getGalleryAssets('attire', 'palette', 'parents');
        }

        if (loading) {
            return <CircularProgress />;
        }

        return (
            <React.Fragment>
                {/* Proposal Greetings Section (Section 1) */}
                <Box
                    className="page-background"
                    sx={{
                        '--bg-desktop': sBackgroundDesktop1 ? `url(${sBackgroundDesktop1})` : 'none',
                        '--bg-mobile': sBackgroundMobile1 ? `url(${sBackgroundMobile1})` : 'none',
                        backgroundColor: '#faf8f5',
                    }}
                >
                    <Container maxWidth="lg" className="py-5">
                        <Box className="text-center">
                            <Box className="d-flex justify-content-center align-items-center">
                                <Box
                                    component="img"
                                    src={imgTitleName}
                                    alt="Jerald and Sheila"
                                    sx={{
                                        width: '100%',
                                        maxWidth: 700,
                                        height: 'auto',
                                        display: 'block',
                                        borderRadius: 2,
                                        filter: 'drop-shadow(0px 8px 20px rgba(0,0,0,0.08))',
                                        mb: { xs: 15, sm: 7 }
                                    }}
                                />
                            </Box>
                            <Text
                                variant="h4"
                                component="div"
                                className="fst-italic"
                                textKey={CONTENT_PROPOSAL.INTRO.TAGLINE}
                            />
                            <Text
                                variant="body1"
                                className="mt-5"
                                textKey={CONTENT_PROPOSAL.INTRO.BIBLE}
                            />
                        </Box>
                    </Container>
                </Box>

                {/* Proposal Message Section (Section 2) */}
                <Box
                    className="page-background"
                    sx={{
                        '--bg-desktop': sBackgroundDesktop2 ? `url(${sBackgroundDesktop2})` : 'none',
                        '--bg-mobile': sBackgroundMobile2 ? `url(${sBackgroundMobile2})` : 'none',
                        backgroundColor: '#faf8f5',
                    }}
                >
                    <Container maxWidth="lg" className="py-5">
                        <Box>
                            <Text
                                className="cormorant-garamond-regular fs-5 mb-3"
                                textKey={CONTENT_PROPOSAL.TO?.replace('{{0}}', oLetter.NAME)}
                            />
                            <Text
                                className="my-4 cormorant-garamond-regular fs-6"
                                sx={{ pb: { xs: 0, sm: 5 } }}
                                textKey={oLetter.MESSAGE}
                            />
                            <Text
                                className="text-center text-uppercase playfair-display-regular mt-5"
                                textKey={oLetter.QUESTION?.WHAT}
                            />
                            <Text
                                variant="h3"
                                component="h1"
                                className="text-center great-vibes-regular mt-3"
                                textKey={oLetter.QUESTION?.WHO}
                            />
                        </Box>
                    </Container>
                </Box>

                {/* Attire Guide Section */}
                <Box className="background-wedding-soft">
                    <Container maxWidth="lg" className="py-5">
                        <Box>
                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                                    gap: 4,
                                }}
                                className="mt-3"
                            >
                                {/* LEFT SIDE: Swiper Carousel */}
                                <Box
                                    sx={{
                                        width: '100%',
                                        minWidth: 0,
                                        '& .swiper': {
                                            paddingBottom: '35px',
                                        },
                                        '& .swiper-button-next, & .swiper-button-prev': {
                                            color: '#d4af37',
                                            '&::after': {
                                                fontSize: '1.2rem',
                                                fontWeight: 'bold',
                                            },
                                        },
                                        '& .swiper-pagination-bullet': {
                                            backgroundColor: '#ccc',
                                            opacity: 0.7,
                                        },
                                        '& .swiper-pagination-bullet-active': {
                                            backgroundColor: '#d4af37',
                                            opacity: 1,
                                            width: 12,
                                            borderRadius: 4,
                                        },
                                    }}
                                >
                                    <Text
                                        variant="body1"
                                        letterSpacing="wide"
                                        className="playfair-display-regular mb-1 text-uppercase text-center"
                                        textKey={CONTENT_PROPOSAL.ATTIRE_GUIDE}
                                    />
                                    <Text
                                        variant="h5"
                                        className="great-vibes-regular mb-1 text-center"
                                        textKey={oText?.TITLE}
                                    />
                                    <Swiper
                                        modules={[Navigation, Pagination, Autoplay]}
                                        spaceBetween={15}
                                        slidesPerView={1}
                                        navigation
                                        pagination={{ clickable: true }}
                                        autoplay={{ delay: 3500, disableOnInteraction: false }}
                                    >
                                        {imgAttireDress.map((item, index) => (
                                            <SwiperSlide key={item._id || index}>
                                                <Card sx={{ borderRadius: 3, overflow: 'hidden', bgcolor: 'transparent !important', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
                                                    <CardMedia
                                                        component="img"
                                                        height="380"
                                                        image={item.url}
                                                        alt={`Attire sample ${index + 1}`}
                                                        loading="lazy"
                                                        sx={{ objectFit: 'contain', bgcolor: 'transparent !important', py: 2 }}
                                                    />
                                                </Card>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </Box>

                                {/* RIGHT SIDE: Palette & Details */}
                                <Box>
                                    <Text
                                        className="mb-3 fs-8 cormorant-garamond-regular"
                                        textKey={oText?.ATTIRE?.MESSAGE}
                                    />
                                    <Stack spacing={2}>
                                        {imgAttirePalette.map((item, index) => (
                                            <React.Fragment key={item._id || index}>
                                                <Box className="d-flex flex-row justify-content-center align-items-center">
                                                    <Box
                                                        component="img"
                                                        src={item.url}
                                                        alt={`Palette sample ${index + 1}`}
                                                        sx={{
                                                            width: '100%',
                                                            maxWidth: 350,
                                                            height: 'auto',
                                                            display: 'block',
                                                            mx: 'auto',
                                                        }}
                                                    />
                                                </Box>
                                            </React.Fragment>
                                        ))}
                                    </Stack>
                                </Box>
                            </Box>
                        </Box>
                    </Container>
                </Box>

                {/* Event Schedule & Venue Details (Section 3) */}
                <Box
                    className="page-background"
                    sx={{
                        '--bg-desktop': sBackgroundDesktop3 ? `url(${sBackgroundDesktop3})` : 'none',
                        '--bg-mobile': sBackgroundMobile3 ? `url(${sBackgroundMobile3})` : 'none',
                        backgroundColor: '#faf8f5',
                    }}
                >
                    <Container maxWidth="lg" className="py-5">
                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                                gap: 4,
                                alignItems: 'center',
                            }}
                        >
                            {/* COLUMN 1: CHURCH IMAGE */}
                            <Box className="d-flex justify-content-center align-items-center">
                                <Box
                                    component="img"
                                    src={imgChurch}
                                    alt="Parish Church Illustration"
                                    sx={{
                                        width: '100%',
                                        maxWidth: 450,
                                        height: 'auto',
                                        display: 'block',
                                        borderRadius: 2,
                                        filter: 'drop-shadow(0px 8px 20px rgba(0,0,0,0.08))',
                                    }}
                                />
                            </Box>

                            {/* COLUMN 2: VENUE & SCHEDULE DETAILS */}
                            <Box className="text-center">
                                <Text
                                    variant="caption"
                                    className="text-center"
                                    textKey={CONTENT_PROPOSAL.SUMMARY.TAGLINE}
                                />
                                <Text
                                    variant="h4"
                                    className="great-vibes-regular my-4 text-center"
                                    textKey={CONTENT.TITLE_NAME}
                                />
                                <Text
                                    variant="caption"
                                    className="text-center"
                                    textKey={CONTENT_PROPOSAL.SUMMARY.SUBTAGLINE}
                                />
                                <Text
                                    variant="h6"
                                    className="cormorant-garamond-regular text-uppercase mt-3 text-center"
                                    textKey={CONTENT_PROPOSAL.SUMMARY.DATE}
                                />
                                <Box className="mt-4">
                                    <Text
                                        variant="caption"
                                        letterSpacing="widest"
                                        className="playfair-display-regular text-uppercase"
                                        textKey={CONTENT_PROPOSAL.SUMMARY.CEREMONY}
                                    />
                                    <Text
                                        variant="h5"
                                        className="cormorant-garamond-bold"
                                        textKey={CONTENT.TITLE_CHURCH}
                                    />
                                    <Text
                                        variant="body2"
                                        className="cormorant-garamond-bold"
                                        textKey={CONTENT.TITLE_CHURCH_ADDRESS}
                                    />
                                </Box>
                                <Box className="mt-4">
                                    <Text
                                        variant="caption"
                                        letterSpacing="widest"
                                        className="playfair-display-regular text-uppercase"
                                        textKey={CONTENT_PROPOSAL.SUMMARY.RECEPTION}
                                    />
                                    <Text
                                        variant="h5"
                                        className="cormorant-garamond-bold"
                                        textKey={CONTENT.TITLE_RECEPTION}
                                    />
                                    <Text
                                        variant="body2"
                                        className="cormorant-garamond-bold"
                                        textKey={CONTENT.TITLE_RECEPTION_ADDRESS}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </Container>
                </Box>

                {/* Proposal Footer Section (Section 4) */}
                <Box
                    className="page-background"
                    sx={{
                        '--bg-desktop': sBackgroundDesktop4 ? `url(${sBackgroundDesktop4})` : 'none',
                        '--bg-mobile': sBackgroundMobile4 ? `url(${sBackgroundMobile4})` : 'none',
                        backgroundColor: '#faf8f5',
                    }}
                >
                    <Container maxWidth="lg" className="py-5">
                        <Box className="text-center py-5">
                            <Box className="d-flex justify-content-center align-items-center">
                                <Box
                                    component="img"
                                    src={imgFooter}
                                    alt="Jerald and Sheila"
                                    sx={{
                                        width: '100%',
                                        maxWidth: 100,
                                        height: 'auto',
                                        display: 'block',
                                        borderRadius: 2,
                                        filter: 'drop-shadow(0px 8px 20px rgba(0,0,0,0.08))',
                                        mb: { xs: 15, sm: 7 }
                                    }}
                                />
                            </Box>
                            <Text
                                variant="caption"
                                className="d-block mb-5"
                                textKey={CONTENT_PROPOSAL.FOOTER.LINE1}
                            />
                            <Text
                                variant="caption"
                                textKey={CONTENT_PROPOSAL.FOOTER.LINE2}
                            />
                            <Text
                                variant="h2"
                                textKey={CONTENT_PROPOSAL.FOOTER.LINE3}
                            />
                        </Box>
                    </Container>
                </Box>
            </React.Fragment>
        );
    } else {
        // return <Navigate to="/" replace />;
        return "";
    }
}