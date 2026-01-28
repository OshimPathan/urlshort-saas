# 🚀 Vercel Deployment Guide

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **MongoDB Atlas**: Set up a cloud MongoDB database at [mongodb.com/atlas](https://www.mongodb.com/atlas)
3. **Vercel CLI**: Install with `npm install -g vercel`

---

## Quick Deploy (Recommended)

### Option 1: Deploy via Vercel Dashboard

1. **Push your code to GitHub** (if not already done)
   ```bash
   git add .
   git commit -m "Add Vercel deployment configuration"
   git push origin main
   ```

2. **Import Project on Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository: `OshimPathan/urlshort-saas`
   - Vercel will auto-detect the framework

3. **Configure Environment Variables**
   
   Add these in Vercel Dashboard → Settings → Environment Variables:
   
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/urlshort
   JWT_SECRET=your-super-secret-jwt-key-min-32-chars
   STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
   FRONTEND_URL=https://your-app.vercel.app
   SHORT_DOMAIN=https://your-app.vercel.app
   VITE_API_URL=https://your-app.vercel.app/api
   VITE_SOCKET_URL=https://your-app.vercel.app
   NODE_ENV=production
   ```

4. **Deploy** - Click "Deploy" button

---

### Option 2: Deploy via CLI

1. **Login to Vercel**
   ```bash
   vercel login
   ```

2. **Deploy**
   ```bash
   cd /Users/oseempathan/Developer/urlshort-saas
   vercel
   ```

3. **Follow prompts:**
   - Set up and deploy? **Y**
   - Which scope? (Select your account)
   - Link to existing project? **N**
   - Project name? `urlshort-saas` (or your choice)
   - In which directory is your code? `./`
   - Auto-detected settings? **Y**

4. **Add Environment Variables**
   ```bash
   vercel env add MONGODB_URI
   vercel env add JWT_SECRET
   vercel env add STRIPE_SECRET_KEY
   vercel env add STRIPE_WEBHOOK_SECRET
   vercel env add FRONTEND_URL
   vercel env add SHORT_DOMAIN
   vercel env add VITE_API_URL
   vercel env add VITE_SOCKET_URL
   ```

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

---

## MongoDB Atlas Setup

1. **Create Free Cluster** at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. **Create Database User** with username and password
3. **Whitelist IP**: Add `0.0.0.0/0` to allow all IPs (for Vercel)
4. **Get Connection String**: 
   - Click "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Example: `mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/urlshort`

---

## Build Configuration

The project is configured with:
- **Frontend Build**: `vite build` (outputs to `frontend/dist`)
- **Backend**: Runs as serverless functions
- **Routes**: 
  - `/api/*` → Backend API
  - `/*` → Frontend static files

---

## Important Notes

### ⚠️ Socket.IO Limitation
Vercel serverless functions have a **10-second timeout** and don't support persistent WebSocket connections. Real-time features may need adjustment:

**Solutions:**
1. **Use Vercel's Edge Runtime** with Server-Sent Events (SSE)
2. **Deploy backend separately** to Railway/Render for WebSocket support
3. **Use polling** instead of WebSockets for real-time updates

### 🔐 Environment Variables
- Add all variables in Vercel Dashboard
- Never commit `.env` files to git
- Use Vercel's secret encryption for sensitive data

### 🌍 Custom Domain (Optional)
1. Go to Vercel Dashboard → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Update `FRONTEND_URL` and `SHORT_DOMAIN` environment variables

---

## Alternative: Split Deployment

For better WebSocket support, consider:

### Frontend on Vercel
- Deploy only the `frontend` folder
- Set `VITE_API_URL` to your backend URL

### Backend on Railway/Render
- Deploy `backend` folder separately
- Full WebSocket support
- Better for real-time features

---

## Verify Deployment

After deployment:
1. ✅ Visit your Vercel URL
2. ✅ Test user registration/login
3. ✅ Test URL shortening
4. ✅ Check analytics dashboard
5. ✅ Verify real-time updates work

---

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify Node version compatibility

### API Not Working
- Check environment variables are set
- Verify CORS settings allow your domain
- Check serverless function logs

### Database Connection Issues
- Verify MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- Check connection string format
- Ensure database user has correct permissions

---

## Production Checklist

- [ ] MongoDB Atlas database created and configured
- [ ] All environment variables set in Vercel
- [ ] Custom domain configured (optional)
- [ ] Stripe webhooks endpoint updated
- [ ] Test all features in production
- [ ] Monitor Vercel Analytics
- [ ] Set up error tracking (Sentry, etc.)

---

## Support

For issues, check:
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Community](https://github.com/vercel/vercel/discussions)
- Project issues: [GitHub Issues](https://github.com/OshimPathan/urlshort-saas/issues)
