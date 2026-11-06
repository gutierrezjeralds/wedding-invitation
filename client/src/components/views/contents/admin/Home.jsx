import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Stack } from '@mui/material';
import { PeopleAlt, Palette, Backup, EditNote, Home, MusicNote } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { PageTitle } from '../../utils/CustomComponents';

export default function AdminHome() {
  const navigate = useNavigate();

  return (
    <Box sx={{ py: 2, px: 2, maxWidth: 1200, mx: 'auto' }}>
      <PageTitle
        title="Welcome to Admin Dashboard"
        subtitle="Manage website content, assets, dynamic colors, background music, view real-time RSVP analytics, and preview your wedding site."
      />

      <Grid container spacing={3} sx={{ mt: 3 }}>
        {/* Back to Live Website Card */}
        <Grid item class="w-100">
          <Card
            elevation={0}
            onClick={() => navigate('/')}
            sx={{
              p: 2,
              height: '100%',
              border: '1px solid rgba(107, 29, 47, 0.15)',
              borderRadius: 3,
              cursor: 'pointer',
              bgcolor: 'background.paper',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 24px rgba(107, 29, 47, 0.12)',
              },
            }}
          >
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1 }}>
                <Home sx={{ fontSize: 28, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ color: 'secondary.main', fontWeight: 700 }}>
                  View Live Website
                </Typography>
              </Stack>
              <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                Return to the home page root (`/`) to preview how your changes look live for guests visiting your wedding invitation site.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Content Management System Card */}
        <Grid item class="w-100">
          <Card
            elevation={0}
            onClick={() => navigate('/admin/content')}
            sx={{
              p: 2,
              height: '100%',
              border: '1px solid rgba(107, 29, 47, 0.15)',
              borderRadius: 3,
              cursor: 'pointer',
              bgcolor: 'background.paper',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 24px rgba(107, 29, 47, 0.12)',
              },
            }}
          >
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1 }}>
                <EditNote sx={{ fontSize: 28, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ color: 'secondary.main', fontWeight: 700 }}>
                  Content Management System
                </Typography>
              </Stack>
              <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                Edit headlines, dates, nested entourage entries, FAQs, proposals, and dynamic text across all pages without touching code.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Media & Asset Manager Card */}
        <Grid item class="w-100">
          <Card
            elevation={0}
            onClick={() => navigate('/admin/media')}
            sx={{
              p: 2,
              height: '100%',
              border: '1px solid rgba(107, 29, 47, 0.15)',
              borderRadius: 3,
              cursor: 'pointer',
              bgcolor: 'background.paper',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 24px rgba(107, 29, 47, 0.12)',
              },
            }}
          >
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1 }}>
                <Backup sx={{ fontSize: 28, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ color: 'secondary.main', fontWeight: 700 }}>
                  Media & Asset Manager
                </Typography>
              </Stack>
              <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                Upload, optimize, and organize site backgrounds, banners, story tabs, attire inspiration slides, and color palettes.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Background Music Manager Card */}
        <Grid item class="w-100">
          <Card
            elevation={0}
            onClick={() => navigate('/admin/music')}
            sx={{
              p: 2,
              height: '100%',
              border: '1px solid rgba(107, 29, 47, 0.15)',
              borderRadius: 3,
              cursor: 'pointer',
              bgcolor: 'background.paper',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 24px rgba(107, 29, 47, 0.12)',
              },
            }}
          >
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1 }}>
                <MusicNote sx={{ fontSize: 28, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ color: 'secondary.main', fontWeight: 700 }}>
                  Background Music Manager
                </Typography>
              </Stack>
              <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                Upload up to 3 background MP3 tracks, preview audio files, manage individual deletions, and toggle global playback across all pages.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* RSVP Summary Report Card */}
        <Grid item class="w-100">
          <Card
            elevation={0}
            onClick={() => navigate('/admin/rsvp')}
            sx={{
              p: 2,
              height: '100%',
              border: '1px solid rgba(107, 29, 47, 0.15)',
              borderRadius: 3,
              cursor: 'pointer',
              bgcolor: 'background.paper',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 24px rgba(107, 29, 47, 0.12)',
              },
            }}
          >
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1 }}>
                <PeopleAlt sx={{ fontSize: 28, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ color: 'secondary.main', fontWeight: 700 }}>
                  RSVP Summary Report
                </Typography>
              </Stack>
              <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                View real-time attendance stats, expand primary and accompanying guest tree structures, and download Excel or PDF check-in lists.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Theme & Typography Settings Card */}
        <Grid item class="w-100">
          <Card
            elevation={0}
            onClick={() => navigate('/admin/theme')}
            sx={{
              p: 2,
              height: '100%',
              border: '1px solid rgba(107, 29, 47, 0.15)',
              borderRadius: 3,
              cursor: 'pointer',
              bgcolor: 'background.paper',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 24px rgba(107, 29, 47, 0.12)',
              },
            }}
          >
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1 }}>
                <Palette sx={{ fontSize: 28, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ color: 'secondary.main', fontWeight: 700 }}>
                  Theme & Typography Settings
                </Typography>
              </Stack>
              <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                Customize palette colors, wine red accents, background shades, header typography sizes, and font styles stored directly in MongoDB.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}