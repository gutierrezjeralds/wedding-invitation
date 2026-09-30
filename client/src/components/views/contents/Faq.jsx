import React, { useState, useMemo } from 'react';
import {
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Paper,
  TextField,
  Chip,
  InputAdornment,
  Avatar,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Typography
} from '@mui/material';
import { ExpandMore, Search, Clear, QuestionMark, ContactSupport, CheckCircle, ContentCopy } from '@mui/icons-material';
import { Text } from '../utils/CustomComponents';
import { CONTENT_FAQ } from '../utils/Constants';

export default function Faq() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [expandedPanel, setExpandedPanel] = useState(false);
    const [copiedId, setCopiedId] = useState(null);

    // 1. Fetch categories directly from CONTENT_FAQ
    const faqCategories = CONTENT_FAQ.CATEGORIES || [];

    // 2. Fetch FAQ data directly from CONTENT_FAQ
    const faqData = CONTENT_FAQ.DATA || [];

    // Clear search when switching categories
    const handleCategoryChange = (categoryId) => {
        setSelectedCategory(categoryId);
        setSearchQuery('');
    };

    // 3. Filter FAQs based on active category & search query
    const filteredFaqs = useMemo(() => {
        return faqData.filter((item) => {
            const matchesCategory = selectedCategory === 'all' || item.CATEGORY === selectedCategory;
            const matchesSearch =
                item.QUESTION.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.ANSWER.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [faqData, selectedCategory, searchQuery]);

    const handleAccordionToggle = (panelId) => (event, isExpanded) => {
        setExpandedPanel(isExpanded ? panelId : false);
    };

    const handleCopyLink = (faq) => {
        // Strip HTML tags when copying answer text to clipboard
        const cleanAnswer = faq.ANSWER.replace(/<[^>]*>?/gm, '');
        navigator.clipboard.writeText(`${faq.QUESTION}\n${cleanAnswer}`);
        setCopiedId(faq.ID);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <React.Fragment>
            <Box>
                <Container maxWidth="lg" className="py-5">
                    {/* Header Banner */}
                    <Paper
                        elevation={0}
                        sx={{
                            p: { xs: 3, md: 5 },
                            mb: 4,
                            textAlign: 'center',
                            bgcolor: '#F4EFEA',
                            border: '1px solid #E5E0DA',
                            borderRadius: 4,
                        }}
                    >
                        <Avatar
                            sx={{
                                bgcolor: 'primary.main',
                                mx: 'auto',
                                mb: 2,
                                width: 56,
                                height: 56,
                            }}
                        >
                            <QuestionMark />
                        </Avatar>
                        <Text
                            variant="h3"
                            color="primary"
                            gutterBottom
                            textKey={CONTENT_FAQ.TITLE}
                        />
                        <Text
                            color="text.secondary"
                            sx={{ maxWidth: 600, mx: 'auto' }}
                            textKey={CONTENT_FAQ.SUBTITLE}
                        />

                        {/* Search Bar */}
                        <Box sx={{ mt: 3, maxWidth: 500, mx: 'auto' }}>
                            <TextField
                                fullWidth
                                placeholder={CONTENT_FAQ.SEARCH_PLACEHOLDER}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Search color="action" />
                                        </InputAdornment>
                                    ),
                                    endAdornment: searchQuery && (
                                        <InputAdornment position="end">
                                            <IconButton size="small" onClick={() => setSearchQuery('')}>
                                                <Clear fontSize="small" />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    bgcolor: 'background.paper',
                                    borderRadius: 3,
                                    '& fieldset': { border: '1px solid #D1C7BD' },
                                }}
                            />
                        </Box>
                    </Paper>

                    {/* Category Tabs */}
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 1,
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            mb: 4,
                        }}
                    >
                        {faqCategories.map((cat) => (
                            <Chip
                                key={cat.ID}
                                label={cat.LABEL}
                                clickable
                                color={selectedCategory === cat.ID ? 'primary' : 'default'}
                                variant={selectedCategory === cat.ID ? 'filled' : 'outlined'}
                                onClick={() => handleCategoryChange(cat.ID)}
                                sx={{
                                    fontWeight: 600,
                                    px: 1,
                                    py: 2,
                                    borderRadius: 2,
                                }}
                            />
                        ))}
                    </Box>

                    {/* Accordion List */}
                    {filteredFaqs.length > 0 ? (
                        filteredFaqs.map((faq) => (
                            <Accordion
                                key={faq.ID}
                                expanded={expandedPanel === `panel${faq.ID}`}
                                onChange={handleAccordionToggle(`panel${faq.ID}`)}
                                elevation={1}
                                sx={{
                                    mb: 2,
                                    borderRadius: '12px !important',
                                    overflow: 'hidden',
                                    border: '1px solid #EAE3DC',
                                    '&:before': { display: 'none' },
                                    transition: '0.2s',
                                    '&:hover': {
                                        borderColor: 'primary.main',
                                    },
                                }}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMore color="primary" />}
                                    sx={{ py: 1, px: 3 }}
                                >
                                    <Text
                                        variant="h6"
                                        sx={{ color: 'text.primary', fontSize: '1.1rem' }}
                                    >
                                        {faq.QUESTION}
                                    </Text>
                                </AccordionSummary>
                                <AccordionDetails sx={{ px: 3, pb: 3, pt: 0, bgcolor: '#FAF9F7' }}>
                                    {/* Direct rendering for HTML string in answer */}
                                    <Typography
                                        variant="body1"
                                        color="text.secondary"
                                        sx={{ lineHeight: 1.7, whiteSpace: 'pre-line', pt: 2 }}
                                        dangerouslySetInnerHTML={{ __html: faq.ANSWER }}
                                    />

                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                                        <Tooltip title={copiedId === faq.ID ? "Copied!" : "Copy Answer"}>
                                            <IconButton
                                                size="small"
                                                onClick={() => handleCopyLink(faq)}
                                                color={copiedId === faq.ID ? "success" : "default"}
                                            >
                                                {copiedId === faq.ID ? <CheckCircle fontSize="small" /> : <ContentCopy fontSize="small" />}
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                        ))
                    ) : (
                        <Paper elevation={0} sx={{ p: 4, textAlign: 'center', borderRadius: 3, border: '1px dashed #CCC' }}>
                            <Typography color="text.secondary">
                                {CONTENT_FAQ.SEARCH_NOMATCH?.replace('{{0}}', searchQuery) || `No matching questions found for '${searchQuery}'.`}
                            </Typography>
                        </Paper>
                    )}

                    {/* Help Contact Card */}
                    <Card elevation={2} sx={{ mt: 5, p: 3, textAlign: 'center', bgcolor: '#FFFFFF', borderRadius: 4 }}>
                        <CardContent>
                            <ContactSupport color="primary" sx={{ fontSize: 40, mb: 1 }} />
                            <Text
                                variant="h5"
                                color="primary"
                                gutterBottom
                                textKey={CONTENT_FAQ.STILL_QUESTION}
                            />
                            <Text
                                color="text.secondary"
                                paragraph
                                textKey={CONTENT_FAQ.CANT_FIND}
                            />
                        </CardContent>
                    </Card>
                </Container>
            </Box>
        </React.Fragment>
    );
}