import connectDB from '../_db.js';
import Url from '../_models/Url.js';
import Click from '../_models/Click.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { shortId } = req.query;

  try {
    await connectDB();

    const url = await Url.findOne({ shortId });

    if (!url) {
      return res.status(404).send(`
        <!DOCTYPE html>
        <html>
        <head><title>Not Found</title></head>
        <body style="font-family: sans-serif; text-align: center; padding: 50px;">
          <h1>404 - Short URL not found</h1>
          <p>The requested short URL does not exist.</p>
          <a href="/">Go to Homepage</a>
        </body>
        </html>
      `);
    }

    // Track click
    url.clicks += 1;
    await url.save();

    // Record click analytics
    await Click.create({
      url: url._id,
      ip: req.headers['x-forwarded-for'] || req.socket?.remoteAddress,
      userAgent: req.headers['user-agent'],
      referrer: req.headers.referer || req.headers.referrer
    });

    // Redirect to original URL
    res.redirect(302, url.longUrl);
  } catch (e) {
    console.error('Redirect error:', e);
    res.status(500).send('Server error');
  }
}
