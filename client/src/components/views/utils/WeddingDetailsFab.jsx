import React from 'react';
import { Box, Fab, Tooltip } from '@mui/material';
import { PictureAsPdf } from '@mui/icons-material';
import { useContent } from '../utils/ConstantContent';
import { downloadWeddingDetailsPdf } from '../utils/GenerateWeddingPdf';

export default function WeddingDetailsFab({ isAdminPath = false }) {
    const { getPageContent } = useContent();
    const CONTENT = getPageContent('global');
    const CONTENT_ENTOURAGE = getPageContent('entourage');

    // Hide on admin routes
    if (isAdminPath) {
        return null;
    }

    const handleDownload = () => {
        downloadWeddingDetailsPdf(CONTENT, CONTENT_ENTOURAGE);
    };

    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: 16,
                right: 60, // Positioned right next to the music widget
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <Tooltip title="Download Wedding Details PDF" placement="top">
                <Fab
                    color="primary"
                    size="small"
                    onClick={handleDownload}
                    aria-label="download wedding details pdf"
                    sx={{
                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                        bgcolor: 'primary.main',
                        width: 28,
                        height: 28,
                        minHeight: 28,
                        '&:hover': {
                            bgcolor: 'secondary.main',
                        },
                        '& .MuiSvgIcon-root': {
                            fontSize: '0.9rem',
                        },
                    }}
                >
                    <PictureAsPdf />
                </Fab>
            </Tooltip>
        </Box>
    );
}