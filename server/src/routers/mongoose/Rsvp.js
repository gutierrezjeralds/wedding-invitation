import express from 'express';
import dbConnect from '../../dbConn/Mongoose.js';
import RSVP from '../../models/mongoose/RsvpSchema.js';

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

// POST: Save RSVP
router.post('/', async (req, res) => {
  try {
    const { primaryGuest, additionalGuests } = req.body;

    const newRsvp = new RSVP({
      ...primaryGuest,
      additionalGuests: primaryGuest.willAttend === 'Yes' ? additionalGuests : [],
    });

    await newRsvp.save();

    return res.status(201).json({
      success: true,
      message: 'RSVP submitted successfully!',
      data: newRsvp,
    });
  } catch (error) {
    console.error('RSVP Save Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error while saving RSVP.',
    });
  }
});

// GET: Fetch all RSVPs (for Admin table & graphs)
router.get('/', async (req, res) => {
  try {
    const rsvps = await RSVP.find({}).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: rsvps });
  } catch (error) {
    console.error('RSVP Fetch Error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

export default router;