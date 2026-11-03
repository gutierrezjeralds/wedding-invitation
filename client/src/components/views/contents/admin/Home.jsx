import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import { PeopleAlt, Palette, Backup } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { PageTitle } from '../../utils/CustomComponents';

export default function AdminHome() {
  const navigate = useNavigate();

  return (
    <Box sx={{ py: 2, px: 2, maxWidth: 1200, mx: 'auto' }}>
      <PageTitle
        title="Welcome to Admin Dashboard"
        subtitle="Manage website assets, dynamic colors, view real-time RSVP analytics, and export guest check-in sheets."
      />

      <Grid container spacing={3} sx={{ mt: 3 }}>
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
              <Backup sx={{ fontSize: 44, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" sx={{ color: 'secondary.main', fontWeight: 700, mb: 1 }}>
                Media & Asset Manager
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                Upload, optimize, and organize site backgrounds, banners, story tabs, attire inspiration slides, and color palettes.
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
              <PeopleAlt sx={{ fontSize: 44, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" sx={{ color: 'secondary.main', fontWeight: 700, mb: 1 }}>
                RSVP Summary Report
              </Typography>
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
              <Palette sx={{ fontSize: 44, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" sx={{ color: 'secondary.main', fontWeight: 700, mb: 1 }}>
                Theme & Typography Settings
              </Typography>
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