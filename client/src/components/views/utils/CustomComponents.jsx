import { Typography, Stack, Divider } from '@mui/material';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';

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

// Reusable Page Title
export function PageTitle({ title, subtitle, icon, ...props }) {
    return (
        <Stack className="text-center mb-5" spacing={1} {...props}>
            {title && (
                <Text letterSpacing="wide" variant="h3" className="great-vibes-regular">
                    {title}
                </Text>
            )}

            {subtitle && (
                <Text variant="body1" className="cormorant-garamond-regular">
                    {subtitle}
                </Text>
            )}

            <Divider component="div" role="presentation" className="mt-4">
                {icon || <FavoriteBorder fontSize="small" className="mt-2" />}
            </Divider>
        </Stack>
    );
}

// Default export
export default Text;
