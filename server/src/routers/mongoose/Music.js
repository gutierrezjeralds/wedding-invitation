import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import dbConnect from '../../dbConn/Mongoose.js';
import Music from '../../models/mongoose/MusicSchema.js';

const router = express.Router();

// Ensure an 'uploads/' directory exists on your server disk
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer to save files to disk storage (no 16MB MongoDB BSON limit!)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname.replace(/\s+/g, '_'));
  }
});

const upload = multer({
  storage: storage,
  // No fileSize limit restrictions on multer here so it accepts any size, 
  // and we rely on your client-side compression/optimization before upload!
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'audio/mpeg' || file.originalname.endsWith('.mp3')) {
      cb(null, true);
    } else {
      cb(new Error('Only .mp3 files are allowed!'), false);
    }
  }
});

// Ensure MongoDB is connected before processing music requests
router.use(async (req, res, next) => {
  try {
    await dbConnect();
    next();
  } catch (error) {
    console.error('Music MongoDB Connection Error:', error);
    return res.status(503).json({
      success: false,
      message: 'Database connection failed',
    });
  }
});

// GET background music track
router.get('/', async (req, res) => {
  try {
    const musicTrack = await Music.findOne({ category: 'background-music' }).sort({ createdAt: -1 });
    
    if (!musicTrack) {
      return res.status(200).json({ success: true, data: null });
    }

    return res.status(200).json({ success: true, data: musicTrack });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// POST endpoint to handle uploads of any size safely via disk storage
router.post('/', upload.array('music', 3), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'No audio files uploaded.' });
    }

    if (req.files.length > 3) {
      return res.status(400).json({ success: false, message: 'Upload limit exceeded. Maximum 3 files allowed.' });
    }

    // Optional: Clean up old local physical files if replacing tracks
    const oldTracks = await Music.find({ category: 'background-music' });
    oldTracks.forEach(track => {
      if (track.url && track.url.startsWith('/uploads/')) {
        const oldPath = path.join(process.cwd(), track.url);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
    });

    await Music.deleteMany({ category: 'background-music' });

    let latestSavedTrack = null;

    for (const file of req.files) {
      // Save accessible public URL path pointing to the stored disk file
      const fileUrl = `/uploads/${file.filename}`;

      const newMusic = await Music.create({
        filename: file.originalname,
        contentType: file.mimetype,
        size: file.size,
        url: fileUrl,
        category: 'background-music'
      });

      latestSavedTrack = newMusic;
    }

    return res.status(200).json({
      success: true,
      message: 'Background music successfully saved to server disk and registered in database!',
      data: latestSavedTrack
    });
  } catch (error) {
    console.error('Upload Error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE endpoint to remove background music
router.delete('/', async (req, res) => {
  try {
    const oldTracks = await Music.find({ category: 'background-music' });
    oldTracks.forEach(track => {
      if (track.url && track.url.startsWith('/uploads/')) {
        const filePath = path.join(process.cwd(), track.url);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      }
    });

    await Music.deleteMany({ category: 'background-music' });
    return res.status(200).json({ success: true, message: 'All background music tracks removed successfully.' });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

export default router;