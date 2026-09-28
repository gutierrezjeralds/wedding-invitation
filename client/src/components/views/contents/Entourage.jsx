import React from 'react';
import { Box, Container, Grid, Divider, styled, Paper } from '@mui/material';
import ChurchIcon from '@mui/icons-material/Church';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Text, PageTitle } from '../utils/CustomComponents';
import ParallaxBanner from '../utils/ParallaxBanner';
import { CONTENT_ENTOURAGE } from '../utils/Constants';

import imgParallax from "../../assets/img/parallax/entourage.jpg";

export default function Entourage() {
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
            <Box className="bg-light">
                <Container maxWidth="lg" className="py-5">
                    {/* Page Title */}
                    <PageTitle title={CONTENT_ENTOURAGE.TITLE} subtitle={CONTENT_ENTOURAGE.SUBTITLE} />

                    {/* 1. PARENTS */}
                    <Box className="text-center">
                        <Text
                            letterSpacing="widest"
                            variant="h6"
                            className="cormorant-sc-bold text-uppercase mb-2"
                            sx={{ color: '#2C3E35'}}
                            textKey={CONTENT_ENTOURAGE.PARENTS.TITLE}
                        />
                        <Text
                            variant="caption"
                            className="cormorant-garamond-regular d-block fst-italic mb-3"
                            sx={{ color: '#8C857B'}}
                            textKey={CONTENT_ENTOURAGE.PARENTS.TAGLINE}
                        />

                        <Grid container spacing={2} justifyContent="center">
                            <Grid size={{xs: 12, sm: 6}}>
                                <Item>
                                    <Text variant="subtitle2" className="cormorant-sc-bold text-gold mb-1">
                                        {CONTENT_ENTOURAGE.PARENTS.GROOM.TITLE}
                                    </Text>
                                    <Text variant="body1" className="cormorant-garamond-regular fs-5">
                                        {CONTENT_ENTOURAGE.PARENTS.GROOM.FATHER}
                                    </Text>
                                    <Text variant="body1" className="cormorant-garamond-regular fs-5">
                                        {CONTENT_ENTOURAGE.PARENTS.GROOM.MOTHER}
                                    </Text>
                                </Item>
                            </Grid>
                            <Grid size={{xs: 12, sm: 6}}>
                                <Item>
                                    <Text variant="subtitle2" className="cormorant-sc-bold text-gold mb-1">
                                        {CONTENT_ENTOURAGE.PARENTS.BRIDE.TITLE}
                                    </Text>
                                    <Text variant="body1" className="cormorant-garamond-regular fs-5">
                                        {CONTENT_ENTOURAGE.PARENTS.BRIDE.FATHER}
                                    </Text>
                                    <Text variant="body1" className="cormorant-garamond-regular fs-5">
                                        {CONTENT_ENTOURAGE.PARENTS.BRIDE.MOTHER}
                                    </Text>
                                </Item>
                            </Grid>
                        </Grid>

                        <Divider sx={{ width: '60px', mx: 'auto', my: 5, borderColor: '#C5A059', opacity: 0.6 }} />
                    </Box>

                    {/* 2. PRINCIPAL SPONSORS */}
                    <Box className="text-center">
                        <Text
                            letterSpacing="widest"
                            variant="h6"
                            className="cormorant-sc-bold text-uppercase mb-2"
                            sx={{ color: '#2C3E35' }}
                            textKey={CONTENT_ENTOURAGE.PRINCIPAL_SPONSORS.TITLE}
                        />
                        <Text
                            variant="caption"
                            className="cormorant-garamond-regular d-block fst-italic mb-3"
                            sx={{ color: '#8C857B' }}
                            textKey={CONTENT_ENTOURAGE.PRINCIPAL_SPONSORS.TAGLINE}
                        />
                        <Grid container spacing={2} justifyContent="center">
                            <Grid size={12}>
                                <Item>
                                    <Text
                                        variant="subtitle2"
                                        className="cormorant-sc-bold mb-1"
                                        sx={{ color: '#C5A059' }}
                                        textKey={CONTENT_ENTOURAGE.PRINCIPAL_SPONSORS.SUBTITLE}
                                    />
                                    {CONTENT_ENTOURAGE.PRINCIPAL_SPONSORS.LIST.map((sponsor, idx) => (
                                        <Text key={idx} variant="body1" className="cormorant-garamond-regular fs-5 mb-1">
                                            {sponsor.NAME}
                                        </Text>
                                    ))}
                                </Item>
                            </Grid>
                        </Grid>

                        <Divider sx={{ width: '60px', mx: 'auto', my: 5, borderColor: '#C5A059', opacity: 0.6 }} />
                    </Box>

                    {/* 3. SECONDARY SPONSORS */}
                    <Box className="text-center">
                        <Text
                            letterSpacing="widest"
                            variant="h6"
                            className="cormorant-sc-bold text-uppercase mb-1"
                            sx={{ color: '#2C3E35' }}
                            textKey={CONTENT_ENTOURAGE.SECONDARY_SPONSORS.TITLE}
                        />
                        <Text
                            variant="caption"
                            className="cormorant-garamond-regular d-block fst-italic mb-3"
                            sx={{ color: '#8C857B' }}
                            textKey={CONTENT_ENTOURAGE.SECONDARY_SPONSORS.TAGLINE}
                        />
                        <Grid container spacing={2} justifyContent="center">
                            {[CONTENT_ENTOURAGE.SECONDARY_SPONSORS.CANDLE, CONTENT_ENTOURAGE.SECONDARY_SPONSORS.VEIL, CONTENT_ENTOURAGE.SECONDARY_SPONSORS.CORD].map((sec, idx) => (
                                <Grid key={idx} size={{xs: 12, sm: 4}}>
                                    <Item>
                                        <Text
                                            variant="subtitle2"
                                            className="cormorant-sc-bold mb-1"
                                            sx={{ color: '#C5A059' }}
                                            textKey={sec.TITLE}
                                        />
                                        {sec.NAMES.map((name, nIdx) => (
                                            <Text
                                                key={nIdx}
                                                variant="body1"
                                                className="cormorant-garamond-regular fs-5"
                                                textKey={name}
                                            />
                                        ))}
                                    </Item>
                                </Grid>
                            ))}
                        </Grid>

                        <Divider sx={{ width: '60px', mx: 'auto', my: 5, borderColor: '#C5A059', opacity: 0.6 }} />
                    </Box>

                    {/* 4. MAID OF HONOR & BEST MAN */}
                    <Box className="text-center">
                        <Text
                            letterSpacing="widest"
                            variant="h6"
                            className="cormorant-sc-bold text-uppercase mb-2"
                            sx={{ color: '#2C3E35'}}
                            textKey={CONTENT_ENTOURAGE.ENTOURAGE.TITLE}
                        />
                        <Text
                            variant="caption"
                            className="cormorant-garamond-regular d-block fst-italic mb-3"
                            sx={{ color: '#8C857B'}}
                            textKey={CONTENT_ENTOURAGE.ENTOURAGE.TAGLINE}
                        />
                        <Grid container spacing={2} justifyContent="center">
                            <Grid size={{xs: 12, sm: 6}}>
                                <Item>
                                    <Text
                                        variant="subtitle2"
                                        className="cormorant-sc-bold mb-1"
                                        sx={{ color: '#C5A059' }}
                                        textKey={CONTENT_ENTOURAGE.ENTOURAGE.BRIDAL_PRIMARY.MOH.TITLE}
                                    />
                                    <Text
                                        variant="body1"
                                        className="cormorant-garamond-regular fs-5"
                                        sx={{ fontSize: '1.2rem' }}
                                        textKey={CONTENT_ENTOURAGE.ENTOURAGE.BRIDAL_PRIMARY.MOH.NAME}
                                    />
                                </Item>
                            </Grid>
                            <Grid size={{xs: 12, sm: 6}}>
                                <Item>
                                    <Text
                                        variant="subtitle2"
                                        className="cormorant-sc-bold mb-1"
                                        sx={{ color: '#C5A059' }}
                                        textKey={CONTENT_ENTOURAGE.ENTOURAGE.BRIDAL_PRIMARY.BEST_MAN.TITLE}
                                    />
                                    <Text
                                        variant="body1"
                                        className="cormorant-garamond-regular fs-5"
                                        sx={{ fontSize: '1.2rem' }}
                                        textKey={CONTENT_ENTOURAGE.ENTOURAGE.BRIDAL_PRIMARY.BEST_MAN.NAME}
                                    />
                                </Item>
                            </Grid>
                        </Grid>

                        {/* 5. BRIDESMAIDS & GROOMSMEN */}
                        <Grid container spacing={2} justifyContent="center" className="mt-4">
                            <Grid size={{xs: 12, sm: 6}}>
                                <Item>
                                    <Text
                                        variant="subtitle2"
                                        className="cormorant-sc-bold mb-1"
                                        sx={{ color: '#C5A059' }}
                                        textKey={CONTENT_ENTOURAGE.ENTOURAGE.BRIDAL_GROUP.BRIDESMAIDS.TITLE}
                                    />
                                    {CONTENT_ENTOURAGE.ENTOURAGE.BRIDAL_GROUP.BRIDESMAIDS.NAMES.map((name, i) => (
                                        <Text
                                            key={i}
                                            variant="body1"
                                            className="cormorant-garamond-regular fs-5"
                                            textKey={name}
                                        />
                                    ))}
                                </Item>
                            </Grid>
                            <Grid size={{xs: 12, sm: 6}}>
                                <Item>
                                    <Text
                                        variant="subtitle2"
                                        className="cormorant-sc-bold mb-1"
                                        sx={{ color: '#C5A059' }}
                                        textKey={CONTENT_ENTOURAGE.ENTOURAGE.BRIDAL_GROUP.GROOMSMEN.TITLE}
                                    />
                                    {CONTENT_ENTOURAGE.ENTOURAGE.BRIDAL_GROUP.GROOMSMEN.NAMES.map((name, i) => (
                                        <Text
                                            key={i}
                                            variant="body1"
                                            className="cormorant-garamond-regular fs-5"
                                            textKey={name}
                                        />
                                    ))}
                                </Item>
                            </Grid>
                        </Grid>

                        <Divider sx={{ width: '60px', mx: 'auto', my: 5, borderColor: '#C5A059', opacity: 0.6 }} />
                    </Box>

                    {/* 6. BEARERS */}
                    <Box className="text-center">
                        <Text
                            letterSpacing="widest"
                            variant="h6"
                            className="cormorant-sc-bold text-uppercase mb-1"
                            sx={{ color: '#2C3E35' }}
                            textKey={CONTENT_ENTOURAGE.LITTLE_ATTENDANT.TITLE}
                        />
                        <Text
                            variant="caption"
                            className="cormorant-garamond-regular d-block fst-italic mb-3"
                            sx={{ color: '#8C857B' }}
                            textKey={CONTENT_ENTOURAGE.LITTLE_ATTENDANT.TAGLINE}
                        />
                        <Grid container spacing={2} justifyContent="center">
                            {[CONTENT_ENTOURAGE.LITTLE_ATTENDANT.BEARERS.RING, CONTENT_ENTOURAGE.LITTLE_ATTENDANT.BEARERS.COIN, CONTENT_ENTOURAGE.LITTLE_ATTENDANT.BEARERS.BIBLE].map((bearer, idx) => (
                                <Grid key={idx} size={{xs: 12, sm: 4}}>
                                    <Item>
                                        <Text
                                            variant="subtitle2"
                                            className="cormorant-sc-bold mb-1"
                                            sx={{ color: '#C5A059' }}
                                            textKey={bearer.TITLE}
                                        />
                                        <Text
                                            variant="body1"
                                            className="cormorant-garamond-regular fs-5"
                                            textKey={bearer.NAME}
                                        />
                                    </Item>
                                </Grid>
                            ))}
                        </Grid>
                        <Grid container spacing={2} justifyContent="center" className="mt-4">
                            <Grid size={12}>
                                <Item>
                                    <Text
                                        variant="subtitle2"
                                        className="cormorant-sc-bold mb-1"
                                        sx={{ color: '#C5A059' }}
                                        textKey={CONTENT_ENTOURAGE.LITTLE_ATTENDANT.FLOWER_GIRLS.TITLE}
                                    />
                                    {CONTENT_ENTOURAGE.LITTLE_ATTENDANT.FLOWER_GIRLS.NAMES.map((name, i) => (
                                        <Text
                                            key={i}
                                            variant="body1"
                                            className="cormorant-garamond-regular fs-5"
                                            textKey={name}
                                        />
                                    ))}
                                </Item>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>

                <ParallaxBanner
                    image={imgParallax}
                    title={CONTENT_ENTOURAGE.PARALLAX_TITLE}
                    subtitle={CONTENT_ENTOURAGE.PARALLAX_SUBTITLE}
                    height="350px"
                />
                
                <Container maxWidth="lg" className="py-5">
                    {/* 7. PROCESSIONAL LINE-UP */}
                    <Box className="text-center">
                        {/* Icon Header */}
                        <Box className="d-flex align-items-center justify-content-center mb-2">
                            <ChurchIcon fontSize="large" sx={{ color: '#C5A059' }} />
                        </Box>

                        <Text
                            variant="h4"
                            className="great-vibes-regular mb-2"
                            sx={{ color: '#2C3E35', fontSize: { xs: '2.5rem', sm: '3.2rem' } }}
                            textKey={CONTENT_ENTOURAGE.LINEUP.TITLE}
                        />

                        <Text
                            variant="caption"
                            className="cormorant-garamond-regular d-block fst-italic mb-4"
                            textKey={CONTENT_ENTOURAGE.LINEUP.TAGLINE}
                        />

                        {/* Line-up List */}
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.2, mt: 3 }}>
                            {CONTENT_ENTOURAGE.LINEUP.LIST.map((item, idx) => {
                                // Check if current item is Groom or Bride
                                const isHighlighted = item.toLowerCase() === 'groom' || item.toLowerCase() === 'bride';

                                return (
                                    <Box key={idx} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <Text
                                            variant="body1"
                                            className="cormorant-sc-bold"
                                            sx={{
                                                color: isHighlighted ? '#C5A059' : '#2C3E35',
                                                fontSize: isHighlighted ? '1.35rem' : '1.15rem',
                                                letterSpacing: '0.15em',
                                                textTransform: 'uppercase'
                                            }}
                                            textKey={item}
                                        />
                                        
                                        {/* Accent divider heart icon between items */}
                                        {idx < CONTENT_ENTOURAGE.LINEUP.LIST.length - 1 && (
                                            <FavoriteBorderIcon 
                                                sx={{ color: '#C5A059', fontSize: 12, opacity: 0.5, mt: 1.5 }} 
                                            />
                                        )}
                                    </Box>
                                );
                            })}
                        </Box>
                    </Box>
                </Container>
            </Box>
        </React.Fragment>
    );
}