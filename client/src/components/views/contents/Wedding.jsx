import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Stack, Paper, Box, Grid, styled, Button, Link } from '@mui/material';
import { 
    LocationOn,
    Checkroom, Help, CameraAlt, CardGiftcard,
    AccessTimeFilled, Church, AddAPhoto, LocalBar, Gite, Toys
} from '@mui/icons-material';
import { Text, PageTitle } from '../utils/CustomComponents';
import ViewMapModal from './modals/ViewMap';
import { CONTENT, CONTENT_WEDDING } from '../utils/Constants';

// Assets
import imgChurch from '../../assets/img/wedding/church.png';
import imgReception from '../../assets/img/wedding/reception.png';

export default function Wedding() {
    const ItemLocation = styled(Paper)(({ theme }) => ({
            backgroundColor: '#fff',
            ...theme.typography.body2,
            padding: theme.spacing(1),
            textAlign: 'center',
            color: (theme.vars ?? theme).palette.text.secondary,
            ...theme.applyStyles('dark', {
                backgroundColor: '#1A2027',
        }),
    }));

    const [openViewMapModal, setOpenViewMapModal] = useState(false);
    const handleOpenViewMapModal = () => setOpenViewMapModal(true);
    const handleCloseViewMapModal = () => setOpenViewMapModal(false);

    const oItemNav = [
        {
            id: 'attire',
            to: '/attire',
            icon: Checkroom,
            titleKey: CONTENT.PAGE_TITLE_ATTIRE,
            subtitleKey: CONTENT.PAGE_SUBTITLE_ATTIRE,
        },
        {
            id: 'faq',
            to: '/faq',
            icon: Help,
            titleKey: CONTENT.PAGE_TITLE_FAQ,
            subtitleKey: CONTENT.PAGE_SUBTITLE_FAQ,
        },
        {
            id: 'story',
            to: '/story',
            icon: CameraAlt,
            titleKey: CONTENT.PAGE_TITLE_STORY,
            subtitleKey: CONTENT.PAGE_SUBTITLE_STORY,
        },
        {
            id: 'gift',
            to: '/gift',
            icon: CardGiftcard,
            titleKey: CONTENT.PAGE_TITLE_GIFT,
            subtitleKey: CONTENT.PAGE_SUBTITLE_GIFT,
        },
    ];

    const ItemNav = styled(Paper)(({ theme }) => ({
            backgroundColor: '#fff',
            ...theme.typography.body2,
            padding: theme.spacing(1),
            textAlign: 'center',
            color: (theme.vars ?? theme).palette.text.secondary,
            ...theme.applyStyles('dark', {
                backgroundColor: '#1A2027',
        }),
    }));

    return (
        <React.Fragment>
            <Box className="bg-light">
                <Container maxWidth="lg" className="py-5">
                    {/* Page Title */}
                    <PageTitle title={CONTENT_WEDDING.TITLE} subtitle={CONTENT_WEDDING.SUBTITLE} />

                    <Box className="text-center">
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid size={6}>
                                <ItemLocation>
                                    <Text
                                        letterSpacing="wide"
                                        variant="h6" className="cormorant-sc-bold mb-3"
                                        textKey={CONTENT_WEDDING.CEREMONY}
                                    />
                                    <Box
                                        component="img"
                                        src={imgChurch}
                                        alt="Church"
                                        sx={{
                                            width: '100%',          // Responsive width
                                            maxWidth: 300,          // Maximum width limit
                                            height: 'auto',         // Maintain aspect ratio
                                            display: 'block',
                                            mx: 'auto',             // Center horizontally
                                        }}
                                    />
                                    <Text
                                        variant="body1"
                                        className="cormorant-garamond-regular mt-3"
                                        textKey={CONTENT_WEDDING.CEREMONY_BEGINS}
                                    />
                                    <Text
                                        letterSpacing="wide"
                                        variant="body1"
                                        className="cormorant-sc-bold mt-3"
                                        textKey={CONTENT.TITLE_CHURCH}
                                    />
                                    <Button variant="outlined" className="my-3" startIcon={<LocationOn />} sx={{width: {sm: "15rem"}}} onClick={handleOpenViewMapModal}>
                                        {CONTENT.BUTTON_VIEWMAP}
                                    </Button>
                                </ItemLocation>
                            </Grid>
                            <Grid size={6}>
                                <ItemLocation>
                                    <Text letterSpacing="wide" variant="h6" className="cormorant-sc-bold mb-3">
                                        {CONTENT_WEDDING.RECEPTION}
                                    </Text>
                                    <Box
                                        component="img"
                                        src={imgReception}
                                        alt="Reception"
                                        sx={{
                                            width: '100%',          // Responsive width
                                            maxWidth: 300,          // Maximum width limit
                                            height: 'auto',         // Maintain aspect ratio
                                            display: 'block',
                                            mx: 'auto',             // Center horizontally
                                        }}
                                    />
                                    <Text
                                        variant="body1"
                                        className="cormorant-garamond-regular mt-3"
                                        textKey={CONTENT_WEDDING.RECEPTION_BEGINS}
                                    />
                                    <Text
                                        letterSpacing="wide"
                                        variant="body1"
                                        className="cormorant-sc-bold mt-3"
                                        textKey={CONTENT.TITLE_RECEPTION}
                                    />
                                    <Button variant="outlined" className="my-3" startIcon={<LocationOn />} sx={{width: {sm: "15rem"}}} onClick={handleOpenViewMapModal}>
                                        {CONTENT.BUTTON_VIEWMAP}
                                    </Button>
                                </ItemLocation>
                            </Grid>
                        </Grid>

                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className="my-4">
                            {oItemNav.map((item) => {
                                const IconComponent = item.icon;
                                return (
                                    <Grid size={{ xs: 6, sm: 3 }} key={item.id}>
                                        <Link 
                                            component={RouterLink} 
                                            to={item.to} 
                                            underline="none" 
                                            sx={{ color: 'inherit', display: 'block' }}
                                        >
                                            <ItemNav>
                                                <IconComponent fontSize="large" />
                                                <Text
                                                    className="text-uppercase d-block cormorant-garamond-regular fs-6"
                                                    textKey={item.titleKey}
                                                />
                                                <Text
                                                    className="text-uppercase d-block cormorant-garamond-regular fs-8"
                                                    textKey={item.subtitleKey}
                                                />
                                            </ItemNav>
                                        </Link>
                                    </Grid>
                                );
                            })}
                        </Grid>

                        <Text
                            variant="h6"
                            className="cormorant-sc-regular mt-5"
                            textKey={CONTENT_WEDDING.TIMELINE_TITLE}
                        />
                        <Text
                            variant="caption"
                            className="playfair-display-regular"
                            textKey={CONTENT_WEDDING.TIMELINE_SUBTITLE}
                        />

                       {/* TIMELINE CONTAINER */}
                        <Box className="mt-4"
                            sx={{
                                position: 'relative',
                                display: 'flex',
                                flexDirection: { xs: 'column', md: 'row' },
                                justifyContent: { xs: 'center', md: 'space-between' },
                                alignItems: { xs: 'center', md: 'stretch' },
                                gap: { xs: 4, md: 2 },
                                maxWidth: { xs: 280, sm: 320, md: 1000 }, // Constraints width on mobile so content centers cleanly
                                mx: 'auto', // Centers the whole timeline container horizontally
                            }}
                        >
                            {/* CONNECTING LINE (DESKTOP: Horizontal) */}
                            <Box
                                sx={{
                                    display: { xs: 'none', md: 'block' },
                                    position: 'absolute',
                                    top: '55px',
                                    left: '3%',
                                    right: '5%',
                                    height: '2px',
                                    backgroundColor: '#b8860b',
                                    zIndex: 0,
                                }}
                            />

                            {/* CONNECTING LINE (MOBILE: Vertical) */}
                            <Box
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                    position: 'absolute',
                                    top: '20px',
                                    bottom: '20px',
                                    left: '20px', // Aligned with the center of the 40px icon box on mobile
                                    width: '2px',
                                    backgroundColor: '#b8860b',
                                    zIndex: 0,
                                }}
                            />

                            {/* TIMELINE ITEMS */}
                            {CONTENT_WEDDING.TIMELINE_BODY.map((event) => {
                                const IconComponent = event.ICON;

                                return (
                                    <Box
                                        key={event.ID}
                                        sx={{
                                            position: 'relative',
                                            zIndex: 1,
                                            display: 'flex',
                                            flexDirection: { xs: 'row', md: 'column' },
                                            alignItems: 'center',
                                            textAlign: { xs: 'left', md: 'center' },
                                            flex: 1,
                                            width: '100%',
                                        }}
                                    >
                                        {/* ICON WITH BACKGROUND MASK */}
                                        <Box
                                            sx={{
                                                color: '#b8860b',
                                                width: 40,
                                                height: 40,
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                bgcolor: '#fff', // Masks line behind icon
                                                mr: 2,
                                                mb: { xs: 0, md: 1.5 },
                                                flexShrink: 0,
                                            }}
                                        >
                                            <IconComponent sx={{ fontSize: { xs: 26, md: 32 } }} />
                                        </Box>

                                        {/* DOT ON THE LINE */}
                                        <Box
                                            sx={{
                                                width: 12,
                                                height: 12,
                                                borderRadius: '50%',
                                                backgroundColor: '#b8860b',
                                                mr: 3,
                                                mb: { xs: 0, md: 2 },
                                                boxShadow: '0 0 0 3px #fff',
                                                flexShrink: 0,
                                            }}
                                        />

                                        {/* TEXT CONTENT */}
                                        <Stack spacing={0.3} sx={{ minWidth: 120 }}>
                                            <Text
                                                variant="subtitle1"
                                                className="cormorant-garamond-regular"
                                                sx={{
                                                    fontWeight: 'bold',
                                                    fontSize: { xs: '1.05rem', md: '1.1rem' },
                                                    color: '#333',
                                                }}
                                                textKey={event.TITLE}
                                            />
                                            {
                                                event.TIME ?
                                                    <Text
                                                        variant="body2"
                                                        className="cormorant-garamond-regular"
                                                        sx={{
                                                            fontSize: { xs: '0.9rem', md: '0.95rem' },
                                                            color: '#666',
                                                            mt: "-10px !important"
                                                        }}
                                                        textKey={event.TIME}
                                                    />
                                                : ""
                                            }
                                        </Stack>
                                    </Box>
                                );
                            })}
                        </Box>
                    </Box>
                </Container>
            </Box>
            <ViewMapModal open={openViewMapModal} handleClose={handleCloseViewMapModal} />
        </React.Fragment>
    );
}