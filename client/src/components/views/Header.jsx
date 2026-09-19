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
    Typography,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import bannerImage from '../assets/img/header_banner.jpeg';

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
          HALF-PAGE BANNER WITH IMAGE
      ========================== */}
      <Box
          sx={{
            width: '100%',
            height: '70vh',
            backgroundImage: `url(${bannerImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
      >
        {/* <Container maxWidth="lg">
            <Typography
              component="h1"
              variant="h4"
              sx={{
                textAlign: {
                  xs: 'center',
                  sm: 'left',
                },
                fontSize: {
                  xs: '1.5rem',
                  sm: '2rem',
                  md: '2.125rem',
                },
                fontWeight: 'bold',
              }}
            >
              My Website
            </Typography>
        </Container> */}
      </Box>

      {/* =========================
          FULL-WIDTH NAVIGATION
      ========================== */}
      <AppBar position="static" color="default" elevation={1}>
        <Container maxWidth="lg">
          <Toolbar
            disableGutters
            sx={{
              minHeight: {
                xs: 56,
                sm: 64,
              },
            }}
          >
            {/* Logo */}
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{
                flexGrow: 1,
                fontSize: {
                  xs: '1.1rem',
                  sm: '1.25rem',
                },
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              Logo
            </Typography>

            {/* =========================
                DESKTOP NAVIGATION
            ========================== */}
            <Box
              sx={{
                display: {
                  xs: 'none',
                  sm: 'flex',
                },
                gap: 1,
              }}
            >
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

            {/* =========================
                MOBILE MENU BUTTON
            ========================== */}
            <IconButton
              color="inherit"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{
                display: {
                  xs: 'flex',
                  sm: 'none',
                },
              }}
              aria-label="open navigation menu"
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* =========================
          MOBILE DRAWER
      ========================== */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
      >
        <Box
          sx={{
            width: {
              xs: '80vw',
              sm: 300,
            },
          }}
          role="presentation"
        >
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