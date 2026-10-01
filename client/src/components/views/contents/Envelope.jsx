import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import { Container, Box, Divider, Link } from '@mui/material';
import { FavoriteBorder } from '@mui/icons-material';
import { Text } from '../utils/CustomComponents';
import GlobalButterflies from '../utils/GlobalButterfliesAnimation';
import { CONTENT, CONTENT_ENVELOPE } from '../utils/Constants';

// Assets background
const sCloudflareBaseDirectUrl = "https://wedding-images-api.jeraldandsheila.workers.dev/images";
const sImgEnvelope = sCloudflareBaseDirectUrl + "/envelope/envelope.png";
const sBackgroundDekstop = sCloudflareBaseDirectUrl + "/background/desktop/envelope.png";
const sBackgroundMobile = sCloudflareBaseDirectUrl + "/background/mobile/envelope.png";

export default function Envelope() {
    const { t: oI18n } = useTranslation();
    return (
        <React.Fragment>
            <GlobalButterflies primary="#d71128" secondary="#F8C8DC" />

            <Box
                className="page-background"
                sx={{
                    '--bg-desktop': `url(${sBackgroundDekstop})`,
                    '--bg-mobile': `url(${sBackgroundMobile})`,
                    // Fallback background color if images fail to load or are empty
                    backgroundColor: '#faf8f5',
                }}
            >
                <Container maxWidth="lg" className="py-5">
                    <Box className="text-center">
                        <Text
                            letterSpacing="wide"
                            variant="subtitle1" className="cormorant-sc-bold"
                            textKey={CONTENT_ENVELOPE.YOURINVITED}
                        />

                        <Text
                            letterSpacing="wide"
                            variant="body1"
                            className="cormorant-garamond-bold fst-italic"
                            textKey={CONTENT_ENVELOPE.TOCELEBRATE}
                        />

                        <Divider component="div" role="presentation" className='my-4'>
                            <FavoriteBorder fontSize="small" className='mt-2' />
                        </Divider>

                        <Text
                            letterSpacing="wide"
                            variant="h3"
                            className="great-vibes-regular"
                            textKey={CONTENT.TITLE_NAME}
                        />

                        <Text
                            variant="h6"
                            className="cormorant-garamond-regular mt-5"
                            textKey={CONTENT.TITLE_DATE}
                        />

                        <Text
                            letterSpacing="wide"
                            variant="h5"
                            className="cormorant-sc-bold text-uppercase mt-3"
                            textKey={CONTENT.TITLE_CHURCH}
                        />
                    </Box>

                    <Box className="text-center">
                        <Link component={RouterLink} to="/cover" className='d-inline-block'>
                            <Box
                                component="img"
                                src={sImgEnvelope}
                                alt="Envelope"
                                sx={{
                                    width: '100%',          // Responsive width
                                    maxWidth: 400,          // Maximum width limit
                                    height: 'auto',         // Maintain aspect ratio
                                    display: 'block',
                                    mx: 'auto',             // Center horizontally
                                }}
                            />
                        </Link>

                        <Text
                            variant="h6"
                            className="cormorant-garamond-regular mt-3"
                            textKey={CONTENT_ENVELOPE.WAXSEAL}
                        />
                    </Box>

                    <Box className="text-center mt-5">
                        <Text
                            variant="body1"
                            className="cormorant-garamond-regular mt-3"
                            textKey={CONTENT_ENVELOPE.BIBLEVERSE}
                        />

                        <Text
                            variant="body1"
                            className="cormorant-garamond-regular mt-3"
                            textKey={CONTENT_ENVELOPE.BIBLEVERSE_ID}
                        />
                    </Box>
                </Container>
            </Box>
        </React.Fragment>
    );
}