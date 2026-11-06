import mongoose from 'mongoose';

const musicSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  contentType: { type: String, default: 'audio/mpeg' },
  size: { type: Number, required: true },
  url: { type: String, required: true }, // URL or Base64 data stream path
  category: { type: String, default: 'background-music' },
  isEnabled: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Music', musicSchema);