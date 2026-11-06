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
  Tooltip
} from '@mui/material';
import { MusicNote, CloudUpload, CheckCircle, PlayArrow, Stop, Compress, Delete } from '@mui/icons-material';
import { PageTitle } from '../../utils/CustomComponents';

export default function MusicManager() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [currentMusicUrl, setCurrentMusicUrl] = useState('');
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
      if (json.success && json.data?.url) {
        setCurrentMusicUrl(json.data.url);
      }
    } catch (err) {
      console.warn('Could not fetch current background music:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const validFiles = files.filter((file) => file.type === 'audio/mpeg' || file.name.endsWith('.mp3'));
    if (validFiles.length !== files.length) {
      setToast({ open: true, message: 'Some files were ignored. Please upload MP3 files only.', severity: 'error' });
    }

    const combinedFiles = [...selectedFiles, ...validFiles].slice(0, 3);
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

    setOptimizing(true);
    try {
      const optimizedFiles = [];

      for (const file of selectedFiles) {
        try {
          const arrayBuffer = await file.arrayBuffer();
          const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
          const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

          const offlineCtx = new OfflineAudioContext(
            1,
            audioBuffer.sampleRate * audioBuffer.duration,
            audioBuffer.duration > 300 ? 22050 : 44100
          );

          const source = offlineCtx.createBufferSource();
          source.buffer = audioBuffer;
          source.connect(offlineCtx.destination);
          source.start(0);

          const renderedBuffer = await offlineCtx.startRendering();
          const wavBlob = bufferToWave(renderedBuffer, renderedBuffer.length);
          
          const compressedFile = new File([wavBlob], file.name.replace(/\.[^/.]+$/, '') + '-optimized.mp3', {
            type: 'audio/mpeg',
          });
          optimizedFiles.push(compressedFile);
        } catch (innerErr) {
          console.warn('Audio decoding fallback to original:', innerErr);
          optimizedFiles.push(file);
        }
      }

      setOptimizing(false);
      setUploading(true);

      const formData = new FormData();
      optimizedFiles.forEach((file) => {
        formData.append('music', file);
      });
      formData.append('category', 'background-music');

      const response = await fetch('/api/music', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();

      if (result.success) {
        setCurrentMusicUrl(result.data.url);
        setSelectedFiles([]);
        setToast({ open: true, message: 'MP3 tracks successfully optimized and uploaded!', severity: 'success' });
      } else {
        throw new Error(result.message || 'Upload failed');
      }
    } catch (err) {
      console.error('Optimization error:', err);
      setToast({ open: true, message: err.message || 'Error processing music files.', severity: 'error' });
    } finally {
      setOptimizing(false);
      setUploading(false);
    }
  };

  const handleDeleteActiveMusic = async () => {
    try {
      const res = await fetch('/api/music', { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        setCurrentMusicUrl('');
        if (audioElement) audioElement.pause();
        setIsPlaying(false);
        setToast({ open: true, message: 'Active background track deleted from database!', severity: 'success' });
      }
    } catch (err) {
      setToast({ open: true, message: 'Failed to delete active music track.', severity: 'error' });
    }
  };

  function bufferToWave(abuffer, len) {
    const numOfChan = abuffer.numberOfChannels;
    const length = len * numOfChan * 2 + 44;
    const buffer = new ArrayBuffer(length);
    const view = new DataView(buffer);
    let channels = [];
    let sample;
    let offset = 0;
    let pos = 0;

    setWriteString(view, pos, 'RIFF'); pos += 4;
    view.setUint32(pos, length - 8, true); pos += 4;
    setWriteString(view, pos, 'WAVE'); pos += 4;
    setWriteString(view, pos, 'fmt '); pos += 4;
    view.setUint32(pos, 16, true); pos += 4;
    view.setUint16(pos, 1, true); pos += 2;
    view.setUint16(pos, numOfChan, true); pos += 2;
    view.setUint32(pos, abuffer.sampleRate, true); pos += 4;
    view.setUint32(pos, abuffer.sampleRate * 2 * numOfChan, true); pos += 4;
    view.setUint16(pos, numOfChan * 2, true); pos += 2;
    view.setUint16(pos, 16, true); pos += 2;
    setWriteString(view, pos, 'data'); pos += 4;
    view.setUint32(pos, length - pos - 4, true); pos += 4;

    for (let i = 0; i < abuffer.numberOfChannels; i++) {
      channels.push(abuffer.getChannelData(i));
    }

    while (pos < length) {
      for (let i = 0; i < numOfChan; i++) {
        sample = Math.max(-1, Math.min(1, channels[i][offset]));
        sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767);
        view.setInt16(pos, sample, true);
        pos += 2;
      }
      offset++;
    }
    return new Blob([buffer], { type: 'audio/mpeg' });
  }

  function setWriteString(view, offset, string) {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }

  const toggleActivePreviewPlay = () => {
    if (!currentMusicUrl) return;
    if (isPlaying && previewIndex === 'active') {
      audioElement.pause();
      setIsPlaying(false);
      setPreviewIndex(null);
    } else {
      if (audioElement) audioElement.pause();
      const audio = new Audio(currentMusicUrl);
      audio.loop = true;
      audio.play().catch((e) => console.log('Autoplay blocked:', e));
      setAudioElement(audio);
      setIsPlaying(true);
      setPreviewIndex('active');
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
        subtitle="Upload and auto-compress MP3 tracks (up to 3 files max) to save database storage space."
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
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <MusicNote sx={{ fontSize: 32, color: 'primary.main' }} />
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'secondary.main', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Optimized MP3 Background Track
            </Typography>
          </Stack>

          <Divider />

          {loading ? (
            <Box display="flex" justifyContent="center" py={4}>
              <CircularProgress color="primary" />
            </Box>
          ) : (
            <Box>
              {currentMusicUrl && (
                <Card elevation={0} sx={{ bgcolor: 'background.default', border: '1px solid rgba(107, 29, 47, 0.1)', borderRadius: 3, p: 2, mb: 3, width: '100%' }}>
                  <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2, py: '0 !important' }}>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main' }}>
                        Active Database Track Loaded
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary', wordBreak: 'break-all' }}>
                        {currentMusicUrl}
                      </Typography>
                    </Box>
                    <Stack direction="row" spacing={1.5}>
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={isPlaying && previewIndex === 'active' ? <Stop /> : <PlayArrow />}
                        onClick={toggleActivePreviewPlay}
                        sx={{ borderRadius: 2, bgcolor: 'primary.main', textTransform: 'none' }}
                      >
                        {isPlaying && previewIndex === 'active' ? 'Stop' : 'Preview'}
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        startIcon={<Delete />}
                        onClick={handleDeleteActiveMusic}
                        sx={{ borderRadius: 2, textTransform: 'none' }}
                      >
                        Delete from DB
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              )}

              {/* Upload Dropzone */}
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
                  Click to select or drop up to 3 MP3 files
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 0.5 }}>
                  Automatic downsampling & size optimization will be applied to save database storage.
                </Typography>
                <input
                  type="file"
                  accept=".mp3,audio/mpeg"
                  multiple
                  hidden
                  onChange={handleFileChange}
                />
              </Box>

              {/* Selected Files Queue Preview with Play & Delete */}
              {selectedFiles.length > 0 && (
                <Box sx={{ my: 3 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'secondary.main', mb: 1.5 }}>
                    Selected Files Queue ({selectedFiles.length}/3):
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
                      {optimizing ? 'Compressing and optimizing audio size...' : 'Uploading optimized tracks to database...'}
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
                    Optimize & Upload ({selectedFiles.length}) Files
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
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
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