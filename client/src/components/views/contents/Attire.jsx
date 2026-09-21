import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Container, Tabs, Tab, Paper, Stack, Grid, Card, CardMedia, Divider, styled } from '@mui/material';
import {
    FavoriteBorder,
    FamilyRestroom, MilitaryTech, Groups, PeopleAlt
} from '@mui/icons-material';
import { Text } from '../utils/MUIComponents';

// Import Swiper React components & required modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Dynamically import all images from the attire folder
const imgParentsModules = import.meta.glob('../../assets/img/attire/parents/sample/*.{png,jpg,jpeg,webp}', {
    eager: true,
    import: 'default',
});

// Convert the object map into a clean array of image URLs
const imgParentsAttire = Object.values(imgParentsModules);

// Dynamically import all images from the attire folder
const imgSponsorsModules = import.meta.glob('../../assets/img/attire/sponsors/sample/*.{png,jpg,jpeg,webp}', {
    eager: true,
    import: 'default',
});

// Convert the object map into a clean array of image URLs
const imgSponsorsAttire = Object.values(imgSponsorsModules);

// Dynamically import all images from the attire folder
const imgEntourageModules = import.meta.glob('../../assets/img/attire/entourage/sample/*.{png,jpg,jpeg,webp}', {
    eager: true,
    import: 'default',
});

// Convert the object map into a clean array of image URLs
const imgEntourageAttire = Object.values(imgEntourageModules);

// Dynamically import all images from the attire folder
const imgGuestModules = import.meta.glob('../../assets/img/attire/guest/sample/*.{png,jpg,jpeg,webp}', {
    eager: true,
    import: 'default',
});

// Convert the object map into a clean array of image URLs
const imgGuestAttire = Object.values(imgGuestModules);

