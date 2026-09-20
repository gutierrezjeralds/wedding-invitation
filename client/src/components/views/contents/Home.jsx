import { Link as RouterLink } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import { Container, Box, Divider, Grid, Paper, styled , Link, Button} from '@mui/material';
import { FavoriteBorder, Favorite, Church, Groups, Checkroom, Send } from '@mui/icons-material';
import { Text } from '../utils/MUIComponents';
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
    return (
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
                    {oI18n("title_date_v2")}
                </Text>

                <Text letterSpacing="wide" className="cormorant-garamond-regular fs-8">
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
                    <Grid size={3}>
                        <Link component={RouterLink} to="/story" underline="none" sx={{ color: 'inherit', display: 'block' }}>
                            <Item>
                                <FavoriteBorder fontSize="small" />
                                <Text className="text-uppercase d-block cormorant-garamond-regular" sx={{fontSize: {xs: "0.6rem", sm: "0.75rem", md: "0.9rem"}}}>
                                    {oI18n("page_title_story")}
                                </Text>
                            </Item>
                        </Link>
                    </Grid>
                    <Grid size={3}>
                        <Link component={RouterLink} to="/wedding" underline="none" sx={{ color: 'inherit', display: 'block' }}>
                            <Item>
                                <Church fontSize="small" />
                                <Text className="text-uppercase d-block cormorant-garamond-regular" sx={{fontSize: {xs: "0.6rem", sm: "0.75rem", md: "0.9rem"}}}>
                                    {oI18n("page_title_wedding")}
                                </Text>
                            </Item>
                        </Link>
                    </Grid>
                    <Grid size={3}>
                        <Link component={RouterLink} to="/entourage" underline="none" sx={{ color: 'inherit', display: 'block' }}>
                            <Item>
                                <Groups fontSize="small" />
                                <Text className="text-uppercase d-block cormorant-garamond-regular" sx={{fontSize: {xs: "0.6rem", sm: "0.75rem", md: "0.9rem"}}}>
                                    {oI18n("page_title_entourage")}
                                </Text>
                            </Item>
                        </Link>
                    </Grid>
                    <Grid size={3}>
                        <Link component={RouterLink} to="/attire" underline="none" sx={{ color: 'inherit', display: 'block' }}>
                            <Item>
                                <Checkroom fontSize="small" />
                                <Text className="text-uppercase d-block cormorant-garamond-regular" sx={{fontSize: {xs: "0.6rem", sm: "0.75rem", md: "0.9rem"}}}>
                                    {oI18n("page_title_attire")}
                                </Text>
                            </Item>
                        </Link>
                    </Grid>
                </Grid>

                <Button variant="outlined" className="mt-5" startIcon={<Send />} sx={{width: "15rem"}}>
                    {oI18n("title_rsvp")}
                </Button>
            </Box>
        </Container>
    );
}