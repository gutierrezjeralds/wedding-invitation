import { useState } from 'react';
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

const navItems = [
    { label: 'Home', href: '/home' },
    { label: 'Story', href: '/story' },
    { label: 'Wedding', href: '/wedding' },
    { label: 'Entourage', href: '/entourage' },
    { label: 'Attire', href: '/attire' },
];

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prev) => !prev);
    };

    return (
      <Box>
        {/* =========================
            FULL-WIDTH BANNER
        ========================== */}
        <Box
            sx={{
              width: '100%',
              py: {
                xs: 2,
                sm: 3,
              },
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
            }}
        >
          <Container maxWidth="lg">
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
          </Container>
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
                component="div"
                sx={{
                  flexGrow: 1,
                  fontSize: {
                    xs: '1.1rem',
                    sm: '1.25rem',
                  },
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
                {navItems.map((item) => (
                  <Button
                    key={item.href}
                    color="inherit"
                    href={item.href}
                  >
                    {item.label}
                  </Button>
                ))}
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
              {navItems.map((item) => (
                <ListItem key={item.href} disablePadding>
                  <ListItemButton
                    component="a"
                    href={item.href}
                    onClick={handleDrawerToggle}
                  >
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </Box>
    );
}