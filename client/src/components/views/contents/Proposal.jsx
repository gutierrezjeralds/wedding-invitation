import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Container, Box, Stack, Card, CardMedia } from '@mui/material';
import { Text } from '../utils/CustomComponents';
import { CONTENT_PROPOSAL, CONTENT_ATTIRE, CONTENT } from '../utils/Constants';

// Assets
import imgChurch from "../../assets/img/proposal/church.png";
import imgTitleName from "../../assets/img/proposal/title_name.png";

// Assets background
const sCloudflareBaseDirectUrl = "https://wedding-images-api.jeraldandsheila.workers.dev/images";
const sBackgroundDekstop1 = sCloudflareBaseDirectUrl + "/background/desktop/proposal-1.png";
const sBackgroundMobile1 = sCloudflareBaseDirectUrl + "/background/mobile/proposal-1.png";
const sBackgroundDekstop2 = sCloudflareBaseDirectUrl + "/background/desktop/proposal-2.png";
const sBackgroundMobile2 = sCloudflareBaseDirectUrl + "/background/mobile/proposal-2.png";
const sBackgroundDekstop3 = sCloudflareBaseDirectUrl + "/background/desktop/proposal-3.png";
const sBackgroundMobile3 = sCloudflareBaseDirectUrl + "/background/mobile/proposal-3.png";
const sBackgroundDekstop4 = sCloudflareBaseDirectUrl + "/background/desktop/proposal-4.png";
const sBackgroundMobile4 = sCloudflareBaseDirectUrl + "/background/mobile/proposal-4.png";

// Import Swiper React components & required modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { m } from 'framer-motion';

export default function Gift() {
    const { sId, sName } = useParams();
    const _sName = sName?.toLowerCase();
    const _sId = sId?.toUpperCase();
    const oLetter = CONTENT_PROPOSAL?.[_sId]?.LETTER?.[_sName];

    if (oLetter) {
        const sCloudflareBaseUrl = "https://wedding-images-api.jeraldandsheila.workers.dev/api/images";
        const [imgAttireDress, setImgAttireDress] = useState([]);
        const [imgAttirePalette, setImgAttirePalette] = useState([]);

        useEffect(() => {
            const fetchAndSort = (endpoint, setter) => {
                fetch(`${sCloudflareBaseUrl}${endpoint}`)
                    .then((res) => res.json())
                    .then((data) => setter(data))
                    .catch((err) => console.error(`Error loading ${endpoint}:`, err));
            };

            const sIdLower = sId?.toLowerCase();

            if (sIdLower === "principal" || sIdLower === "secondary") {
                fetchAndSort('/attire/sponsors/dress', setImgAttireDress);
                fetchAndSort('/attire/sponsors/palette', setImgAttirePalette);
            }

            if (sIdLower === "entourage") {
                fetchAndSort('/attire/entourage/dress/adult', setImgAttireDress);
                fetchAndSort('/attire/entourage/dress/child', setImgAttirePalette);
            }

            if (sIdLower === "parents") {
                fetchAndSort('/attire/parents/dress', setImgAttireDress);
                fetchAndSort('/attire/parents/palette', setImgAttirePalette);
            }
        }, [sId, sCloudflareBaseUrl]);

        return (
            <React.Fragment>
                {/* Proposal Greetings Section */}
                <Box
                    className="page-background"
                    sx={{
                        '--bg-desktop': `url(${sBackgroundDekstop1})`,
                        '--bg-mobile': `url(${sBackgroundMobile1})`,
                        // Fallback background color if images fail to load or are empty
                        backgroundColor: '#faf8f5',
                    }}
                >
                    <Container maxWidth="lg" className="py-5">
                        <Box className="text-center">
                            <Box className="d-flex justify-content-center align-items-center">
                                <Box
                                    component="img"
                                    src={imgTitleName}
                                    alt="St. Augustine Parish Church Illustration"
                                    sx={{
                                        width: '100%',
                                        maxWidth: 700,
                                        height: 'auto',
                                        display: 'block',
                                        borderRadius: 2,
                                        filter: 'drop-shadow(0px 8px 20px rgba(0,0,0,0.08))',
                                        mb: {xs: 15, sm: 7}
                                    }}
                                />
                            </Box>
                            <Text
                                variant="h4"
                                component="body1"
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

                {/* Proposal Message Section */}
                <Box
                    className="page-background"
                    sx={{
                        '--bg-desktop': `url(${sBackgroundDekstop2})`,
                        '--bg-mobile': `url(${sBackgroundMobile2})`,
                        // Fallback background color if images fail to load or are empty
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
                                sx={{pb: {xs: 0, sm: 5}}}
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
                            {/* CSS GRID: 2 equal columns on desktop, 1 column on mobile */}
                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                                    gap: 4,
                                }}
                                className="mt-3"
                            >
                                {/* COLUMN 1: LEFT SIDE (Swiper Carousel) */}
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
                                        textKey={CONTENT_PROPOSAL[_sId]?.TITLE}
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
                                            <SwiperSlide key={index}>
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

                                {/* COLUMN 2: RIGHT SIDE (Palette & Details) */}
                                <Box>
                                    <Text
                                        className="mb-3 fs-8 cormorant-garamond-regular"
                                        textKey={CONTENT_PROPOSAL[_sId]?.ATTIRE?.MESSAGE}
                                    />
                                    <Stack spacing={2}>
                                        {imgAttirePalette.map((item, index) => (
                                            <React.Fragment key={index}>
                                                <Text
                                                    variant="caption"
                                                    className="text-center cormorant-garamond-regular"
                                                    textKey={CONTENT_ATTIRE?.TAB?.GUEST?.[`SUBDETAILS_${index + 1}`]}
                                                />
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

                {/* Event Schedule & Venue Details (2-Column Layout) */}
                <Box
                    className="page-background"
                    sx={{
                        '--bg-desktop': `url(${sBackgroundDekstop3})`,
                        '--bg-mobile': `url(${sBackgroundMobile3})`,
                        // Fallback background color if images fail to load or are empty
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
                                    alt="St. Augustine Parish Church Illustration"
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

                            {/* COLUMN 2: VENUE & SCHEDULE TEXT DETAILS */}
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
                {/* Proposal footer section */}
                <Box
                    className="page-background"
                    sx={{
                        '--bg-desktop': `url(${sBackgroundDekstop4})`,
                        '--bg-mobile': `url(${sBackgroundMobile4})`,
                        // Fallback background color if images fail to load or are empty
                        backgroundColor: '#faf8f5',
                    }}
                >
                    <Container maxWidth="lg" className="py-5">

                    </Container>
                </Box>
            </React.Fragment>
        );
    } else {
        // return <Navigate to="/" replace />;
        return ("");
    }
}