# 🚀 How to Run URLShort Project

## Quick Start (2 Terminals)

### Terminal 1 - Backend
```bash
cd /Users/oseempathan/Developer/urlshort-saas/backend
npm run dev
```
✅ Backend will run on **http://localhost:4000**

### Terminal 2 - Frontend
```bash
cd /Users/oseempathan/Developer/urlshort-saas/frontend
npm run dev
```
✅ Frontend will run on **http://localhost:5173**

---

## ⚠️ Important: Backend MUST be running!

The backend handles:
- User authentication
- URL shortening
- Database operations
- Analytics

**If backend is not running, you'll see white pages!**

---

## 🔍 Troubleshooting

### White Page Issue
**Cause:** Backend is not running or frontend can't connect to it.

**Solution:**
1. Make sure MongoDB is running:
   ```bash
   brew services start mongodb-community
   ```

2. Start backend first (Terminal 1)
3. Then start frontend (Terminal 2)
4. Check browser console (F12) for errors

### Port Already in Use
```bash
# Kill process on port 4000
kill -9 $(lsof -ti:4000)

# Kill process on port 5173
kill -9 $(lsof -ti:5173)
```

### Backend Won't Start
1. Check if MongoDB is running
2. Check `.env` file exists in backend folder
3. Run `npm install` in backend folder

---

## ✅ Verification Steps

1. **Backend Running:**
   - Open http://localhost:4000/health
   - Should see: `{"ok":true}`

2. **Frontend Running:**
   - Open http://localhost:5173
   - Should see landing page

3. **Test URL Shortener:**
   - Paste a URL on landing page
   - Click "Get your link for free"
   - Should generate a short URL

4. **Test Login:**
   - Click "Sign up Free"
   - Create account with email/password
   - Should redirect to dashboard

---

## 📋 Current Configuration

- **Backend:** http://localhost:4000
- **Frontend:** http://localhost:5173
- **MongoDB:** mongodb://localhost:27017/urlshort

---

## 🎯 What Works Now

✅ Landing page with URL shortener (demo mode)
✅ Navigation with dropdowns
✅ Email/password signup/login
✅ Dashboard with all sections
✅ Analytics with charts
✅ QR code generation
✅ Professional chatbot
✅ Help section with contacts
✅ Comprehensive footer

---

## 🔧 If Still Getting White Pages

1. **Open Browser Console (F12)**
   - Look for red errors
   - Check Network tab for failed requests

2. **Common Errors:**
   - `ERR_CONNECTION_REFUSED` → Backend not running
   - `CORS error` → Wrong port in .env
   - `404 Not Found` → Route doesn't exist

3. **Fix:**
   - Restart backend with `rs` in terminal
   - Clear browser cache (Cmd+Shift+R)
   - Check both servers are running

---

**Need Help?** Check the terminal output for errors!
