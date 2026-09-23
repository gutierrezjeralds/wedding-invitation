// client/src/hooks/useDrivePhotos.js
import { useState, useEffect } from 'react';

const DEFAULT_PARENT_ID = '1UIaLhC0wSRTq_o2btcmyCQQ1TW929ZPU';

/**
 * Preloads an array of image URLs into browser memory cache.
 */
const preloadImages = (urls = []) => {
    return Promise.all(
        urls.map(
            (url) =>
                new Promise((resolve) => {
                    const img = new Image();
                    img.src = url;
                    img.onload = resolve;
                    img.onerror = resolve; // Prevents single failing photo from blocking app load
                })
        )
    );
};

export function useDrivePhotos(parentFolderId = DEFAULT_PARENT_ID) {
    const [photosData, setPhotosData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const preloadPhotos = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/google/photos/${parentFolderId}`);

                // Safely parse JSON
                const result = await response.json().catch(() => ({
                    error: `Server error (${response.status} ${response.statusText})`,
                }));

                if (!response.ok) {
                    throw new Error(result.error || `HTTP error ${response.status}`);
                }

                const data = result.data || {};

                // Extract all photo URLs from nested groupings
                const allPhotoUrls = Object.values(data)
                    .flat()
                    .map((item) => item.url)
                    .filter(Boolean);

                // Preload image binaries into browser memory before resolving loading state
                await preloadImages(allPhotoUrls);

                if (isMounted) {
                    /**
                     * Sample URL
                     * https://lh3.googleusercontent.com/d/${file.id}`
                     */

                    // Return
                    setPhotosData(data);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.message);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        preloadPhotos();

        return () => {
            isMounted = false;
        };
    }, [parentFolderId]);

    return { photosData, loading, error };
}