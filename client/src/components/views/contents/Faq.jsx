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
  Tooltip
} from '@mui/material';
import { ExpandMore, Search, Clear, QuestionMark, ContactSupport, CheckCircle, ContentCopy } from '@mui/icons-material';
import { Text } from '../utils/CustomComponents';
import { CONTENT_FAQ } from '../utils/Constants';

export default function Faq() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [expandedPanel, setExpandedPanel] = useState(false);
    const [copiedId, setCopiedId] = useState(null);

    // Fetch categories and FAQ data directly from CONTENT_FAQ
    const faqCategories = CONTENT_FAQ.CATEGORIES || [];
    const faqData = CONTENT_FAQ.DATA || [];

    // Clear search when switching categories
    const handleCategoryChange = (categoryId) => {
        setSelectedCategory(categoryId);
        setSearchQuery('');
    };

    // Filter FAQs based on active category & search query
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
            <Box sx={{ bgcolor: 'background.default' }}>
                <Container maxWidth="lg" className="py-5">
                    {/* Header Banner */}
                    <Paper
                        elevation={0}
                        sx={{
                            p: { xs: 3, md: 5 },
                            mb: 4,
                            textAlign: 'center',
                            bgcolor: 'background.paper',
                            border: '1px solid rgba(107, 29, 47, 0.15)',
                            borderRadius: 4,
                        }}
                    >
                        <Avatar
                            sx={{
                                bgcolor: 'primary.main',
                                color: 'primary.contrastText',
                                mx: 'auto',
                                mb: 2,
                                width: 56,
                                height: 56,
                            }}
                        >
                            <QuestionMark />
                        </Avatar>
                        
                        <Text
                            variant="h2"
                            sx={{ color: 'primary.main', mb: 1, display: 'block' }}
                            textKey={CONTENT_FAQ.TITLE}
                        />
                        
                        <Text
                            variant="caption"
                            sx={{ maxWidth: 600, mx: 'auto', display: 'block', color: 'text.secondary' }}
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
                                            <Search sx={{ color: 'primary.main' }} />
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
                                    bgcolor: 'background.default',
                                    borderRadius: 3,
                                    '& fieldset': { border: '1px solid rgba(107, 29, 47, 0.2)' },
                                    '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                                        borderColor: 'primary.main',
                                    }
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
                        {faqCategories.map((cat) => {
                            const isSelected = selectedCategory === cat.ID;
                            return (
                                <Chip
                                    key={cat.ID}
                                    label={cat.LABEL}
                                    clickable
                                    onClick={() => handleCategoryChange(cat.ID)}
                                    sx={{
                                        fontWeight: 600,
                                        px: 1,
                                        py: 2,
                                        borderRadius: 2,
                                        bgcolor: isSelected ? 'primary.main' : 'background.paper',
                                        color: isSelected ? 'primary.contrastText' : 'text.primary',
                                        border: isSelected ? 'none' : '1px solid rgba(107, 29, 47, 0.2)',
                                        '&:hover': {
                                            bgcolor: isSelected ? 'primary.main' : 'rgba(107, 29, 47, 0.08)',
                                        }
                                    }}
                                />
                            );
                        })}
                    </Box>

                    {/* Accordion List */}
                    {filteredFaqs.length > 0 ? (
                        filteredFaqs.map((faq) => (
                            <Accordion
                                key={faq.ID}
                                expanded={expandedPanel === `panel${faq.ID}`}
                                onChange={handleAccordionToggle(`panel${faq.ID}`)}
                                elevation={0}
                                sx={{
                                    mb: 2,
                                    borderRadius: '12px !important',
                                    overflow: 'hidden',
                                    bgcolor: 'background.paper',
                                    border: '1px solid rgba(107, 29, 47, 0.15)',
                                    '&:before': { display: 'none' },
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                        borderColor: 'primary.main',
                                        boxShadow: '0 4px 12px rgba(107, 29, 47, 0.06)'
                                    },
                                }}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMore sx={{ color: 'primary.main' }} />}
                                    sx={{ py: 1, px: 3 }}
                                >
                                    <Text
                                        variant="h6"
                                        sx={{ color: 'primary.main', fontSize: '1.1rem' }}
                                    >
                                        {faq.QUESTION}
                                    </Text>
                                </AccordionSummary>
                                
                                <AccordionDetails sx={{ px: 3, pb: 3, pt: 0, bgcolor: 'background.default' }}>
                                    {/* Direct rendering for HTML string in answer */}
                                    <Text
                                        variant="body1"
                                        sx={{ lineHeight: 1.7, whiteSpace: 'pre-line', pt: 2, display: 'block' }}
                                        dangerouslySetInnerHTML={{ __html: faq.ANSWER }}
                                    />

                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                                        <Tooltip title={copiedId === faq.ID ? "Copied!" : "Copy Answer"}>
                                            <IconButton
                                                size="small"
                                                onClick={() => handleCopyLink(faq)}
                                                sx={{ color: copiedId === faq.ID ? 'success.main' : 'primary.main' }}
                                            >
                                                {copiedId === faq.ID ? <CheckCircle fontSize="small" /> : <ContentCopy fontSize="small" />}
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                        ))
                    ) : (
                        <Paper 
                            elevation={0} 
                            sx={{ 
                                p: 4, 
                                textAlign: 'center', 
                                borderRadius: 3, 
                                bgcolor: 'background.paper',
                                border: '1px dashed rgba(107, 29, 47, 0.3)' 
                            }}
                        >
                            <Text
                                variant="body1"
                                sx={{ color: 'text.secondary' }}
                                textKey={CONTENT_FAQ.SEARCH_NOMATCH?.replace('{{0}}', searchQuery) || `No matching questions found for '${searchQuery}'.`}
                            />
                        </Paper>
                    )}

                    {/* Help Contact Card */}
                    <Card 
                        elevation={0} 
                        sx={{ 
                            mt: 5, 
                            p: 3, 
                            textAlign: 'center', 
                            bgcolor: 'background.paper', 
                            borderRadius: 4,
                            border: '1px solid rgba(107, 29, 47, 0.15)' 
                        }}
                    >
                        <CardContent>
                            <ContactSupport sx={{ color: 'primary.main', fontSize: 40, mb: 1 }} />
                            <Text
                                variant="h5"
                                sx={{ color: 'secondary.main', mb: 1, display: 'block' }}
                                textKey={CONTENT_FAQ.STILL_QUESTION}
                            />
                            <Text
                                variant="body1"
                                sx={{ color: 'text.primary', display: 'block' }}
                                textKey={CONTENT_FAQ.CANT_FIND}
                            />
                        </CardContent>
                    </Card>
                </Container>
            </Box>
        </React.Fragment>
    );
}