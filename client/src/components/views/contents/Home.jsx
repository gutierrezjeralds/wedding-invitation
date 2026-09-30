import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Box, Divider, Grid, Paper, styled , Link, Button} from '@mui/material';
import { FavoriteBorder, Favorite, Church, Groups, Checkroom, Send } from '@mui/icons-material';
import { Text } from '../utils/CustomComponents';
import Countdown from '../utils/Countdown';
import { CONTENT, CONTENT_HOME } from '../utils/Constants';

// Assets background
import homeBackgroundDesktop from '../../assets/img//background/desktop/home.png';
import homeBackgroundMobile from '../../assets/img/background/mobile/home.png';

export default function Home() {
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

    return (
        <React.Fragment>
            <Box
                className="page-background"
                sx={{
                    '--bg-desktop': `url(${homeBackgroundDesktop})`,
                    '--bg-mobile': `url(${homeBackgroundMobile})`,
                }}
            >
                <Container maxWidth="lg" className="py-5">
                    <Box className="text-center">
                        <Text
                            letterSpacing="wide"
                            variant="h3"
                            className="great-vibes-regular"
                            textKey={CONTENT.TITLE_NAME}
                        />

                        <Text
                            letterSpacing="wide"
                            variant="h6"
                            className="text-uppercase
                            cormorant-garamond-regular mt-5"
                            textKey={CONTENT_HOME.GETTINGMARRIED}
                        />

                        <Text
                            letterSpacing="wide"
                            variant="h6"
                            className="cormorant-garamond-regular m-2 wedding-text-primary"
                            textKey={CONTENT.TITLE_DATE_V3}
                        />

                        <Text
                            letterSpacing="wide"
                            className="cormorant-garamond-regular fs-8"
                            textKey={CONTENT_HOME.QUOTE}
                        />

                        <Countdown />

                        <Divider component="div" role="presentation" className='p-4 m-auto' sx={{width: "20rem"}}>
                            <FavoriteBorder fontSize="small" className='mt-2' />
                        </Divider>

                        <Text
                            letterSpacing="wide"
                            variant="h6"
                            className="cormorant-garamond-regular"
                            textKey={CONTENT_HOME.PAGE_TITLE}
                        />

                        <Text
                            variant="caption"
                            className="cormorant-garamond-regular"
                            textKey={CONTENT_HOME.PAGE_SUBTITLE}
                        />

                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className="mt-4">
                            {CONTENT_HOME.ITEM_NAVIGATION.map((item) => {
                                const IconComponent = item.ICON;
                                return (
                                    <Grid size={{ xs: 6, sm: 3 }} key={item.ID}>
                                        <Link 
                                            component={RouterLink} 
                                            to={item.TO} 
                                            underline="none" 
                                            sx={{ color: 'inherit', display: 'block' }}
                                        >
                                            <Item className="card card-button py-3">
                                                <IconComponent fontSize="large" />
                                                <Text
                                                    variant="h6"
                                                    className="text-uppercase d-block cormorant-garamond-regular"
                                                    textKey={item.TITLE}
                                                />
                                                <Text
                                                    varian="body1"
                                                    className="d-block cormorant-garamond-regular"
                                                    textKey={item.SUBTITLE}
                                                />
                                            </Item>
                                        </Link>
                                    </Grid>
                                );
                            })}
                        </Grid>

                        <Button variant="outlined" className="rsvp-button mt-5" startIcon={<Send />} sx={{width: "15rem"}}>
                            {CONTENT.TITLE_RSVP}
                        </Button>
                    </Box>
                </Container>
            </Box>
        </React.Fragment>
    );
}