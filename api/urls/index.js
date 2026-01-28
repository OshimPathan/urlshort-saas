import connectDB from '../_db.js';
import Url from '../_models/Url.js';
import User from '../_models/User.js';
import { getAuthUser } from '../_auth.js';
import { generateShortId } from '../_utils.js';

export default async function handler(req, res) {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const authUser = getAuthUser(req);
  if (!authUser) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  await connectDB();

  // GET - List all URLs
  if (req.method === 'GET') {
    try {
      const urls = await Url.find({ owner: authUser.id }).sort({ createdAt: -1 });
      return res.json({ urls });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  // POST - Create new URL
  if (req.method === 'POST') {
    try {
      const { longUrl, customId, title, tags } = req.body;

      if (!longUrl) {
        return res.status(400).json({ error: 'longUrl required' });
      }

      const user = await User.findById(authUser.id);
      const count = await Url.countDocuments({ owner: authUser.id });
      
      if (count >= user.limits.maxUrls) {
        return res.status(403).json({ error: 'URL limit reached. Upgrade your plan.' });
      }

      let shortId = customId || generateShortId();
      const exists = await Url.findOne({ shortId });
      if (exists) {
        return res.status(409).json({ error: 'Short ID already taken' });
      }

      const url = await Url.create({
        shortId,
        longUrl,
        owner: authUser.id,
        title,
        tags: tags || []
      });

      return res.json({ url });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
