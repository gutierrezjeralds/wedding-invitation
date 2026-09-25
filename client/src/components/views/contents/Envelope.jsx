import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import { Container, Box, Divider, Link } from '@mui/material';
import { FavoriteBorder } from '@mui/icons-material';
import { Text } from '../utils/CustomComponents';
import GlobalButterflies from '../utils/GlobalButterfliesAnimation';

// Assets
import imgEnvelope from '../../assets/img/envelope/envelope.svg';

export default function Envelope() {
    const { t: oI18n } = useTranslation();
    return (
        <React.Fragment>
            <GlobalButterflies primary="#722F37" secondary="#F8C8DC" />

            <Box className="bg-light">
                <Container maxWidth="lg">
                    <Box className="text-center" sx={{ py: 4 }}>
                        <Text
                            letterSpacing="wide"
                            variant="subtitle1" className="cormorant-sc-bold"
                            i18nKey="page_envelope_yourInvited"
                        />

                        <Text
                            letterSpacing="wide"
                            variant="body1"
                            className="cormorant-garamond-bold fst-italic"
                            i18nKey="page_envelope_toCelebrate"
                        />

                        <Divider component="div" role="presentation" className='my-4'>
                            <FavoriteBorder fontSize="small" className='mt-2' />
                        </Divider>

                        <Text
                            letterSpacing="wide"
                            variant="h3"
                            className="great-vibes-regular"
                            i18nKey="title_name"
                        />

                        <Text
                            variant="h6"
                            className="cormorant-garamond-regular mt-5"
                            i18nKey="title_date"
                        />

                        <Text
                            letterSpacing="wide"
                            variant="h5"
                            className="cormorant-sc-bold text-uppercase mt-3"
                            i18nKey="title_church"
                        />
                    </Box>

                    <Box className="text-center">
                        <Link component={RouterLink} to="/home" className='d-inline-block'>
                            <Box
                                component="img"
                                src={imgEnvelope}
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
                            i18nKey="page_envelope_waxSeal">
                        </Text>
                    </Box>

                    <Box className="text-center" sx={{ py: 4 }}>
                        <Text
                            variant="body1"
                            className="cormorant-garamond-regular mt-3"
                            i18nKey="page_envelope_bibleVerse"
                        />

                        <Text
                            variant="body1"
                            className="cormorant-garamond-regular mt-3"
                            i18nKey="page_envelope_bibleVerse_id"
                        />
                    </Box>
                </Container>
            </Box>
        </React.Fragment>
    );
}