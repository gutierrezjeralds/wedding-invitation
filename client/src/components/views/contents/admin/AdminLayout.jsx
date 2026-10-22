import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography
} from '@mui/material';
import { Dashboard, PeopleAlt, Palette } from '@mui/icons-material';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const DRAWER_WIDTH = 260;

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: 'Admin Home', icon: <Dashboard />, path: '/admin' },
    { text: 'RSVP Report', icon: <PeopleAlt />, path: '/admin/rsvp' },
    { text: 'Theme Settings', icon: <Palette />, path: '/admin/theme' },
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Left Navigation Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            borderRight: '1px solid rgba(107, 29, 47, 0.15)',
            bgcolor: 'background.paper',
          },
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            sx={{
              fontFamily: '"Great Vibes", cursive',
              color: 'primary.main',
              fontSize: '2.2rem',
              mx: 'auto',
              pt: 1,
            }}
          >
            Admin Portal
          </Typography>
        </Toolbar>

        <List sx={{ px: 2, mt: 2 }}>
          {menuItems.map((item) => {
            const isSelected = location.pathname === item.path;
            return (
              <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  onClick={() => navigate(item.path)}
                  sx={{
                    borderRadius: 2,
                    bgcolor: isSelected ? 'rgba(107, 29, 47, 0.08)' : 'transparent',
                    color: isSelected ? 'primary.main' : 'text.primary',
                    '&:hover': { bgcolor: 'rgba(107, 29, 47, 0.04)' },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: isSelected ? 'primary.main' : 'text.secondary',
                      minWidth: 40,
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontWeight: isSelected ? 700 : 500,
                      fontSize: '0.95rem',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>

      {/* Dynamic Content View */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: 'background.default', minHeight: '100vh' }}>
        <Outlet />
      </Box>
    </Box>
  );
}