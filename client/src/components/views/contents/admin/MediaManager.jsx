import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  MenuItem,
  Grid,
  IconButton,
  Alert,
  CircularProgress,
  Divider,
  Container,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { PageTitle } from '../../utils/CustomComponents';

const PAGES = [
  { value: 'envelope', label: 'Envelope' },
  { value: 'cover', label: 'Cover' },
  { value: 'home', label: 'Home' },
  { value: 'story', label: 'Story' },
  { value: 'wedding', label: 'Wedding' },
  { value: 'entourage', label: 'Entourage' },
  { value: 'attire', label: 'Attire' },
  { value: 'faq', label: 'FAQ' },
  { value: 'gifts', label: 'Gifts' },
  { value: 'rsvp', label: 'RSVP' },
  { value: 'proposal', label: 'Proposal' },
];

// Master list of all possible asset types
const ALL_TYPES = [
  { value: 'envelope', label: 'Envelope Image (Single)' },
  { value: 'background', label: 'Background Image (Single)' },
  { value: 'banner', label: 'Banner Image (Single)' },
  { value: 'parallax', label: 'Parallax Image (Single)' },
  { value: 'gallery', label: 'Gallery Slides (Multiple)' },
  { value: 'palette', label: 'Color Palette Swatch (Single)' },
  { value: 'qr', label: 'QR Code (Multiple)' },
];

// Specific sub-categories for pages like Story or Attire
const PAGE_CATEGORIES_MAP = {
  story: [
    { value: 'highlights', label: 'Highlights' },
    { value: 'dating', label: 'Life Together' },
    { value: 'engagement', label: 'The Proposal' },
    { value: 'prenup', label: 'Prenup Shoot' },
  ],
  attire: [
    { value: 'guest', label: 'Guests' },
    { value: 'sponsors', label: 'Sponsors' },
    { value: 'entourage-adults', label: 'Entourage (Adults)' },
    { value: 'entourage-childs', label: 'Entourage (Childs)' },
    { value: 'parents', label: 'Parents' },
  ],
  device: [
    { value: 'desktop', label: 'Desktop View' },
    { value: 'mobile', label: 'Mobile View' },
  ],
  proposal: [
    { value: 'section1', label: 'Section 1' },
    { value: 'section2', label: 'Section 2' },
    { value: 'section3', label: 'Section 3' },
    { value: 'section4', label: 'Section 4' },
  ],
  gifts: [
    { value: 'gcash', label: 'GCash' },
    { value: 'maya', label: 'Maya' },
    { value: 'maribank', label: 'Maribank' },
    { value: 'bpi', label: 'BPI' },
    { value: 'bdo', label: 'BDO' },
    { value: 'unionbank', label: 'Unionbank' },
  ]
};

