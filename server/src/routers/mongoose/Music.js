import express from 'express';
import multer from 'multer';
import dbConnect from '../../dbConn/Mongoose.js';
import Music from '../../models/mongoose/MusicSchema.js';

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'audio/mpeg' || file.originalname.endsWith('.mp3')) {
      cb(null, true);
    } else {
      cb(new Error('Only .mp3 files are allowed!'), false);
    }
  }
});

router.use(async (req, res, next) => {
  try {
    await dbConnect();
    next();
  } catch (error) {
    console.error('Music MongoDB Connection Error:', error);
    return res.status(503).json({ success: false, message: 'Database connection failed' });
  }
});

// GET all background music tracks & global toggle status
router.get('/', async (req, res) => {
  try {
    const tracks = await Music.find({ category: 'background-music' }).sort({ createdAt: -1 });
    const globalSettings = await Music.findOne({ category: 'background-music' }).sort({ createdAt: -1 });
    
    return res.status(200).json({ 
      success: true, 
      data: tracks,
      isEnabled: globalSettings ? globalSettings.isEnabled : true
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// PATCH endpoint to toggle music enabled/disabled globally across all pages
router.patch('/toggle', async (req, res) => {
  try {
    const { isEnabled } = req.body;
    // Update all background tracks with the new global toggle state
    await Music.updateMany({ category: 'background-music' }, { isEnabled });

    return res.status(200).json({
      success: true,
      message: `Background music playback is now ${isEnabled ? 'Enabled' : 'Disabled'} globally.`
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// POST endpoint to APPEND new MP3 files (Enforces max 3 limit without deleting existing)
router.post('/', upload.array('music', 3), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'No audio files uploaded.' });
    }

    // Check current count in database
    const existingCount = await Music.countDocuments({ category: 'background-music' });
    
    if (existingCount + req.files.length > 3) {
      return res.status(400).json({ 
        success: false, 
        message: `Upload limit exceeded! You have ${existingCount} tracks in the database and tried to add ${req.files.length}. Maximum allowed is 3.` 
      });
    }

    // Get current global isEnabled state from existing record if available
    const existingTrack = await Music.findOne({ category: 'background-music' });
    const currentIsEnabled = existingTrack ? existingTrack.isEnabled : true;

    const savedTracks = [];
    for (const file of req.files) {
      const fileUrl = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
      const newMusic = await Music.create({
        filename: file.originalname,
        contentType: file.mimetype,
        size: file.size,
        url: fileUrl,
        category: 'background-music',
        isEnabled: currentIsEnabled
      });
      savedTracks.push(newMusic);
    }

    return res.status(200).json({
      success: true,
      message: 'New background music tracks added successfully!',
      data: savedTracks
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE single track by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Music.findByIdAndDelete(id);
    return res.status(200).json({ success: true, message: 'Track deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

export default router;