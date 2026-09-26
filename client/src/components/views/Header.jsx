import { useState } from 'react';
import { useTranslation } from 'react-i18next';
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

import MenuIcon from '@mui/icons-material/Menu';
import bannerImage from '../assets/img/header_banner.jpeg';
import imgLogo from '../assets/img/header_logo.png';
import ParallaxBanner from '../views/utils/ParallaxBanner';

export default function Header() {
  const { t: oI18n } = useTranslation();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
      { label: oI18n("page_title_home"), href: '/home' },
      { label: oI18n("page_title_story"), href: '/story' },
      { label: oI18n("page_title_wedding"), href: '/wedding' },
      { label: oI18n("page_title_entourage"), href: '/entourage' },
      { label: oI18n("page_title_attire"), href: '/attire' },
      { label: oI18n("page_title_faq"), href: '/faq' },
  ];

  const handleDrawerToggle = () => {
      setMobileOpen((prev) => !prev);
  };

  return (
    <Box>
      {/* =========================
          HEADER PARALLAX BANNER
      ========================== */}
      <ParallaxBanner
          image={bannerImage}
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
                    height: 20,
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
              <MenuIcon />
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