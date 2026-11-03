import React, { createContext, useContext, useState, useEffect } from 'react';

const MediaContext = createContext();

export function MediaProvider({ children }) {
  const [mediaAssets, setMediaAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all media items once on app load
  useEffect(() => {
    async function loadAllMedia() {
      try {
        const res = await fetch('/api/media');
        const data = await res.json();
        if (data.success) {
          setMediaAssets(data.data);
        }
      } catch (err) {
        console.error('Error loading global media:', err);
      } finally {
        setLoading(false);
      }
    }
    loadAllMedia();
  }, []);

  // Helper function to easily get an image URL by page, type, and optional category
  const getAsset = (page, type, category = null) => {
    const match = mediaAssets.find(
      (item) =>
        item.page === page &&
        item.type === type &&
        (category ? item.category === category : true)
    );
    return match ? match.url : ''; // returns the clean image URL or empty string
  };

  // Helper function to get multiple images (like gallery slides)
  const getGalleryAssets = (page, type, category = null) => {
    return mediaAssets.filter(
      (item) =>
        item.page === page &&
        item.type === type &&
        (category ? item.category === category : true)
    );
  };

  return (
    <MediaContext.Provider value={{ getAsset, getGalleryAssets, loading, mediaAssets }}>
      {children}
    </MediaContext.Provider>
  );
}

// Custom hook so you can use this easily in any component
export function useMedia() {
  return useContext(MediaContext);
}