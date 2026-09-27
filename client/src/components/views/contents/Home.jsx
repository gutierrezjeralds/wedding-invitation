import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Box, Divider, Grid, Paper, styled , Link, Button} from '@mui/material';
import { FavoriteBorder, Favorite, Church, Groups, Checkroom, Send } from '@mui/icons-material';
import { Text } from '../utils/CustomComponents';
import Countdown from '../utils/Countdown';
import { CONTENT, CONTENT_HOME } from '../utils/Constants';

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

    const oItemNav = [
        {
            id: 'story',
            to: '/story',
            icon: FavoriteBorder,
            labelKey: CONTENT.PAGE_TITLE_STORY,
        },
        {
            id: 'wedding',
            to: '/wedding',
            icon: Church,
            labelKey: CONTENT.PAGE_TITLE_WEDDING,
        },
        {
            id: 'entourage',
            to: '/entourage',
            icon: Groups,
            labelKey: CONTENT.PAGE_TITLE_ENTOURAGE,
        },
        {
            id: 'attire',
            to: '/attire',
            icon: Checkroom,
            labelKey: CONTENT.PAGE_TITLE_ATTIRE,
        },
    ];

    return (
        <React.Fragment>
            <Box className="bg-light">
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
                            className="cormorant-garamond-regular m-2"
                            textKey={CONTENT.TITLE_DATE_V3}
                        />

                        <Text
                            letterSpacing="wide"
                            className="cormorant-garamond-regular fs-9"
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
                                            <Item className="py-3">
                                                <IconComponent fontSize="large" />
                                                <Text
                                                    className="text-uppercase d-block cormorant-garamond-regular fs-6"
                                                    textKey={item.labelKey}
                                                />
                                            </Item>
                                        </Link>
                                    </Grid>
                                );
                            })}
                        </Grid>

                        <Button variant="outlined" className="mt-5" startIcon={<Send />} sx={{width: "15rem"}}>
                            {CONTENT.TITLE_RSVP}
                        </Button>
                    </Box>
                </Container>
            </Box>
        </React.Fragment>
    );
}