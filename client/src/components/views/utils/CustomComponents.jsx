import { Typography, Stack, Divider } from '@mui/material';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import { useTranslation, Trans } from 'react-i18next';

// Reusable Text Component
export function Text({ letterSpacing, preserveNewlines = true, i18nKey, components, children, sx, ...props }) {
    const { t: oI18n } = useTranslation();

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

    // If i18nKey is provided WITHOUT explicit components, render via dangerouslySetInnerHTML
    if (i18nKey && !components) {
        return (
            <Typography
                sx={baseStyles}
                dangerouslySetInnerHTML={{ __html: oI18n(i18nKey) }}
                {...props}
            />
        );
    }

    return (
        <Typography sx={baseStyles} {...props}>
            {i18nKey ? <Trans i18nKey={i18nKey} components={components} /> : children}
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
                    i18nKey={title}
                />
            )}

            {subtitle && (
                <Text
                    className="main-page-subtitle"
                    i18nKey={subtitle}
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
