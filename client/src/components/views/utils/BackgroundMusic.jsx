import React, { useState, useRef, useEffect } from 'react';
import { Box, Fab, Tooltip } from '@mui/material';
import { MusicNote, MusicOff, SkipNext } from '@mui/icons-material';

import track1 from '../../assets/music/track1.mp3';
import track2 from '../../assets/music/track1.mp3';

const playlist = [
    { title: "Song 1", src: track1 },
    { title: "Song 2", src: track2 },
];

export default function BackgroundMusic() {
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
        const attemptPlay = () => {
            if (audioRef.current && audioRef.current.paused) {
                audioRef.current
                    .play()
                    .then(() => {
                        setIsPlaying(true);
                        removeListeners();
                    })
                    .catch(() => {
                        setIsPlaying(false);
                    });
            }
        };

        const removeListeners = () => {
            window.removeEventListener('click', attemptPlay);
            window.removeEventListener('touchstart', attemptPlay);
            window.removeEventListener('scroll', attemptPlay);
            window.removeEventListener('mousemove', attemptPlay);
            window.removeEventListener('pointerdown', attemptPlay);
            window.removeEventListener('keydown', attemptPlay);
            window.removeEventListener('wheel', attemptPlay);
        };

        // 1. Immediate play attempt on load
        attemptPlay();

        // 2. Comprehensive interaction listeners (including scroll & mouse movement)
        const events = ['click', 'touchstart', 'scroll', 'mousemove', 'pointerdown', 'keydown', 'wheel'];
        events.forEach((event) => {
            window.addEventListener(event, attemptPlay, { passive: true });
        });

        return () => removeListeners();
    }, []);

    // Handle track switching
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.load();
            if (isPlaying) {
                audioRef.current.play().catch((err) => console.log('Playback error:', err));
            }
        }
    }, [currentTrackIndex]);

    const togglePlay = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current
                .play()
                .then(() => setIsPlaying(true))
                .catch((err) => console.log('Playback error:', err));
        }
    };

    const handleNextTrack = () => {
        setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % playlist.length);
    };

    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: 16,
                right: 16,
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
            }}
        >
            <audio
                ref={audioRef}
                src={playlist[currentTrackIndex].src}
                onEnded={handleNextTrack}
                preload="auto"
            />

            <Tooltip title={isPlaying ? `Playing: ${playlist[currentTrackIndex].title}` : "Play Music"} placement="top">
                <Fab
                    color="primary"
                    size="small"
                    onClick={togglePlay}
                    aria-label="toggle background music"
                    sx={{
                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                        bgcolor: isPlaying ? 'primary.main' : 'grey.400',
                        width: 28,
                        height: 28,
                        minHeight: 28,
                        '& .MuiSvgIcon-root': {
                            fontSize: '0.9rem',
                        },
                    }}
                >
                    {isPlaying ? <MusicNote /> : <MusicOff />}
                </Fab>
            </Tooltip>
        </Box>
    );
}