import React from 'react';
import Box from '@mui/material/Box';

const Butterfly = ({ primaryColor, secondaryColor, size = 60, pathClass }) => (
    <Box
        className={pathClass}
        sx={{
            width: size,
            height: size,
            position: 'absolute',
            pointerEvents: 'none',
            filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.15))',
        }}
    >
        <svg viewBox="0 0 100 100" width="100%" height="100%" style={{ overflow: 'visible' }}>
            <g>
                {/* Left Wing Group */}
                <g className="wing-left" style={{ transformOrigin: '50px 50px' }}>
                    <path d="M50 50 C20 10, 0 20, 10 55 C18 80, 45 65, 50 50 Z" fill={primaryColor} opacity="0.9" />
                    <path d="M50 50 C25 20, 10 25, 18 50 C22 62, 42 58, 50 50 Z" fill={secondaryColor} opacity="0.75" />
                </g>

                {/* Right Wing Group */}
                <g className="wing-right" style={{ transformOrigin: '50px 50px' }}>
                    <path d="M50 50 C80 10, 100 20, 90 55 C82 80, 55 65, 50 50 Z" fill={primaryColor} opacity="0.9" />
                    <path d="M50 50 C75 20, 90 25, 82 50 C78 62, 58 58, 50 50 Z" fill={secondaryColor} opacity="0.75" />
                </g>

                {/* Body */}
                <path d="M50 35 C48 35, 48 65, 50 65 C52 65, 52 35, 50 35 Z" fill="#2B1B17" />
                <path d="M50 35 Q42 20 38 18 M50 35 Q58 20 62 18" stroke="#2B1B17" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            </g>
        </svg>
    </Box>
);

export default function ButterflyAnimation({
  primary = '#722F37',
  secondary = '#F8C8DC',
}) {
  return (
    <Box
        sx={{
            position: 'relative',
            width: '100%',
            minHeight: '300px',
            overflow: 'hidden',

            // Global keyframe styles for wings and flight paths
            '& .wing-left': {
                animation: 'flutterLeft 0.3s infinite alternate ease-in-out',
            },
            '& .wing-right': {
                animation: 'flutterRight 0.3s infinite alternate ease-in-out',
            },
            '& .butterfly-path-1': {
                animation: 'flightPath1 10s infinite ease-in-out',
            },
            '& .butterfly-path-2': {
                animation: 'flightPath2 13s infinite ease-in-out',
            },

            '@keyframes flutterLeft': {
                '0%': { transform: 'scaleX(1) rotate(-5deg)' },
                '100%': { transform: 'scaleX(0.15) rotate(-5deg)' },
            },
            '@keyframes flutterRight': {
                '0%': { transform: 'scaleX(1) rotate(5deg)' },
                '100%': { transform: 'scaleX(0.15) rotate(5deg)' },
            },
            '@keyframes flightPath1': {
                '0%': { transform: 'translate(20px, 150px) rotate(15deg)' },
                '25%': { transform: 'translate(100px, 50px) rotate(-10deg)' },
                '50%': { transform: 'translate(220px, 120px) rotate(20deg)' },
                '75%': { transform: 'translate(150px, 200px) rotate(-20deg)' },
                '100%': { transform: 'translate(20px, 150px) rotate(15deg)' },
            },
            '@keyframes flightPath2': {
                '0%': { transform: 'translate(250px, 40px) rotate(-20deg)' },
                '33%': { transform: 'translate(140px, 180px) rotate(15deg)' },
                '66%': { transform: 'translate(30px, 80px) rotate(-15deg)' },
                '100%': { transform: 'translate(250px, 40px) rotate(-20deg)' },
            },
        }}
    >
        {/* Butterfly 1: Wine Red dominant */}
        <Butterfly
            primaryColor={primary}
            secondaryColor={secondary}
            size={60}
            pathClass="butterfly-path-1"
        />

        {/* Butterfly 2: Soft Blush dominant */}
        <Butterfly
            primaryColor={primary}
            secondaryColor={secondary}
            size={48}
            pathClass="butterfly-path-2"
        />
    </Box>
  );
}