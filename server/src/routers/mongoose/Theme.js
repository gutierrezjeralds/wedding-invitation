import express from 'express';
import dbConnect from '../../dbConn/Mongoose.js';
import ThemeConfig from '../../models/mongoose/ThemeSchema.js';

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

// GET: Fetch current theme configuration
router.get('/', async (req, res) => {
  try {
    let config = await ThemeConfig.findOne();
    if (!config) {
      // Create default if none exists yet
      config = await ThemeConfig.create({});
    }
    return res.json({ success: true, data: config });
  } catch (error) {
    console.error('Theme GET Error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

// PUT: Update theme configuration (Admin action)
router.put('/', async (req, res) => {
  try {
    let config = await ThemeConfig.findOne();
    if (!config) {
      config = new ThemeConfig(req.body);
    } else {
      config.palette = req.body.palette || config.palette;
      config.typography = req.body.typography || config.typography;
    }
    await config.save();
    return res.json({ success: true, message: 'Theme updated successfully', data: config });
  } catch (error) {
    console.error('Theme PUT Error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

export default router;