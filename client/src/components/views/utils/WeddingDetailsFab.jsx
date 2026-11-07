import React from 'react';
import { Box, Fab, Tooltip } from '@mui/material';
import { PictureAsPdf } from '@mui/icons-material';
import { useContent } from '../utils/ConstantContent';
import { downloadWeddingDetailsPdf } from '../utils/GenerateWeddingPdf';

export default function WeddingDetailsFab({ isAdminPath = false, hasMusic = false }) {
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
                bottom: hasMusic ? 74 : 16, 
                right: 16,  
                zIndex: 9999,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transition: 'bottom 0.3s ease-in-out', // Smooth transition if toggled
            }}
        >
            <Tooltip title="Download Wedding Details PDF" placement="left">
                <Fab
                    color="primary"
                    size="large"
                    onClick={handleDownload}
                    aria-label="download wedding details pdf"
                    sx={{
                        boxShadow: '0 4px 15px rgba(107, 29, 47, 0.4)',
                        bgcolor: 'primary.main',
                        width: 44,
                        height: 44,
                        minHeight: 44,
                        animation: 'continuousBounce 2s infinite ease-in-out',
                        '@keyframes continuousBounce': {
                            '0%, 100%': {
                                transform: 'translateY(0) scale(1)',
                                boxShadow: '0 4px 12px rgba(107, 29, 47, 0.3)',
                            },
                            '50%': {
                                transform: 'translateY(-6px) scale(1.08)',
                                boxShadow: '0 8px 20px rgba(107, 29, 47, 0.6)',
                            },
                        },
                        '&:hover': {
                            bgcolor: 'secondary.main',
                            transform: 'scale(1.15)',
                        },
                        '& .MuiSvgIcon-root': {
                            fontSize: '1.4rem',
                        },
                    }}
                >
                    <PictureAsPdf />
                </Fab>
            </Tooltip>
        </Box>
    );
}