export default function AdminMediaPanel() {
  const [selectedPage, setSelectedPage] = useState('envelope');
  const [selectedType, setSelectedType] = useState('envelope');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState(''); // Secondary category for proposal view/device
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [mediaList, setMediaList] = useState([]);
  const [loadingList, setLoadingList] = useState(false);

  // Helper to determine allowed asset types dynamically based on the selected page rule
  const getAvailableTypes = (page) => {
    switch (page) {
      case 'envelope':
        return ALL_TYPES.filter((t) => ['envelope', 'background'].includes(t.value));
      case 'home':
      case 'cover':
      case 'proposal':
        return ALL_TYPES.filter((t) => ['background'].includes(t.value));
      case 'wedding':
      case 'faq':
      case 'rsvp':
        return ALL_TYPES.filter((t) => ['background', 'banner'].includes(t.value));
      case 'entourage':
        return ALL_TYPES.filter((t) => ['background', 'banner', 'parallax'].includes(t.value));
      case 'story':
        return ALL_TYPES.filter((t) => ['background', 'banner', 'parallax', 'gallery'].includes(t.value));
      case 'attire':
        return ALL_TYPES.filter((t) => ['background', 'banner', 'gallery', 'palette'].includes(t.value));
      case 'gifts':
        return ALL_TYPES.filter((t) => ['background', 'banner', 'qr'].includes(t.value));
      default:
        return ALL_TYPES;
    }
  };

  const availableTypes = getAvailableTypes(selectedPage);

  // Determine primary category options based on Page AND Type
  const getAvailableCategories = (page, type) => {
    if (page === "cover" || type === "parallax") {
      return [];
    }
    if (page === "proposal") {
      return PAGE_CATEGORIES_MAP["proposal"] || [];
    }
    if (['background', 'banner'].includes(type)) {
      return PAGE_CATEGORIES_MAP["device"] || [];
    }
    return PAGE_CATEGORIES_MAP[page] || [];
  };

  const availableCategories = getAvailableCategories(selectedPage, selectedType);
  const hasCategory = availableCategories.length > 0;
  
  // If page is proposal, we want both Section category AND Device category fields displayed side-by-side
  const isProposal = selectedPage === 'proposal';

  // Automatically adjust selectedType and categories when page or type changes
  useEffect(() => {
    const validTypes = getAvailableTypes(selectedPage);
    if (!validTypes.some((t) => t.value === selectedType)) {
      setSelectedType(validTypes[0]?.value || '');
    }
  }, [selectedPage]);

  useEffect(() => {
    const cats = getAvailableCategories(selectedPage, selectedType);
    if (cats.length > 0) {
      if (!cats.some((c) => c.value === selectedCategory)) {
        setSelectedCategory(cats[0].value);
      }
    } else {
      setSelectedCategory('');
    }

    // Reset sub-category if switching away from proposal
    if (selectedPage !== 'proposal') {
      setSelectedSubCategory('');
    } else {
      setSelectedSubCategory('desktop'); // default sub-category for proposal
    }
  }, [selectedPage, selectedType]);

  // Fetch existing uploaded media on load or filter change
  const fetchMedia = async () => {
    try {
      setLoadingList(true);
      const res = await fetch(`/api/media?page=${selectedPage}`);
      const data = await res.json();
      if (data.success) {
        setMediaList(data.data);
      }
    } catch (err) {
      console.error('Error fetching media list:', err);
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, [selectedPage]);

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!files || files.length === 0) {
      setMessage({ type: 'error', text: 'Please select at least one image file.' });
      return;
    }

    const formData = new FormData();
    formData.append('page', selectedPage);
    formData.append('type', selectedType);

    // ----------------------------------------------------------------------
    // HERE IS THE COMBINING LOGIC:
    // If the selected page is 'proposal', join the section and device view
    // into a single composite string (e.g., "section1-desktop").
    // ----------------------------------------------------------------------
    const finalCategory = isProposal ? `${selectedCategory}-${selectedSubCategory}` : selectedCategory;
    if (finalCategory) {
      formData.append('category', finalCategory);
    }

    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i]);
    }

    try {
      setUploading(true);
      setMessage({ type: '', text: '' });

      const res = await fetch('/api/media/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();

      if (result.success) {
        setMessage({ type: 'success', text: result.message });
        setFiles([]);
        fetchMedia();
      } else {
        setMessage({ type: 'error', text: result.message || 'Upload failed.' });
      }
    } catch (err) {
      console.error('Upload error:', err);
      setMessage({ type: 'error', text: 'Network error during upload.' });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this media item?')) return;

    try {
      const res = await fetch(`/api/media/${id}`, { method: 'DELETE' });
      const result = await res.json();
      if (result.success) {
        setMediaList((prev) => prev.filter((item) => item._id !== id));
      } else {
        alert(result.message || 'Failed to delete');
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Error deleting image.');
    }
  };

  // Dynamic grid column sizing based on inputs count
  let gridColumnSize = 6;
  if (isProposal) {
    gridColumnSize = 4; // Target Page, Proposal Section, Device View
  } else if (hasCategory) {
    gridColumnSize = 4; // Target Page, Asset Type, Category
  } else {
    gridColumnSize = 6; // Target Page, Asset Type
  }

  return (
    <Container maxWidth="lg"  sx={{ py: 4 }}>
      <PageTitle
        title="Media & Asset Manager"
        subtitle="Upload, optimize, and manage site backgrounds, banners, story tabs, attire inspiration slides, and color palettes directly in MongoDB."
      />

      {message.text && (
        <Alert severity={message.type} sx={{ mb: 3 }}>
          {message.text}
        </Alert>
      )}

      {/* Upload Form Card */}
      <Card sx={{ mb: 4, boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Upload New Asset
          </Typography>
          <Box component="form" onSubmit={handleUpload} sx={{ mt: 2 }}>
            
            {/* ROW 1: Dynamic Dropdowns */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={gridColumnSize}>
                <TextField
                  select
                  fullWidth
                  label="Target Page"
                  value={selectedPage}
                  onChange={(e) => setSelectedPage(e.target.value)}
                >
                  {PAGES.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} sm={gridColumnSize}>
                <TextField
                  select
                  fullWidth
                  label="Asset Type"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  {availableTypes.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {hasCategory && !isProposal && (
                <Grid item xs={12} sm={gridColumnSize}>
                  <TextField
                    select
                    fullWidth
                    label={['background', 'banner'].includes(selectedType) ? "View Layout" : "Category / Tab"}
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {availableCategories.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              )}

              {/* Special Dual Category Dropdowns if Page is Proposal */}
              {isProposal && (
                <>
                  <Grid item xs={12} sm={gridColumnSize}>
                    <TextField
                      select
                      fullWidth
                      label="Section"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      {availableCategories.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid item xs={12} sm={gridColumnSize}>
                    <TextField
                      select
                      fullWidth
                      label="Device View"
                      value={selectedSubCategory}
                      onChange={(e) => setSelectedSubCategory(e.target.value)}
                    >
                      {PAGE_CATEGORIES_MAP['device'].map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </>
              )}
            </Grid>

            {/* ROW 2: File Picker & Submit Button Container */}
            <Box sx={{ p: 2, bgcolor: '#faf8f5', borderRadius: 2, border: '1px dashed #dcd6cd' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                <Button
                  component="label"
                  variant="outlined"
                  startIcon={<CloudUploadIcon />}
                  sx={{ borderColor: '#b08968', color: '#b08968', py: 1.2 }}
                >
                  Select Image(s)
                  <input
                    type="file"
                    hidden
                    multiple={selectedType === 'gallery' || selectedType === "qr"}
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </Button>

                <Button
                  type="submit"
                  variant="contained"
                  disabled={uploading || files.length === 0}
                  sx={{ bgcolor: '#b08968', '&:hover': { bgcolor: '#9c7757' }, px: 4, py: 1.2 }}
                >
                  {uploading ? <CircularProgress size={24} color="inherit" /> : 'Upload & Optimize'}
                </Button>
              </Box>

              {/* File status text at the bottom */}
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                {files.length > 0
                  ? `${files.length} file(s) selected: ${Array.from(files).map(f => f.name).join(', ')}`
                  : 'No file chosen (Auto-optimized)'}
              </Typography>
            </Box>

          </Box>
        </CardContent>
      </Card>

      <Divider sx={{ my: 4 }} />

      {/* Existing Media Library Grid */}
      <Typography variant="h6" gutterBottom>
        Existing Assets for {PAGES.find((p) => p.value === selectedPage)?.label}
      </Typography>

      {loadingList ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      ) : mediaList.length === 0 ? (
        <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', mt: 2 }}>
          No uploaded media found for this page yet.
        </Typography>
      ) : (
        <Grid container spacing={3} sx={{ mt: 1 }}>
          {mediaList.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item._id}>
              <Card sx={{ boxShadow: 2, position: 'relative', borderRadius: 2 }}>
                <Box
                  component="img"
                  src={item.url}
                  alt={item.type}
                  sx={{
                    width: '100%',
                    height: 180,
                    objectFit: 'cover',
                    backgroundColor: '#f5f5f5',
                  }}
                />
                <CardContent sx={{ pb: '16px !important' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold', textTransform: 'capitalize' }}>
                    Type: {item.type}
                  </Typography>
                  {item.category && (
                    <Typography variant="body2" color="text.secondary">
                      Category / View: {item.category}
                    </Typography>
                  )}
                  <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
                    Uploaded: {new Date(item.createdAt).toLocaleDateString()}
                  </Typography>
                  <IconButton
                    color="error"
                    size="small"
                    onClick={() => handleDelete(item._id)}
                    sx={{ position: 'absolute', top: 8, right: 8, bgcolor: 'rgba(255,255,255,0.8)' }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}