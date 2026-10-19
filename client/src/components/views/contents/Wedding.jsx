import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Stack, Paper, Box, Button, Tabs, Tab, Chip, Typography } from '@mui/material';
import { 
    Church, AccessTimeFilled, Map, WineBar, Send
} from '@mui/icons-material';
import { Text, PageTitle } from '../utils/CustomComponents';
import ViewMapModal from './modals/ViewMap';
import { CONTENT, CONTENT_WEDDING } from '../utils/Constants';

// Assets background
const sCloudflareBaseDirectUrl = "https://wedding-images-api.jeraldandsheila.workers.dev/images";
const sBackgroundDekstop = sCloudflareBaseDirectUrl + "/background/desktop/wedding.png";
const sBackgroundMobile = sCloudflareBaseDirectUrl + "/background/mobile/wedding.png";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`attire-tabpanel-${index}`}
            aria-labelledby={`attire-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ pt: 4, pb: 2 }}>{children}</Box>}
        </div>
    );
}

export default function Wedding() {
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const [openViewMapModal, setOpenViewMapModal] = useState(false);
    const [mapModalTab, setMapModalTab] = useState('church');

    const handleOpenViewMapModal = (tab = 'church') => {
        setMapModalTab(tab);
        setOpenViewMapModal(true);
    };
    
    const handleCloseViewMapModal = () => setOpenViewMapModal(false);

    return (
        <React.Fragment>
            <Box
                className="page-background"
                sx={{
                    '--bg-desktop': `url(${sBackgroundDekstop})`,
                    '--bg-mobile': `url(${sBackgroundMobile})`,
                    backgroundColor: 'background.default',
                }}
            >
                <Container maxWidth="lg" className="py-5">
                    {/* Page Title */}
                    <PageTitle title={CONTENT_WEDDING.TITLE} subtitle={CONTENT_WEDDING.SUBTITLE} />

                    {/* Custom Styled MUI Tabs */}
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs
                                value={tabValue}
                                onChange={handleTabChange}
                                variant="scrollable"
                                scrollButtons="auto"
                                allowScrollButtonsMobile
                                sx={{
                                    width: '100%',
                                    '& .MuiTabs-scroller': {
                                        display: { sm: 'flex' },
                                        justifyContent: { sm: 'center' },
                                    },
                                    '& .MuiTabs-flexContainer': {
                                        justifyContent: { sm: 'center' },
                                    },
                                    '& .MuiTab-root': {
                                        fontSize: { xs: '0.75rem', sm: '0.9rem' },
                                        fontWeight: 500,
                                        textTransform: 'uppercase',
                                        letterSpacing: { xs: 0.5, sm: 1.5 },
                                        minWidth: { xs: 'auto', sm: 120 },
                                        px: { xs: 1.5, sm: 3 },
                                        py: 1,
                                        color: 'text.primary',
                                        '&.Mui-selected': {
                                            color: 'primary.main',
                                        },
                                    },
                                    '& .MuiTabs-indicator': {
                                        backgroundColor: 'primary.main',
                                        height: 3,
                                        borderRadius: '3px 3px 0 0',
                                    },
                                    /* STYLED SCROLL BUTTONS */
                                    '& .MuiTabScrollButton-root': {
                                        width: 32,
                                        height: 32,
                                        borderRadius: '50%',
                                        bgcolor: 'rgba(107, 29, 47, 0.1)',
                                        color: 'primary.main',
                                        alignSelf: 'center',
                                        mx: 0.5,
                                        transition: 'all 0.2s ease',
                                        opacity: 0.9,
                                        '&:hover': {
                                            bgcolor: 'primary.main',
                                            color: 'primary.contrastText',
                                            opacity: 1,
                                        },
                                        '&.Mui-disabled': {
                                            opacity: 0.3,
                                            bgcolor: 'transparent',
                                        },
                                    },
                                }}
                            >
                                <Tab icon={<Church fontSize="small" />} iconPosition="start" label={CONTENT_WEDDING.TAB.VENUE_AND_LOCATION.TITLE} />
                                <Tab icon={<AccessTimeFilled fontSize="small" />} iconPosition="start" label={CONTENT_WEDDING.TAB.DAY_SCHEDULE.TITLE} />
                            </Tabs>
                        </Box>

                        {/* TAB 0: VENUE AND LOCATION (ACTIVE ON LOAD) */}
                        <TabPanel value={tabValue} index={0}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: { xs: 'column', md: 'row' },
                                    gap: 3,
                                    width: '100%',
                                    alignItems: 'stretch'
                                }}
                            >
                                {/* Ceremony Card */}
                                <Paper
                                    elevation={0}
                                    sx={{
                                        flex: { xs: '1 1 100%', md: '1 1 50%' },
                                        maxWidth: { xs: '100%', md: '50%' },
                                        minWidth: 0,
                                        borderRadius: 6,
                                        overflow: 'hidden',
                                        bgcolor: 'background.paper',
                                        border: '1px solid rgba(107, 29, 47, 0.2)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        transition: 'transform 0.3s ease',
                                        '&:hover': { transform: 'translateY(-4px)' }
                                    }}
                                >
                                    <Box sx={{ width: '100%', minWidth: 0 }}>
                                        <Box
                                            sx={{
                                                height: 180,
                                                background: 'linear-gradient(to bottom, rgba(107, 29, 47, 0.08), #FAF7F2)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                position: 'relative',
                                                borderBottom: '1px solid rgba(107, 29, 47, 0.1)'
                                            }}
                                        >
                                            <Church sx={{ fontSize: 80, color: 'primary.main', opacity: 0.85 }} />
                                            <Chip
                                                label={CONTENT_WEDDING.TAB.VENUE_AND_LOCATION.CEREMONY}
                                                size="small"
                                                sx={{
                                                    position: 'absolute',
                                                    top: 16,
                                                    right: 16,
                                                    bgcolor: 'rgba(107, 29, 47, 0.1)',
                                                    color: 'primary.main',
                                                    fontWeight: 700,
                                                    fontSize: '0.65rem',
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.1em'
                                                }}
                                            />
                                        </Box>

                                        <Box sx={{ p: { xs: 2.5, sm: 4 }, textAlign: 'center', width: '100%', minWidth: 0 }}>
                                            <Text
                                                variant="h5"
                                                className="mb-1"
                                                textKey={CONTENT.TITLE_CHURCH}
                                            />
                                            
                                            <Text
                                                variant="caption"
                                                sx={{ display: 'block', mb: 2 }}
                                                textKey={CONTENT.TITLE_DATE_V2}
                                            />

                                            <Text
                                                variant="body1"
                                                className="py-2"
                                                textKey={CONTENT_WEDDING.TAB.VENUE_AND_LOCATION.CHURCH_TAGLINE}
                                            />

                                            <Chip
                                                icon={<Church fontSize="small" sx={{ color: 'primary.main !important' }} />}
                                                label={CONTENT.TITLE_CHURCH_ADDRESS}
                                                sx={{ 
                                                    bgcolor: 'background.paper', 
                                                    border: '1px solid rgba(107, 29, 47, 0.2)', 
                                                    color: 'text.primary', 
                                                    fontSize: '0.75rem',
                                                    maxWidth: '100%',
                                                    height: 'auto',
                                                    py: 0.75,
                                                    '& .MuiChip-label': {
                                                        whiteSpace: 'normal',
                                                        wordBreak: 'break-word',
                                                        display: 'block',
                                                        px: 1
                                                    }
                                                }}
                                            />
                                        </Box>
                                    </Box>

                                    <Box sx={{ p: 3, pt: 0, width: '100%' }}>
                                        <Button
                                            fullWidth
                                            variant="outlined"
                                            startIcon={<Map />}
                                            onClick={() => handleOpenViewMapModal('church')}
                                            sx={{
                                                borderColor: 'primary.main',
                                                color: 'primary.main',
                                                fontFamily: '"Cormorant Garamond", serif',
                                                fontWeight: 600,
                                                '&:hover': {
                                                    bgcolor: 'primary.main',
                                                    color: 'primary.contrastText',
                                                    borderColor: 'primary.main'
                                                }
                                            }}
                                        >
                                            {CONTENT_WEDDING.TAB.VENUE_AND_LOCATION.MAP_INFO}
                                        </Button>
                                    </Box>
                                </Paper>

                                {/* Reception Card */}
                                <Paper
                                    elevation={0}
                                    sx={{
                                        flex: { xs: '1 1 100%', md: '1 1 50%' },
                                        maxWidth: { xs: '100%', md: '50%' },
                                        minWidth: 0,
                                        borderRadius: 6,
                                        overflow: 'hidden',
                                        bgcolor: 'background.paper',
                                        border: '1px solid rgba(107, 29, 47, 0.2)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        transition: 'transform 0.3s ease',
                                        '&:hover': { transform: 'translateY(-4px)' }
                                    }}
                                >
                                    <Box sx={{ width: '100%', minWidth: 0 }}>
                                        <Box
                                            sx={{
                                                height: 180,
                                                background: 'linear-gradient(to bottom, rgba(143, 57, 72, 0.08), #FAF7F2)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                position: 'relative',
                                                borderBottom: '1px solid rgba(107, 29, 47, 0.1)'
                                            }}
                                        >
                                            <WineBar sx={{ fontSize: 80, color: 'secondary.main', opacity: 0.85 }} />
                                            <Chip
                                                label={CONTENT_WEDDING.TAB.VENUE_AND_LOCATION.RECEPTION}
                                                size="small"
                                                sx={{
                                                    position: 'absolute',
                                                    top: 16,
                                                    right: 16,
                                                    bgcolor: 'rgba(143, 57, 72, 0.1)',
                                                    color: 'secondary.main',
                                                    fontWeight: 700,
                                                    fontSize: '0.65rem',
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.1em'
                                                }}
                                            />
                                        </Box>

                                        <Box sx={{ p: { xs: 2.5, sm: 4 }, textAlign: 'center', width: '100%', minWidth: 0 }}>
                                            <Text
                                                variant="h5"
                                                className="mb-1"
                                                textKey={CONTENT.TITLE_RECEPTION}
                                            />

                                            <Text
                                                variant="caption"
                                                sx={{ display: 'block', mb: 2 }}
                                                textKey={CONTENT.TITLE_DATE_V4}
                                            />

                                            <Text
                                                variant="body1"
                                                className="py-2"
                                                textKey={CONTENT_WEDDING.TAB.VENUE_AND_LOCATION.RECEPTION_TAGLINE}
                                            />

                                            <Chip
                                                icon={<WineBar fontSize="small" sx={{ color: 'primary.main !important' }} />}
                                                label={CONTENT.TITLE_RECEPTION_ADDRESS}
                                                sx={{ 
                                                    bgcolor: 'background.paper', 
                                                    border: '1px solid rgba(107, 29, 47, 0.2)', 
                                                    color: 'text.primary', 
                                                    fontSize: '0.75rem',
                                                    maxWidth: '100%',
                                                    height: 'auto',
                                                    py: 0.75,
                                                    '& .MuiChip-label': {
                                                        whiteSpace: 'normal',
                                                        wordBreak: 'break-word',
                                                        display: 'block',
                                                        px: 1
                                                    }
                                                }}
                                            />
                                        </Box>
                                    </Box>

                                    <Box sx={{ p: 3, pt: 0, width: '100%' }}>
                                        <Button
                                            fullWidth
                                            variant="outlined"
                                            startIcon={<Map />}
                                            onClick={() => handleOpenViewMapModal('reception')}
                                            sx={{
                                                borderColor: 'primary.main',
                                                color: 'primary.main',
                                                fontFamily: '"Cormorant Garamond", serif',
                                                fontWeight: 600,
                                                '&:hover': {
                                                    bgcolor: 'primary.main',
                                                    color: 'primary.contrastText',
                                                    borderColor: 'primary.main'
                                                }
                                            }}
                                        >
                                            {CONTENT_WEDDING.TAB.VENUE_AND_LOCATION.MAP_INFO}
                                        </Button>
                                    </Box>
                                </Paper>
                            </Box>
                        </TabPanel>

                        {/* TAB 2: DAY SCHEDULE */}
                        <TabPanel value={tabValue} index={1}>
                            <Paper elevation={0} sx={{ p: { xs: 3, sm: 5 }, borderRadius: 6, bgcolor: 'background.paper', border: '1px solid rgba(107, 29, 47, 0.2)' }}>
                                <Box className="text-center mb-3">
                                    <Text
                                        variant="caption"
                                        sx={{ letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}
                                        textKey={CONTENT_WEDDING.TIMELINE_SUBTITLE}
                                    />
                                    <Text
                                        variant="h5"
                                        sx={{ mt: 1, color: 'primary.main' }}
                                        textKey={CONTENT_WEDDING.TIMELINE_TITLE}
                                    />
                                </Box>
                    
                                <Stack spacing={3} sx={{ position: 'relative', pl: { xs: 2, sm: 4 } }}>
                                    <Box sx={{ position: 'absolute', top: 27, bottom: 10, left: { xs: 11, sm: 20 }, width: 2, bgcolor: 'rgba(107, 29, 47, 0.3)' }} />
                    
                                    {CONTENT_WEDDING.TIMELINE_BODY.map((evt, idx) => {
                                        const IconComp = evt.ICON;
                                        return (
                                            <Paper
                                                key={idx}
                                                elevation={0}
                                                sx={{
                                                    p: 3,
                                                    borderRadius: 4,
                                                    border: '1px solid rgba(107, 29, 47, 0.15)',
                                                    bgcolor: 'background.default',
                                                    transition: 'all 0.3s ease',
                                                    position: 'relative',
                                                    ml: { xs: 2, sm: 4 },
                                                    '&:hover': { borderColor: 'primary.main', boxShadow: '0 6px 18px rgba(107, 29, 47, 0.08)' }
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        position: 'absolute',
                                                        left: { xs: -27, sm: -43 },
                                                        top: 20,
                                                        width: 14,
                                                        height: 14,
                                                        borderRadius: '50%',
                                                        bgcolor: 'primary.main',
                                                        border: '3px solid #FAF7F2'
                                                    }}
                                                />
                            
                                                <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} spacing={1} sx={{ mb: 1 }}>
                                                    <Stack direction="row" alignItems="center" spacing={1.5}>
                                                        <IconComp fontSize='small' sx={{ color: 'primary.main' }} />
                                                        <Text
                                                            variant="h6"
                                                            sx={{ color: 'primary.main', fontFamily: '"Cormorant Garamond", serif', fontWeight: 700 }}
                                                            textKey={evt.TITLE}
                                                        />
                                                    </Stack>
                                                    {
                                                        evt.TIME ? 
                                                            <Chip
                                                                label={evt.TIME}
                                                                size="small"
                                                                sx={{
                                                                    bgcolor: 'rgba(107, 29, 47, 0.1)',
                                                                    color: 'primary.main',
                                                                    fontWeight: 700,
                                                                    fontSize: '0.75rem'
                                                                }}
                                                            />
                                                        : ""
                                                    }
                                                </Stack>
                                                <Text
                                                    variant="caption"
                                                    sx={{ display: 'block', mb: 1, color: 'text.secondary', fontWeight: 600 }}
                                                    textKey={`📍 ${evt.LOCATION}`}
                                                />
                                                <Text
                                                    variant="body1"
                                                    textKey={evt.DESCRIPTION}
                                                />
                                            </Paper>
                                        );
                                    })}
                                </Stack>
                            </Paper>
                        </TabPanel>
                    </Box>

                    <Box className="text-center mt-4">
                        {/* RSVP CALLOUT BANNER */}
                        <Paper
                            elevation={0}
                            sx={{
                                p: { xs: 4, sm: 6 },
                                borderRadius: 6,
                                color: 'primary.contrastText',
                                bgcolor: 'primary.main',
                                textAlign: 'center',
                                position: 'relative'
                            }}
                        >
                            <Text
                                variant="caption"
                                sx={{ color: 'primary.contrastText', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}
                                textKey={CONTENT_WEDDING.FOOTER.TITLE}
                            />
                            
                            <Text
                                variant="h2"
                                sx={{ color: 'primary.contrastText', my: 2 }}
                                textKey={CONTENT_WEDDING.FOOTER.SUBTITLE}
                            />

                            <Text
                                variant="caption"
                                sx={{ color: 'primary.contrastText', display: 'block', mb: 4, letterSpacing: '0.05em' }}
                                textKey={CONTENT_WEDDING.FOOTER.TAGLINE}
                            />

                            <Button
                                component={RouterLink}
                                to="/rsvp"
                                variant="contained"
                                startIcon={<Send />}
                                sx={{
                                    bgcolor: 'background.paper',
                                    color: 'primary.main',
                                    borderRadius: '50px',
                                    px: 5,
                                    py: 1.5,
                                    fontFamily: '"Cormorant Garamond", serif',
                                    fontSize: '1rem',
                                    fontWeight: 700,
                                    letterSpacing: '0.1em',
                                    textTransform: 'uppercase',
                                    '&:hover': { bgcolor: 'secondary.main', color: 'secondary.contrastText' }
                                }}
                            >
                                {CONTENT.BUTTON_RSVP}
                            </Button>
                        </Paper>
                    </Box>
                </Container>
            </Box>
            <ViewMapModal 
                open={openViewMapModal} 
                handleClose={handleCloseViewMapModal} 
                defaultTab={mapModalTab} 
            />
        </React.Fragment>
    );
}