import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Box, Grid, Paper, styled , Link, Button} from '@mui/material';
import { Send } from '@mui/icons-material';
import { Text, FavoriteDividerSmall } from '../utils/CustomComponents';
import Countdown from '../utils/Countdown';
import { useMedia } from '../utils/MediaContext';
import { useContent } from '../utils/ConstantContent';
import { DynamicIcon } from '../utils/IconMap';

export default function Home() {
    // Retrieval from context cache
    const { getPageContent } = useContent();
    const CONTENT = getPageContent('global');
    const CONTENT_HOME = getPageContent('home');

    // Mongoose Assets
    const { getAsset } = useMedia();
    const sPageBackgroundDesktop = getAsset('home', 'background', 'desktop');
    const sPageBackgroundMobile = getAsset('home', 'background', 'mobile');
    
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
                    '--bg-desktop': `url(${sPageBackgroundDesktop})`,
                    '--bg-mobile': `url(${sPageBackgroundMobile})`,
                    // Fallback background color if images fail to load or are empty
                    backgroundColor: '#faf8f5',
                }}
            >
                <Container maxWidth="lg" className="py-5">
                    <Box className="text-center">
                        <Text
                            letterSpacing="wide"
                            variant="h6"
                            className="text-uppercase
                            cormorant-garamond-regular"
                            textKey={CONTENT_HOME.GETTINGMARRIED}
                        />

                        <FavoriteDividerSmall />

                        <Text
                            letterSpacing="wide"
                            variant="h2"
                            className="great-vibes-regular"
                            textKey={CONTENT.TITLE_NAME}
                        />

                        <Text
                            letterSpacing="wide"
                            variant="h6"
                            className="cormorant-garamond-regular m-2 text-wedding-primary"
                            textKey={CONTENT.TITLE_DATE_V3}
                        />

                        <FavoriteDividerSmall />

                        <Text
                            letterSpacing="wide"
                            className="cormorant-garamond-regular fs-8"
                            textKey={CONTENT_HOME.QUOTE}
                        />

                        <Countdown />

                        <Text
                            letterSpacing="wide"
                            variant="h6"
                            className="cormorant-garamond-regular mt-4"
                            textKey={CONTENT_HOME.GUIDE_TITLE}
                        />

                        <Text
                            variant="body1"
                            className="cormorant-garamond-regular"
                            textKey={CONTENT_HOME.GUIDE_SUBTITLE}
                        />

                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className="mt-4">
                            {CONTENT_HOME.ITEM_NAVIGATION.map((item) => {
                                return (
                                    <Grid size={{ xs: 6, sm: 3 }} key={item.ID}>
                                        <Link 
                                            component={RouterLink} 
                                            to={item.TO} 
                                            underline="none" 
                                            sx={{ color: 'inherit', display: 'block' }}
                                        >
                                            <Item className="card card-button py-3">
                                                <DynamicIcon iconName={item.ICON} fontSize="large" />
                                                <Text
                                                    variant="h6"
                                                    className="text-uppercase d-block cormorant-garamond-regular"
                                                    textKey={item.TITLE}
                                                />
                                                <Text
                                                    variant="caption"
                                                    className="d-block cormorant-garamond-regular"
                                                    textKey={item.SUBTITLE}
                                                />
                                            </Item>
                                        </Link>
                                    </Grid>
                                );
                            })}
                        </Grid>

                        <Button component={RouterLink} to="/rsvp" variant="outlined" size="large" className="rsvp-button mt-5" startIcon={<Send />} sx={{width: "15rem"}}>
                            {CONTENT.BUTTON_RSVP}
                        </Button>
                    </Box>
                </Container>
            </Box>
        </React.Fragment>
    );
}