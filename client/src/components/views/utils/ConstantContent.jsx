import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  CONTENT as STATIC_CONTENT,
  CONTENT_FOOTER as STATIC_FOOTER,
  CONTENT_ENVELOPE as STATIC_ENVELOPE,
  CONTENT_HOME as STATIC_HOME,
  CONTENT_STORY as STATIC_STORY,
  CONTENT_WEDDING as STATIC_WEDDING,
  CONTENT_ENTOURAGE as STATIC_ENTOURAGE,
  CONTENT_ATTIRE as STATIC_ATTIRE,
  CONTENT_FAQ as STATIC_FAQ,
  CONTENT_GIFT as STATIC_GIFT,
  CONTENT_PROPOSAL as STATIC_PROPOSAL,
} from './Constants';

const STATIC_FALLBACKS = {
  global: STATIC_CONTENT,
  footer: STATIC_FOOTER,
  envelope: STATIC_ENVELOPE,
  home: STATIC_HOME,
  story: STATIC_STORY,
  wedding: STATIC_WEDDING,
  entourage: STATIC_ENTOURAGE,
  attire: STATIC_ATTIRE,
  faq: STATIC_FAQ,
  gift: STATIC_GIFT,
  proposal: STATIC_PROPOSAL,
};

const ContentContext = createContext();

export function ContentProvider({ children }) {
  const [allContent, setAllContent] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function preloadAllContent() {
      const pageKeys = Object.keys(STATIC_FALLBACKS);
      const preloadedData = {};

      // Fetch all pages in parallel on initial load
      await Promise.all(
        pageKeys.map(async (key) => {
          try {
            const res = await fetch(`/api/content/${key}`);
            const json = await res.json();
            if (json.success && json.data?.content) {
              preloadedData[key] = json.data.content;
            } else {
              preloadedData[key] = STATIC_FALLBACKS[key];
            }
          } catch (err) {
            console.warn(`Failed to preload ${key}, using static fallback.`, err);
            preloadedData[key] = STATIC_FALLBACKS[key];
          }
        })
      );

      setAllContent(preloadedData);
      setLoading(false);
    }

    preloadAllContent();
  }, []);

  // Helper function to get content for a specific page instantly without network delay
  const getPageContent = (pageKey) => {
    return allContent[pageKey] || STATIC_FALLBACKS[pageKey] || {};
  };

  return (
    <ContentContext.Provider value={{ allContent, getPageContent, loading }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  return useContext(ContentContext);
}