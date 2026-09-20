import React, { useState, useRef, useEffect } from 'react';
import { Box, Fab, Tooltip } from '@mui/material';
import { MusicNote, MusicOff, SkipNext } from '@mui/icons-material';

// Import your audio files
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

    // Auto-play on load + fallback on user's first click/touch anywhere on the page
    useEffect(() => {
        const attemptPlay = () => {
            if (audioRef.current) {
                audioRef.current
                    .play()
                    .then(() => {
                        setIsPlaying(true);
                        // Clean up listeners once autoplay succeeds
                        window.removeEventListener('click', attemptPlay);
                        window.removeEventListener('touchstart', attemptPlay);
                    })
                    .catch(() => {
                        // Browser blocked unmuted autoplay without user interaction
                        setIsPlaying(false);
                    });
            }
        };

        // 1. Try playing immediately on page load
        attemptPlay();

        // 2. Fallback: play on first click or touch anywhere on the site
        window.addEventListener('click', attemptPlay);
        window.addEventListener('touchstart', attemptPlay);

        return () => {
            window.removeEventListener('click', attemptPlay);
            window.removeEventListener('touchstart', attemptPlay);
        };
    }, []);

    // When track index changes while playing, play the new track automatically
    useEffect(() => {
        if (isPlaying && audioRef.current) {
            audioRef.current.play().catch((err) => console.log('Playback error:', err));
        }
    }, [currentTrackIndex]);

    // Handle Play / Pause toggle
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

    // Play next track in playlist (loops back to track 1 at the end)
    const handleNextTrack = () => {
        setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % playlist.length);
    };

    // Triggered automatically when the current track finishes
    const handleSongEnded = () => {
        handleNextTrack();
    };

    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: 24,
                right: 24,
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
            }}
        >
            {/* Hidden HTML Audio Element */}
            <audio
                ref={audioRef}
                src={playlist[currentTrackIndex].src}
                onEnded={handleSongEnded}
                preload="auto"
            />

            {/* Skip Next Button (Shown when playing) */}
            {isPlaying && (
                <Tooltip title="Next Song" placement="top">
                    <Fab
                        size="small"
                        color="default"
                        onClick={handleNextTrack}
                        aria-label="next song"
                        sx={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
                    >
                        <SkipNext fontSize="small" />
                    </Fab>
                </Tooltip>
            )}

            {/* Play/Pause Toggle Button */}
            <Tooltip title={isPlaying ? `Playing: ${playlist[currentTrackIndex].title}` : "Play Music"} placement="top">
                <Fab
                    color="primary"
                    size="medium"
                    onClick={togglePlay}
                    aria-label="toggle background music"
                    sx={{
                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                        bgcolor: isPlaying ? 'primary.main' : 'grey.400',
                    }}
                >
                    {isPlaying ? <MusicNote /> : <MusicOff />}
                </Fab>
            </Tooltip>
        </Box>
    );
}