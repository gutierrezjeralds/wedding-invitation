import express from 'express';
import multer from 'multer';
import dbConnect from '../../dbConn/Mongoose.js';
import Music from '../../models/mongoose/MusicSchema.js';

const router = express.Router();

// Use memory storage (Safe for Vercel serverless - no local disk writing needed)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB limit
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
    console.error('GET Music Error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

// POST endpoint to upload optimized MP3 tracks (Max 3 limit)
router.post('/', upload.array('music', 3), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'No audio files uploaded.' });
    }

    if (req.files.length > 3) {
      return res.status(400).json({ success: false, message: 'Upload limit exceeded. Maximum 3 files allowed.' });
    }

    // Clear previous background music records
    await Music.deleteMany({ category: 'background-music' });

    let latestSavedTrack = null;

    for (const file of req.files) {
      // Store compressed buffer safely as a Base64 Data URL inside MongoDB
      const fileUrl = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;

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
      message: 'Background music successfully optimized and stored in database!',
      data: latestSavedTrack
    });
  } catch (error) {
    console.error('Upload Error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE endpoint to remove background music from database
router.delete('/', async (req, res) => {
  try {
    await Music.deleteMany({ category: 'background-music' });
    return res.status(200).json({ success: true, message: 'All background music tracks removed from database.' });
  } catch (error) {
    console.error('DELETE Music Error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

export default router;