import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import { PeopleAlt, Palette } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { PageTitle } from '../../utils/CustomComponents';

export default function AdminHome() {
  const navigate = useNavigate();

  return (
    <Box sx={{ py: 2, px: 2 }}>
      <PageTitle
        title="Welcome to Admin Dashboard"
        subtitle="Manage website aesthetics, view real-time RSVP analytics, and export guest check-in sheets."
      />

      <Grid container spacing={3} sx={{ mt: 3, justifyContent: 'center' }}>
        <Grid item xs={12} sm={6} md={5}>
          <Card
            elevation={0}
            onClick={() => navigate('/admin/rsvp')}
            sx={{
              p: 2,
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

        <Grid item xs={12} sm={6} md={5}>
          <Card
            elevation={0}
            onClick={() => navigate('/admin/theme')}
            sx={{
              p: 2,
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