import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
  Stack,
  Divider,
  Chip,
  InputAdornment,
  Snackbar,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton
} from '@mui/material';
import {
  Save,
  Refresh,
  EditNote,
  Search,
  CheckCircle,
  ExpandMore,
  FolderOpen,
  Add,
  Delete
} from '@mui/icons-material';

// Import static constants as defaults / fallbacks
import {
  CONTENT as STATIC_CONTENT,
  CONTENT_FOOTER as STATIC_FOOTER,
  CONTENT_ENVELOPE as STATIC_ENVELOPE,
  CONTENT_HOME as STATIC_HOME,
  CONTENT_STORY as STATIC_STORY,
  CONTENT_WEDDING as STATIC_WEDDING,
  CONTENT_ENTOURAGE as STATIC_ENTOURAGE,
  CONTENT_ATTIRE as STATIC_ATTIRE,
  CONTENT_FAQ as STATIC_FAQ,
  CONTENT_GIFT as STATIC_GIFT,
  CONTENT_PROPOSAL as STATIC_PROPOSAL,
} from '../../utils/Constants';

const PAGE_OPTIONS = [
  { key: 'global', label: 'Global Info (CONTENT)', defaultData: STATIC_CONTENT },
  { key: 'footer', label: 'Footer (CONTENT_FOOTER)', defaultData: STATIC_FOOTER },
  { key: 'envelope', label: 'Envelope (CONTENT_ENVELOPE)', defaultData: STATIC_ENVELOPE },
  { key: 'home', label: 'Home Page (CONTENT_HOME)', defaultData: STATIC_HOME },
  { key: 'story', label: 'Story Page (CONTENT_STORY)', defaultData: STATIC_STORY },
  { key: 'wedding', label: 'Wedding Page (CONTENT_WEDDING)', defaultData: STATIC_WEDDING },
  { key: 'entourage', label: 'Entourage (CONTENT_ENTOURAGE)', defaultData: STATIC_ENTOURAGE },
  { key: 'attire', label: 'Attire Guide (CONTENT_ATTIRE)', defaultData: STATIC_ATTIRE },
  { key: 'faq', label: 'FAQ Page (CONTENT_FAQ)', defaultData: STATIC_FAQ },
  { key: 'gift', label: 'Gifts & Registry (CONTENT_GIFT)', defaultData: STATIC_GIFT },
  { key: 'proposal', label: 'Proposals (CONTENT_PROPOSAL)', defaultData: STATIC_PROPOSAL },
];

/**
 * RECURSIVE SUB-COMPONENT SUPPORTING DYNAMIC ARRAYS, OBJECTS, & ID-BASED DICTIONARIES
 */
