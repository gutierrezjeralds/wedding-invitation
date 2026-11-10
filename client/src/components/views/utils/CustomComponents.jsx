import { Typography, Stack, Divider, Box } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';

// Helper function to format dates and times with support for literal strings using brackets [like this]
function formatDate(dateInput, formatStr) {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return dateInput;

    const monthsFull = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const daysFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const daysShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const year = date.getFullYear();
    const monthIndex = date.getMonth();
    const dayIndex = date.getDay();
    const dayNumber = date.getDate();

    const hours24 = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const hours12 = hours24 % 12 || 12;
    const ampm = hours24 >= 12 ? 'PM' : 'AM';

    const format = formatStr || 'MMMM DD, YYYY [at] hh:mm A';

    // Regex matches bracketed text [at] FIRST, then date tokens in descending length order
    const tokenRegex = /\[([^\]]+)\]|MMMM|MMM|MM|dddd|ddd|DD|D|YYYY|YY|HH|H|hh|h|mm|ss|A|a/g;

    return format.replace(tokenRegex, (match, literalText) => {
        if (literalText !== undefined) return literalText; // Returns literal text inside [] without replacing tokens within it

        switch (match) {
            case 'MMMM': return monthsFull[monthIndex];
            case 'MMM': return monthsShort[monthIndex];
            case 'MM': return String(monthIndex + 1).padStart(2, '0');
            case 'dddd': return daysFull[dayIndex];
            case 'ddd': return daysShort[dayIndex];
            case 'DD': return String(dayNumber).padStart(2, '0');
            case 'D': return dayNumber;
            case 'YYYY': return year;
            case 'YY': return String(year).slice(-2);
            case 'HH': return String(hours24).padStart(2, '0');
            case 'H': return hours24;
            case 'hh': return String(hours12).padStart(2, '0');
            case 'h': return hours12;
            case 'mm': return String(minutes).padStart(2, '0');
            case 'ss': return String(seconds).padStart(2, '0');
            case 'A': return ampm;
            case 'a': return ampm.toLowerCase();
            default: return match;
        }
    });
}

// Reusable Text Component
export function Text({ letterSpacing, preserveNewlines = true, textKey, children, dateFormat, isDate, sx, ...props }) {
    const letterSpacingPresets = {
        tight: '-0.05em',
        normal: 'normal',
        wide: '0.08em',
        widest: '0.2em',
        large: '0.3em',
        largest: '0.4em',
    };

    const resolvedSpacing = letterSpacingPresets[letterSpacing] || letterSpacing;

    const baseStyles = {
        whiteSpace: preserveNewlines ? 'pre-line' : 'normal',
        ...(resolvedSpacing && { letterSpacing: resolvedSpacing }),
        ...sx,
    };

    const rawContent = textKey || children;

    let contentToDisplay = rawContent;
    const isValDate = isDate || (rawContent && (rawContent instanceof Date || (typeof rawContent === 'string' && !isNaN(Date.parse(rawContent)) && isNaN(Number(rawContent)))));

    if (isValDate && rawContent) {
        contentToDisplay = formatDate(rawContent, dateFormat);
    }

    if (!isValDate && contentToDisplay && typeof contentToDisplay === 'string') {
        return (
            <Typography
                sx={baseStyles}
                dangerouslySetInnerHTML={{ __html: contentToDisplay }}
                {...props}
            />
        );
    }

    return (
        <Typography sx={baseStyles} {...props}>
            {contentToDisplay}
        </Typography>
    );
}

// Resusable Divider
export function FavoriteDividerSmall() {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                my: 3,
                gap: 2,
            }}
        >
            <Box sx={{ width: 40, height: '1px', backgroundColor: '#C5A059' }} />
            <Favorite sx={{ fontSize: 16, color: '#C5A059' }} />
            <Box sx={{ width: 40, height: '1px', backgroundColor: '#C5A059' }} />
        </Box>
    )
}

// Resusable Divider
export function FavoriteDividerMediumn() {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                my: 3,
                gap: 2,
            }}
        >
            <Box sx={{ width: 100, height: '1px', backgroundColor: '#C5A059' }} />
            <Favorite sx={{ fontSize: 16, color: '#C5A059' }} />
            <Box sx={{ width: 100, height: '1px', backgroundColor: '#C5A059' }} />
        </Box>
    )
}

// Reusable Page Title
export function PageTitle({ title, subtitle, icon, ...props }) {
    return (
        <Stack className="text-center mb-5" spacing={0} {...props}>
            {title && (
                <Text
                    variant="h3"
                    component="h1"
                    className="main-page-title"
                    textKey={title}
                />
            )}

            {subtitle && (
                <Text
                    className=""
                    variant="body1"
                    component=""
                    textKey={subtitle}
                />
            )}

            <FavoriteDividerSmall />
        </Stack>
    );
}

// Default export
export default Text;