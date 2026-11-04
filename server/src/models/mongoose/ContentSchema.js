import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
  pageKey: { 
    type: String, 
    required: true, 
    unique: true, 
    index: true 
  },
  content: { 
    type: mongoose.Schema.Types.Mixed, 
    required: true 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

export default mongoose.model('SiteContent', contentSchema);