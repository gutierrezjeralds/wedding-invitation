import mongoose from 'mongoose';

const ThemeConfigSchema = new mongoose.Schema({
  palette: {
    primaryMain: { type: String, default: '#6B1D2F' },
    primaryContrastText: { type: String, default: '#FFFFFF' },
    secondaryMain: { type: String, default: '#8F3948' },
    secondaryContrastText: { type: String, default: '#2B1B17' },
    textPrimary: { type: String, default: '#3B2F2F' },
    textSecondary: { type: String, default: '#000000' },
    backgroundDefault: { type: String, default: '#FAF7F2' },
    backgroundPaper: { type: String, default: '#FFFFFF' },
  },
  typography: {
    fontFamily: { type: String, default: '"Montserrat", sans-serif' },
    h1Color: { type: String, default: '#6B1D2F' },
    h1FontSizeDesktop: { type: String, default: '6rem' },
    h1FontSizeMobile: { type: String, default: '3rem' },
    h2Color: { type: String, default: '#6B1D2F' },
    h2FontSizeDesktop: { type: String, default: '4rem' },
    h2FontSizeMobile: { type: String, default: '3.5rem' },
    h5Color: { type: String, default: '#8F3948' },
    h6Color: { type: String, default: '#3B2F2F' },
  },
}, { timestamps: true });

const ThemeConfig = mongoose.models.ThemeConfig || mongoose.model('ThemeConfig', ThemeConfigSchema);

export default ThemeConfig;