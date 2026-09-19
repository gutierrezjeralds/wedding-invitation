import { Link as RouterLink } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import { Container, Box, Divider, Link } from '@mui/material';
import { FavoriteBorder } from '@mui/icons-material';
import { Text } from '../utils/MUIComponents';
import GlobalButterflies from '../utils/GlobalButterfliesAnimation';

// Assets
import envelopeSvg from '../../assets/img/envelope/envelope.svg';

export default function Envelope() {
    const { t: oI18n } = useTranslation();
    return (
        <Box>
            <GlobalButterflies primary="#722F37" secondary="#F8C8DC" />

            <Container maxWidth="lg">
                <Box className="text-center" sx={{ py: 4 }}>
                    <Text letterSpacing="wide" variant="subtitle1" className="cormorant-sc-bold">
                        {oI18n("envelope_yourInvited")}
                    </Text>

                    <Text letterSpacing="wide" variant="body1" className="cormorant-garamond-bold fst-italic">
                        {oI18n("envelope_toCelebrate")}
                    </Text>

                    <Divider component="div" role="presentation" className='p-4'>
                        <FavoriteBorder fontSize="small" className='mt-2' />
                    </Divider>

                    <Text letterSpacing="wide" variant="h3" className="great-vibes-regular">
                        <Trans 
                            i18nKey="title_name"
                            components={{
                                // Maps the <span> tag from JSON to custom styles or MUI styling
                                span: <span className="pinyon-script-regular" />
                            }}
                        />
                    </Text>

                    <Text variant="h6" className="cormorant-garamond-regular mt-5">
                        {oI18n("title_date")}
                    </Text>

                    <Text letterSpacing="wide" variant="h5" className="cormorant-sc-bold text-uppercase mt-3">
                        {oI18n("title_church")}
                    </Text>
                </Box>

                <Box className="text-center">
                    <Link component={RouterLink} to="/home" className='d-inline-block'>
                        <Box
                            component="img"
                            src={envelopeSvg}
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

                    <Text variant="h6" className="cormorant-garamond-regular mt-3">
                        <Trans 
                            i18nKey="envelope_waxSeal"
                            components={{
                                // Maps the <span> tag from JSON to custom styles or MUI styling
                                span: <span className="text-gold fs-3 fw-bolder" />
                            }}
                        />
                    </Text>
                </Box>

                <Box className="text-center" sx={{ py: 4 }}>
                    <Text variant="body1" className="cormorant-garamond-regular mt-3">
                        {oI18n("envelope_bibleVerse")}
                    </Text>

                    <Text variant="body1" className="cormorant-garamond-regular mt-3">
                        {oI18n("enveloper_bibleVerse_id")}
                    </Text>
                </Box>
            </Container>
        </Box>
    );
}