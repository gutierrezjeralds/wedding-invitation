import React, { useState, useEffect } from 'react';
import { Container, Stack, Paper, Box, Button, Tabs, Tab, Chip } from '@mui/material';
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
    const handleOpenViewMapModal = () => setOpenViewMapModal(true);
    const handleCloseViewMapModal = () => setOpenViewMapModal(false);

    return (
        <React.Fragment>
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
                                        color: 'text.secondary',
                                        '&.Mui-selected': {
                                            color: '#d4af37',
                                        },
                                    },
                                    '& .MuiTabs-indicator': {
                                        backgroundColor: '#d4af37',
                                        height: 3,
                                        borderRadius: '3px 3px 0 0',
                                    },
                                    /* STYLED SCROLL BUTTONS */
                                    '& .MuiTabScrollButton-root': {
                                        width: 32,
                                        height: 32,
                                        borderRadius: '50%',
                                        bgcolor: 'rgba(212, 175, 55, 0.15)',
                                        color: '#7A1C31',
                                        alignSelf: 'center',
                                        mx: 0.5,
                                        transition: 'all 0.2s ease',
                                        opacity: 0.9,
                                        '&:hover': {
                                            bgcolor: '#7A1C31',
                                            color: '#ffffff',
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
                                    flexDirection: { xs: 'column', md: 'row' }, // Vertical on mobile, strictly Horizontal side-by-side on desktop
                                    gap: 3,
                                    width: '100%',
                                    alignItems: 'stretch'
                                }}
                            >
                                {/* Ceremony Card */}
                                <Paper
                                    elevation={0}
                                    sx={{
                                        flex: { xs: '1 1 100%', md: '1 1 50%' }, // Force 50% width horizontal layout
                                        maxWidth: { xs: '100%', md: '50%' },     // Strictly prevent breaking into 100% width
                                        minWidth: 0,                             // Prevent long text from expanding container
                                        borderRadius: 6,
                                        overflow: 'hidden',
                                        bgcolor: 'rgba(255, 255, 255, 0.85)',
                                        border: '1px solid rgba(212, 175, 55, 0.3)',
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
                                                background: 'linear-gradient(to bottom, rgba(125, 157, 134, 0.15), #faf8f5)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                position: 'relative',
                                                borderBottom: '1px solid rgba(212, 175, 55, 0.15)'
                                            }}
                                        >
                                            <Church sx={{ fontSize: 80, color: '#5E7A65', opacity: 0.85 }} />
                                            <Chip
                                                label={CONTENT_WEDDING.TAB.VENUE_AND_LOCATION.CEREMONY}
                                                size="small"
                                                sx={{
                                                    position: 'absolute',
                                                    top: 16,
                                                    right: 16,
                                                    bgcolor: 'rgba(94, 122, 101, 0.1)',
                                                    color: '#5E7A65',
                                                    fontWeight: 700,
                                                    fontSize: '0.65rem',
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.1em'
                                                }}
                                            />
                                        </Box>

                                        <Box sx={{ p: { xs: 2.5, sm: 4 }, textAlign: 'center', width: '100%', minWidth: 0 }}>
                                            <Text
                                                variant="h4"
                                                className="cormorant-garamond-regular text-wedding-primary mb-1"
                                                textKey={CONTENT.TITLE_CHURCH}
                                            />
                                            <Text
                                                variant="body2"
                                                className="text-gold"
                                                textKey={CONTENT.TITLE_DATE_V2}
                                            />
                                            <Text
                                                variant="body1"
                                                className="py-4"
                                                textKey={CONTENT_WEDDING.TAB.VENUE_AND_LOCATION.CHURCH_TAGLINE}
                                            />

                                            <Chip
                                                icon={<Church fontSize="small" className="text-wedding-primary"/>}
                                                label={CONTENT.TITLE_CHURCH_ADDRESS}
                                                sx={{ 
                                                    bgcolor: '#fff', 
                                                    border: '1px solid rgba(212, 175, 55, 0.25)', 
                                                    color: '#5E7A65', 
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
                                            onClick={handleOpenViewMapModal}
                                            className="button-wedding-map cormorant-garamond-regular"
                                        >
                                            {CONTENT_WEDDING.TAB.VENUE_AND_LOCATION.MAP_INFO}
                                        </Button>
                                    </Box>
                                </Paper>

                                {/* Reception Card */}
                                <Paper
                                    elevation={0}
                                    sx={{
                                        flex: { xs: '1 1 100%', md: '1 1 50%' }, // Force 50% width horizontal layout
                                        maxWidth: { xs: '100%', md: '50%' },     // Strictly prevent breaking into 100% width
                                        minWidth: 0,                             // Prevent long text from expanding container
                                        borderRadius: 6,
                                        overflow: 'hidden',
                                        bgcolor: 'rgba(255, 255, 255, 0.85)',
                                        border: '1px solid rgba(212, 175, 55, 0.3)',
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
                                                background: 'linear-gradient(to bottom, rgba(212, 175, 55, 0.15), #faf8f5)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                position: 'relative',
                                                borderBottom: '1px solid rgba(212, 175, 55, 0.15)'
                                            }}
                                        >
                                            <WineBar sx={{ fontSize: 80, color: '#d4af37', opacity: 0.85 }} />
                                            <Chip
                                                label={CONTENT_WEDDING.TAB.VENUE_AND_LOCATION.RECEPTION}
                                                size="small"
                                                sx={{
                                                    position: 'absolute',
                                                    top: 16,
                                                    right: 16,
                                                    bgcolor: 'rgba(212, 175, 55, 0.15)',
                                                    color: '#8B6E10',
                                                    fontWeight: 700,
                                                    fontSize: '0.65rem',
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.1em'
                                                }}
                                            />
                                        </Box>

                                        <Box sx={{ p: { xs: 2.5, sm: 4 }, textAlign: 'center', width: '100%', minWidth: 0 }}>
                                            <Text
                                                variant="h4"
                                                className="cormorant-garamond-regular text-wedding-primary mb-1"
                                                textKey={CONTENT.TITLE_RECEPTION}
                                            />
                                            <Text
                                                variant="body2"
                                                className="text-gold"
                                                textKey={CONTENT.TITLE_DATE_V4}
                                            />
                                            <Text
                                                variant="body1"
                                                className="py-4"
                                                textKey={CONTENT_WEDDING.TAB.VENUE_AND_LOCATION.RECEPTION_TAGLINE}
                                            />

                                            <Chip
                                                icon={<Church fontSize="small" className="text-wedding-primary"/>}
                                                label={CONTENT.TITLE_RECEPTION_ADDRESS}
                                                sx={{ 
                                                    bgcolor: '#fff', 
                                                    border: '1px solid rgba(212, 175, 55, 0.25)', 
                                                    color: '#5E7A65', 
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
                                            onClick={handleOpenViewMapModal}
                                            className="button-wedding-map cormorant-garamond-regular"
                                        >
                                            {CONTENT_WEDDING.TAB.VENUE_AND_LOCATION.MAP_INFO}
                                        </Button>
                                    </Box>
                                </Paper>
                            </Box>
                        </TabPanel>

                        {/* TAB 2: DAY SCHEDULE */}
                        <TabPanel value={tabValue} index={1}>
                            <Paper elevation={0} sx={{ p: { xs: 3, sm: 5 }, borderRadius: 6, bgcolor: 'rgba(255, 255, 255, 0.85)', border: '1px solid rgba(212, 175, 55, 0.25)' }}>
                                <Box className="text-center mb-3">
                                    <Text
                                        variant="caption"
                                        letterSpacing="widest"
                                        className="text-uppercase fw-bold"
                                        textKey={CONTENT_WEDDING.TIMELINE_SUBTITLE}
                                    />
                                    <Text
                                        variant="h4"
                                        className="cormorant-garamond-regular fw-bold mt-1"
                                        textKey={CONTENT_WEDDING.TIMELINE_TITLE}
                                    />
                                </Box>
                    
                                <Stack spacing={3} sx={{ position: 'relative', pl: { xs: 2, sm: 4 } }}>
                                    <Box sx={{ position: 'absolute', top: 27, bottom: 10, left: { xs: 11, sm: 20 }, width: 2, bgcolor: 'rgba(212, 175, 55, 0.4)' }} />
                    
                                    {CONTENT_WEDDING.TIMELINE_BODY.map((evt, idx) => {
                                        const IconComp = evt.ICON;
                                        return (
                                            <Paper
                                                key={idx}
                                                elevation={0}
                                                sx={{
                                                    p: 3,
                                                    borderRadius: 4,
                                                    border: '1px solid rgba(212, 175, 55, 0.25)',
                                                    bgcolor: '#fff',
                                                    transition: 'all 0.3s ease',
                                                    position: 'relative',
                                                    ml: { xs: 2, sm: 4 },
                                                    '&:hover': { borderColor: '#d4af37', boxShadow: '0 6px 18px rgba(0,0,0,0.06)' }
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
                                                        bgcolor: '#7A1C31',
                                                        border: '3px solid #d4af37'
                                                    }}
                                                />
                            
                                                <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} spacing={1} sx={{ mb: 1 }}>
                                                    <Stack direction="row" alignItems="center" spacing={1.5}>
                                                    <IconComp fontSize='small' className='text-wedding-primary' />
                                                    <Text
                                                        variant="h6"
                                                        className="cormorant-garamond-regular text-wedding-primary"
                                                        sx={{ mt: "-6px !important" }}
                                                        textKey={evt.TITLE}
                                                    />
                                                    </Stack>
                                                    {
                                                        evt.TIME ? 
                                                            <Chip
                                                                label={evt.TIME}
                                                                size="small"
                                                                className='fs-8'
                                                                sx={{
                                                                    bgcolor: 'rgba(212, 175, 55, 0.15)',
                                                                    color: '#8B6E10',
                                                                    fontWeight: 700,
                                                                    mt: "-2px !important"
                                                                }}
                                                            />
                                                        : ""
                                                    }
                                                </Stack>
                                                <Text
                                                    className="fw-bold fs-8 mb-1"
                                                    textKey={`📍 ${evt.LOCATION}`}
                                                />
                                                <Text
                                                    variant="body2"
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
                            className="background-wedding-primary text-center position-relative"
                            sx={{
                                p: { xs: 4, sm: 6 },
                                borderRadius: 6,
                                color: '#fff',
                            }}
                        >
                            <Text
                                variant="caption"
                                className="text-uppercase fw-bold"
                                letterSpacing="widest"
                                textKey={CONTENT_WEDDING.FOOTER.TITLE}
                            />
                            <Text
                                className="cormorant-garamond-regular fs-2 my-3"
                                letterSpacing="wide"
                                textKey={CONTENT_WEDDING.FOOTER.SUBTITLE}
                            />
                            <Text
                                variant="caption"
                                letterSpacing="wide"
                                className="d-block mb-4"
                                textKey={CONTENT_WEDDING.FOOTER.TAGLINE}
                            />

                            <Button
                                variant="contained"
                                startIcon={<Send />}
                                onClick={() => setActiveModal('rsvp')}
                                sx={{
                                    bgcolor: '#D9A6A4',
                                    color: '#3D3A37',
                                    borderRadius: '50px',
                                    px: 5,
                                    py: 1.5,
                                    fontFamily: 'Cormorant Garamond, serif',
                                    fontSize: '1rem',
                                    fontWeight: 700,
                                    letterSpacing: '0.1em',
                                    textTransform: 'uppercase',
                                    '&:hover': { bgcolor: '#fff', color: '#7A1C31' }
                                }}
                            >
                                {CONTENT.BUTTON_RSVP}
                            </Button>
                        </Paper>
                    </Box>
                </Container>
            </Box>
            <ViewMapModal open={openViewMapModal} handleClose={handleCloseViewMapModal} />
        </React.Fragment>
    );
}