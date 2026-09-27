import React, { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';

// Converts Hex color to smooth pastel RGBA glow
const hexToLightRgba = (hex, opacity = 0.6, lightenRatio = 0.65) => {
    if (!hex) return `rgba(255, 255, 255, ${opacity})`;
    let c = hex.replace('#', '');
    if (c.length === 3) c = c.split('').map((x) => x + x).join('');
    const num = parseInt(c, 16);

    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;

    const lightR = Math.round(r + (255 - r) * lightenRatio);
    const lightG = Math.round(g + (255 - g) * lightenRatio);
    const lightB = Math.round(b + (255 - b) * lightenRatio);

    return `rgba(${lightR}, ${lightG}, ${lightB}, ${opacity})`;
};

// Ethereal SVG Butterfly with Semi-Translucent Wings & Metallic Filigree
const EnchantedFairyButterfly = ({ primaryColor, secondaryColor, idPrefix = 'fairy', size = 72 }) => {
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

                {/* ELEGANT SLENDER BODY WITH STAR CORE */}
                <path d="M70 48 C68.5 48, 68.5 90, 70 90 C71.5 90, 71.5 48, 70 48 Z" fill={`url(#${goldGrad})`} />
                <circle cx="70" cy="45" r="2.5" fill="#FFF8E7" />
                <path d="M70 44 Q60 24 48 20 M70 44 Q80 24 92 20" stroke={`url(#${goldGrad})`} strokeWidth="1.2" fill="none" strokeLinecap="round" />
            </g>
        </svg>
    );
};

export default function GlobalButterflies({
    showLightTrail = true,
    primary = '#722F37',
    secondary = '#F8C8DC',
}) {
    const canvasRef = useRef(null);
    const bf1Ref = useRef(null);
    const bf2Ref = useRef(null);

    // Canvas Sparkle Trail Engine for real-time tracking behind floating elements
    useEffect(() => {
        if (!showLightTrail) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        class Particle {
            constructor(x, y, colorHex) {
                this.x = x + (Math.random() - 0.5) * 8;
                this.y = y + (Math.random() - 0.5) * 8;
                this.size = Math.random() * 2.5 + 1;
                this.color = hexToLightRgba(colorHex, 0.85);
                this.alpha = 1;
                this.decay = Math.random() * 0.015 + 0.01;
                this.vx = (Math.random() - 0.5) * 0.4;
                this.vy = Math.random() * 0.5 + 0.2;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.alpha -= this.decay;
            }

            draw(context) {
                if (this.alpha <= 0) return;
                context.save();
                context.globalCompositeOperation = 'lighter';
                context.beginPath();
                context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                context.fillStyle = this.color;
                context.shadowBlur = 6;
                context.shadowColor = this.color;
                context.fill();
                context.restore();
            }
        }

        let particles = [];

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Track current DOM positions of both butterflies to emit trails
            [
                { ref: bf1Ref, color: primary },
                { ref: bf2Ref, color: secondary }
            ].forEach(({ ref, color }) => {
                if (ref.current) {
                    const rect = ref.current.getBoundingClientRect();
                    if (rect.width > 0 && Math.random() < 0.6) {
                        particles.push(new Particle(rect.left + rect.width / 2, rect.top + rect.height / 2, color));
                    }
                }
            });

            // Update & render active dust particles
            for (let i = particles.length - 1; i >= 0; i--) {
                particles[i].update();
                particles[i].draw(ctx);
                if (particles[i].alpha <= 0) {
                    particles.splice(i, 1);
                }
            }

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [showLightTrail, primary, secondary]);

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

                /* Organic Wing Flap Physics */
                '& .wing-left': {
                    animation: 'organicFlapLeft 0.52s infinite ease-in-out',
                },
                '& .wing-right': {
                    animation: 'organicFlapRight 0.52s infinite ease-in-out',
                },

                /* Vertical Lift & Floating Motion */
                '& .butterfly-body-wrapper': {
                    animation: 'floatHover 2.4s infinite ease-in-out',
                },

                /* Global Floating Paths */
                '& .butterfly-global-1': {
                    position: 'absolute',
                    filter: `drop-shadow(0px 0px 12px ${hexToLightRgba(primary, 0.6)})`,
                    animation: 'enchantedPath1 34s infinite cubic-bezier(0.4, 0, 0.2, 1)',
                },
                '& .butterfly-global-2': {
                    position: 'absolute',
                    filter: `drop-shadow(0px 0px 12px ${hexToLightRgba(secondary, 0.7)})`,
                    animation: 'enchantedPath2 42s infinite cubic-bezier(0.4, 0, 0.2, 1)',
                },

                /* Keyframe Definitions */
                '@keyframes organicFlapLeft': {
                    '0%': { transform: 'scaleX(1) rotate(-4deg)' },
                    '40%': { transform: 'scaleX(0.18) rotate(4deg)' },
                    '100%': { transform: 'scaleX(1) rotate(-4deg)' },
                },
                '@keyframes organicFlapRight': {
                    '0%': { transform: 'scaleX(1) rotate(4deg)' },
                    '40%': { transform: 'scaleX(0.18) rotate(-4deg)' },
                    '100%': { transform: 'scaleX(1) rotate(4deg)' },
                },
                '@keyframes floatHover': {
                    '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                    '50%': { transform: 'translateY(-8px) rotate(-3deg)' },
                },
                '@keyframes enchantedPath1': {
                    '0%': { transform: 'translate(4vw, 82vh) rotate(18deg) scale(0.95)' },
                    '20%': { transform: 'translate(28vw, 42vh) rotate(-8deg) scale(1.05)' },
                    '40%': { transform: 'translate(58vw, 18vh) rotate(22deg) scale(0.88)' },
                    '60%': { transform: 'translate(86vw, 52vh) rotate(-15deg) scale(1)' },
                    '80%': { transform: 'translate(42vw, 86vh) rotate(-32deg) scale(0.92)' },
                    '100%': { transform: 'translate(4vw, 82vh) rotate(18deg) scale(0.95)' },
                },
                '@keyframes enchantedPath2': {
                    '0%': { transform: 'translate(88vw, 18vh) rotate(-22deg) scale(0.88)' },
                    '25%': { transform: 'translate(62vw, 65vh) rotate(15deg) scale(1.02)' },
                    '50%': { transform: 'translate(18vw, 35vh) rotate(-12deg) scale(0.9)' },
                    '75%': { transform: 'translate(32vw, 88vh) rotate(28deg) scale(0.98)' },
                    '100%': { transform: 'translate(88vw, 18vh) rotate(-22deg) scale(0.88)' },
                },
            }}
        >
            {/* Real-time Sparkle Canvas Overlay */}
            {showLightTrail && (
                <canvas
                    ref={canvasRef}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        pointerEvents: 'none',
                    }}
                />
            )}

            {/* Butterfly 1 */}
            <Box className="butterfly-global-1" ref={bf1Ref}>
                <Box className="butterfly-body-wrapper">
                    <EnchantedFairyButterfly
                        idPrefix="fairy1"
                        primaryColor={primary}
                        secondaryColor={secondary}
                        size={74}
                    />
                </Box>
            </Box>

            {/* Butterfly 2 */}
            <Box className="butterfly-global-2" ref={bf2Ref}>
                <Box className="butterfly-body-wrapper">
                    <EnchantedFairyButterfly
                        idPrefix="fairy2"
                        primaryColor={secondary}
                        secondaryColor={primary}
                        size={58}
                    />
                </Box>
            </Box>
        </Box>
    );
}