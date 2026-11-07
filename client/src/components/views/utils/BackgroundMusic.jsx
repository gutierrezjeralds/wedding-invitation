import React, { useState, useRef, useEffect } from 'react';
import { Box, Fab, Tooltip } from '@mui/material';
import { MusicNote, MusicOff, SkipNext } from '@mui/icons-material';

export default function BackgroundMusic({ isAdminPath = false, onMusicStateChange }) {
    const [playlist, setPlaylist] = useState([]);
    const [isMusicEnabled, setIsMusicEnabled] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    // Fetch music state and playlist tracks from backend API
    useEffect(() => {
        const fetchMusicConfig = async () => {
            try {
                const res = await fetch('/api/music');
                const json = await res.json();
                if (json.success) {
                    // 1. Read global toggle state from top-level response property
                    setIsMusicEnabled(json.isEnabled ?? true);
                    
                    // 2. Map the array of tracks into the playlist queue
                    const tracks = Array.isArray(json.data) ? json.data : [];
                    const formattedPlaylist = tracks.map((track, idx) => ({
                        title: track.filename || `Track ${idx + 1}`,
                        src: track.url
                    }));

                    setPlaylist(formattedPlaylist);
                }
            } catch (err) {
                console.warn('Could not fetch background music config:', err);
            }
        };

        fetchMusicConfig();
    }, []);

    // Handle autoplay and user interaction listeners to bypass browser restrictions
    useEffect(() => {
        if (!isMusicEnabled || playlist.length === 0) return;

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

        // 2. Comprehensive interaction listeners
        const events = ['click', 'touchstart', 'scroll', 'mousemove', 'pointerdown', 'keydown', 'wheel'];
        events.forEach((event) => {
            window.addEventListener(event, attemptPlay, { passive: true });
        });

        return () => removeListeners();
    }, [isMusicEnabled, playlist]);

    // Handle track switching
    useEffect(() => {
        if (audioRef.current && playlist.length > 0) {
            audioRef.current.load();
            if (isPlaying) {
                audioRef.current.play().catch((err) => console.log('Playback error:', err));
            }
        }
    }, [currentTrackIndex, playlist]);

    // Check if the component should be visible
    const isVisible = !isAdminPath && isMusicEnabled && playlist.length > 0 && Boolean(playlist[currentTrackIndex]?.src);

    // Notify parent component whenever the visibility changes so it can adapt spacing
    useEffect(() => {
        if (onMusicStateChange) {
            onMusicStateChange(isVisible);
        }
    }, [isVisible, onMusicStateChange]);

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
        if (playlist.length === 0) return;
        setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % playlist.length);
    };

    // Render Guard: Hide widget completely if on admin path, music disabled, or no tracks loaded
    if (!isVisible) {
        return null;
    }

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
                loop={playlist.length === 1}
            />

            <Tooltip title={isPlaying ? `Playing: ${playlist[currentTrackIndex].title}` : "Play Music"} placement="left">
                <Fab
                    color="primary"
                    size="large"
                    onClick={togglePlay}
                    aria-label="toggle background music"
                    sx={{
                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                        bgcolor: isPlaying ? 'primary.main' : 'grey.400',
                        width: 44,
                        height: 44,
                        minHeight: 44,
                        '& .MuiSvgIcon-root': {
                            fontSize: '1.4rem',
                        },
                    }}
                >
                    {isPlaying ? <MusicNote /> : <MusicOff />}
                </Fab>
            </Tooltip>

            {playlist.length > 1 && (
                <Tooltip title="Next Track" placement="top">
                    <Fab
                        color="primary"
                        size="large"
                        onClick={handleNextTrack}
                        aria-label="next background music track"
                        sx={{
                            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                            bgcolor: 'primary.main',
                            width: 44,
                            height: 44,
                            minHeight: 44,
                            '& .MuiSvgIcon-root': {
                                fontSize: '1.4rem',
                            },
                        }}
                    >
                        <SkipNext />
                    </Fab>
                </Tooltip>
            )}
        </Box>
    );
}