import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Link, Box } from '@mui/material';
import { Send } from '@mui/icons-material';
import { CONTENT } from '../utils/Constants';

// Elegant internal animations (No linear loading sweeps)
const enchantedKeyframes = {
    // Gentle golden breathing glow strictly inside the border
    '@keyframes innerGoldPulse': {
        '0%, 100%': {
            boxShadow: 'inset 0 0 10px rgba(212, 175, 55, 0.25), inset 0 0 20px rgba(255, 248, 231, 0.15)',
            borderColor: 'rgba(212, 175, 55, 0.45)',
        },
        '50%': {
            boxShadow: 'inset 0 0 22px rgba(212, 175, 55, 0.55), inset 0 0 30px rgba(255, 248, 231, 0.35)',
            borderColor: 'rgba(212, 175, 55, 0.85)',
        },
    },
    // Soft twinkle for corner stars
    '@keyframes starTwinkle': {
        '0%, 100%': {
            opacity: 0.25,
            transform: 'scale(0.7) rotate(0deg)',
            filter: 'drop-shadow(0 0 2px rgba(212, 175, 55, 0.3))',
        },
        '50%': {
            opacity: 0.95,
            transform: 'scale(1.25) rotate(45deg)',
            filter: 'drop-shadow(0 0 6px rgba(255, 248, 231, 0.8))',
        },
    },
    // Floating internal fairy dust specks
    '@keyframes fairyDustRise': {
        '0%': {
            transform: 'translateY(120%) scale(0.3)',
            opacity: 0,
        },
        '50%': {
            opacity: 0.85,
            transform: 'translateY(20%) scale(1.1)',
        },
        '100%': {
            transform: 'translateY(-120%) scale(0.2)',
            opacity: 0,
        },
    },
};

/**
 * 1. Enchanted Glass Card Link
 */
export function SparklingCardLink({ to, children, className = '' }) {
    return (
        <Link
            component={RouterLink}
            to={to}
            underline="none"
            className={className}
            sx={{
                color: 'inherit',
                display: 'block',
                position: 'relative',
                borderRadius: '12px',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                background: 'rgba(255, 255, 255, 0.65)',
                backdropFilter: 'blur(6px)',
                overflow: 'hidden', // Keeps all magic inside
                transition: 'all 0.35s ease-in-out',
                
                // Pure internal golden aura
                animation: 'innerGoldPulse 3.5s infinite ease-in-out',
                ...enchantedKeyframes,

                // Top-Right Twinkling Star
                '&::after': {
                    content: '"✦"',
                    position: 'absolute',
                    top: '6px',
                    right: '10px',
                    fontSize: '0.85rem',
                    color: '#D4AF37',
                    pointerEvents: 'none',
                    zIndex: 4,
                    animation: 'starTwinkle 2.5s infinite ease-in-out',
                },

                '&:hover': {
                    transform: 'translateY(-4px)',
                    background: 'rgba(255, 255, 255, 0.85)',
                    '& .fairy-dust-particle': {
                        animationDuration: '2s',
                    },
                },

                '& .MuiPaper-root': {
                    position: 'relative',
                    zIndex: 1,
                    backgroundColor: 'transparent',
                },
            }}
        >
            {/* Embedded Floating Fairy Dust Sparkles inside Content Box */}
            <Box
                className="fairy-dust-particle"
                sx={{
                    position: 'absolute',
                    left: '20%',
                    bottom: 0,
                    width: '3px',
                    height: '3px',
                    borderRadius: '50%',
                    backgroundColor: '#FFF8E7',
                    boxShadow: '0 0 5px 1px #D4AF37',
                    pointerEvents: 'none',
                    zIndex: 3,
                    animation: 'fairyDustRise 3.2s infinite ease-in-out',
                }}
            />
            <Box
                className="fairy-dust-particle"
                sx={{
                    position: 'absolute',
                    right: '25%',
                    bottom: 0,
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    backgroundColor: '#FFF',
                    boxShadow: '0 0 6px 1px #FFF8E7',
                    pointerEvents: 'none',
                    zIndex: 3,
                    animation: 'fairyDustRise 3.8s infinite ease-in-out 1.4s',
                }}
            />

            {children}
        </Link>
    );
}

/**
 * 2. Enchanted RSVP Button
 */
export function SparklingRsvpButton({ 
    to = '/rsvp', 
    onClick, 
    children = CONTENT.TITLE_RSVP, 
    className = 'mt-5', 
    sx = {} 
}) {
    return (
        <Button
            variant="outlined"
            component={to ? RouterLink : 'button'}
            to={to}
            onClick={onClick}
            className={className}
            startIcon={<Send sx={{ transition: 'transform 0.3s ease', color: '#D4AF37' }} />}
            sx={{
                width: '15rem',
                position: 'relative',
                borderRadius: '25px',
                overflow: 'hidden', // Strictly contained inside
                borderWidth: '1.5px',
                borderColor: '#D4AF37',
                color: 'inherit',
                background: 'rgba(255, 255, 255, 0.4)',
                backdropFilter: 'blur(4px)',
                
                animation: 'innerGoldPulse 2.8s infinite ease-in-out',
                transition: 'all 0.35s ease-in-out',
                ...enchantedKeyframes,

                // Top-Left Twinkling Star
                '&::before': {
                    content: '"✧"',
                    position: 'absolute',
                    top: '5px',
                    left: '14px',
                    fontSize: '0.8rem',
                    color: '#D4AF37',
                    animation: 'starTwinkle 2.2s infinite ease-in-out 0.4s',
                    pointerEvents: 'none',
                    zIndex: 3,
                },

                // Bottom-Right Twinkling Star
                '&::after': {
                    content: '"✦"',
                    position: 'absolute',
                    bottom: '5px',
                    right: '14px',
                    fontSize: '0.85rem',
                    color: '#D4AF37',
                    animation: 'starTwinkle 2.6s infinite ease-in-out 1.2s',
                    pointerEvents: 'none',
                    zIndex: 3,
                },

                '&:hover': {
                    transform: 'scale(1.02)',
                    borderColor: '#AA7C11',
                    backgroundColor: 'rgba(212, 175, 55, 0.12)',
                    '& .MuiButton-startIcon': {
                        transform: 'translateX(3px) rotate(-10deg)',
                    },
                },
                ...sx,
            }}
        >
            {children}
        </Button>
    );
}