import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import { Container, Stack, Divider, Box, Grid, Paper, styled, Button, Link } from '@mui/material';
import { 
    FavoriteBorder, LocationOn,
    Checkroom, Help, CameraAlt, CardGiftcard,
    AccessTimeFilled, Church, AddAPhoto, LocalBar, Gite, Toys
} from '@mui/icons-material';
import { Text } from '../utils/MUIComponents';
import ViewMapModal from './modals/ViewMap';

// Assets
import imgChurch from '../../assets/img/wedding/church.png';
import imgReception from '../../assets/img/wedding/reception.png';

export default function Wedding() {
    const { t: oI18n } = useTranslation();

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

    const ItemTimeline = styled(Paper)(({ theme }) => ({
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
            <Box className="bg-light py-5">
                <Container maxWidth="lg">
                    <Stack className="text-center mb-5" spacing={1}>
                        <Text letterSpacing="wide" variant="h3" className="great-vibes-regular">
                            {oI18n("page_wedding_title")}
                        </Text>

                        <Text variant="h6" className="cormorant-garamond-regular">
                            {oI18n("title_date")}
                        </Text>
                        
                        <Divider component="div" role="presentation" className='mt-4'>
                            <FavoriteBorder fontSize="small" className='mt-2' />
                        </Divider>
                    </Stack>
                    <Box className="text-center">
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid size={6}>
                                <ItemLocation>
                                    <Text letterSpacing="wide" variant="h6" className="cormorant-sc-bold mb-3">
                                        {oI18n("page_wedding_ceremony")}
                                    </Text>
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
                                    <Text variant="body1" className="cormorant-garamond-regular mt-3">
                                        <Trans 
                                            i18nKey="page_wedding_ceremony_begins"
                                            components={{
                                                span: <span className="fs-8" />
                                            }}
                                        />
                                    </Text>
                                    <Text letterSpacing="wide" variant="body1" className="cormorant-sc-bold mt-3">
                                        {oI18n("title_church")}
                                    </Text>
                                    <Button variant="outlined" className="my-3" startIcon={<LocationOn />} sx={{width: {sm: "15rem"}}} onClick={handleOpenViewMapModal}>
                                        {oI18n("button_viewmap")}
                                    </Button>
                                </ItemLocation>
                            </Grid>
                            <Grid size={6}>
                                <ItemLocation>
                                    <Text letterSpacing="wide" variant="h6" className="cormorant-sc-bold mb-3">
                                        {oI18n("page_wedding_reception")}
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
                                    <Text variant="body1" className="cormorant-garamond-regular mt-3">
                                        <Trans 
                                            i18nKey="page_wedding_reception_begins"
                                            components={{
                                                span: <span className="fs-8" />
                                            }}
                                        />
                                    </Text>
                                    <Text letterSpacing="wide" variant="body1" className="cormorant-sc-bold mt-3">
                                        {oI18n("title_reception")}
                                    </Text>
                                    <Button variant="outlined" className="my-3" startIcon={<LocationOn />} sx={{width: {sm: "15rem"}}} onClick={handleOpenViewMapModal}>
                                        {oI18n("button_viewmap")}
                                    </Button>
                                </ItemLocation>
                            </Grid>
                        </Grid>

                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className="my-4">
                            <Grid size={3}>
                                <Link component={RouterLink} to="/attire" underline="none" sx={{ color: 'inherit', display: 'block' }}>
                                    <ItemNav>
                                        <Checkroom fontSize="large" />
                                        <Text className="text-uppercase d-block cormorant-garamond-regular" sx={{fontSize: {xs: "0.75rem", sm: "0.75rem", md: "0.9rem"}}}>
                                            {oI18n("page_title_attire")}
                                        </Text>
                                        <Text className="text-uppercase d-block cormorant-garamond-regular" sx={{fontSize: {xs: "0.6rem", sm: "0.7rem", md: "0.85rem"}}}>
                                            {oI18n("page_subtitle_attire")}
                                        </Text>
                                    </ItemNav>
                                </Link>
                            </Grid>
                            <Grid size={3}>
                                <Link component={RouterLink} to="/faq" underline="none" sx={{ color: 'inherit', display: 'block' }}>
                                    <ItemNav>
                                        <Help fontSize="large" />
                                        <Text className="text-uppercase d-block cormorant-garamond-regular" sx={{fontSize: {xs: "0.75rem", sm: "0.75rem", md: "0.9rem"}}}>
                                            {oI18n("page_title_faq")}
                                        </Text>
                                        <Text className="text-uppercase d-block cormorant-garamond-regular" sx={{fontSize: {xs: "0.6rem", sm: "0.7rem", md: "0.85rem"}}}>
                                            {oI18n("page_subtitle_faq")}
                                        </Text>
                                    </ItemNav>
                                </Link>
                            </Grid>
                            <Grid size={3}>
                                <Link component={RouterLink} to="/story" underline="none" sx={{ color: 'inherit', display: 'block' }}>
                                    <ItemNav>
                                        <CameraAlt fontSize="large" />
                                        <Text className="text-uppercase d-block cormorant-garamond-regular" sx={{fontSize: {xs: "0.75rem", sm: "0.75rem", md: "0.9rem"}}}>
                                            {oI18n("page_title_story")}
                                        </Text>
                                        <Text className="text-uppercase d-block cormorant-garamond-regular" sx={{fontSize: {xs: "0.6rem", sm: "0.7rem", md: "0.85rem"}}}>
                                            {oI18n("page_subtitle_story")}
                                        </Text>
                                    </ItemNav>
                                </Link>
                            </Grid>
                            <Grid size={3}>
                                <Link component={RouterLink} to="/gift" underline="none" sx={{ color: 'inherit', display: 'block' }}>
                                    <ItemNav>
                                        <CardGiftcard fontSize="large" />
                                        <Text className="text-uppercase d-block cormorant-garamond-regular" sx={{fontSize: {xs: "0.75rem", sm: "0.75rem", md: "0.9rem"}}}>
                                            {oI18n("page_title_gift")}
                                        </Text>
                                        <Text className="text-uppercase d-block cormorant-garamond-regular" sx={{fontSize: {xs: "0.6rem", sm: "0.7rem", md: "0.85rem"}}}>
                                            {oI18n("page_subtitle_gift")}
                                        </Text>
                                    </ItemNav>
                                </Link>
                            </Grid>
                        </Grid>

                        <Text variant="h6" className="cormorant-sc-regular mt-5">
                            {oI18n("page_wedding_timeline_title")}
                        </Text>
                        <Text variant="caption" className="playfair-display-regular">
                            {oI18n("page_wedding_timeline_subtitle")}
                        </Text>

                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className="mt-3">
                            <Grid size={2}>
                                <ItemTimeline>
                                    <AccessTimeFilled fontSize="medium" />
                                    <Text className="d-block cormorant-garamond-regular" sx={{fontSize: {xs: "0.7rem", sm: "0.75rem", md: "0.9rem"}}}>
                                        {oI18n("page_wedding_timeline_arrival")}
                                    </Text>
                                </ItemTimeline>
                            </Grid>
                            <Grid size={2}>
                                <ItemTimeline>
                                    <Church fontSize="medium" />
                                    <Text className="d-block cormorant-garamond-regular" sx={{fontSize: {xs: "0.7rem", sm: "0.75rem", md: "0.9rem"}}}>
                                        {oI18n("page_wedding_timeline_ceremony")}
                                    </Text>
                                </ItemTimeline>
                            </Grid>
                            <Grid size={2}>
                                <ItemTimeline>
                                    <AddAPhoto fontSize="medium" />
                                    <Text className="d-block cormorant-garamond-regular" sx={{fontSize: {xs: "0.7rem", sm: "0.75rem", md: "0.9rem"}}}>
                                        {oI18n("page_wedding_timeline_photo")}
                                    </Text>
                                </ItemTimeline>
                            </Grid>
                            <Grid size={2}>
                                <ItemTimeline>
                                    <LocalBar fontSize="medium" />
                                    <Text className="d-block cormorant-garamond-regular" sx={{fontSize: {xs: "0.7rem", sm: "0.75rem", md: "0.9rem"}}}>
                                        {oI18n("page_wedding_timeline_grazing")}
                                    </Text>
                                </ItemTimeline>
                            </Grid>
                            <Grid size={2}>
                                <ItemTimeline>
                                    <Gite fontSize="medium" />
                                    <Text className="d-block cormorant-garamond-regular" sx={{fontSize: {xs: "0.7rem", sm: "0.75rem", md: "0.9rem"}}}>
                                        {oI18n("page_wedding_timeline_reception")}
                                    </Text>
                                </ItemTimeline>
                            </Grid>
                            <Grid size={2}>
                                <ItemTimeline>
                                    <Toys fontSize="medium" />
                                    <Text className="d-block cormorant-garamond-regular" sx={{fontSize: {xs: "0.7rem", sm: "0.75rem", md: "0.9rem"}}}>
                                        {oI18n("page_wedding_timeline_wrap")}
                                    </Text>
                                </ItemTimeline>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </Box>
            <ViewMapModal open={openViewMapModal} handleClose={handleCloseViewMapModal} />
        </React.Fragment>
    );
}