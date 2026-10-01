import * as React from 'react';
import { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    IconButton,
    Tabs,
    Tab,
    Stack,
    Paper,
    Button
} from '@mui/material';
import { Close, ContentCopy, Check, OpenInNew } from '@mui/icons-material';
import { CONTENT } from '../../utils/Constants';

export default function ViewMapModal({ open, handleClose, defaultTab = 'church' }) {
    const [mapTab, setMapTab] = useState(defaultTab);
    const [copiedAddress, setCopiedAddress] = useState(false);

    // Sync tab when modal opens or defaultTab changes
    useEffect(() => {
        if (open) {
            setMapTab(defaultTab);
            setCopiedAddress(false);
        }
    }, [open, defaultTab]);

    const handleCopyAddress = (address) => {
        navigator.clipboard.writeText(address);
        setCopiedAddress(true);
        setTimeout(() => setCopiedAddress(false), 2000);
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{ style: { borderRadius: 20 } }}
        >
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
                <Tabs
                    value={mapTab}
                    onChange={(e, val) => {
                        setMapTab(val);
                        setCopiedAddress(false);
                    }}
                    textColor="inherit"
                    TabIndicatorProps={{ style: { backgroundColor: '#7A1C31' } }}
                >
                    <Tab label="Church" value="church" sx={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 700 }} />
                    <Tab label="Reception" value="reception" sx={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 700 }} />
                </Tabs>
                <IconButton onClick={handleClose}>
                    <Close />
                </IconButton>
            </DialogTitle>

            <DialogContent dividers>
                {mapTab === 'church' ? (
                    <Stack spacing={2}>
                        <Typography variant="h5" sx={{ fontFamily: 'Cormorant Garamond, serif', color: '#7A1C31', fontWeight: 600 }}>
                            {CONTENT.TITLE_CHURCH}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#5E7A65' }}>{CONTENT.TITLE_CHURCH_ADDRESS}</Typography>
                        <Paper elevation={0} sx={{ p: 2, bgcolor: '#faf8f5', border: '1px solid rgba(212, 175, 55, 0.25)', borderRadius: 3 }}>
                            <Typography variant="body2" sx={{ mb: 1 }}><strong>Schedule:</strong> Assembly 9:30 AM | Ceremony 10:00 AM</Typography>
                            <Typography variant="body2"><strong>Parking:</strong> On-site parish parking available.</Typography>
                        </Paper>
                    </Stack>
                ) : (
                    <Stack spacing={2}>
                        <Typography variant="h5" sx={{ fontFamily: 'Cormorant Garamond, serif', color: '#7A1C31', fontWeight: 600 }}>
                            {CONTENT.TITLE_RECEPTION}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#5E7A65' }}>{CONTENT.TITLE_RECEPTION_ADDRESS}</Typography>
                        <Paper elevation={0} sx={{ p: 2, bgcolor: '#faf8f5', border: '1px solid rgba(212, 175, 55, 0.25)', borderRadius: 3 }}>
                            <Typography variant="body2" sx={{ mb: 1 }}><strong>Schedule:</strong> Cocktails 12:00 PM | Banquet 1:00 PM PST</Typography>
                            <Typography variant="body2"><strong>Note:</strong> Dedicated valet &amp; guest parking entrance.</Typography>
                        </Paper>
                    </Stack>
                )}
            </DialogContent>

            <DialogActions sx={{ p: 2.5 }}>
                <Button
                    startIcon={copiedAddress ? <Check /> : <ContentCopy />}
                    onClick={() => handleCopyAddress(mapTab === 'church' ? CONTENT.TITLE_CHURCH : CONTENT.TITLE_RECEPTION)}
                    sx={{ color: '#7A1C31' }}
                >
                    {copiedAddress ? 'Copied!' : 'Copy Address'}
                </Button>
                <Button
                    variant="contained"
                    endIcon={<OpenInNew />}
                    href={mapTab === 'church' ? 'https://maps.app.goo.gl/tmLKneFTiHy9P35h7' : 'https://maps.app.goo.gl/JZLukWRvemwTk1VR9'}
                    target="_blank"
                    sx={{ bgcolor: '#7A1C31', '&:hover': { bgcolor: '#8B263E', color: '#D9A6A4' } }}
                >
                    {CONTENT.BUTTON_VIEWMAP}
                </Button>
            </DialogActions>
        </Dialog>
    );
}