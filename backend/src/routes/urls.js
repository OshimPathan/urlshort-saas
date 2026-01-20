import { Router } from 'express';
import Url from '../models/Url.js';
import User from '../models/User.js';
import { authMiddleware } from '../utils/jwt.js';
import { generateShortId } from '../utils/shortid.js';
import QRCode from 'qrcode';

const router = Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
  const urls = await Url.find({ owner: req.user.id }).sort({ createdAt: -1 });
  res.json({ urls });
});

router.post('/', async (req, res) => {
  try {
    const { longUrl, customId, title, tags } = req.body;
    console.log('Creating URL with:', { longUrl, customId, title });
    
    if (!longUrl) return res.status(400).json({ error: 'longUrl required' });

    const user = await User.findById(req.user.id);
    const count = await Url.countDocuments({ owner: req.user.id });
    if (count >= user.limits.maxUrls) {
      return res.status(403).json({ error: 'URL limit reached. Upgrade your plan.' });
    }

    let shortId = customId || generateShortId();
    const exists = await Url.findOne({ shortId });
    if (exists) return res.status(409).json({ error: 'Short ID already taken' });

    const url = await Url.create({
      shortId,
      longUrl,
      owner: req.user.id,
      title,
      tags: tags || []
    });

    console.log('Created URL:', { shortId: url.shortId, longUrl: url.longUrl });
    res.json({ url });
  } catch (e) {
    console.error('URL creation error:', e);
    res.status(500).json({ error: e.message });
  }
});

router.get('/:id', async (req, res) => {
  const url = await Url.findOne({ _id: req.params.id, owner: req.user.id });
  if (!url) return res.status(404).json({ error: 'Not found' });
  res.json({ url });
});

router.put('/:id', async (req, res) => {
  const { title, tags, longUrl } = req.body;
  const url = await Url.findOneAndUpdate(
    { _id: req.params.id, owner: req.user.id },
    { title, tags, longUrl },
    { new: true }
  );
  if (!url) return res.status(404).json({ error: 'Not found' });
  res.json({ url });
});

router.delete('/:id', async (req, res) => {
  const url = await Url.findOneAndDelete({ _id: req.params.id, owner: req.user.id });
  if (!url) return res.status(404).json({ error: 'Not found' });
  res.json({ ok: true });
});

router.get('/:id/qr', async (req, res) => {
  try {
    const url = await Url.findOne({ _id: req.params.id, owner: req.user.id });
    if (!url) return res.status(404).json({ error: 'Not found' });
    const shortUrl = `${process.env.SHORT_DOMAIN || process.env.BACKEND_URL || 'http://localhost:4000'}/r/${url.shortId}`;
    const qr = await QRCode.toDataURL(shortUrl);
    res.json({ qr });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
