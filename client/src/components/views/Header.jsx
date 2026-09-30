import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
    AppBar,
    Box,
    Button,
    Container,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Toolbar,
} from '@mui/material';
import { CONTENT } from './utils/Constants';

import MenuIcon from '@mui/icons-material/Menu';
import imgLogo from '../assets/img/header/header_logo.png';
import ParallaxBanner from '../views/utils/ParallaxBanner';

export default function Header() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bannerUrl, setBannerUrl] = useState('');

  const navItems = [
      { label: CONTENT.PAGE_TITLE_HOME, href: '/home' },
      { label: CONTENT.PAGE_TITLE_STORY, href: '/story' },
      { label: CONTENT.PAGE_TITLE_WEDDING, href: '/wedding' },
      { label: CONTENT.PAGE_TITLE_ENTOURAGE, href: '/entourage' },
      { label: CONTENT.PAGE_TITLE_ATTIRE, href: '/attire' },
      { label: CONTENT.PAGE_TITLE_FAQ, href: '/faq' },
  ];

  const handleDrawerToggle = () => {
      setMobileOpen((prev) => !prev);
  };

  useEffect(() => {
    const currentPath = location.pathname.replace('/', '') || 'home';

    // Resolves the image path relative to the current file dynamically
    const dynamicBannerUrl = new URL(
      `../assets/img/header/banner/${currentPath}.jpeg`,
      import.meta.url
    ).href;

    setBannerUrl(dynamicBannerUrl);
  }, [location.pathname]);

  return (
    <Box>
      {/* =========================
          HEADER PARALLAX BANNER
      ========================== */}
      <ParallaxBanner
          image={bannerUrl}
          height={{ xs: '55vh', sm: '65vh', md: '70vh' }}
      />

      {/* =========================
          FULL-WIDTH NAVIGATION
      ========================== */}
      <AppBar position="static" color="default" elevation={1}>
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ minHeight: { xs: 56, sm: 64 } }}>
            {/* OUTER FLEX CONTAINER (Not a link, occupies space) */}
            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
              {/* LOGO LINK CONTAINER (Clickable area tightly wrapped around image) */}
              <Box
                component={RouterLink}
                to="/home"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  width: 'fit-content', // Restricts wrapper width strictly to logo size
                }}
              >
                <Box
                  component="img"
                  src={imgLogo}
                  alt="JS"
                  sx={{
                    height: 30,
                    width: 'auto',
                    objectFit: 'contain',
                    transition: 'opacity 0.2s ease-in-out',
                    '&:hover': {
                      opacity: 0.8,
                    },
                  }}
                />
              </Box>
            </Box>

            {/* DESKTOP NAVIGATION */}
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1 }}>
              {navItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Button
                    key={item.href}
                    component={RouterLink}
                    to={item.href}
                    color="inherit"
                    className={isActive ? 'header-nav-active' : 'header-nav-item'}
                    sx={{
                      fontWeight: isActive ? 'bold' : 'normal',
                      borderBottom: isActive ? 2 : 0,
                      borderColor: 'primary.main',
                      borderRadius: 0,
                      opacity: isActive ? 1 : 0.8,
                      '&:hover': {
                        opacity: 1,
                        bgcolor: 'action.hover',
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                );
              })}
            </Box>

            {/* MOBILE MENU BUTTON */}
            <IconButton
              color="inherit"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ display: { xs: 'flex', sm: 'none' } }}
              aria-label="open navigation menu"
            >
              <MenuIcon fontSize='large' />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* MOBILE DRAWER */}
      <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle}>
        <Box sx={{ width: { xs: '80vw', sm: 300 } }} role="presentation">
          <List>
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <ListItem key={item.href} disablePadding>
                  <ListItemButton
                    component={RouterLink}
                    to={item.href}
                    selected={isActive}
                    onClick={handleDrawerToggle}
                    className={`mobile-nav-item ${isActive ? 'is-active' : ''}`}
                    sx={{
                      '&.Mui-selected': {
                        bgcolor: 'primary.light',
                        color: 'primary.contrastText',
                        '&:hover': {
                          bgcolor: 'primary.main',
                        },
                      },
                    }}
                  >
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontWeight: isActive ? 'bold' : 'normal',
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}