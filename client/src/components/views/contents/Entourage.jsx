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
        backgroundColor: theme.palette.background.paper,
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.primary,
        borderRadius: theme.shape.borderRadius * 2,
        border: '1px solid rgba(107, 29, 47, 0.15)',
        boxShadow: '0 4px 12px rgba(107, 29, 47, 0.04)',
    }));

    return (
        <React.Fragment>
            <Box sx={{ bgcolor: 'background.default' }}>
                <Container maxWidth="lg" className="py-5">
                    {/* Page Title */}
                    <PageTitle title={CONTENT_ENTOURAGE.TITLE} subtitle={CONTENT_ENTOURAGE.SUBTITLE} />

                    {/* 1. PARENTS */}
                    <Box className="text-center">
                        <Text
                            variant="h6"
                            className="text-uppercase mb-2"
                            sx={{ color: 'primary.main', letterSpacing: '0.15em' }}
                            textKey={CONTENT_ENTOURAGE.PARENTS.TITLE}
                        />
                        <Text
                            variant="caption"
                            className="d-block mb-3"
                            sx={{ color: 'text.secondary', display: 'block' }}
                            textKey={CONTENT_ENTOURAGE.PARENTS.TAGLINE}
                        />

                        <Grid container spacing={2} justifyContent="center">
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Item>
                                    <Text 
                                        variant="h5" 
                                        sx={{ color: 'secondary.main', mb: 1, display: 'block' }} 
                                        textKey={CONTENT_ENTOURAGE.PARENTS.GROOM.TITLE} 
                                    />
                                    <Text 
                                        variant="body1" 
                                        sx={{ display: 'block' }} 
                                        textKey={CONTENT_ENTOURAGE.PARENTS.GROOM.FATHER} 
                                    />
                                    <Text 
                                        variant="body1" 
                                        sx={{ display: 'block' }} 
                                        textKey={CONTENT_ENTOURAGE.PARENTS.GROOM.MOTHER} 
                                    />
                                </Item>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Item>
                                    <Text 
                                        variant="h5" 
                                        sx={{ color: 'secondary.main', mb: 1, display: 'block' }} 
                                        textKey={CONTENT_ENTOURAGE.PARENTS.BRIDE.TITLE} 
                                    />
                                    <Text 
                                        variant="body1" 
                                        sx={{ display: 'block' }} 
                                        textKey={CONTENT_ENTOURAGE.PARENTS.BRIDE.FATHER} 
                                    />
                                    <Text 
                                        variant="body1" 
                                        sx={{ display: 'block' }} 
                                        textKey={CONTENT_ENTOURAGE.PARENTS.BRIDE.MOTHER} 
                                    />
                                </Item>
                            </Grid>
                        </Grid>

                        <Divider sx={{ width: '60px', mx: 'auto', my: 5, borderColor: 'primary.main', opacity: 0.4 }} />
                    </Box>

                    {/* 2. PRINCIPAL SPONSORS */}
                    <Box className="text-center">
                        <Text
                            variant="h6"
                            className="text-uppercase mb-2"
                            sx={{ color: 'primary.main', letterSpacing: '0.15em' }}
                            textKey={CONTENT_ENTOURAGE.PRINCIPAL_SPONSORS.TITLE}
                        />
                        <Text
                            variant="caption"
                            className="d-block mb-3"
                            sx={{ color: 'text.secondary', display: 'block' }}
                            textKey={CONTENT_ENTOURAGE.PRINCIPAL_SPONSORS.TAGLINE}
                        />
                        <Grid container spacing={2} justifyContent="center">
                            <Grid size={12}>
                                <Item>
                                    <Text
                                        variant="h5"
                                        sx={{ color: 'secondary.main', mb: 1, display: 'block' }}
                                        textKey={CONTENT_ENTOURAGE.PRINCIPAL_SPONSORS.SUBTITLE}
                                    />
                                    {CONTENT_ENTOURAGE.PRINCIPAL_SPONSORS.LIST.map((sponsor, idx) => (
                                        <Text 
                                            key={idx} 
                                            variant="body1" 
                                            sx={{ display: 'block', mb: 0.5 }} 
                                            textKey={sponsor.NAME} 
                                        />
                                    ))}
                                </Item>
                            </Grid>
                        </Grid>

                        <Divider sx={{ width: '60px', mx: 'auto', my: 5, borderColor: 'primary.main', opacity: 0.4 }} />
                    </Box>

                    {/* 3. SECONDARY SPONSORS */}
                    <Box className="text-center">
                        <Text
                            variant="h6"
                            className="text-uppercase mb-1"
                            sx={{ color: 'primary.main', letterSpacing: '0.15em' }}
                            textKey={CONTENT_ENTOURAGE.SECONDARY_SPONSORS.TITLE}
                        />
                        <Text
                            variant="caption"
                            className="d-block mb-3"
                            sx={{ color: 'text.secondary', display: 'block' }}
                            textKey={CONTENT_ENTOURAGE.SECONDARY_SPONSORS.TAGLINE}
                        />
                        <Grid container spacing={2} justifyContent="center">
                            {[CONTENT_ENTOURAGE.SECONDARY_SPONSORS.CANDLE, CONTENT_ENTOURAGE.SECONDARY_SPONSORS.VEIL, CONTENT_ENTOURAGE.SECONDARY_SPONSORS.CORD].map((sec, idx) => (
                                <Grid key={idx} size={{ xs: 12, sm: 4 }}>
                                    <Item>
                                        <Text
                                            variant="h5"
                                            sx={{ color: 'secondary.main', mb: 1, display: 'block' }}
                                            textKey={sec.TITLE}
                                        />
                                        {sec.NAMES.map((name, nIdx) => (
                                            <Text
                                                key={nIdx}
                                                variant="body1"
                                                sx={{ display: 'block' }}
                                                textKey={name}
                                            />
                                        ))}
                                    </Item>
                                </Grid>
                            ))}
                        </Grid>

                        <Divider sx={{ width: '60px', mx: 'auto', my: 5, borderColor: 'primary.main', opacity: 0.4 }} />
                    </Box>

                    {/* 4. MAID OF HONOR & BEST MAN */}
                    <Box className="text-center">
                        <Text
                            variant="h6"
                            className="text-uppercase mb-2"
                            sx={{ color: 'primary.main', letterSpacing: '0.15em' }}
                            textKey={CONTENT_ENTOURAGE.ENTOURAGE.TITLE}
                        />
                        <Text
                            variant="caption"
                            className="d-block mb-3"
                            sx={{ color: 'text.secondary', display: 'block' }}
                            textKey={CONTENT_ENTOURAGE.ENTOURAGE.TAGLINE}
                        />
                        <Grid container spacing={2} justifyContent="center">
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Item>
                                    <Text
                                        variant="h5"
                                        sx={{ color: 'secondary.main', mb: 1, display: 'block' }}
                                        textKey={CONTENT_ENTOURAGE.ENTOURAGE.BRIDAL_PRIMARY.MOH.TITLE}
                                    />
                                    <Text
                                        variant="body1"
                                        sx={{ display: 'block', fontWeight: 600 }}
                                        textKey={CONTENT_ENTOURAGE.ENTOURAGE.BRIDAL_PRIMARY.MOH.NAME}
                                    />
                                </Item>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Item>
                                    <Text
                                        variant="h5"
                                        sx={{ color: 'secondary.main', mb: 1, display: 'block' }}
                                        textKey={CONTENT_ENTOURAGE.ENTOURAGE.BRIDAL_PRIMARY.BEST_MAN.TITLE}
                                    />
                                    <Text
                                        variant="body1"
                                        sx={{ display: 'block', fontWeight: 600 }}
                                        textKey={CONTENT_ENTOURAGE.ENTOURAGE.BRIDAL_PRIMARY.BEST_MAN.NAME}
                                    />
                                </Item>
                            </Grid>
                        </Grid>

                        {/* 5. BRIDESMAIDS & GROOMSMEN */}
                        <Grid container spacing={2} justifyContent="center" className="mt-4">
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Item>
                                    <Text
                                        variant="h5"
                                        sx={{ color: 'secondary.main', mb: 1, display: 'block' }}
                                        textKey={CONTENT_ENTOURAGE.ENTOURAGE.BRIDAL_GROUP.BRIDESMAIDS.TITLE}
                                    />
                                    {CONTENT_ENTOURAGE.ENTOURAGE.BRIDAL_GROUP.BRIDESMAIDS.NAMES.map((name, i) => (
                                        <Text
                                            key={i}
                                            variant="body1"
                                            sx={{ display: 'block', mb: 0.5 }}
                                            textKey={name}
                                        />
                                    ))}
                                </Item>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Item>
                                    <Text
                                        variant="h5"
                                        sx={{ color: 'secondary.main', mb: 1, display: 'block' }}
                                        textKey={CONTENT_ENTOURAGE.ENTOURAGE.BRIDAL_GROUP.GROOMSMEN.TITLE}
                                    />
                                    {CONTENT_ENTOURAGE.ENTOURAGE.BRIDAL_GROUP.GROOMSMEN.NAMES.map((name, i) => (
                                        <Text
                                            key={i}
                                            variant="body1"
                                            sx={{ display: 'block', mb: 0.5 }}
                                            textKey={name}
                                        />
                                    ))}
                                </Item>
                            </Grid>
                        </Grid>

                        <Divider sx={{ width: '60px', mx: 'auto', my: 5, borderColor: 'primary.main', opacity: 0.4 }} />
                    </Box>

                    {/* 6. BEARERS */}
                    <Box className="text-center">
                        <Text
                            variant="h6"
                            className="text-uppercase mb-1"
                            sx={{ color: 'primary.main', letterSpacing: '0.15em' }}
                            textKey={CONTENT_ENTOURAGE.LITTLE_ATTENDANT.TITLE}
                        />
                        <Text
                            variant="caption"
                            className="d-block mb-3"
                            sx={{ color: 'text.secondary', display: 'block' }}
                            textKey={CONTENT_ENTOURAGE.LITTLE_ATTENDANT.TAGLINE}
                        />
                        <Grid container spacing={2} justifyContent="center">
                            {[CONTENT_ENTOURAGE.LITTLE_ATTENDANT.BEARERS.RING, CONTENT_ENTOURAGE.LITTLE_ATTENDANT.BEARERS.COIN, CONTENT_ENTOURAGE.LITTLE_ATTENDANT.BEARERS.BIBLE].map((bearer, idx) => (
                                <Grid key={idx} size={{ xs: 12, sm: 4 }}>
                                    <Item>
                                        <Text
                                            variant="h5"
                                            sx={{ color: 'secondary.main', mb: 1, display: 'block' }}
                                            textKey={bearer.TITLE}
                                        />
                                        <Text
                                            variant="body1"
                                            sx={{ display: 'block' }}
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
                                        variant="h5"
                                        sx={{ color: 'secondary.main', mb: 1, display: 'block' }}
                                        textKey={CONTENT_ENTOURAGE.LITTLE_ATTENDANT.FLOWER_GIRLS.TITLE}
                                    />
                                    {CONTENT_ENTOURAGE.LITTLE_ATTENDANT.FLOWER_GIRLS.NAMES.map((name, i) => (
                                        <Text
                                            key={i}
                                            variant="body1"
                                            sx={{ display: 'block', mb: 0.5 }}
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
                        <Box className="d-flex align-items-center justify-content-center mb-2">
                            <ChurchIcon fontSize="large" sx={{ color: 'primary.main' }} />
                        </Box>

                        <Text
                            variant="h2"
                            className="mb-2"
                            sx={{ color: 'primary.main' }}
                            textKey={CONTENT_ENTOURAGE.LINEUP.TITLE}
                        />

                        <Text
                            variant="caption"
                            className="d-block mb-4"
                            sx={{ color: 'text.secondary', display: 'block' }}
                            textKey={CONTENT_ENTOURAGE.LINEUP.TAGLINE}
                        />

                        {/* Line-up List */}
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.2, mt: 3 }}>
                            {CONTENT_ENTOURAGE.LINEUP.LIST.map((item, idx) => {
                                const isHighlighted = item.toLowerCase() === 'groom' || item.toLowerCase() === 'bride';

                                return (
                                    <Box key={idx} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <Text
                                            variant={isHighlighted ? 'h5' : 'h6'}
                                            sx={{
                                                color: isHighlighted ? 'primary.main' : 'text.primary',
                                                letterSpacing: '0.15em',
                                                textTransform: 'uppercase',
                                                fontWeight: isHighlighted ? 700 : 500,
                                            }}
                                            textKey={item}
                                        />
                                        
                                        {/* Accent divider heart icon between items */}
                                        {idx < CONTENT_ENTOURAGE.LINEUP.LIST.length - 1 && (
                                            <FavoriteBorderIcon 
                                                sx={{ color: 'primary.main', fontSize: 12, opacity: 0.5, mt: 1.5 }} 
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