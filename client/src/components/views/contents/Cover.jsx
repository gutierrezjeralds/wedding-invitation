import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { Text } from '../utils/CustomComponents';
import { CONTENT } from '../utils/Constants';
import { motion } from 'framer-motion';

// --- Sparkle Star Component (4-Point Twinkling Star) ---
function SparklingStar({ color, size }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            style={{ filter: `drop-shadow(0px 0px 6px ${color})` }}
        >
            <path
                d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z"
                fill={color}
            />
        </svg>
    );
}

// --- Majestic SVG Butterfly Component (Wine Red & Dusty Rose Accents) ---
function MajesticButterfly({ delay, startX, startY, endX, endY, scale, flapSpeed, rotateStart, rotateEnd, gradientId }) {
    return (
        <motion.div
            initial={{ 
                left: `${startX}vw`, 
                top: `${startY}vh`, 
                opacity: 0, 
                scale: 0 
            }}
            animate={{ 
                left: [`${startX}vw`, `${(startX + endX) / 2}vw`, `${endX}vw`],
                top: [`${startY}vh`, `${(startY + endY) / 2}vh`, `${endY}vh`],
                opacity: [0, 0.95, 0.85, 0],
                scale: [scale * 0.3, scale * 1.25, scale * 0.95, scale * 0.2],
                rotate: [rotateStart, rotateStart + 35, rotateEnd],
            }}
            transition={{
                duration: 4.2,
                delay: delay,
                ease: "easeInOut",
                repeat: Infinity,
            }}
            style={{
                position: 'absolute',
                zIndex: 6,
                pointerEvents: 'none',
            }}
        >
            {/* Wing Flapping Physics */}
            <motion.svg
                width="34"
                height="34"
                viewBox="0 0 24 24"
                fill="none"
                animate={{ scaleX: [1, 0.15, 1] }}
                transition={{ duration: flapSpeed, repeat: Infinity, ease: "easeInOut" }}
            >
                {/* Upper Wings */}
                <path
                    d="M12 12C10 -2 2 2 3 9C3.5 12.5 8 13.5 12 12ZM12 12C14 -2 22 2 21 9C20.5 12.5 16 13.5 12 12Z"
                    fill={`url(#${gradientId})`}
                />
                {/* Lower Wings */}
                <path
                    d="M12 12C9 14 4 17 6 21C7.5 22.5 10.5 18.5 12 12ZM12 12C15 14 20 17 18 21C16.5 22.5 13.5 18.5 12 12Z"
                    fill={`url(#${gradientId})`}
                />
                <defs>
                    {/* Wine Red & Gold Palette */}
                    <linearGradient id="wineRedGold" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FFFFFF" />
                        <stop offset="30%" stopColor="#D8A7B1" /> {/* Dusty Rose */}
                        <stop offset="70%" stopColor="#6B1D2F" /> {/* Deep Wine Red */}
                        <stop offset="100%" stopColor="#3A0D17" />
                    </linearGradient>

                    {/* Dusty Rose & Champagne Palette */}
                    <linearGradient id="dustyRoseGold" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FAF5ED" /> {/* Ivory */}
                        <stop offset="45%" stopColor="#E8C5CE" /> {/* Soft Dusty Rose */}
                        <stop offset="85%" stopColor="#C48B96" /> {/* Muted Rose */}
                        <stop offset="100%" stopColor="#8A6D3B" /> {/* Champagne Gold */}
                    </linearGradient>
                </defs>
            </motion.svg>
        </motion.div>
    );
}

