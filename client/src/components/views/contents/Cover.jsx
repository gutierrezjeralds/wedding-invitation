import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { Text } from '../utils/CustomComponents';
import { CONTENT } from '../utils/Constants';
import { motion } from 'framer-motion';

// --- Sparkling 4-Point Star Component ---
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

// --- Enchanted SVG Butterfly with Translucent Wings & Gold Filigree ---
function EnchantedFairyButterfly({ idPrefix, primaryColor, secondaryColor, size = 36 }) {
    const gradPrimary = `${idPrefix}-grad-primary`;
    const gradSecondary = `${idPrefix}-grad-secondary`;
    const goldGrad = `${idPrefix}-grad-gold`;

    return (
        <svg viewBox="0 0 140 140" width={size} height={size} style={{ overflow: 'visible' }}>
            <defs>
                <linearGradient id={gradPrimary} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={primaryColor} stopOpacity="0.88" />
                    <stop offset="50%" stopColor={secondaryColor} stopOpacity="0.75" />
                    <stop offset="100%" stopColor="#FFF8E7" stopOpacity="0.9" />
                </linearGradient>

                <linearGradient id={gradSecondary} x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FFF" stopOpacity="0.95" />
                    <stop offset="60%" stopColor={secondaryColor} stopOpacity="0.65" />
                    <stop offset="100%" stopColor={primaryColor} stopOpacity="0.8" />
                </linearGradient>

                <linearGradient id={goldGrad} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FDF0A6" />
                    <stop offset="50%" stopColor="#D4AF37" />
                    <stop offset="100%" stopColor="#AA7C11" />
                </linearGradient>
            </defs>

            <g className="butterfly-svg-group">
                {/* LEFT WING GROUP */}
                <g className="wing-left" style={{ transformOrigin: '70px 70px' }}>
                    <path d="M70 70 C35 10, 2 20, 8 58 C14 82, 52 76, 70 70 Z" fill={`url(#${gradPrimary})`} />
                    <path d="M70 70 C42 24, 18 32, 22 56 C26 68, 56 68, 70 70 Z" fill={`url(#${gradSecondary})`} />
                    <path
                        d="M70 70 C48 38, 26 38, 12 48 M70 70 C42 52, 28 54, 18 62 M70 70 C54 62, 38 68, 26 70"
                        stroke={`url(#${goldGrad})`}
                        strokeWidth="0.85"
                        fill="none"
                        opacity="0.85"
                    />
                    <path d="M70 70 C46 78, 22 82, 28 108 C34 122, 56 128, 62 102 C64 94, 68 82, 70 70 Z" fill={`url(#${gradPrimary})`} />
                </g>

                {/* RIGHT WING GROUP */}
                <g className="wing-right" style={{ transformOrigin: '70px 70px' }}>
                    <path d="M70 70 C105 10, 138 20, 132 58 C126 82, 88 76, 70 70 Z" fill={`url(#${gradPrimary})`} />
                    <path d="M70 70 C98 24, 122 32, 118 56 C114 68, 84 68, 70 70 Z" fill={`url(#${gradSecondary})`} />
                    <path
                        d="M70 70 C92 38, 114 38, 128 48 M70 70 C98 52, 112 54, 122 62 M70 70 C86 62, 102 68, 114 70"
                        stroke={`url(#${goldGrad})`}
                        strokeWidth="0.85"
                        fill="none"
                        opacity="0.85"
                    />
                    <path d="M70 70 C94 78, 118 82, 112 108 C106 122, 84 128, 78 102 C76 94, 72 82, 70 70 Z" fill={`url(#${gradPrimary})`} />
                </g>

                {/* SLENDER BODY WITH STAR CORE & ANTENNAE */}
                <path d="M70 48 C68.5 48, 68.5 90, 70 90 C71.5 90, 71.5 48, 70 48 Z" fill={`url(#${goldGrad})`} />
                <circle cx="70" cy="45" r="2.5" fill="#FFF8E7" />
                <path d="M70 44 Q60 24 48 20 M70 44 Q80 24 92 20" stroke={`url(#${goldGrad})`} strokeWidth="1.2" fill="none" strokeLinecap="round" />
            </g>
        </svg>
    );
}

// Swarm Animated Wrapper for Each Butterfly
function SwarmButterflyItem({ delay, startX, startY, endX, endY, scale, flapSpeed, rotateStart, rotateEnd, idPrefix, primaryColor, secondaryColor }) {
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
            {/* Wing Flapping Physics Motion Container */}
            <motion.div
                animate={{ scaleX: [1, 0.2, 1] }}
                transition={{ duration: flapSpeed, repeat: Infinity, ease: "easeInOut" }}
            >
                <EnchantedFairyButterfly
                    idPrefix={idPrefix}
                    primaryColor={primaryColor}
                    secondaryColor={secondaryColor}
                    size={38 * scale}
                />
            </motion.div>
        </motion.div>
    );
}

export default function CurtainIntro() {
    const navigate = useNavigate();
    const [isOpening, setIsOpening] = useState(false);

    // Generate 38 completely randomized butterfly trajectories across the viewport
    const butterflySwarm = useMemo(() => {
        return Array.from({ length: 20 }).map((_, i) => {
            const startX = Math.random() * 90 + 5; // Spread 5vw to 95vw
            const startY = Math.random() * 80 + 10; // Spread 10vh to 90vh
            const driftX = (Math.random() - 0.5) * 40; // Horizontal sway (-20vw to +20vw)
            const driftY = -(Math.random() * 35 + 20); // Upward float (-20vh to -55vh)

            const isWineRed = i % 2 === 0;

            return {
                id: i,
                idPrefix: `fairy-swarm-${i}`,
                delay: (i % 10) * 0.12 + Math.random() * 0.15,
                startX,
                startY,
                endX: Math.max(2, Math.min(98, startX + driftX)),
                endY: startY + driftY,
                scale: 0.55 + Math.random() * 0.9,
                flapSpeed: 0.16 + Math.random() * 0.14,
                rotateStart: (Math.random() - 0.5) * 60,
                rotateEnd: (Math.random() - 0.5) * 90,
                primaryColor: isWineRed ? '#6B1D2F' : '#D8A7B1',
                secondaryColor: isWineRed ? '#D8A7B1' : '#F8C8DC',
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

                {/* Sparkling 4-Point Stars (Twinkling floating particles) */}
                {Array.from({ length: 42 }).map((_, i) => {
                    const particleColors = ['#FAF5ED', '#D8A7B1', '#6B1D2F', '#D4AF37', '#FFFFFF'];
                    const color = particleColors[i % particleColors.length];
                    const starSize = (i % 3) * 6 + 10;

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

            {/* --- ENCHANTED FAIRY BUTTERFLY SWARM --- */}
            {isOpening && butterflySwarm.map((b) => (
                <SwarmButterflyItem
                    key={b.id}
                    idPrefix={b.idPrefix}
                    delay={b.delay}
                    startX={b.startX}
                    startY={b.startY}
                    endX={b.endX}
                    endY={b.endY}
                    scale={b.scale}
                    flapSpeed={b.flapSpeed}
                    rotateStart={b.rotateStart}
                    rotateEnd={b.rotateEnd}
                    primaryColor={b.primaryColor}
                    secondaryColor={b.secondaryColor}
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