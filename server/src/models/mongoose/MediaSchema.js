import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema({
  page: { type: String, required: true }, // 'home', 'story', etc.
  type: { type: String, required: true }, // 'background', 'banner', 'gallery'
  category: { type: String, default: null }, // for story tabs
  imgData: { type: Buffer, required: true }, // Stores the raw binary data
  contentType: { type: String, required: true } // e.g., 'image/png', 'image/jpeg'
}, { timestamps: true });

export default mongoose.model('Media', mediaSchema);