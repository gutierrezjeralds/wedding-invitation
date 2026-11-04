import express from 'express';
import dbConnect from '../../dbConn/Mongoose.js';
import Content from '../../models/mongoose/ContentSchema.js';
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

// GET endpoint
router.get('/:pageKey', async (req, res) => {
  try {
    const { pageKey } = req.params;
    const record = await Content.findOne({ pageKey });

    if (!record) {
      return res.status(200).json({ success: true, data: null });
    }
    return res.status(200).json({ success: true, data: record });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// PUT endpoint
router.put('/:pageKey', async (req, res) => {
  try {
    const { pageKey } = req.params;
    const { content } = req.body;

    const updatedRecord = await Content.findOneAndUpdate(
      { pageKey },
      { content, updatedAt: Date.now() },
      { new: true, upsert: true }
    );

    return res.status(200).json({ success: true, data: updatedRecord });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

export default router;