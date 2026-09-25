import React, { useState, useMemo } from 'react';
import { useTranslation, Trans } from 'react-i18next';
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
  Button,
  Divider,
  Avatar,
  Card,
  CardContent,
  IconButton,
  Tooltip
} from '@mui/material';
import { ExpandMore, Search, Clear, QuestionMark, ContactSupport, CheckCircle , ContentCopy} from '@mui/icons-material';
import { Text } from '../utils/CustomComponents';

export default function WeddingFAQ() {
    const { t: oI18n } = useTranslation();

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [expandedPanel, setExpandedPanel] = useState(false);
    const [copiedId, setCopiedId] = useState(null);

    // Fetch dynamic categories from JSON
    const faqCategories = useMemo(() => {
        const categories = oI18n('page_faq_categories', { returnObjects: true });
        return Array.isArray(categories) ? categories : [];
    }, [oI18n]);

    // 1. Fetch the FAQ array dynamically from i18n
    const faqData = useMemo(() => {
        const rawFaqs = oI18n('page_faq_data', { returnObjects: true });
        // Fallback safety check in case the key fails to load or isn't an array
        return Array.isArray(rawFaqs) ? rawFaqs : [];
    }, [oI18n]);

    // 2. Clear search when switching tabs
    const handleCategoryChange = (categoryId) => {
        setSelectedCategory(categoryId);
        setSearchQuery('');
    };

    // 3. Filter FAQs based on active category & search query
    const filteredFaqs = useMemo(() => {
        return faqData.filter((item) => {
            const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
            const matchesSearch =
                item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.answer.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [faqData, selectedCategory, searchQuery]);

    const handleAccordionToggle = (panelId) => (event, isExpanded) => {
        setExpandedPanel(isExpanded ? panelId : false);
    };

    const handleCopyLink = (faq) => {
        navigator.clipboard.writeText(`${faq.question} - ${faq.answer}`);
        setCopiedId(faq.id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <React.Fragment>
            <Box className="bg-vintage">
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
                            i18nKey="page_faq_title"
                        />
                        <Text
                            color="text.secondary"
                            sx={{ maxWidth: 600, mx: 'auto' }}
                            i18nKey="page_faq_subtitle"
                        />

                        {/* Search Bar */}
                        <Box sx={{ mt: 3, maxWidth: 500, mx: 'auto' }}>
                            <TextField
                                fullWidth
                                placeholder={oI18n("page_faq_search_placeholder")}
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
                                key={cat.id}
                                label={cat.label}
                                clickable
                                color={selectedCategory === cat.id ? 'primary' : 'default'}
                                variant={selectedCategory === cat.id ? 'filled' : 'outlined'}
                                onClick={() => handleCategoryChange(cat.id)} // ✅ Updated here
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
                                key={faq.id}
                                expanded={expandedPanel === `panel${faq.id}`}
                                onChange={handleAccordionToggle(`panel${faq.id}`)}
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
                                        i18nKey={faq.question}
                                    />
                                </AccordionSummary>
                                <AccordionDetails sx={{ px: 3, pb: 3, pt: 0, bgcolor: '#FAF9F7' }}>
                                    <Divider sx={{ mb: 2 }} />
                                    <Text
                                        variant="body1"
                                        color="text.secondary"
                                        sx={{ lineHeight: 1.7 }}
                                        i18nKey={faq.answer}
                                    />

                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                                        <Tooltip title={copiedId === faq.id ? "Copied!" : "Copy Answer"}>
                                            <IconButton
                                                size="small"
                                                onClick={() => handleCopyLink(faq)}
                                                color={copiedId === faq.id ? "success" : "default"}
                                            >
                                                {copiedId === faq.id ? <CheckCircle fontSize="small" /> : <ContentCopy fontSize="small" />}
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                        ))
                    ) : (
                        <Paper elevation={0} sx={{ p: 4, textAlign: 'center', borderRadius: 3, border: '1px dashed #CCC' }}>
                            <Text
                                color="text.secondary"
                                i18nKey="page_faq_search_nomatch"
                                values={[searchQuery]}
                            />
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
                                i18nKey="page_faq_still_question"
                            />
                            <Text
                                color="text.secondary"
                                paragraph
                                i18nKey="page_faq_cant_find"
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                href="mailto:jeraldandsheila@gmail.com"
                                sx={{ borderRadius: 3, px: 4, mt: 2 }}
                            >
                                {oI18n("page_faq_button_send")}
                            </Button>
                        </CardContent>
                    </Card>
                </Container>
            </Box>
        </React.Fragment>
    );
}