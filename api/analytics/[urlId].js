import connectDB from '../_db.js';
import Url from '../_models/Url.js';
import Click from '../_models/Click.js';
import { getAuthUser } from '../_auth.js';

export default async function handler(req, res) {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const authUser = getAuthUser(req);
  if (!authUser) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  await connectDB();

  const { urlId } = req.query;

  try {
    const url = await Url.findOne({ _id: urlId, owner: authUser.id });
    if (!url) {
      return res.status(404).json({ error: 'Not found' });
    }

    const clicks = await Click.find({ url: url._id }).sort({ createdAt: -1 }).limit(100);
    res.json({ url, clicks });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
