import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Stack,
  Divider,
  Snackbar,
  Card,
  CardContent,
  LinearProgress,
  IconButton,
  Chip,
  Tooltip,
  Switch,
  FormControlLabel
} from '@mui/material';
import { MusicNote, CloudUpload, CheckCircle, PlayArrow, Stop, Compress, Delete, VolumeUp, VolumeOff } from '@mui/icons-material';
import { PageTitle } from '../../utils/CustomComponents';

export default function MusicManager() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [activeTracks, setActiveTracks] = useState([]);
  const [isMusicEnabled, setIsMusicEnabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [optimizing, setOptimizing] = useState(false);
  
  // Audio playback state
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioElement, setAudioElement] = useState(null);
  const [previewIndex, setPreviewIndex] = useState(null);

  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchMusicAsset();
  }, []);

  const fetchMusicAsset = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/music');
      const json = await res.json();
      if (json.success) {
        // Handle both array or single responses cleanly
        const tracks = Array.isArray(json.data) ? json.data : (json.data ? [json.data] : []);
        setActiveTracks(tracks);
        if (tracks.length > 0) {
          setIsMusicEnabled(tracks[0].isEnabled ?? true);
        }
      }
    } catch (err) {
      console.warn('Could not fetch current background music:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleGlobalMusic = async (event) => {
    const newState = event.target.checked;
    setIsMusicEnabled(newState);

    try {
      const res = await fetch('/api/music/toggle', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isEnabled: newState }),
      });
      const json = await res.json();
      if (json.success) {
        setToast({ 
          open: true, 
          message: `Background music is now ${newState ? 'Enabled' : 'Disabled'} across all pages.`, 
          severity: 'success' 
        });
      } else {
        throw new Error(json.message);
      }
    } catch (err) {
      setIsMusicEnabled(!newState); // revert on failure
      setToast({ open: true, message: 'Failed to update global music state.', severity: 'error' });
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    // Check existing database tracks count + current queue + incoming files
    const totalCurrentCount = activeTracks.length + selectedFiles.length + files.length;
    if (totalCurrentCount > 3) {
      setToast({ 
        open: true, 
        message: `Maximum limit is 3 tracks! You currently have ${activeTracks.length} in DB and ${selectedFiles.length} in queue. Please delete an existing track first.`, 
        severity: 'error' 
      });
      return;
    }

    // Filter valid MP3 files and enforce 5MB (5 * 1024 * 1024 bytes) max file size limit
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
    const validFiles = [];
    
    for (const file of files) {
      const isMp3 = file.type === 'audio/mpeg' || file.name.endsWith('.mp3');
      if (!isMp3) {
        setToast({ open: true, message: `Ignored ${file.name}: Please upload MP3 files only.`, severity: 'error' });
        continue;
      }
      if (file.size > MAX_FILE_SIZE) {
        setToast({ open: true, message: `File "${file.name}" is too large (${(file.size / (1024 * 1024)).toFixed(2)} MB). Max limit is 5 MB.`, severity: 'error' });
        continue;
      }
      validFiles.push(file);
    }

    if (validFiles.length === 0) return;

    const combinedFiles = [...selectedFiles, ...validFiles].slice(0, 3 - activeTracks.length);
    setSelectedFiles(combinedFiles);
  };

  const handleRemoveSelectedFile = (index) => {
    if (previewIndex === index && audioElement) {
      audioElement.pause();
      setIsPlaying(false);
      setPreviewIndex(null);
    }
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleQueuePreview = (file, index) => {
    if (previewIndex === index && isPlaying) {
      if (audioElement) audioElement.pause();
      setIsPlaying(false);
      setPreviewIndex(null);
    } else {
      if (audioElement) audioElement.pause();
      const fileUrl = URL.createObjectURL(file);
      const audio = new Audio(fileUrl);
      audio.play().catch((e) => console.log('Playback blocked:', e));
      setAudioElement(audio);
      setIsPlaying(true);
      setPreviewIndex(index);

      audio.onended = () => {
        setIsPlaying(false);
        setPreviewIndex(null);
      };
    }
  };

  const optimizeAndUploadFiles = async () => {
    if (selectedFiles.length === 0) return;

    // Final guard check before posting
    if (activeTracks.length + selectedFiles.length > 3) {
      setToast({ open: true, message: 'Upload limit exceeded. Maximum 3 files allowed in database. Delete existing tracks to upload new ones.', severity: 'error' });
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append('music', file);
      });
      formData.append('category', 'background-music');

      const response = await fetch('/api/music', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();

      if (result.success) {
        await fetchMusicAsset(); // Refresh tracks list from DB
        setSelectedFiles([]);
        setToast({ open: true, message: 'MP3 tracks successfully added to database!', severity: 'success' });
      } else {
        throw new Error(result.message || 'Upload failed');
      }
    } catch (err) {
      console.error('Upload error:', err);
      setToast({ open: true, message: err.message || 'Error processing music files.', severity: 'error' });
    } finally {
      setUploading(false);
      setOptimizing(false);
    }
  };

  const handleDeleteTrack = async (trackId) => {
    try {
      const res = await fetch(`/api/music/${trackId}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        if (audioElement) audioElement.pause();
        setIsPlaying(false);
        setPreviewIndex(null);
        await fetchMusicAsset();
        setToast({ open: true, message: 'Track deleted successfully from database!', severity: 'success' });
      }
    } catch (err) {
      setToast({ open: true, message: 'Failed to delete music track.', severity: 'error' });
    }
  };

  const toggleActivePreviewPlay = (trackUrl, indexKey) => {
    if (!trackUrl) return;
    if (isPlaying && previewIndex === indexKey) {
      audioElement.pause();
      setIsPlaying(false);
      setPreviewIndex(null);
    } else {
      if (audioElement) audioElement.pause();
      const audio = new Audio(trackUrl);
      audio.loop = true;
      audio.play().catch((e) => console.log('Autoplay blocked:', e));
      setAudioElement(audio);
      setIsPlaying(true);
      setPreviewIndex(indexKey);
      audio.onended = () => {
        setIsPlaying(false);
        setPreviewIndex(null);
      };
    }
  };

  useEffect(() => {
    return () => {
      if (audioElement) audioElement.pause();
    };
  }, [audioElement]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <PageTitle
        title="Background Music Manager"
        subtitle="Upload up to 3 background MP3 tracks (max 5MB each) and manage global playback across all invitation pages."
      />

      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, sm: 5 },
          mt: 3,
          borderRadius: 4,
          bgcolor: 'background.paper',
          border: '1px solid rgba(107, 29, 47, 0.15)',
          width: '100%',
          display: 'block'
        }}
      >
        <Stack spacing={3}>
          {/* Header & Global Toggle Switch */}
          <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={2}>
            <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={{ xs: 'flex-start', sm: 'center' }} justifyContent="space-between" spacing={2}>
                <Stack direction="row" alignItems="center" spacing={1.5}>
                <MusicNote sx={{ fontSize: 32, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 700, color: 'secondary.main', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Global Background Music ({activeTracks.length}/3 Tracks)
                </Typography>
                </Stack>
            </Stack>

            <Box
              sx={{
                mt: 1,
                bgcolor: 'background.default',
                px: 2.5,
                py: 1,
                borderRadius: 3,
                border: '1px solid rgba(107, 29, 47, 0.1)',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <FormControlLabel
                control={
                  <Switch
                    checked={isMusicEnabled}
                    onChange={handleToggleGlobalMusic}
                    color="primary"
                    sx={{ m: 0, mr: 1 }}
                  />
                }
                label={
                  <Box display="flex" alignItems="center" gap={0.75}>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: isMusicEnabled ? 'primary.main' : 'text.secondary' }}>
                      {isMusicEnabled ? 'Music Enabled (All Pages)' : 'Music Disabled'}
                    </Typography>
                  </Box>
                }
                sx={{ m: 0 }}
              />
            </Box>
          </Box>

          <Divider />

          {loading ? (
            <Box display="flex" justifyContent="center" py={4}>
              <CircularProgress color="primary" />
            </Box>
          ) : (
            <Box>
              {/* Active Tracks List from Database */}
              {activeTracks.length > 0 ? (
                <Stack spacing={2} sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'secondary.main' }}>
                    Active Database Tracks:
                  </Typography>
                  {activeTracks.map((track, idx) => (
                    <Card key={track._id || idx} elevation={0} sx={{ bgcolor: 'background.default', border: '1px solid rgba(107, 29, 47, 0.1)', borderRadius: 3, p: 2, width: '100%' }}>
                      <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2, py: '0 !important' }}>
                        <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main' }}>
                            Track {idx + 1}: {track.filename}
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                            Size: {(track.size / (1024 * 1024)).toFixed(2)} MB
                          </Typography>
                        </Box>
                        <Stack direction="row" spacing={1.5}>
                          <Button
                            variant="contained"
                            size="small"
                            startIcon={isPlaying && previewIndex === `db-${idx}` ? <Stop /> : <PlayArrow />}
                            onClick={() => toggleActivePreviewPlay(track.url, `db-${idx}`)}
                            sx={{ borderRadius: 2, bgcolor: 'primary.main', textTransform: 'none' }}
                          >
                            {isPlaying && previewIndex === `db-${idx}` ? 'Stop' : 'Preview'}
                          </Button>
                          <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            startIcon={<Delete />}
                            onClick={() => handleDeleteTrack(track._id)}
                            sx={{ borderRadius: 2, textTransform: 'none' }}
                          >
                            Delete
                          </Button>
                        </Stack>
                      </CardContent>
                    </Card>
                  ))}
                </Stack>
              ) : (
                <Alert severity="info" sx={{ mb: 3, borderRadius: 3 }}>
                  No background music tracks uploaded yet. You can upload up to 3 MP3 files (max 5MB each).
                </Alert>
              )}

              {/* Upload Dropzone (Disabled if limit reached) */}
              {activeTracks.length >= 3 ? (
                <Alert severity="warning" sx={{ borderRadius: 3 }}>
                  Maximum limit of 3 tracks reached. Please delete an existing track from the list above before uploading a new one.
                </Alert>
              ) : (
                <Box
                  sx={{
                    border: '2px dashed rgba(107, 29, 47, 0.3)',
                    borderRadius: 3,
                    p: 5,
                    textAlign: 'center',
                    bgcolor: 'background.default',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    transition: 'background-color 0.2s',
                    '&:hover': { bgcolor: 'rgba(107, 29, 47, 0.02)' }
                  }}
                  component="label"
                >
                  <CloudUpload sx={{ fontSize: 56, color: 'primary.main', mb: 1.5 }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'secondary.main' }}>
                    Click to select or drop MP3 files (Up to {3 - activeTracks.length} more allowed)
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 0.5 }}>
                    Maximum file size: 5 MB per track. Formats: .mp3
                  </Typography>
                  <input
                    type="file"
                    accept=".mp3,audio/mpeg"
                    multiple
                    hidden
                    onChange={handleFileChange}
                  />
                </Box>
              )}

              {/* Selected Files Queue Preview with Play & Delete */}
              {selectedFiles.length > 0 && (
                <Box sx={{ my: 3 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'secondary.main', mb: 1.5 }}>
                    Selected Files Queue ({selectedFiles.length}):
                  </Typography>
                  <Stack spacing={1.5}>
                    {selectedFiles.map((file, idx) => (
                      <Box
                        key={idx}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          p: 2,
                          borderRadius: 2.5,
                          bgcolor: 'background.default',
                          border: '1px solid rgba(107, 29, 47, 0.15)',
                          flexWrap: 'wrap',
                          gap: 2
                        }}
                      >
                        <Stack direction="row" alignItems="center" spacing={1.5}>
                          <MusicNote fontSize="small" color="primary" />
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {file.name}
                          </Typography>
                          <Chip label={`${(file.size / (1024 * 1024)).toFixed(2)} MB`} size="small" variant="outlined" />
                        </Stack>

                        <Stack direction="row" spacing={1} alignItems="center">
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={isPlaying && previewIndex === idx ? <Stop /> : <PlayArrow />}
                            onClick={() => toggleQueuePreview(file, idx)}
                            sx={{ borderRadius: 2, textTransform: 'none', borderColor: 'primary.main', color: 'primary.main' }}
                          >
                            {isPlaying && previewIndex === idx ? 'Stop' : 'Preview'}
                          </Button>
                          <Tooltip title="Remove from queue">
                            <IconButton size="small" color="error" onClick={() => handleRemoveSelectedFile(idx)}>
                              <Delete fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              )}

              {(optimizing || uploading) && (
                <Box sx={{ mt: 3, width: '100%' }}>
                  <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: 'primary.main' }}>
                      {uploading ? 'Uploading tracks to database...' : 'Processing audio files...'}
                    </Typography>
                    <Compress fontSize="small" color="primary" />
                  </Box>
                  <LinearProgress color="primary" sx={{ borderRadius: 2, height: 6 }} />
                </Box>
              )}

              {selectedFiles.length > 0 && !optimizing && !uploading && (
                <Box mt={4} display="flex" justifyContent="flex-end">
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<Compress />}
                    onClick={optimizeAndUploadFiles}
                    sx={{
                      bgcolor: 'primary.main',
                      color: 'primary.contrastText',
                      px: 5,
                      py: 1.5,
                      borderRadius: 2.5,
                      fontWeight: 700,
                      textTransform: 'none',
                      boxShadow: '0 4px 12px rgba(107, 29, 47, 0.2)',
                      '&:hover': { bgcolor: 'secondary.main' }
                    }}
                  >
                    Upload ({selectedFiles.length}) Files to Database
                  </Button>
                </Box>
              )}
            </Box>
          )}
        </Stack>
      </Paper>

      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setToast({ ...toast, open: false })}
          severity={toast.severity}
          icon={<CheckCircle fontSize="inherit" />}
          sx={{ width: '100%', borderRadius: 3 }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}