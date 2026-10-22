import express from 'express';
import dbConnect from '../dbConn/Mongoose.js';
import ThemeConfig from '../models/ThemeSchema.js';

const router = express.Router();

// GET: Fetch current theme configuration
router.get('/', async (req, res) => {
  try {
    await dbConnect(); // Ensure connection is active

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
    await dbConnect(); // Ensure connection is active
    
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