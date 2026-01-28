import connectDB from '../_db.js';
import Url from '../_models/Url.js';
import { getAuthUser } from '../_auth.js';
import QRCode from 'qrcode';

export default async function handler(req, res) {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const authUser = getAuthUser(req);
  if (!authUser) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  await connectDB();

  // Get ID from URL path
  const { id } = req.query;

  // Handle QR code request
  if (id && id.endsWith('-qr')) {
    const urlId = id.replace('-qr', '');
    try {
      const url = await Url.findOne({ _id: urlId, owner: authUser.id });
      if (!url) {
        return res.status(404).json({ error: 'Not found' });
      }
      const shortUrl = `${process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : process.env.SHORT_DOMAIN || 'http://localhost:4000'}/r/${url.shortId}`;
      const qr = await QRCode.toDataURL(shortUrl);
      return res.json({ qr });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  // GET - Get single URL
  if (req.method === 'GET') {
    try {
      const url = await Url.findOne({ _id: id, owner: authUser.id });
      if (!url) {
        return res.status(404).json({ error: 'Not found' });
      }
      return res.json({ url });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  // PUT - Update URL
  if (req.method === 'PUT') {
    try {
      const { title, tags, longUrl } = req.body;
      const url = await Url.findOneAndUpdate(
        { _id: id, owner: authUser.id },
        { title, tags, longUrl },
        { new: true }
      );
      if (!url) {
        return res.status(404).json({ error: 'Not found' });
      }
      return res.json({ url });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  // DELETE - Delete URL
  if (req.method === 'DELETE') {
    try {
      const url = await Url.findOneAndDelete({ _id: id, owner: authUser.id });
      if (!url) {
        return res.status(404).json({ error: 'Not found' });
      }
      return res.json({ ok: true });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
