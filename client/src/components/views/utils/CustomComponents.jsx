import { Typography, Stack, Divider } from '@mui/material';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';

// Reusable Text Component
export function Text({ letterSpacing, preserveNewlines = true, textKey, children, sx, ...props }) {
    // Pre-defined presets for clean prop usage
    const letterSpacingPresets = {
        tight: '-0.05em',
        normal: 'normal',
        wide: '0.08em',
        widest: '0.2em',
        large: '0.3em',
        largest: '0.4em',
    };

    // Resolve whether letterSpacing is a preset keyword or a custom direct value
    const resolvedSpacing = letterSpacingPresets[letterSpacing] || letterSpacing;

    const baseStyles = {
        whiteSpace: preserveNewlines ? 'pre-line' : 'normal',
        ...(resolvedSpacing && { letterSpacing: resolvedSpacing }),
        ...sx,
    };

    // Determine the text value passed either via `textKey` or `children`
    const rawContent = textKey || children;

    // Render HTML strings directly if rawContent exists
    if (rawContent && typeof rawContent === 'string') {
        return (
            <Typography
                sx={baseStyles}
                dangerouslySetInnerHTML={{ __html: rawContent }}
                {...props}
            />
        );
    }

    return (
        <Typography sx={baseStyles} {...props}>
            {children}
        </Typography>
    );
}

// Reusable Page Title
export function PageTitle({ title, subtitle, icon, ...props }) {
    return (
        <Stack className="text-center mb-5" spacing={0} {...props}>
            {title && (
                <Text
                    className="main-page-title"
                    textKey={title}
                />
            )}

            {subtitle && (
                <Text
                    className="main-page-subtitle"
                    textKey={subtitle}
                />
            )}

            <Divider component="div" role="presentation" className="mt-4">
                {icon || <FavoriteBorder fontSize="small" className="mt-2" />}
            </Divider>
        </Stack>
    );
}

// Default export
export default Text;