export default function CurtainIntro() {
    const navigate = useNavigate();
    const [isOpening, setIsOpening] = useState(false);

    // Generate 38 completely randomized butterfly trajectories across the full viewport
    const butterflySwarm = useMemo(() => {
        return Array.from({ length: 38 }).map((_, i) => {
            const startX = Math.random() * 90 + 5; // Spread 5vw to 95vw
            const startY = Math.random() * 80 + 10; // Spread 10vh to 90vh
            const driftX = (Math.random() - 0.5) * 40; // Horizontal sway (-20vw to +20vw)
            const driftY = -(Math.random() * 35 + 20); // Upward float (-20vh to -55vh)

            return {
                id: i,
                delay: (i % 10) * 0.12 + Math.random() * 0.15,
                startX,
                startY,
                endX: Math.max(2, Math.min(98, startX + driftX)),
                endY: startY + driftY,
                scale: 0.5 + Math.random() * 0.95,
                flapSpeed: 0.16 + Math.random() * 0.14,
                rotateStart: (Math.random() - 0.5) * 60,
                rotateEnd: (Math.random() - 0.5) * 90,
                gradientId: i % 2 === 0 ? 'wineRedGold' : 'dustyRoseGold',
            };
        });
    }, []);

    useEffect(() => {
        const openTimer = setTimeout(() => {
            setIsOpening(true);
        }, 1500);

        const redirectTimer = setTimeout(() => {
            navigate('/home', { replace: true });
        }, 4500);

        return () => {
            clearTimeout(openTimer);
            clearTimeout(redirectTimer);
        };
    }, [navigate]);

    return (
        <Box
            sx={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                overflow: 'hidden',
                bgcolor: '#121914', 
                background: 'radial-gradient(circle at 50% 50%, #223225 0%, #0c120d 90%)',
            }}
        >
            {/* --- ENCHANTED REVEAL BACKGROUND --- */}
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                }}
            >
                {/* Majestic Pulsing Champagne & Wine Red Aura */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ 
                        opacity: isOpening ? [0, 1, 0.65] : 0, 
                        scale: isOpening ? [0.5, 1.45, 1.25] : 0.5 
                    }}
                    transition={{ duration: 3.0, ease: "easeOut" }}
                    style={{
                        position: 'absolute',
                        width: '95vw',
                        height: '95vw',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(107, 29, 47, 0.35) 0%, rgba(216, 167, 177, 0.22) 40%, rgba(212, 175, 55, 0.15) 70%, transparent 85%)',
                        filter: 'blur(45px)',
                    }}
                />

                {/* Sparkling 4-Point Stars (Replacing Round Dots) */}
                {Array.from({ length: 42 }).map((_, i) => {
                    const particleColors = ['#FAF5ED', '#D8A7B1', '#6B1D2F', '#D4AF37', '#FFFFFF'];
                    const color = particleColors[i % particleColors.length];
                    const starSize = (i % 3) * 6 + 10; // Sizes between 10px and 22px

                    return (
                        <motion.div
                            key={`star-${i}`}
                            initial={{ 
                                x: (i % 10 - 4.5) * 85, 
                                y: Math.floor(i / 10 - 2) * 110, 
                                opacity: 0, 
                                scale: 0.2,
                                rotate: 0,
                            }}
                            animate={isOpening ? {
                                y: [Math.floor(i / 10 - 2) * 110, Math.floor(i / 10 - 2) * 110 - 120],
                                opacity: [0, 1, 0.8, 0],
                                scale: [0.2, 1.3, 0.6, 0.1],
                                rotate: [0, 90, 180],
                            } : { opacity: 0 }}
                            transition={{
                                duration: 2.4 + (i % 5) * 0.3,
                                repeat: Infinity,
                                delay: (i % 8) * 0.12,
                                ease: "easeInOut",
                            }}
                            style={{
                                position: 'absolute',
                                pointerEvents: 'none',
                            }}
                        >
                            <SparklingStar color={color} size={starSize} />
                        </motion.div>
                    );
                })}
            </Box>

            {/* --- RANDOMIZED MAJESTIC BUTTERFLY SWARM --- */}
            {isOpening && butterflySwarm.map((b) => (
                <MajesticButterfly
                    key={b.id}
                    delay={b.delay}
                    startX={b.startX}
                    startY={b.startY}
                    endX={b.endX}
                    endY={b.endY}
                    scale={b.scale}
                    flapSpeed={b.flapSpeed}
                    rotateStart={b.rotateStart}
                    rotateEnd={b.rotateEnd}
                    gradientId={b.gradientId}
                />
            ))}

            {/* --- WINE RED & GOLD MAGIC SEAM BURST --- */}
            <motion.div
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ 
                    opacity: isOpening ? [0, 1, 0] : 0,
                    scaleY: isOpening ? [0, 1, 1] : 0,
                }}
                transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '4px',
                    height: '100vh',
                    background: 'linear-gradient(to bottom, transparent, #FAF5ED, #D8A7B1, #6B1D2F, #FAF5ED, transparent)',
                    boxShadow: '0 0 35px 12px rgba(107, 29, 47, 0.85), 0 0 20px 6px #D8A7B1',
                    zIndex: 5,
                }}
            />

            {/* --- LEFT CURTAIN PANEL --- */}
            <motion.div
                initial={{ x: '0%' }}
                animate={{ x: isOpening ? '-100%' : '0%' }}
                transition={{ 
                    duration: 2.8,
                    ease: [0.65, 0, 0.35, 1] 
                }}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '50vw',
                    height: '100vh',
                    overflow: 'hidden',
                    zIndex: 2,
                    willChange: 'transform',
                }}
            >
                <Box
                    sx={{
                        width: '100vw',
                        height: '100vh',
                        position: 'relative',
                        bgcolor: '#111111',
                    }}
                >
                    <CoverContent isOpening={isOpening} />
                </Box>
            </motion.div>

            {/* --- RIGHT CURTAIN PANEL --- */}
            <motion.div
                initial={{ x: '0%' }}
                animate={{ x: isOpening ? '100%' : '0%' }}
                transition={{ 
                    duration: 2.8,
                    ease: [0.65, 0, 0.35, 1] 
                }}
                style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '50vw',
                    height: '100vh',
                    overflow: 'hidden',
                    zIndex: 2,
                    willChange: 'transform',
                }}
            >
                <Box
                    sx={{
                        width: '100vw',
                        height: '100vh',
                        position: 'relative',
                        left: '-50vw',
                        bgcolor: '#111111',
                    }}
                >
                    <CoverContent isOpening={isOpening} />
                </Box>
            </motion.div>
        </Box>
    );
}

