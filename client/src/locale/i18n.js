import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './en.json';

i18n
  // Automatically detects browser language (navigator.language)
  .use(LanguageDetector)
  // Connects with react-i18next
  .use(initReactI18next)
  .init({
    // Do NOT set `lng` here so auto-detection works
    fallbackLng: 'en', // Default to English if detected language isn't supported

    resources: {
      en: { translation: en }
    },

    interpolation: {
      escapeValue: false // React handles XSS escaping
    },

    react: {
      transSupportBasicHtmlNodes: true, // <--- Automatically supports <span>, <b>, <i>, <strong>, etc.
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p', 'span', 'b', 'a'], // <--- List of HTML tags to preserve
    },
  });

export default i18n;