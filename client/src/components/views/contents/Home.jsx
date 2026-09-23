import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import { Container, Box, Divider, Grid, Paper, styled , Link, Button} from '@mui/material';
import { FavoriteBorder, Favorite, Church, Groups, Checkroom, Send } from '@mui/icons-material';
import { Text } from '../utils/CustomComponents';
import Countdown from '../utils/Countdown';

export default function Home() {
    const { t: oI18n } = useTranslation();

    const Item = styled(Paper)(({ theme }) => ({
            backgroundColor: '#fff',
            ...theme.typography.body2,
            padding: theme.spacing(1),
            textAlign: 'center',
            color: (theme.vars ?? theme).palette.text.secondary,
            ...theme.applyStyles('dark', {
                backgroundColor: '#1A2027',
        }),
    }));

    const NAV_ITEMS = [
        {
            id: 'story',
            to: '/story',
            icon: FavoriteBorder,
            labelKey: 'page_title_story',
        },
        {
            id: 'wedding',
            to: '/wedding',
            icon: Church,
            labelKey: 'page_title_wedding',
        },
        {
            id: 'entourage',
            to: '/entourage',
            icon: Groups,
            labelKey: 'page_title_entourage',
        },
        {
            id: 'attire',
            to: '/attire',
            icon: Checkroom,
            labelKey: 'page_title_attire',
        },
    ];

    return (
        <React.Fragment>
            <Box className="bg-light">
                <Container maxWidth="lg">
                    <Box className="text-center" sx={{ py: 4 }}>
                        <Text letterSpacing="wide" variant="h3" className="great-vibes-regular">
                            <Trans 
                                i18nKey="title_name"
                                components={{
                                    // Maps the <span> tag from JSON to custom styles or MUI styling
                                    span: <span className="pinyon-script-regular" />
                                }}
                            />
                        </Text>

                        <Text letterSpacing="wide" variant="h6" className="text-uppercase cormorant-garamond-regular mt-5">
                            {oI18n("page_home_gettingMarried")}
                        </Text>

                        <Text letterSpacing="wide" variant="h6" className="cormorant-garamond-regular m-2">
                            {oI18n("title_date_v3")}
                        </Text>

                        <Text letterSpacing="wide" className="cormorant-garamond-regular fs-9">
                            {oI18n("page_home_quote")}
                        </Text>

                        <Countdown />

                        <Divider component="div" role="presentation" className='p-4 m-auto' sx={{width: "20rem"}}>
                            <FavoriteBorder fontSize="small" className='mt-2' />
                        </Divider>

                        <Text letterSpacing="wide" variant="h6" className="cormorant-garamond-regular">
                            {oI18n("page_home_page_title")}
                        </Text>

                        <Text variant="caption" className="cormorant-garamond-regular">
                            {oI18n("page_home_page_subtitle")}
                        </Text>

                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className="mt-4">
                            {NAV_ITEMS.map((item) => {
                                const IconComponent = item.icon;
                                return (
                                    <Grid size={{ xs: 6, sm: 3 }} key={item.id}>
                                        <Link 
                                            component={RouterLink} 
                                            to={item.to} 
                                            underline="none" 
                                            sx={{ color: 'inherit', display: 'block' }}
                                        >
                                            <Item className="py-3">
                                                <IconComponent fontSize="large" />
                                                <Text className="text-uppercase d-block cormorant-garamond-regular fs-6">
                                                    {oI18n(item.labelKey)}
                                                </Text>
                                            </Item>
                                        </Link>
                                    </Grid>
                                );
                            })}
                        </Grid>

                        <Button variant="outlined" className="mt-5" startIcon={<Send />} sx={{width: "15rem"}}>
                            {oI18n("title_rsvp")}
                        </Button>
                    </Box>
                </Container>
            </Box>
        </React.Fragment>
    );
}