// Full Magazine Cover (07 17 27 Stack)
function CoverContent({ isOpening }) {
    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
            }}
        >
            {/* Background Editorial Image */}
            <motion.div
                animate={{ scale: isOpening ? 1.08 : 1 }}
                transition={{ duration: 3.5, ease: "easeOut" }}
                style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                }}
            >
                <Box
                    component="img"
                    src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80"
                    alt="Wedding Editorial Cover"
                    sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        filter: 'grayscale(50%) contrast(110%) brightness(80%)',
                    }}
                />
            </motion.div>

            {/* Warm Soft Vignette Tint */}
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    background:
                    'radial-gradient(circle at 50% 50%, rgba(107, 29, 47, 0.25) 0%, rgba(0, 0, 0, 0.70) 80%)',
                    mixBlendMode: 'multiply',
                }}
            />

            {/* Stacked 07 / 17 / 27 Typography */}
            <Box
                sx={{
                    position: 'relative',
                    zIndex: 1,
                    textAlign: 'center',
                    userSelect: 'none',
                }}
            >
                <Typography
                    variant="h1"
                    sx={{
                        fontFamily: '"Cormorant Garamond", "Pinyon Script", serif',
                        fontStyle: 'italic',
                        fontWeight: 400,
                        fontSize: { xs: '6.5rem', sm: '9.5rem', md: '12rem' },
                        lineHeight: 0.8,
                        color: '#FFFFFF',
                        textShadow: '2px 4px 16px rgba(0, 0, 0, 0.7)',
                        letterSpacing: '-0.02em',
                    }}
                >
                    07
                </Typography>

                <Typography
                    variant="h1"
                    sx={{
                        fontFamily: '"Cormorant Garamond", "Pinyon Script", serif',
                        fontStyle: 'italic',
                        fontWeight: 400,
                        fontSize: { xs: '6.5rem', sm: '9.5rem', md: '12rem' },
                        lineHeight: 0.8,
                        color: '#FFFFFF',
                        textShadow: '2px 4px 16px rgba(0, 0, 0, 0.8)',
                        letterSpacing: '-0.02em',
                        my: { xs: -1, sm: -2 },
                    }}
                >
                    17
                </Typography>

                <Typography
                    variant="h1"
                    sx={{
                        fontFamily: '"Cormorant Garamond", "Pinyon Script", serif',
                        fontStyle: 'italic',
                        fontWeight: 400,
                        fontSize: { xs: '6.5rem', sm: '9.5rem', md: '12rem' },
                        lineHeight: 0.8,
                        color: '#FFFFFF',
                        textShadow: '2px 4px 16px rgba(0, 0, 0, 0.7)',
                        letterSpacing: '-0.02em',
                    }}
                >
                    27
                </Typography>

                <Text
                    variant="h3"
                    className="great-vibes-regular mt-5 d-block"
                    sx={{
                        color: '#FAF5ED',
                        opacity: 0.9,
                    }}
                    textKey={CONTENT.TITLE_NAME}
                />
            </Box>
        </Box>
    );
}