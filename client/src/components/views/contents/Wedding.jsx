import { Link as RouterLink } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import { Container, Typography, Box } from '@mui/material';
import { Text } from '../utils/MUIComponents';

export default function Wedding() {
    const { t: oI18n } = useTranslation();
    return (
        <Container maxWidth="lg">
            <Box className="text-center" sx={{ py: 4 }}>
                <Text letterSpacing="wide" variant="h3" className="great-vibes-regular">
                    {oI18n("wedding_page_title")}
                </Text>

                <Typography variant="body1">
                This is The Wedding page.
                </Typography>
            </Box>
        </Container>
    );
}