// Assets
import imgParentPalette from '../../assets/img/attire/parents/palette.png';
import imgSponsorsPalette from '../../assets/img/attire/sponsors/palette.png';
import imgEntouragePalette from '../../assets/img/attire/entourage/palette.png';
import imgGuestPalette from '../../assets/img/attire/guest/palette.png';
import imgDont1 from "../../assets/img/attire/dont/1.png";
import imgDont2 from "../../assets/img/attire/dont/2.png";
import imgDont3 from "../../assets/img/attire/dont/3.png";
import imgDont4 from "../../assets/img/attire/dont/4.png";
import imgDont5 from "../../assets/img/attire/dont/5.png";
import imgDont6 from "../../assets/img/attire/dont/6.png";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`attire-tabpanel-${index}`}
            aria-labelledby={`attire-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ pt: 4, pb: 2 }}>{children}</Box>}
        </div>
    );
}

export default function Attire() {
    const { t: oI18n } = useTranslation();
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const [imgDoneAttire, setImgDoneAttire] = useState([
        { id: 1, src: imgDont1, title: oI18n("page_attire_note_1_title") , subtitle: oI18n("page_attire_note_1_subtitle")},
        { id: 2, src: imgDont2, title: oI18n("page_attire_note_2_title") , subtitle: oI18n("page_attire_note_2_subtitle")},
        { id: 3, src: imgDont3, title: oI18n("page_attire_note_3_title") , subtitle: oI18n("page_attire_note_3_subtitle")},
        { id: 4, src: imgDont4, title: oI18n("page_attire_note_4_title") , subtitle: oI18n("page_attire_note_4_subtitle")},
        { id: 5, src: imgDont5, title: oI18n("page_attire_note_5_title") , subtitle: oI18n("page_attire_note_5_subtitle")},
        { id: 6, src: imgDont6, title: oI18n("page_attire_note_6_title") , subtitle: oI18n("page_attire_note_6_subtitle")}
    ]);

    return (
         <React.Fragment>
            <Box className="bg-light py-5">
                <Container maxWidth="lg">
                    <Stack className="text-center mb-5" spacing={1}>
                        <Text letterSpacing="wide" variant="h3" className="great-vibes-regular">
                            {oI18n("page_attire_title")}
                        </Text>

                        <Text variant="body1" className="cormorant-garamond-regular">
                            {oI18n("page_attire_subtitle")}
                        </Text>
                        
                        <Divider component="div" role="presentation" className='mt-4'>
                            <FavoriteBorder fontSize="small" className='mt-2' />
                        </Divider>
                    </Stack>

                    {/* Custom Styled MUI Tabs */}
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs
                                value={tabValue}
                                onChange={handleTabChange}
                                variant="scrollable"
                                scrollButtons="auto"
                                allowScrollButtonsMobile
                                sx={{
                                    width: '100%',
                                    '& .MuiTabs-scroller': {
                                        display: { sm: 'flex' },
                                        justifyContent: { sm: 'center' },
                                    },
                                    '& .MuiTabs-flexContainer': {
                                        justifyContent: { sm: 'center' },
                                    },
                                    '& .MuiTab-root': {
                                        fontSize: { xs: '0.75rem', sm: '0.9rem' },
                                        fontWeight: 500,
                                        textTransform: 'uppercase',
                                        letterSpacing: { xs: 0.5, sm: 1.5 },
                                        minWidth: { xs: 'auto', sm: 120 },
                                        px: { xs: 1.5, sm: 3 },
                                        py: 1,
                                        color: 'text.secondary',
                                        '&.Mui-selected': {
                                            color: '#d4af37',
                                        },
                                    },
                                    '& .MuiTabs-indicator': {
                                        backgroundColor: '#d4af37',
                                        height: 3,
                                        borderRadius: '3px 3px 0 0',
                                    },
                                }}
                            >
                                <Tab icon={<PeopleAlt fontSize="small" />} iconPosition="start" label={oI18n("page_attire_tab_guest")} />
                                <Tab icon={<FamilyRestroom fontSize="small" />} iconPosition="start" label={oI18n("page_attire_tab_parents")} />
                                <Tab icon={<MilitaryTech fontSize="small" />} iconPosition="start" label={oI18n("page_attire_tab_sponsors")} />
                                <Tab icon={<Groups fontSize="small" />} iconPosition="start" label={oI18n("page_attire_tab_entourage")} />
                            </Tabs>
                        </Box>

                        {/* TAB 0: GUESTS (ACTIVE ON LOAD) */}
                        <TabPanel value={tabValue} index={0}>
                            <Paper elevation={0} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 3, bgcolor: '#fdfbf7', border: '1px solid #f0e6d2' }}>
                                <Text variant="body1" className="playfair-display-regular mb-1 text-gold">
                                    {oI18n("page_attire_tab_content_guest_title")}
                                </Text>
                                <Text variant="caption">
                                    {oI18n("page_attire_tab_content_guest_subtitle")}
                                </Text>

                                {/* CSS GRID: Guarantees 2 equal columns on desktop, 1 column on mobile */}
                                <Box
                                    sx={{
                                        display: 'grid',
                                        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, // 50% left, 50% right
                                        gap: 4,
                                    }}
                                    className="mt-3"
                                >
                                    {/* COLUMN 1: LEFT SIDE (Carousel) */}
                                    <Box
                                        sx={{
                                            width: '100%',
                                            minWidth: 0, // Prevents Swiper from overflowing flex/grid containers
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
                                        <Swiper
                                            modules={[Navigation, Pagination, Autoplay]}
                                            spaceBetween={15}
                                            slidesPerView={1}
                                            navigation
                                            pagination={{ clickable: true }}
                                            autoplay={{ delay: 3500, disableOnInteraction: false }}
                                        >
                                            {imgGuestAttire.map((src, index) => (
                                                <SwiperSlide key={index}>
                                                    <Card sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
                                                        <CardMedia
                                                            component="img"
                                                            height="380"
                                                            image={src}
                                                            alt={`Attire sample ${index + 1}`}
                                                            loading="lazy"
                                                            sx={{ objectFit: 'contain', bgcolor: '#fff' }}
                                                        />
                                                    </Card>
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    </Box>

                                    {/* COLUMN 2: RIGHT SIDE (Text Content) */}
                                    <Box>
                                        <Stack spacing={2}>
                                            <Text variant="h6" className="playfair-display-regular text-gold">
                                                {oI18n("page_attire_tab_content_guest_card2_title")}
                                            </Text>
                                            <Text variant="caption">
                                                {oI18n("page_attire_tab_content_guest_card2_subtitle")}
                                            </Text>
                                            <Box className="d-flex flex-row justify-content-center align-items-center">
                                                <Box
                                                    component="img"
                                                    src={imgGuestPalette}
                                                    alt="Church"
                                                    sx={{
                                                        width: '100%',          // Responsive width
                                                        maxWidth: 400,          // Maximum width limit
                                                        height: 'auto',         // Maintain aspect ratio
                                                        display: 'block',
                                                        mx: 'auto',             // Center horizontally
                                                    }}
                                                />
                                            </Box>
                                        </Stack>
                                    </Box>
                                </Box>
                            </Paper>
                        </TabPanel>

                        {/* TAB 1: PARENTS */}
                        <TabPanel value={tabValue} index={1}>
                            <Paper elevation={0} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 3, bgcolor: '#fdfbf7', border: '1px solid #f0e6d2' }}>
                                <Text variant="body1" className="playfair-display-regular mb-1 text-gold">
                                    {oI18n("page_attire_tab_content_parents_title")}
                                </Text>
                                <Text variant="caption">
                                    {oI18n("page_attire_tab_content_parents_subtitle")}
                                </Text>

                                {/* CSS GRID: Guarantees 2 equal columns on desktop, 1 column on mobile */}
                                <Box
                                    sx={{
                                        display: 'grid',
                                        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, // 50% left, 50% right
                                        gap: 4,
                                    }}
                                    className="mt-3"
                                >
                                    {/* COLUMN 1: LEFT SIDE (Carousel) */}
                                    <Box
                                        sx={{
                                            width: '100%',
                                            minWidth: 0, // Prevents Swiper from overflowing flex/grid containers
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
                                        <Swiper
                                            modules={[Navigation, Pagination, Autoplay]}
                                            spaceBetween={15}
                                            slidesPerView={1}
                                            navigation
                                            pagination={{ clickable: true }}
                                            autoplay={{ delay: 3500, disableOnInteraction: false }}
                                        >
                                            {imgParentsAttire.map((src, index) => (
                                                <SwiperSlide key={index}>
                                                    <Card sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
                                                        <CardMedia
                                                            component="img"
                                                            height="380"
                                                            image={src}
                                                            alt={`Attire sample ${index + 1}`}
                                                            loading="lazy"
                                                            sx={{ objectFit: 'contain', bgcolor: '#fff' }}
                                                        />
                                                    </Card>
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    </Box>

                                    {/* COLUMN 2: RIGHT SIDE (Text Content) */}
                                    <Box>
                                        <Stack spacing={2}>
                                            <Text variant="h6" className="playfair-display-regular text-gold">
                                                {oI18n("page_attire_tab_content_parents_card2_title")}
                                            </Text>
                                            <Text variant="caption">
                                                {oI18n("page_attire_tab_content_parents_card2_subtitle")}
                                            </Text>
                                            <Box className="d-flex flex-row justify-content-center align-items-center">
                                                <Box
                                                    component="img"
                                                    src={imgParentPalette}
                                                    alt="Church"
                                                    sx={{
                                                        width: '100%',          // Responsive width
                                                        maxWidth: 400,          // Maximum width limit
                                                        height: 'auto',         // Maintain aspect ratio
                                                        display: 'block',
                                                        mx: 'auto',             // Center horizontally
                                                    }}
                                                />
                                            </Box>
                                        </Stack>
                                    </Box>
                                </Box>
                            </Paper>
                        </TabPanel>

                        {/* TAB 2: SPONSORS */}
                        <TabPanel value={tabValue} index={2}>
                            <Paper elevation={0} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 3, bgcolor: '#fdfbf7', border: '1px solid #f0e6d2' }}>
                                <Text variant="body1" className="playfair-display-regular mb-1 text-gold">
                                    {oI18n("page_attire_tab_content_sponsors_title")}
                                </Text>
                                <Text variant="caption">
                                    {oI18n("page_attire_tab_content_sponsors_subtitle")}
                                </Text>

                                {/* CSS GRID: Guarantees 2 equal columns on desktop, 1 column on mobile */}
                                <Box
                                    sx={{
                                        display: 'grid',
                                        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, // 50% left, 50% right
                                        gap: 4,
                                    }}
                                    className="mt-3"
                                >
                                    {/* COLUMN 1: LEFT SIDE (Carousel) */}
                                    <Box
                                        sx={{
                                            width: '100%',
                                            minWidth: 0, // Prevents Swiper from overflowing flex/grid containers
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
                                        <Swiper
                                            modules={[Navigation, Pagination, Autoplay]}
                                            spaceBetween={15}
                                            slidesPerView={1}
                                            navigation
                                            pagination={{ clickable: true }}
                                            autoplay={{ delay: 3500, disableOnInteraction: false }}
                                        >
                                            {imgSponsorsAttire.map((src, index) => (
                                                <SwiperSlide key={index}>
                                                    <Card sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
                                                        <CardMedia
                                                            component="img"
                                                            height="380"
                                                            image={src}
                                                            alt={`Attire sample ${index + 1}`}
                                                            loading="lazy"
                                                            sx={{ objectFit: 'contain', bgcolor: '#fff' }}
                                                        />
                                                    </Card>
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    </Box>

                                    {/* COLUMN 2: RIGHT SIDE (Text Content) */}
                                    <Box>
                                        <Stack spacing={2}>
                                            <Text variant="h6" className="playfair-display-regular text-gold">
                                                {oI18n("page_attire_tab_content_sponsors_card2_title")}
                                            </Text>
                                            <Text variant="caption">
                                                {oI18n("page_attire_tab_content_sponsors_card2_subtitle")}
                                            </Text>
                                            <Box className="d-flex flex-row justify-content-center align-items-center">
                                                <Box
                                                    component="img"
                                                    src={imgSponsorsPalette}
                                                    alt="Church"
                                                    sx={{
                                                        width: '100%',          // Responsive width
                                                        maxWidth: 400,          // Maximum width limit
                                                        height: 'auto',         // Maintain aspect ratio
                                                        display: 'block',
                                                        mx: 'auto',             // Center horizontally
                                                    }}
                                                />
                                            </Box>
                                        </Stack>
                                    </Box>
                                </Box>
                            </Paper>
                        </TabPanel>

                        {/* TAB 3: ENTOURAGE */}
                        <TabPanel value={tabValue} index={3}>
                            <Paper elevation={0} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 3, bgcolor: '#fdfbf7', border: '1px solid #f0e6d2' }}>
                                <Text variant="body1" className="playfair-display-regular mb-1 text-gold">
                                    {oI18n("page_attire_tab_content_entourage_title")}
                                </Text>
                                <Text variant="caption">
                                    {oI18n("page_attire_tab_content_entourage_subtitle")}
                                </Text>

                                {/* CSS GRID: Guarantees 2 equal columns on desktop, 1 column on mobile */}
                                <Box
                                    sx={{
                                        display: 'grid',
                                        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, // 50% left, 50% right
                                        gap: 4,
                                    }}
                                    className="mt-3"
                                >
                                    {/* COLUMN 1: LEFT SIDE (Carousel) */}
                                    <Box
                                        sx={{
                                            width: '100%',
                                            minWidth: 0, // Prevents Swiper from overflowing flex/grid containers
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
                                        <Swiper
                                            modules={[Navigation, Pagination, Autoplay]}
                                            spaceBetween={15}
                                            slidesPerView={1}
                                            navigation
                                            pagination={{ clickable: true }}
                                            autoplay={{ delay: 3500, disableOnInteraction: false }}
                                        >
                                            {imgEntourageAttire.map((src, index) => (
                                                <SwiperSlide key={index}>
                                                    <Card sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
                                                        <CardMedia
                                                            component="img"
                                                            height="380"
                                                            image={src}
                                                            alt={`Attire sample ${index + 1}`}
                                                            loading="lazy"
                                                            sx={{ objectFit: 'contain', bgcolor: '#fff' }}
                                                        />
                                                    </Card>
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    </Box>

                                    {/* COLUMN 2: RIGHT SIDE (Text Content) */}
                                    <Box>
                                        <Stack spacing={2}>
                                            <Text variant="h6" className="playfair-display-regular text-gold">
                                                {oI18n("page_attire_tab_content_entourage_card2_title")}
                                            </Text>
                                            <Text variant="caption">
                                                {oI18n("page_attire_tab_content_entourage_card2_subtitle")}
                                            </Text>
                                            <Box className="d-flex flex-row justify-content-center align-items-center">
                                                <Box
                                                    component="img"
                                                    src={imgEntouragePalette}
                                                    alt="Church"
                                                    sx={{
                                                        width: '100%',          // Responsive width
                                                        maxWidth: 400,          // Maximum width limit
                                                        height: 'auto',         // Maintain aspect ratio
                                                        display: 'block',
                                                        mx: 'auto',             // Center horizontally
                                                    }}
                                                />
                                            </Box>
                                        </Stack>
                                    </Box>
                                </Box>
                            </Paper>
                        </TabPanel>
                    </Box>

                    <Box className="text-center">
                        <Text variant="h6" className="cormorant-sc-regular mt-5">
                            {oI18n("page_attire_note_title")}
                        </Text>
                        <Text variant="caption" className="playfair-display-regular">
                            {oI18n("page_attire_note_subtitle")}
                        </Text>

                        <Grid container spacing={{ xs: 2, sm: 3 }} className="my-4" justifyContent="center">
                            {imgDoneAttire.map((item) => (
                                <Grid key={item.id} size={{ xs: 6, sm: 4, md: 2 }}>
                                    <Paper
                                        elevation={0}
                                        sx={{
                                            p: 2,
                                            height: '100%',
                                            borderRadius: 3,
                                            bgcolor: '#fdfbf7',
                                            border: '1px solid #f0e6d2',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        {/* Image Wrapper Container */}
                                        <Box
                                            sx={{
                                                width: '100px',
                                                height: '100px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                mb: 1.5,
                                            }}
                                        >
                                            <Box
                                                component="img"
                                                src={item.src}
                                                alt={item.title}
                                                sx={{
                                                    maxWidth: '100%',
                                                    maxHeight: '100%',
                                                    objectFit: 'contain',
                                                    display: 'block',
                                                }}
                                            />
                                        </Box>

                                        {/* Text Content */}
                                        <Box sx={{ textAlign: 'center', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                            <Text variant="subtitle2" className="cormorant-sc-bold text-gold" sx={{ fontSize: '0.85rem', lineHeight: 1.2 }}>
                                                {item.title}
                                            </Text>
                                            {item.subtitle && (
                                                <Text variant="caption" className="cormorant-garamond-regular" sx={{ fontSize: '0.75rem', display: 'block', mt: 0.5 }}>
                                                    {item.subtitle}
                                                </Text>
                                            )}
                                        </Box>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Container>
            </Box>
        </React.Fragment>
    );
}