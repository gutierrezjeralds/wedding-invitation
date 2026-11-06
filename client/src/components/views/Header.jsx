import React, { useState } from 'react';
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
    Tooltip
} from '@mui/material';
import { Menu, PictureAsPdf } from '@mui/icons-material'

import { useMedia } from './utils/MediaContext';
import imgLogo from '../assets/img/header/header_logo.png';
import ParallaxBanner from '../views/utils/ParallaxBanner';
import { useContent } from './utils/ConstantContent';
import { downloadWeddingDetailsPdf } from './utils/GenerateWeddingPdf';

export default function Header() {
  // Retrieval from context cache
  const { getPageContent } = useContent();
  const CONTENT = getPageContent('global');
  const CONTENT_ENTOURAGE = getPageContent('entourage');
  
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { getAsset } = useMedia();

  const navItems = [
      { label: CONTENT?.PAGE_TITLE_HOME, href: '/home' },
      { label: CONTENT?.PAGE_TITLE_STORY, href: '/story' },
      { label: CONTENT?.PAGE_TITLE_WEDDING, href: '/wedding' },
      { label: CONTENT?.PAGE_TITLE_ENTOURAGE, href: '/entourage' },
      { label: CONTENT?.PAGE_TITLE_ATTIRE, href: '/attire' },
      { label: CONTENT?.PAGE_TITLE_FAQ, href: '/faq' },
      { label: CONTENT?.PAGE_TITLE_GIFT, href: '/gift' },
      { label: CONTENT?.BUTTON_RSVP, href: '/rsvp' },
  ];

  const handleDrawerToggle = () => {
      setMobileOpen((prev) => !prev);
  };

  const handleDownloadPdf = () => {
      downloadWeddingDetailsPdf(CONTENT, CONTENT_ENTOURAGE);
  };

  // Determine current page key (e.g., 'home', 'story', 'attire', etc.)
  const rawPath = location.pathname.replace('/', '').toLowerCase();
  const currentPage = rawPath === '' ? 'home' : rawPath;

  // Retrieve banner asset dynamically from MongoDB via MediaContext
  const bannerUrl = getAsset(currentPage, 'banner') || "";

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
            {/* OUTER FLEX CONTAINER */}
            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
              {/* LOGO LINK CONTAINER */}
              <Box
                component={RouterLink}
                to="/home"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  width: 'fit-content',
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
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 1 }}>
              {navItems.map((item) => {
                const isActive = location.pathname === item.href;
                const isRsvp = item.href === '/rsvp';

                if (isRsvp) {
                  return (
                    <React.Fragment key={item.href}>
                      {/* PDF DOWNLOAD BUTTON (BEside RSVP) */}
                      <Tooltip title="Download Wedding Details & Entourage PDF" placement="bottom">
                        <Button
                          variant="outlined"
                          onClick={handleDownloadPdf}
                          startIcon={<PictureAsPdf />}
                          sx={{
                            ml: 1,
                            px: 2,
                            py: 0.8,
                            borderRadius: '20px',
                            borderColor: '#7A1C31',
                            color: '#7A1C31',
                            fontWeight: 700,
                            letterSpacing: '0.03em',
                            '&:hover': {
                              borderColor: '#8B263E',
                              bgcolor: 'rgba(122, 28, 49, 0.04)',
                            },
                          }}
                        >
                          PDF
                        </Button>
                      </Tooltip>

                      {/* RSVP BUTTON */}
                      <Button
                        component={RouterLink}
                        to={item.href}
                        variant="contained"
                        className="button-wedding-primary"
                        sx={{
                          ml: 1,
                          px: 2.5,
                          py: 0.8,
                          borderRadius: '20px',
                          bgcolor: '#7A1C31',
                          color: '#ffffff',
                          fontWeight: 700,
                          letterSpacing: '0.05em',
                          boxShadow: '0px 2px 6px rgba(122, 28, 49, 0.3)',
                          '&:hover': {
                            bgcolor: '#8B263E',
                            boxShadow: '0px 4px 10px rgba(122, 28, 49, 0.4)',
                          },
                        }}
                      >
                        {item.label}
                      </Button>
                    </React.Fragment>
                  );
                }

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
              <Menu fontSize='large' />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* MOBILE DRAWER */}
      <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle}>
        <Box sx={{ width: { xs: '80vw', sm: 300 }, p: 2 }} role="presentation">
          <List>
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              const isRsvp = item.href === '/rsvp';

              if (isRsvp) {
                return (
                  <React.Fragment key={item.href}>
                    {/* MOBILE PDF DOWNLOAD BUTTON */}
                    <ListItem disablePadding sx={{ mt: 2 }}>
                      <Button
                        fullWidth
                        variant="outlined"
                        onClick={() => {
                          handleDownloadPdf();
                          handleDrawerToggle();
                        }}
                        startIcon={<PictureAsPdf />}
                        sx={{
                          py: 1.2,
                          borderRadius: '25px',
                          borderColor: '#7A1C31',
                          color: '#7A1C31',
                          fontWeight: 700,
                          letterSpacing: '0.05em',
                          '&:hover': {
                            borderColor: '#8B263E',
                            bgcolor: 'rgba(122, 28, 49, 0.04)',
                          },
                        }}
                      >
                        DOWNLOAD DETAILS (PDF)
                      </Button>
                    </ListItem>

                    {/* MOBILE RSVP BUTTON */}
                    <ListItem disablePadding sx={{ mt: 1.5 }}>
                      <Button
                        fullWidth
                        component={RouterLink}
                        to={item.href}
                        variant="contained"
                        onClick={handleDrawerToggle}
                        sx={{
                          py: 1.2,
                          borderRadius: '25px',
                          bgcolor: '#7A1C31',
                          color: '#ffffff',
                          fontWeight: 700,
                          letterSpacing: '0.05em',
                          '&:hover': {
                            bgcolor: '#8B263E',
                          },
                        }}
                      >
                        {item.label}
                      </Button>
                    </ListItem>
                  </React.Fragment>
                );
              }

              return (
                <ListItem key={item.href} disablePadding>
                  <ListItemButton
                    component={RouterLink}
                    to={item.href}
                    selected={isActive}
                    onClick={handleDrawerToggle}
                    className={`mobile-nav-item ${isActive ? 'is-active' : ''}`}
                    sx={{
                      borderRadius: 1,
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