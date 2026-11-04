// src/utils/iconMap.js
import React from 'react';
import * as Icons from '@mui/icons-material';

/**
 * Renders a Material UI icon dynamically based on its string name.
 * Fallback to <Icons.Help /> if the icon name isn't found.
 */
export function DynamicIcon({ iconName, sx, fontSize }) {
  // If it's already a component function/object (from static code), render it directly
  if (typeof iconName === 'function') {
    const IconComponent = iconName;
    return <IconComponent sx={sx} fontSize={fontSize} />;
  }

  // If it's a string name saved from the CMS (e.g., "Church", "FavoriteBorder")
  if (typeof iconName === 'string' && Icons[iconName]) {
    const IconComponent = Icons[iconName];
    return <IconComponent sx={sx} fontSize={fontSize} />;
  }

  // Fallback default icon
  const DefaultIcon = Icons.HelpOutline;
  return <DefaultIcon sx={sx} fontSize={fontSize} />;
}