function NestedFieldEditor({ data, path = '', onChange, onAddItem, onDeleteItem, onAddKey }) {
  if (data === null || data === undefined) return null;

  // 1. Primitive Leaf Node (String or Number) - Converted to Textarea
  if (typeof data === 'string' || typeof data === 'number') {
    return (
      <TextField
        fullWidth
        value={data}
        onChange={(e) => onChange(path, e.target.value)}
        multiline
        rows={3}
        variant="outlined"
        size="small"
        placeholder="Enter value..."
        sx={{
          display: 'block',
          width: '100%',
          my: 1,
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            bgcolor: '#ffffff',
            display: 'block',
            width: '100%',
          },
          '& .MuiInputBase-input': {
            display: 'block',
            width: '100%',
          }
        }}
      />
    );
  }

  // 2. Array Handling with Dynamic Add/Remove
  if (Array.isArray(data)) {
    return (
      <Stack spacing={2} sx={{ width: '100%', pl: { xs: 1, sm: 2 }, borderLeft: '3px solid rgba(107, 29, 47, 0.2)', my: 1.5 }}>
        {data.map((item, index) => {
          const currentPath = path ? `${path}[${index}]` : `[${index}]`;
          return (
            <Card
              key={index}
              elevation={0}
              sx={{
                border: '1px solid rgba(107, 29, 47, 0.15)',
                borderRadius: 3,
                bgcolor: 'background.default',
                width: '100%',
                display: 'block',
                position: 'relative'
              }}
            >
              <CardContent sx={{ p: 2.5, width: '100%', display: 'block', '&:last-child': { pb: 2.5 } }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: 'secondary.main', textTransform: 'uppercase' }}>
                    Item #{index + 1}
                  </Typography>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => onDeleteItem(path, index)}
                    title="Delete item"
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </Stack>
                <NestedFieldEditor
                  data={item}
                  path={currentPath}
                  onChange={onChange}
                  onAddItem={onAddItem}
                  onDeleteItem={onDeleteItem}
                  onAddKey={onAddKey}
                />
              </CardContent>
            </Card>
          );
        })}

        <Button
          variant="outlined"
          size="small"
          startIcon={<Add />}
          onClick={() => onAddItem(path, data)}
          sx={{ alignSelf: 'flex-start', borderRadius: 2, textTransform: 'none', mt: 1 }}
        >
          Add New Item
        </Button>
      </Stack>
    );
  }

  // 3. Nested Object / Dictionary Handling
  if (typeof data === 'object') {
    const isLetterDict = path.endsWith('LETTER');

    return (
      <Stack spacing={2} sx={{ width: '100%', my: 1 }}>
        {Object.entries(data).map(([key, value]) => {
          // Exclude render functions or react element markers
          if (typeof value === 'function' || (typeof value === 'object' && value?.render)) return null;

          const currentPath = path ? `${path}.${key}` : key;
          const isComplex = typeof value === 'object' && value !== null;

          // Special handling for ICON fields to allow typing MUI Icon names as a textarea
          if (key === 'ICON') {
            const iconName = typeof value === 'function' ? value.name || 'CustomIcon' : value;
            return (
              <Box key={key} sx={{ width: '100%', display: 'block', mb: 1.5 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: 'primary.main', display: 'block', mb: 0.5, letterSpacing: '0.05em' }}>
                  {key.replace(/_/g, ' ')} (MUI Icon Name, e.g. FavoriteBorder, Church)
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  value={typeof iconName === 'string' ? iconName : 'IconComponent'}
                  onChange={(e) => onChange(currentPath, e.target.value)}
                  size="small"
                  variant="outlined"
                  sx={{ bgcolor: '#fff', borderRadius: 2 }}
                />
              </Box>
            );
          }

          if (isComplex) {
            return (
              <Accordion
                key={key}
                elevation={0}
                sx={{
                  border: '1px solid rgba(107, 29, 47, 0.2)',
                  borderRadius: '12px !important',
                  bgcolor: 'background.default',
                  width: '100%',
                  '&:before': { display: 'none' },
                  my: 1,
                }}
              >
                <AccordionSummary expandIcon={<ExpandMore sx={{ color: 'primary.main' }} />}>
                  <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: '100%', pr: 2 }}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <FolderOpen sx={{ color: 'secondary.main', fontSize: 18 }} />
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'secondary.main', textTransform: 'uppercase' }}>
                        {key.replace(/_/g, ' ')}
                      </Typography>
                    </Stack>
                  </Stack>
                </AccordionSummary>
                <AccordionDetails sx={{ width: '100%', display: 'block', pt: 0 }}>
                  <NestedFieldEditor
                    data={value}
                    path={currentPath}
                    onChange={onChange}
                    onAddItem={onAddItem}
                    onDeleteItem={onDeleteItem}
                    onAddKey={onAddKey}
                  />
                </AccordionDetails>
              </Accordion>
            );
          }

          return (
            <Box key={key} sx={{ width: '100%', display: 'block', mb: 1.5 }}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: 'primary.main', display: 'block', mb: 0.5, letterSpacing: '0.05em' }}>
                {key.replace(/_/g, ' ')}
              </Typography>
              <NestedFieldEditor
                data={value}
                path={currentPath}
                onChange={onChange}
                onAddItem={onAddItem}
                onDeleteItem={onDeleteItem}
                onAddKey={onAddKey}
              />
            </Box>
          );
        })}

        {/* Dynamic Key Addition for Letter objects with custom IDs */}
        {isLetterDict && (
          <Button
            variant="outlined"
            size="small"
            startIcon={<Add />}
            onClick={() => onAddKey(path, data)}
            sx={{ alignSelf: 'flex-start', borderRadius: 2, textTransform: 'none', mt: 1 }}
          >
            Add New Letter ID (e.g. yuson-999)
          </Button>
        )}
      </Stack>
    );
  }

  return null;
}

