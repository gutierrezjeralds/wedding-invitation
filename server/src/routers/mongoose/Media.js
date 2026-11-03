import express from 'express';
import multer from 'multer';
import sharp from 'sharp';
import dbConnect from '../../dbConn/Mongoose.js';
import Media from '../../models/mongoose/MediaSchema.js';

const router = express.Router();

// Ensure MongoDB is connected before processing media requests
router.use(async (req, res, next) => {
  try {
    await dbConnect();
    next();
  } catch (error) {
    console.error('Media MongoDB Connection Error:', error);

    return res.status(503).json({
      success: false,
      message: 'Database connection failed',
    });
  }
});

// Configure multer to keep files temporarily in memory buffer
const upload = multer({
  limits: { fileSize: 10 * 1024 * 1024 }, // Allow up to 10MB raw uploads from admin
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// ==========================================
// 1. UPLOAD & OPTIMIZE ENDPOINT (Supports Transparency & Format Preservation)
// ==========================================
router.post('/upload', upload.any(), async (req, res) => {
  try {
    const { page, type, category } = req.body;
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ success: false, message: 'No image files provided.' });
    }

    // If uploading a single-slot asset, replace the old one based on page, type, and category.
    if (['envelope', 'background', 'banner', 'palette'].includes(type)) {
      const deleteQuery = { page, type };

      if (category && category.trim() !== '') {
        deleteQuery.category = category;
      } else {
        deleteQuery.category = { $in: [null, ''] };
      }

      await Media.deleteMany(deleteQuery);
    }

    const savedMediaRecords = [];

    for (const file of files) {
      const isPng = file.mimetype === 'image/png';
      let optimizedBuffer;
      let contentType = file.mimetype;

      const imagePipeline = sharp(file.buffer).resize({ width: 1920, withoutEnlargement: true });

      if (isPng) {
        // Compress PNG while fully preserving transparency channel
        optimizedBuffer = await imagePipeline
          .png({ compressionLevel: 8, palette: true })
          .toBuffer();
        contentType = 'image/png';
      } else {
        // Compress JPEGs/others efficiently
        optimizedBuffer = await imagePipeline
          .jpeg({ quality: 80, mozjpeg: true })
          .toBuffer();
        contentType = 'image/jpeg';
      }

      const newMedia = new Media({
        page,
        type,
        category: (category && category.trim() !== '') ? category : null,
        imgData: optimizedBuffer,
        contentType: contentType // Dynamically saves 'image/png' or 'image/jpeg'
      });

      const saved = await newMedia.save();
      savedMediaRecords.push({
        id: saved._id,
        page: saved.page,
        type: saved.type,
        category: saved.category,
        url: `/api/media/image/${saved._id}`
      });
    }

    res.status(201).json({
      success: true,
      message: 'Images optimized and uploaded successfully!',
      data: savedMediaRecords
    });
  } catch (error) {
    console.error('Error optimizing and uploading media:', error);
    res.status(500).json({ success: false, message: error.message || 'Server error during upload' });
  }
});

// ==========================================
// 2. FETCH ALL MEDIA LIST (Metadata only)
// ==========================================
router.get('/', async (req, res) => {
  try {
    const { page, type, category } = req.query;
    let query = {};

    if (page) query.page = page;
    if (type) query.type = type;
    if (category) query.category = category;

    const mediaList = await Media.find(query).select('-imgData');

    const formattedList = mediaList.map(item => ({
      _id: item._id,
      page: item.page,
      type: item.type,
      category: item.category,
      url: `/api/media/image/${item._id}`,
      createdAt: item.createdAt
    }));

    res.json({ success: true, data: formattedList });
  } catch (error) {
    console.error('Error fetching media list:', error);
    res.status(500).json({ success: false, message: 'Server error fetching media' });
  }
});

// ==========================================
// 3. SERVE IMAGE BINARY DIRECTLY BY ID
// ==========================================
router.get('/image/:id', async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media || !media.imgData) {
      return res.status(404).json({ success: false, message: 'Image not found' });
    }

    res.set('Content-Type', media.contentType); // Serves correct image/png or image/jpeg
    res.send(media.imgData);
  } catch (error) {
    console.error('Error serving image binary:', error);
    res.status(500).json({ success: false, message: 'Error loading image' });
  }
});

// ==========================================
// 4. DELETE MEDIA ITEM
// ==========================================
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Media.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Media item not found' });
    }
    res.json({ success: true, message: 'Media deleted successfully' });
  } catch (error) {
    console.error('Error deleting media:', error);
    res.status(500).json({ success: false, message: 'Server error deleting media' });
  }
});

export default router;