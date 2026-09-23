import { Router } from 'express';
import { drive, fetchFolderContents } from '../handlers/Google.js';

const router = Router();

router.get('/photos/:folderId', async (req, res) => {
    const { folderId } = req.params;

    try {
        const rootMeta = await drive.files.get({
            fileId: folderId,
            fields: 'id, name',
        });

        const result = await fetchFolderContents(folderId, rootMeta.data.name);

        if (!result) {
        return res.status(200).json({
            message: 'No photos found in folder hierarchy.',
            data: null,
        });
        }

        return res.status(200).json({ data: result });
    } catch (error) {
        console.error('Google Drive API Error:', error.message);

        // Always send back a JSON response body
        return res.status(error.status || 500).json({
            error: error.message || 'Failed to fetch photos from Google Drive',
        });
    }
});

export default router;