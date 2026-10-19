import React, { useEffect, useState } from 'react';
import { Box, Container, Tabs, Tab, Paper, Stack, Grid, Card, CardMedia } from '@mui/material';
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
    const [imgEntourageDressAdult, setImgEntourageDressAdult] = useState([]);
    const [imgEntourageDressChild, setImgEntourageDressChild] = useState([]);
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

    // Helper to extract filename from URL and perform natural sorting
    const sortByFilename = (dataArray) => {
        if (!Array.isArray(dataArray)) return [];

        return [...dataArray].sort((a, b) => {
            const nameA = (a.url || a.name || '').split('/').pop();
            const nameB = (b.url || b.name || '').split('/').pop();
            return nameA.localeCompare(nameB, undefined, { numeric: true, sensitivity: 'base' });
        });
    };

    useEffect(() => {
        const fetchAndSort = (endpoint, setter) => {
            fetch(`${sCloudflareBaseUrl}${endpoint}`)
            .then((res) => res.json())
            .then((data) => setter(sortByFilename(data)))
            .catch((err) => console.error(`Error loading ${endpoint}:`, err));
        };

        fetchAndSort('/attire/guest/dress', setImgGuestDress);
        fetchAndSort('/attire/guest/palette', setImgGuestPalette);
        fetchAndSort('/attire/sponsors/dress', setImgSponsorsDress);
        fetchAndSort('/attire/sponsors/palette', setImgSponsorsPalette);
        fetchAndSort('/attire/entourage/dress/adult', setImgEntourageDressAdult);
        fetchAndSort('/attire/entourage/dress/child', setImgEntourageDressChild);
        fetchAndSort('/attire/parents/dress', setImgParentsDress);
        fetchAndSort('/attire/parents/palette', setImgParentsPalette);
    }, [sCloudflareBaseUrl]);

    // Reusable Swiper Component
    const renderSwiper = (dataList) => (
        <Box
            sx={{
                width: '100%',
                minWidth: 0,
                '& .swiper': {
                    paddingBottom: '35px',
                },
                '& .swiper-button-next, & .swiper-button-prev': {
                    color: 'primary.main',
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
                    backgroundColor: 'primary.main',
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
                {dataList.map((item, index) => (
                    <SwiperSlide key={index}>
                        <Card sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: '0 4px 12px rgba(107, 29, 47, 0.06)' }}>
                            <CardMedia
                                component="img"
                                height="380"
                                image={item.url}
                                alt={`Attire sample ${index + 1}`}
                                loading="lazy"
                                sx={{ objectFit: 'contain', bgcolor: 'background.paper', py: 2 }}
                            />
                        </Card>
                    </SwiperSlide>
                ))}
            </Swiper>
        </Box>
    );

    return (
        <React.Fragment>
            <Box sx={{ bgcolor: 'background.default' }}>
                <Container maxWidth="lg" className="py-5">
                    {/* Page Title */}
                    <PageTitle title={CONTENT_ATTIRE.TITLE} subtitle={CONTENT_ATTIRE.SUBTITLE} />

                    {/* Custom Styled MUI Tabs */}
                    <Box sx={{ width: '100%' }}>
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
                                value={tabValue}
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
                                <Tab icon={<PeopleAlt fontSize="small" />} iconPosition="start" label={CONTENT_ATTIRE.TAB.GUEST.TITLE} />
                                <Tab icon={<MilitaryTech fontSize="small" />} iconPosition="start" label={CONTENT_ATTIRE.TAB.SPONSORS.TITLE} />
                                <Tab icon={<Groups fontSize="small" />} iconPosition="start" label={CONTENT_ATTIRE.TAB.ENTOURAGE.TITLE} />
                                <Tab icon={<FamilyRestroom fontSize="small" />} iconPosition="start" label={CONTENT_ATTIRE.TAB.PARENTS.TITLE} />
                            </Tabs>
                        </Box>

                        {/* TAB 0: GUESTS */}
                        <TabPanel value={tabValue} index={0}>
                            <Paper elevation={0} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 3, bgcolor: 'background.paper', border: '1px solid rgba(107, 29, 47, 0.15)' }}>
                                <Text
                                    variant="body1"
                                    className="mb-1"
                                    sx={{ color: 'primary.main', fontWeight: 600, display: 'block' }}
                                    textKey={CONTENT_ATTIRE.TAB.GUEST.GUIDE}
                                />
                                <Text
                                    variant="caption"
                                    sx={{ display: 'block' }}
                                    textKey={CONTENT_ATTIRE.TAB.GUEST.DETAILS}
                                />

                                <Box
                                    sx={{
                                        display: 'grid',
                                        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                                        gap: 4,
                                    }}
                                    className="mt-3"
                                >
                                    {renderSwiper(imgGuestDress)}

                                    <Box>
                                        <Stack spacing={2}>
                                            <Text
                                                variant="h6"
                                                sx={{ color: 'secondary.main', display: 'block' }}
                                                textKey={CONTENT_ATTIRE.TAB.PALETTE}
                                            />
                                            {imgGuestPalette.map((item, index) => (
                                                <React.Fragment key={index}>
                                                    <Text
                                                        variant="caption"
                                                        className="text-center"
                                                        sx={{ display: 'block' }}
                                                        textKey={CONTENT_ATTIRE.TAB.GUEST["SUBDETAILS_" + (index + 1)]}
                                                    />
                                                    <Box className="d-flex flex-row justify-content-center align-items-center">
                                                        <Box
                                                            component="img"
                                                            src={item.url}
                                                            alt={`Palette sample ${index + 1}`}
                                                            sx={{
                                                                width: '100%',
                                                                maxWidth: 400,
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
                            </Paper>
                        </TabPanel>

                        {/* TAB 1: SPONSORS */}
                        <TabPanel value={tabValue} index={1}>
                            <Paper elevation={0} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 3, bgcolor: 'background.paper', border: '1px solid rgba(107, 29, 47, 0.15)' }}>
                                <Text
                                    variant="body1"
                                    className="mb-1"
                                    sx={{ color: 'primary.main', fontWeight: 600, display: 'block' }}
                                    textKey={CONTENT_ATTIRE.TAB.SPONSORS.GUIDE}
                                />
                                <Text
                                    variant="caption"
                                    sx={{ display: 'block' }}
                                    textKey={CONTENT_ATTIRE.TAB.SPONSORS.DETAILS}
                                />

                                <Box
                                    sx={{
                                        display: 'grid',
                                        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                                        gap: 4,
                                    }}
                                    className="mt-3"
                                >
                                    {renderSwiper(imgSponsorsDress)}

                                    <Box>
                                        <Stack spacing={2}>
                                            <Text
                                                variant="h6"
                                                sx={{ color: 'secondary.main', display: 'block' }}
                                                textKey={CONTENT_ATTIRE.TAB.PALETTE}
                                            />
                                            {imgSponsorsPalette.map((item, index) => (
                                                <React.Fragment key={index}>
                                                    <Text
                                                        variant="caption"
                                                        className="text-center"
                                                        sx={{ display: 'block' }}
                                                        textKey={CONTENT_ATTIRE.TAB.SPONSORS["SUBDETAILS_" + (index + 1)]}
                                                    />
                                                    <Box className="d-flex flex-row justify-content-center align-items-center">
                                                        <Box
                                                            component="img"
                                                            src={item.url}
                                                            alt={`Palette sample ${index + 1}`}
                                                            sx={{
                                                                width: '100%',
                                                                maxWidth: 400,
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
                            </Paper>
                        </TabPanel>

                        {/* TAB 2: ENTOURAGE */}
                        <TabPanel value={tabValue} index={2}>
                            <Paper elevation={0} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 3, bgcolor: 'background.paper', border: '1px solid rgba(107, 29, 47, 0.15)' }}>
                                <Text
                                    variant="body1"
                                    className="mb-1"
                                    sx={{ color: 'primary.main', fontWeight: 600, display: 'block' }}
                                    textKey={CONTENT_ATTIRE.TAB.ENTOURAGE.GUIDE}
                                />
                                <Text
                                    variant="caption"
                                    sx={{ display: 'block' }}
                                    textKey={CONTENT_ATTIRE.TAB.ENTOURAGE.DETAILS}
                                />

                                <Box
                                    sx={{
                                        display: 'grid',
                                        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                                        gap: 4,
                                    }}
                                    className="mt-3"
                                >
                                    {renderSwiper(imgEntourageDressAdult)}
                                    {renderSwiper(imgEntourageDressChild)}
                                </Box>
                            </Paper>
                        </TabPanel>

                        {/* TAB 3: PARENTS */}
                        <TabPanel value={tabValue} index={3}>
                            <Paper elevation={0} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 3, bgcolor: 'background.paper', border: '1px solid rgba(107, 29, 47, 0.15)' }}>
                                <Text
                                    variant="body1"
                                    className="mb-1"
                                    sx={{ color: 'primary.main', fontWeight: 600, display: 'block' }}
                                    textKey={CONTENT_ATTIRE.TAB.PARENTS.GUIDE}
                                />
                                <Text
                                    variant="caption"
                                    sx={{ display: 'block' }}
                                    textKey={CONTENT_ATTIRE.TAB.PARENTS.DETAILS}
                                />

                                <Box
                                    sx={{
                                        display: 'grid',
                                        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                                        gap: 4,
                                    }}
                                    className="mt-3"
                                >
                                    {renderSwiper(imgParentsDress)}

                                    <Box>
                                        <Stack spacing={2}>
                                            <Text
                                                variant="h6"
                                                sx={{ color: 'secondary.main', display: 'block' }}
                                                textKey={CONTENT_ATTIRE.TAB.PALETTE}
                                            />
                                            {imgParentsPalette.map((item, index) => (
                                                <React.Fragment key={index}>
                                                    <Text
                                                        variant="caption"
                                                        className="text-center"
                                                        sx={{ display: 'block' }}
                                                        textKey={CONTENT_ATTIRE.TAB.PARENTS["SUBDETAILS_" + (index + 1)]}
                                                    />
                                                    <Box className="d-flex flex-row justify-content-center align-items-center">
                                                        <Box
                                                            component="img"
                                                            src={item.url}
                                                            alt={`Palette sample ${index + 1}`}
                                                            sx={{
                                                                width: '100%',
                                                                maxWidth: 400,
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
                            </Paper>
                        </TabPanel>
                    </Box>

                    {/* DONT ATTIRE NOTES SECTION */}
                    <Box className="text-center mt-5">
                        <Text
                            variant="h6"
                            sx={{ color: 'primary.main', display: 'block' }}
                            textKey={CONTENT_ATTIRE.NOTE_TITLE}
                        />
                        <Text
                            variant="caption"
                            sx={{ color: 'text.secondary', display: 'block', mb: 3 }}
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
                                            bgcolor: 'background.paper',
                                            border: '1px solid rgba(107, 29, 47, 0.15)',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                        }}
                                    >
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

                                        <Box sx={{ textAlign: 'center', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                            <Text
                                                variant="h6"
                                                sx={{ color: 'secondary.main', fontSize: '0.85rem', lineHeight: 1.2, display: 'block' }}
                                                textKey={item.title}
                                            />
                                            {item.subtitle && (
                                                <Text
                                                    variant="caption"
                                                    sx={{ fontSize: '0.75rem', display: 'block', mt: 0.5 }}
                                                    textKey={item.subtitle}
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