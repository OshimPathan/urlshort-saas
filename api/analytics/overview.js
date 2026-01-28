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

  try {
    const totalUrls = await Url.countDocuments({ owner: authUser.id });
    const urls = await Url.find({ owner: authUser.id });
    const totalClicks = urls.reduce((sum, u) => sum + u.clicks, 0);
    
    res.json({ totalUrls, totalClicks });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
