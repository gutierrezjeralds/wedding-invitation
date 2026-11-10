import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Box, Link } from '@mui/material';
import { Text, FavoriteDividerSmall } from '../utils/CustomComponents';
import GlobalButterflies from '../utils/GlobalButterfliesAnimation';
import { useMedia } from '../utils/MediaContext';
import { useContent } from '../utils/ConstantContent';

export default function Envelope() {
    // Retrieval from context cache
    const { getPageContent } = useContent();
    const CONTENT = getPageContent('global');
    const CONTENT_ENVELOPE = getPageContent('envelope');

    // Mongoose Assets
    const { getAsset } = useMedia();
    const sPageBackgroundDesktop = getAsset('envelope', 'background', 'desktop');
    const sPageBackgroundMobile = getAsset('envelope', 'background', 'mobile');
    const sPageEnvelope = getAsset('envelope', 'envelope');

    return (
        <React.Fragment>
            <GlobalButterflies primary="#d71128" secondary="#F8C8DC" />

            <Box
                className="page-background"
                sx={{
                    '--bg-desktop': `url(${sPageBackgroundDesktop})`,
                    '--bg-mobile': `url(${sPageBackgroundMobile})`,
                    // Fallback background color if images fail to load or are empty
                    backgroundColor: '#faf8f5',
                }}
            >
                <Container maxWidth="lg" className="py-5">
                    <Box className="text-center" sx={{mt: {xs: 20, sm: 5}}}>
                        <Text
                            letterSpacing="wide"
                            variant="body1"
                            textKey={CONTENT_ENVELOPE.YOURINVITED}
                        />

                        <Text
                            letterSpacing="wide"
                            variant="caption"
                            className="fst-italic"
                            textKey={CONTENT_ENVELOPE.TOCELEBRATE}
                        />

                        <Text
                            variant="h1"
                            className="my-4"
                            textKey={CONTENT.TITLE_NAME}
                        />

                        <FavoriteDividerSmall />

                        <Text
                            variant="caption"
                            className="mt-5"
                            textKey={CONTENT.WEDDING_DATE}
                            dateFormat="dddd, MMMM DD, YYYY [at] hh:mm A"
                        />

                        <Text
                            variant="body1"
                            className="text-uppercase"
                            textKey={CONTENT.TITLE_CHURCH}
                        />
                    </Box>

                    <Box className="text-center">
                        <Link component={RouterLink} to="/cover">
                            <Box
                                component="img"
                                src={sPageEnvelope}
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
                            variant="caption"
                            className="fst-normal"
                            sx={{mt: "-35px", mb: "-20px"}}
                            textKey={CONTENT_ENVELOPE.WAXSEAL}
                        />
                    </Box>

                    <Box className="text-center" sx={{mb: {xs: 30, sm: 5}}}>
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