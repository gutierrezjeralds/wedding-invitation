import dbConnect from '../../../server/src/dbConn/Mongoose.js';
import Media from '../../../server/src/models/mongoose/MediaSchema.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await dbConnect();

    const media = await Media.findById(req.query.id)
      .select('imgData contentType');

    if (!media || !media.imgData) {
      return res.status(404).json({
        success: false,
        message: 'Image not found',
      });
    }

    res.setHeader('Content-Type', media.contentType);
    res.setHeader('Cache-Control', 'public, max-age=3600');

    return res.status(200).send(media.imgData);
  } catch (error) {
    console.error('Image API Error:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve image',
    });
  }
}