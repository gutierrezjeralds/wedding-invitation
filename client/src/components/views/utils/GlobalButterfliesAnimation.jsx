import React from 'react';
import Box from '@mui/material/Box';

// Blends input Hex towards White to create lighter, pastel glow colors
const hexToLightRgba = (hex, opacity = 0.6, lightenRatio = 0.65) => {
    if (!hex) return `rgba(255, 255, 255, ${opacity})`;
    let c = hex.replace('#', '');
    if (c.length === 3) c = c.split('').map((x) => x + x).join('');
    const num = parseInt(c, 16);

    // Extract base RGB
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;

    // Mix base color towards pure white (255) based on lightenRatio
    const lightR = Math.round(r + (255 - r) * lightenRatio);
    const lightG = Math.round(g + (255 - g) * lightenRatio);
    const lightB = Math.round(b + (255 - b) * lightenRatio);

    return `rgba(${lightR}, ${lightG}, ${lightB}, ${opacity})`;
};

// Dynamic LightTrail matching butterfly color
const LightTrail = ({ color }) => {
    const primaryGlow = hexToLightRgba(color, 0.65);
    const secondaryGlow = hexToLightRgba(color, 0.25);

    return (
        <Box
            className="butterfly-trail"
            sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '120px',
                height: '120px',
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none',
                zIndex: -1,
                // Radial light aura using butterfly color
                background: `radial-gradient(circle, ${primaryGlow} 0%, ${secondaryGlow} 40%, transparent 75%)`,
                borderRadius: '50%',
                filter: 'blur(8px)',
                animation: 'trailGlow 1.2s infinite alternate ease-in-out',
            }}
        />
    );
};

const SVGButterfly = ({ primaryColor, secondaryColor, size = 60 }) => (
    <svg viewBox="0 0 100 100" width={size} height={size} style={{ overflow: 'visible' }}>
        <g>
            <g className="wing-left" style={{ transformOrigin: '50px 50px' }}>
                <path d="M50 50 C20 10, 0 20, 10 55 C18 80, 45 65, 50 50 Z" fill={primaryColor} opacity="0.95" />
                <path d="M50 50 C25 20, 10 25, 18 50 C22 62, 42 58, 50 50 Z" fill={secondaryColor} opacity="0.8" />
            </g>
            <g className="wing-right" style={{ transformOrigin: '50px 50px' }}>
                <path d="M50 50 C80 10, 100 20, 90 55 C82 80, 55 65, 50 50 Z" fill={primaryColor} opacity="0.95" />
                <path d="M50 50 C75 20, 90 25, 82 50 C78 62, 58 58, 50 50 Z" fill={secondaryColor} opacity="0.8" />
            </g>
            <path d="M50 35 C48 35, 48 65, 50 65 C52 65, 52 35, 50 35 Z" fill="#2B1B17" />
            <path d="M50 35 Q42 20 38 18 M50 35 Q58 20 62 18" stroke="#2B1B17" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </g>
    </svg>
);

export default function GlobalButterflies({
  showLightTrail = true,
  primary = '#722F37',
  secondary = '#F8C8DC',
}) {
    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                pointerEvents: 'none',
                zIndex: 9999,
                overflow: 'hidden',

                '& .wing-left': { animation: 'flutterLeft 0.28s infinite alternate ease-in-out' },
                '& .wing-right': { animation: 'flutterRight 0.28s infinite alternate ease-in-out' },
                '& .butterfly-global-1': {
                    position: 'absolute',
                    filter: showLightTrail ? `drop-shadow(0px 0px 10px ${hexToLightRgba(primary, 0.7)})` : 'drop-shadow(0px 4px 6px rgba(0,0,0,0.15))',
                    animation: 'fullScreenFlight1 22s infinite ease-in-out',
                },
                '& .butterfly-global-2': {
                    position: 'absolute',
                    filter: showLightTrail ? `drop-shadow(0px 0px 10px ${hexToLightRgba(secondary, 0.8)})` : 'drop-shadow(0px 4px 6px rgba(0,0,0,0.15))',
                    animation: 'fullScreenFlight2 28s infinite ease-in-out',
                },

                '@keyframes flutterLeft': {
                    '0%': { transform: 'scaleX(1) rotate(-6deg)' },
                    '100%': { transform: 'scaleX(0.12) rotate(-6deg)' },
                },
                '@keyframes flutterRight': {
                    '0%': { transform: 'scaleX(1) rotate(6deg)' },
                    '100%': { transform: 'scaleX(0.12) rotate(6deg)' },
                },
                '@keyframes trailGlow': {
                    '0%': { transform: 'translate(-50%, -50%) scale(0.7)', opacity: 0.4 },
                    '100%': { transform: 'translate(-50%, -50%) scale(1.3)', opacity: 0.9 },
                },
                '@keyframes fullScreenFlight1': {
                    '0%': { transform: 'translate(5vw, 75vh) rotate(20deg)' },
                    '20%': { transform: 'translate(35vw, 20vh) rotate(-15deg)' },
                    '40%': { transform: 'translate(75vw, 45vh) rotate(30deg)' },
                    '60%': { transform: 'translate(85vw, 80vh) rotate(-25deg)' },
                    '80%': { transform: 'translate(40vw, 85vh) rotate(-40deg)' },
                    '100%': { transform: 'translate(5vw, 75vh) rotate(20deg)' },
                },
                '@keyframes fullScreenFlight2': {
                    '0%': { transform: 'translate(85vw, 15vh) rotate(-25deg)' },
                    '25%': { transform: 'translate(50vw, 65vh) rotate(20deg)' },
                    '50%': { transform: 'translate(15vw, 25vh) rotate(-10deg)' },
                    '75%': { transform: 'translate(25vw, 85vh) rotate(35deg)' },
                    '100%': { transform: 'translate(85vw, 15vh) rotate(-25deg)' },
                },
            }}
        >
        {/* Butterfly 1 Light Trail matches primary */}
        <Box className="butterfly-global-1">
            {showLightTrail && <LightTrail color={primary} />}
            <SVGButterfly primaryColor={primary} secondaryColor={secondary} size={68} />
        </Box>

        {/* Butterfly 2 Light Trail matches secondary */}
        <Box className="butterfly-global-2">
            {showLightTrail && <LightTrail color={secondary} />}
            <SVGButterfly primaryColor={secondary} secondaryColor={primary} size={54} />
        </Box>
        </Box>
    );
}