export default function AdminContentManager() {
  const [selectedPage, setSelectedPage] = useState('global');
  const [formContent, setFormContent] = useState({});
  const [searchFilter, setSearchFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    loadPageContent(selectedPage);
  }, [selectedPage]);

  const loadPageContent = async (pageKey) => {
    setLoading(true);
    setSearchFilter('');

    try {
      const response = await fetch(`/api/content/${pageKey}`);
      const result = await response.json();

      if (result.success && result.data?.content) {
        setFormContent(result.data.content);
      } else {
        const selectedOption = PAGE_OPTIONS.find((p) => p.key === pageKey);
        setFormContent(selectedOption ? selectedOption.defaultData : {});
      }
    } catch (err) {
      console.warn('API connection offline, using static defaults:', err);
      const selectedOption = PAGE_OPTIONS.find((p) => p.key === pageKey);
      setFormContent(selectedOption ? selectedOption.defaultData : {});
    } finally {
      setLoading(false);
    }
  };

  const handleNestedFieldChange = (path, value) => {
    setFormContent((prev) => {
      const cloned = JSON.parse(JSON.stringify(prev));
      const keys = path.replace(/\[(\d+)\]/g, '.$1').split('.');
      let curr = cloned;

      for (let i = 0; i < keys.length - 1; i++) {
        const k = keys[i];
        if (!curr[k]) {
          curr[k] = !isNaN(Number(keys[i + 1])) ? [] : {};
        }
        curr = curr[k];
      }

      curr[keys[keys.length - 1]] = value;
      return cloned;
    });
  };

  const handleAddItem = (path, arr) => {
    let template = {};
    if (arr.length > 0) {
      const sample = arr[0];
      if (typeof sample === 'string') {
        template = '';
      } else if (typeof sample === 'object' && sample !== null) {
        template = JSON.parse(JSON.stringify(sample, (k, v) => (typeof v === 'string' ? '' : v)));
        if ('ID' in template) template.ID = Date.now();
      }
    } else {
      template = { TITLE: '', NAME: '', ITEM: '', QUESTION: '' };
    }

    setFormContent((prev) => {
      const cloned = JSON.parse(JSON.stringify(prev));
      const keys = path.replace(/\[(\d+)\]/g, '.$1').split('.');
      let curr = cloned;
      for (let i = 0; i < keys.length; i++) {
        curr = curr[keys[i]];
      }
      if (Array.isArray(curr)) {
        curr.push(template);
      }
      return cloned;
    });
  };

  const handleDeleteItem = (path, index) => {
    setFormContent((prev) => {
      const cloned = JSON.parse(JSON.stringify(prev));
      const keys = path.replace(/\[(\d+)\]/g, '.$1').split('.');
      let curr = cloned;
      for (let i = 0; i < keys.length; i++) {
        curr = curr[keys[i]];
      }
      if (Array.isArray(curr)) {
        curr.splice(index, 1);
      }
      return cloned;
    });
  };

  const handleAddKey = (path, obj) => {
    const newId = prompt('Enter unique ID (e.g., yuson-999):');
    if (!newId) return;

    setFormContent((prev) => {
      const cloned = JSON.parse(JSON.stringify(prev));
      const keys = path.replace(/\[(\d+)\]/g, '.$1').split('.');
      let curr = cloned;
      for (let i = 0; i < keys.length; i++) {
        curr = curr[keys[i]];
      }
      if (curr && typeof curr === 'object') {
        const sampleKey = Object.keys(curr)[0];
        curr[newId] = sampleKey ? JSON.parse(JSON.stringify(curr[sampleKey], (k, v) => (typeof v === 'string' ? '' : v))) : { NAME: '', MESSAGE: '' };
      }
      return cloned;
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch(`/api/content/${selectedPage}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pageKey: selectedPage,
          content: formContent,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setToast({ open: true, message: 'Changes saved successfully!', severity: 'success' });
      } else {
        throw new Error(result.message || 'Failed to update content');
      }
    } catch (err) {
      setToast({ open: true, message: err.message || 'Error saving changes to server.', severity: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleResetToDefault = () => {
    const selectedOption = PAGE_OPTIONS.find((p) => p.key === selectedPage);
    if (selectedOption) {
      setFormContent(selectedOption.defaultData);
      setToast({ open: true, message: 'Reset to default static values. Click Save to publish.', severity: 'info' });
    }
  };

  const filteredEntries = Object.entries(formContent).filter(([key]) =>
    key.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, sm: 3.5 },
          mb: 4,
          borderRadius: 4,
          bgcolor: 'background.paper',
          border: '1px solid rgba(107, 29, 47, 0.2)',
          boxShadow: '0 4px 20px rgba(107, 29, 47, 0.05)',
          display: 'block',
          width: '100%',
        }}
      >
        <Stack spacing={3} sx={{ display: 'block', width: '100%' }}>
          <Box sx={{ display: 'block', width: '100%', mb: 2 }}>
            <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 0.5 }}>
              <EditNote sx={{ fontSize: 32, color: 'primary.main' }} />
              <Typography variant="h5" sx={{ fontWeight: 700, fontFamily: '"Cormorant Garamond", serif', color: 'primary.main' }}>
                Content Management System
              </Typography>
            </Stack>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Easily edit headlines, dates, nested lists, icons, and dynamic items across your entire website.
            </Typography>
          </Box>

          <FormControl fullWidth size="small" sx={{ display: 'block', width: '100%' }}>
            <InputLabel id="page-select-label">Select Page</InputLabel>
            <Select
              labelId="page-select-label"
              id="page-select"
              value={selectedPage}
              label="Select Page"
              onChange={(e) => setSelectedPage(e.target.value)}
              fullWidth
              sx={{ borderRadius: 2.5, bgcolor: '#ffffff', fontWeight: 600, display: 'block', width: '100%' }}
            >
              {PAGE_OPTIONS.map((option) => (
                <MenuItem key={option.key} value={option.key}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </Paper>

      {loading ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 10, width: '100%' }}>
          <CircularProgress color="primary" />
          <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
            Loading page text fields...
          </Typography>
        </Box>
      ) : (
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.5, sm: 4 },
            borderRadius: 4,
            bgcolor: 'background.paper',
            border: '1px solid rgba(107, 29, 47, 0.15)',
            display: 'block',
            width: '100%',
          }}
        >
          <Stack spacing={2} sx={{ mb: 3, display: 'block', width: '100%' }}>
            <Box sx={{ display: 'block', width: '100%', mb: 1 }}>
              <Chip
                label={`Editing Section: ${PAGE_OPTIONS.find((p) => p.key === selectedPage)?.key.toUpperCase()}`}
                color="primary"
                variant="outlined"
                size="small"
                sx={{ fontWeight: 700, display: 'inline-flex' }}
              />
            </Box>
            <TextField
              fullWidth
              size="small"
              placeholder="Search field name..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: 'text.secondary', fontSize: 20 }} />
                  </InputAdornment>
                ),
              }}
              sx={{ display: 'block', width: '100%', '& .MuiOutlinedInput-root': { borderRadius: 2, display: 'block', width: '100%' } }}
            />
          </Stack>

          <Divider sx={{ mb: 4, display: 'block', width: '100%' }} />

          <Box sx={{ display: 'block', width: '100%' }}>
            {filteredEntries.map(([key, value]) => (
              <Box key={key} sx={{ display: 'block', width: '100%', mb: 3 }}>
                <Card
                  elevation={0}
                  sx={{
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    borderRadius: 3,
                    bgcolor: 'background.default',
                    display: 'block',
                    width: '100%',
                  }}
                >
                  <CardContent sx={{ p: 2.5, display: 'block', width: '100%', '&:last-child': { pb: 2.5 } }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main', display: 'block', mb: 1.5, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                      {key.replace(/_/g, ' ')}
                    </Typography>

                    <NestedFieldEditor
                      data={value}
                      path={key}
                      onChange={handleNestedFieldChange}
                      onAddItem={handleAddItem}
                      onDeleteItem={handleDeleteItem}
                      onAddKey={handleAddKey}
                    />
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>

            {/* Action Bar */}
            <Divider sx={{ my: 4 }} />
            <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" spacing={2}>
                {/* <Button
                    fullWidth={{ xs: true, sm: false }}
                    variant="outlined"
                    color="inherit"
                    startIcon={<Refresh />}
                    onClick={handleResetToDefault}
                    sx={{ borderRadius: 2.5, textTransform: 'none' }}
                >
                    Reset to Defaults
                </Button> */}
                <Button
                    fullWidth={{ xs: true, sm: false }}
                    variant="contained"
                    size="large"
                    startIcon={saving ? <CircularProgress size={20} color="inherit" /> : <Save />}
                    onClick={handleSave}
                    disabled={saving}
                    sx={{
                        bgcolor: 'primary.main',
                        color: 'primary.contrastText',
                        px: 5,
                        borderRadius: 2.5,
                        fontWeight: 700,
                        textTransform: 'none',
                        boxShadow: '0 4px 12px rgba(107, 29, 47, 0.2)',
                        '&:hover': {
                            bgcolor: 'secondary.main',
                        },
                    }}
                >
                    {saving ? 'Publishing...' : 'Save & Publish Changes'}
                </Button>
            </Stack>
        </Paper>
      )}

      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setToast({ ...toast, open: false })}
          severity={toast.severity}
          icon={<CheckCircle fontSize="inherit" />}
          sx={{ width: '100%', borderRadius: 3, boxShadow: '0 6px 20px rgba(0,0,0,0.15)' }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}