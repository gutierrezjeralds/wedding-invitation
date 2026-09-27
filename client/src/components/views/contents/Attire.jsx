import React, { useEffect, useState } from 'react';
import { Box, Container, Tabs, Tab, Paper, Stack, Grid, Card, CardMedia, Divider } from '@mui/material';
import { FamilyRestroom, MilitaryTech, Groups, PeopleAlt } from '@mui/icons-material';
import { Text, PageTitle } from '../utils/CustomComponents';
import { CONTENT_ATTIRE } from '../utils/Constants';

// Import Swiper React components & required modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Dynamically import all images from the 'dont' folder
const imgDontModules = import.meta.glob('../../assets/img/attire/dont/*.{png,jpg,jpeg,webp}', {
    eager: true,
    import: 'default',
});

// Convert module object into a sorted array of image URLs
const imgDontAttireList = Object.keys(imgDontModules)
    .sort() // Ensures order 1.png, 2.png, 3.png...
    .map((key) => imgDontModules[key]);

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
    const sCloudflareBaseUrl = "https://wedding-images-api.jeraldandsheila.workers.dev/api/images";
    const [tabValue, setTabValue] = useState(0);
    const [imgGuestDress, setImgGuestDress] = useState([]);
    const [imgGuestPalette, setImgGuestPalette] = useState([]);
    const [imgSponsorsDress, setImgSponsorsDress] = useState([]);
    const [imgSponsorsPalette, setImgSponsorsPalette] = useState([]);
    const [imgEntourageDress, setImgEntourageDress] = useState([]);
    const [imgEntouragePalette, setImgEntouragePalette] = useState([]);
    const [imgParentsDress, setImgParentsDress] = useState([]);
    const [imgParentsPalette, setImgParentsPalette] = useState([]);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    // Dynamically generated array based on folder contents & translations
    const imgDontAttire = imgDontAttireList.map((src, index) => {
        const id = index + 1;
        const sTitle = `NOTE_${id}_TITLE`;
        const sSubtitle = `NOTE_${id}_SUBTITLE`;
        return {
            id,
            src,
            title: CONTENT_ATTIRE[sTitle],
            subtitle: CONTENT_ATTIRE[sSubtitle],
        };
    });

    useEffect(() => {
        fetch(sCloudflareBaseUrl + "/attire/guest/dress")
        .then((res) => res.json())
        .then(setImgGuestDress);
    }, []);

    useEffect(() => {
        fetch(sCloudflareBaseUrl + "/attire/guest/palette")
        .then((res) => res.json())
        .then(setImgGuestPalette);
    }, []);

    useEffect(() => {
        fetch(sCloudflareBaseUrl + "/attire/sponsors/dress")
        .then((res) => res.json())
        .then(setImgSponsorsDress);
    }, []);

    useEffect(() => {
        fetch(sCloudflareBaseUrl + "/attire/sponsors/palette")
        .then((res) => res.json())
        .then(setImgSponsorsPalette);
    }, []);

    useEffect(() => {
        fetch(sCloudflareBaseUrl + "/attire/entourage/dress")
        .then((res) => res.json())
        .then(setImgEntourageDress);
    }, []);

    useEffect(() => {
        fetch(sCloudflareBaseUrl + "/attire/entourage/palette")
        .then((res) => res.json())
        .then(setImgEntouragePalette);
    }, []);

    useEffect(() => {
        fetch(sCloudflareBaseUrl + "/attire/parents/dress")
        .then((res) => res.json())
        .then(setImgParentsDress);
    }, []);

    useEffect(() => {
        fetch(sCloudflareBaseUrl + "/attire/parents/palette")
        .then((res) => res.json())
        .then(setImgParentsPalette);
    }, []);

    return (
         <React.Fragment>
            <Box className="bg-light">
                <Container maxWidth="lg" className="py-5">
                    {/* Page Title */}
                    <PageTitle title={CONTENT_ATTIRE.TITLE} subtitle={CONTENT_ATTIRE.SUBTITLE} />

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
                                <Tab icon={<PeopleAlt fontSize="small" />} iconPosition="start" label={CONTENT_ATTIRE.TAB_GUEST} />
                                <Tab icon={<MilitaryTech fontSize="small" />} iconPosition="start" label={CONTENT_ATTIRE.TAB_SPONSORS} />
                                <Tab icon={<Groups fontSize="small" />} iconPosition="start" label={CONTENT_ATTIRE.TAB_ENTOURAGE} />
                                <Tab icon={<FamilyRestroom fontSize="small" />} iconPosition="start" label={CONTENT_ATTIRE.TAB_PARENTS} />
                            </Tabs>
                        </Box>

                        {/* TAB 0: GUESTS (ACTIVE ON LOAD) */}
                        <TabPanel value={tabValue} index={0}>
                            <Paper elevation={0} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 3, bgcolor: '#fdfbf7', border: '1px solid #f0e6d2' }}>
                                <Text
                                    variant="body1"
                                    className="playfair-display-regular mb-1 text-gold"
                                    textKey={CONTENT_ATTIRE.TAB_CONTENT_GUEST_TITLE}
                                />
                                <Text
                                    variant="caption"
                                    textKey={CONTENT_ATTIRE.TAB_CONTENT_GUEST_SUBTITLE}
                                />

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
                                            {imgGuestDress.map((item, index) => (
                                                <SwiperSlide key={index}>
                                                    <Card sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
                                                        <CardMedia
                                                            component="img"
                                                            height="380"
                                                            image={item.url}
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
                                            <Text
                                                variant="h6"
                                                className="playfair-display-regular text-gold"
                                                textKey={CONTENT_ATTIRE.TAB_CONTENT_GUEST_CARD2_TITLE}
                                            />
                                            {imgGuestPalette.map((item, index) => (
                                                <React.Fragment key={index}>
                                                    <Text
                                                        variant="caption"
                                                        className="text-center"
                                                        textKey={CONTENT_ATTIRE["TAB_CONTENT_GUEST_CARD2_SUBTITLE_1" + (index + 1)]}
                                                    />
                                                    <Box className="d-flex flex-row justify-content-center align-items-center">
                                                        <Box
                                                            component="img"
                                                            src={item.url}
                                                            alt={`Palette sample ${index + 1}`}
                                                            sx={{
                                                                width: '100%',          // Responsive width
                                                                maxWidth: 400,          // Maximum width limit
                                                                height: 'auto',         // Maintain aspect ratio
                                                                display: 'block',
                                                                mx: 'auto',             // Center horizontally
                                                            }}
                                                        />
                                                    </Box>
                                                </React.Fragment>
                                            ))}
                                        </Stack>
                                    </Box>
                                </Box>
                            </Paper>
                        </TabPanel>

                        {/* TAB 2: SPONSORS */}
                        <TabPanel value={tabValue} index={1}>
                            <Paper elevation={0} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 3, bgcolor: '#fdfbf7', border: '1px solid #f0e6d2' }}>
                                <Text
                                    variant="body1"
                                    className="playfair-display-regular mb-1 text-gold"
                                    textKey={CONTENT_ATTIRE.TAB_CONTENT_SPONSORS_TITLE}
                                />
                                <Text
                                    variant="caption"
                                    textKey={CONTENT_ATTIRE.TAB_CONTENT_SPONSORS_SUBTITLE}
                                />

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
                                            {imgSponsorsDress.map((item, index) => (
                                                <SwiperSlide key={index}>
                                                    <Card sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
                                                        <CardMedia
                                                            component="img"
                                                            height="380"
                                                            image={item.url}
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
                                            <Text
                                                variant="h6"
                                                className="playfair-display-regular text-gold"
                                                textKey={CONTENT_ATTIRE.TAB_CONTENT_SPONSORS_CARD2_TITLE}
                                            />
                                            {imgSponsorsPalette.map((item, index) => (
                                                 <React.Fragment key={index}>
                                                    <Text
                                                        variant="caption"
                                                        className="text-center"
                                                        textKey={CONTENT_ATTIRE["TAB_CONTENT_SPONSORS_CARD2_SUBTITLE_" + (index + 1)]}
                                                    />
                                                    <Box className="d-flex flex-row justify-content-center align-items-center">
                                                        <Box
                                                            component="img"
                                                            src={item.url}
                                                            alt={`Palette sample ${index + 1}`}
                                                            sx={{
                                                                width: '100%',          // Responsive width
                                                                maxWidth: 400,          // Maximum width limit
                                                                height: 'auto',         // Maintain aspect ratio
                                                                display: 'block',
                                                                mx: 'auto',             // Center horizontally
                                                            }}
                                                        />
                                                    </Box>
                                                </React.Fragment>
                                            ))}
                                        </Stack>
                                    </Box>
                                </Box>
                            </Paper>
                        </TabPanel>

                        {/* TAB 3: ENTOURAGE */}
                        <TabPanel value={tabValue} index={2}>
                            <Paper elevation={0} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 3, bgcolor: '#fdfbf7', border: '1px solid #f0e6d2' }}>
                                <Text
                                    variant="body1"
                                    className="playfair-display-regular mb-1 text-gold"
                                    textKey={CONTENT_ATTIRE.TAB_CONTENT_ENTOURAGE_TITLE}
                                />
                                <Text
                                    variant="caption"
                                    textKey={CONTENT_ATTIRE.TAB_CONTENT_ENTOURAGE_SUBTITLE}
                                />

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
                                            {imgEntourageDress.map((item, index) => (
                                                <SwiperSlide key={index}>
                                                    <Card sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
                                                        <CardMedia
                                                            component="img"
                                                            height="380"
                                                            image={item.url}
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
                                            <Text
                                                variant="h6"
                                                className="playfair-display-regular text-gold"
                                                textKey={CONTENT_ATTIRE.TAB_CONTENT_ENTOURAGE_CARD2_TITLE}
                                            />
                                            {imgEntouragePalette.map((item, index) => (
                                                 <React.Fragment key={index}>
                                                    <Text
                                                        variant="caption"
                                                        className="text-center"
                                                        textKey={CONTENT_ATTIRE["TAB_CONTENT_ENTOURAGE_CARD2_SUBTITLE_" + (index + 1)]}
                                                    />
                                                    <Box className="d-flex flex-row justify-content-center align-items-center">
                                                        <Box
                                                            component="img"
                                                            src={item.url}
                                                            alt={`Palette sample ${index + 1}`}
                                                            sx={{
                                                                width: '100%',          // Responsive width
                                                                maxWidth: 400,          // Maximum width limit
                                                                height: 'auto',         // Maintain aspect ratio
                                                                display: 'block',
                                                                mx: 'auto',             // Center horizontally
                                                            }}
                                                        />
                                                    </Box>
                                                </React.Fragment>
                                            ))}
                                        </Stack>
                                    </Box>
                                </Box>
                            </Paper>
                        </TabPanel>

                        {/* TAB 1: PARENTS */}
                        <TabPanel value={tabValue} index={3}>
                            <Paper elevation={0} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 3, bgcolor: '#fdfbf7', border: '1px solid #f0e6d2' }}>
                                <Text
                                    variant="body1"
                                    className="playfair-display-regular mb-1 text-gold"
                                    textKey={CONTENT_ATTIRE.TAB_CONTENT_PARENTS_TITLE}
                                />
                                <Text
                                    variant="caption"
                                    textKey={CONTENT_ATTIRE.TAB_CONTENT_PARENTS_SUBTITLE}
                                />

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
                                            {imgParentsDress.map((item, index) => (
                                                <SwiperSlide key={index}>
                                                    <Card sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
                                                        <CardMedia
                                                            component="img"
                                                            height="380"
                                                            image={item.url}
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
                                            <Text
                                                variant="h6"
                                                className="playfair-display-regular text-gold"
                                                textKey={CONTENT_ATTIRE.TAB_CONTENT_PARENTS_CARD2_TITLE}
                                            />
                                            {imgParentsPalette.map((item, index) => (
                                                 <React.Fragment key={index}>
                                                    <Text
                                                        variant="caption"
                                                        className="text-center"
                                                        textKey={CONTENT_ATTIRE["TAB_CONTENT_PARENTS_CARD2_SUBTITLE_" + (index + 1)]}
                                                    />
                                                    <Box className="d-flex flex-row justify-content-center align-items-center">
                                                        <Box
                                                            component="img"
                                                            src={item.url}
                                                            alt={`Palette sample ${index + 1}`}
                                                            sx={{
                                                                width: '100%',          // Responsive width
                                                                maxWidth: 400,          // Maximum width limit
                                                                height: 'auto',         // Maintain aspect ratio
                                                                display: 'block',
                                                                mx: 'auto',             // Center horizontally
                                                            }}
                                                        />
                                                    </Box>
                                                </React.Fragment>
                                            ))}
                                        </Stack>
                                    </Box>
                                </Box>
                            </Paper>
                        </TabPanel>
                    </Box>

                    <Box className="text-center">
                        <Text
                            variant="h6"
                            className="cormorant-sc-regular mt-5"
                            textKey={CONTENT_ATTIRE.NOTE_TITLE}
                        />
                        <Text
                            variant="caption"
                            className="playfair-display-regular"
                            textKey={CONTENT_ATTIRE.NOTE_SUBTITLE}
                        />

                        <Grid container spacing={{ xs: 2, sm: 3 }} className="my-4" justifyContent="center">
                            {imgDontAttire.map((item) => (
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
                                            <Text
                                                variant="subtitle2"
                                                className="cormorant-sc-bold text-gold"
                                                textKey={item.title}
                                                sx={{ fontSize: '0.85rem', lineHeight: 1.2 }}
                                            />
                                            {item.subtitle && (
                                                <Text
                                                    variant="caption"
                                                    className="cormorant-garamond-regular"
                                                    textKey={item.subtitle}
                                                    sx={{ fontSize: '0.75rem', display: 'block', mt: 0.5 }}
                                                />
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
