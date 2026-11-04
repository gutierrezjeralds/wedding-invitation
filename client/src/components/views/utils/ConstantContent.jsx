// src/services/contentService.js
import { 
  CONTENT as STATIC_CONTENT,
  CONTENT_ENVELOPE as STATIC_ENVELOPE,
  CONTENT_HOME as STATIC_HOME,
  CONTENT_WEDDING as STATIC_WEDDING,
  CONTENT_PROPOSAL as STATIC_PROPOSAL,
  CONTENT_FOOTER as STATIC_FOOTER,
  CONTENT_STORY as STATIC_STORY,
  CONTENT_ENTOURAGE as STATIC_ENTOURAGE,
  CONTENT_ATTIRE as STATIC_ATTIRE,
  CONTENT_FAQ as STATIC_FAQ,
  CONTENT_GIFT as STATIC_GIFT
} from '../utils/Constants';

const STATIC_FALLBACKS = {
  global: STATIC_CONTENT,
  envelope: STATIC_ENVELOPE,
  home: STATIC_HOME,
  wedding: STATIC_WEDDING,
  proposal: STATIC_PROPOSAL,
  footer: STATIC_FOOTER,
  story: STATIC_STORY,
  entourage: STATIC_ENTOURAGE,
  attire: STATIC_ATTIRE,
  faq: STATIC_FAQ,
  gift: STATIC_GIFT,
};

export async function fetchPageContent(pageKey) {
  try {
    const response = await fetch(`/api/content/${pageKey}`);
    const result = await response.json();

    if (result.success && result.data?.content) {
      return result.data.content;
    }
  } catch (err) {
    console.warn(`API offline for ${pageKey}, falling back to static constants.`);
  }

  // Fallback to static defaults
  return STATIC_FALLBACKS[pageKey] || {};
}