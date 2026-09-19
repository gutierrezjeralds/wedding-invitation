import Typography from '@mui/material/Typography';

// Reusable Text Component
export function Text({ letterSpacing, preserveNewlines = true, sx, ...props }) {
    // Pre-defined presets for clean prop usage
    const letterSpacingPresets = {
        tight: '-0.05em',
        normal: 'normal',
        wide: '0.08em',
        widest: '0.2em',
    };

    // Resolve whether letterSpacing is a preset keyword or a custom direct value
    const resolvedSpacing = letterSpacingPresets[letterSpacing] || letterSpacing;

    return (
        <Typography
            sx={{
                whiteSpace: preserveNewlines ? 'pre-line' : 'normal',
                ...(resolvedSpacing && { letterSpacing: resolvedSpacing }),
                ...sx,
            }}
            {...props}
        >
        </Typography>
    );
}

// Default export
export default Text;