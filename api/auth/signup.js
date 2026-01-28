import bcrypt from 'bcryptjs';
import connectDB from '../_db.js';
import User from '../_models/User.js';
import { signJwt } from '../_auth.js';

export default async function handler(req, res) {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await connectDB();
    const { email, password, name } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, passwordHash, name });
    const token = signJwt({ id: user._id, email: user.email, plan: user.plan });

    res.json({ 
      user: { id: user._id, email: user.email, plan: user.plan, name: user.name }, 
      token 
    });
  } catch (e) {
    console.error('Signup error:', e);
    res.status(500).json({ error: e.message });
  }
}
