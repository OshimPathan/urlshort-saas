# 🚀 URLShort SaaS - Complete Setup Guide

## ✨ New Professional Features

### 1. **Payment System** 💳
- **Stripe Integration** with Card and PayPal support
- Beautiful payment modal with plan selection
- Secure checkout flow
- Subscription management portal

### 2. **AI-Powered Chatbot** 🤖
- Intelligent responses based on user queries
- Quick reply suggestions
- Real-time typing indicators
- Professional UI with timestamps
- Context-aware help system

### 3. **Advanced Analytics** 📊
- **Interactive Charts**:
  - Line charts for click trends
  - Bar charts for top performing links
  - Pie charts for performance distribution
  - Area charts for time-series data
- Real-time KPI cards
- Detailed performance rankings
- Professional data visualization with Recharts

### 4. **Social Login** 🔐
- **Google** OAuth
- **GitHub** OAuth
- **Twitter** OAuth
- **Facebook** OAuth
- **LinkedIn** OAuth
- One-click authentication
- Seamless user experience

---

## 📦 Installation

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Stripe account (optional)
- OAuth app credentials (optional)

### Step 1: Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### Step 2: Configure Environment Variables

Create `.env` in the root directory (used by Docker and as a reference), then copy it to `backend/.env`. For the frontend, create `frontend/.env` with Vite variables.

```bash
# Backend Configuration
PORT=4000
BACKEND_URL=http://localhost:4000
MONGODB_URI=mongodb://localhost:27017/urlshort
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
CORS_ORIGIN=http://localhost:5173
FRONTEND_URL=http://localhost:5173
SHORT_DOMAIN=http://localhost:4000

# Stripe (Get from https://dashboard.stripe.com)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
STRIPE_PRO_PRICE_ID=price_your_pro_price_id
STRIPE_BUSINESS_PRICE_ID=price_your_business_price_id

# Google OAuth (Get from https://console.cloud.google.com)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# GitHub OAuth (Get from https://github.com/settings/developers)
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# Facebook OAuth (Get from https://developers.facebook.com)
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret

# Twitter OAuth (Get from https://developer.twitter.com)
TWITTER_CONSUMER_KEY=your_twitter_consumer_key
TWITTER_CONSUMER_SECRET=your_twitter_consumer_secret

# LinkedIn OAuth (Get from https://www.linkedin.com/developers)
LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret
```

**Frontend env (`frontend/.env`):**
```bash
VITE_API_URL=http://localhost:4000
VITE_SOCKET_URL=http://localhost:4000
```

---

## 🔧 OAuth Setup Guide

### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:4000/api/auth/google/callback`
6. Copy Client ID and Secret to `.env`

### GitHub OAuth
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Set callback URL: `http://localhost:4000/api/auth/github/callback`
4. Copy Client ID and Secret to `.env`

### Facebook OAuth
1. Go to [Facebook Developers](https://developers.facebook.com)
2. Create a new app
3. Add Facebook Login product
4. Set redirect URI: `http://localhost:4000/api/auth/facebook/callback`
5. Copy App ID and Secret to `.env`

### Twitter OAuth
1. Go to [Twitter Developer Portal](https://developer.twitter.com)
2. Create a new app
3. Enable OAuth 1.0a
4. Set callback URL: `http://localhost:4000/api/auth/twitter/callback`
5. Copy API Key and Secret to `.env`

### LinkedIn OAuth
1. Go to [LinkedIn Developers](https://www.linkedin.com/developers)
2. Create a new app
3. Add Sign In with LinkedIn product
4. Set redirect URL: `http://localhost:4000/api/auth/linkedin/callback`
5. Copy Client ID and Secret to `.env`

---

## 💳 Stripe Setup

### 1. Create Stripe Account
- Sign up at [stripe.com](https://stripe.com)
- Get your test API keys from Dashboard

### 2. Create Products
```bash
# In Stripe Dashboard:
1. Go to Products
2. Create "Pro Plan" - $9/month
3. Create "Business Plan" - $29/month
4. Copy the Price IDs to .env
```

### 3. Setup Webhook
```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks to local
stripe listen --forward-to localhost:4000/webhooks/stripe

# Copy webhook secret to .env
```

---

## 🚀 Running the Application

### Option 1: Manual Start

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Option 2: Docker (Coming Soon)
```bash
docker-compose up
```

---

## 🎨 Features Overview

### Dashboard Views

1. **Dashboard** - Overview with stats and quick actions
2. **My Links** - Full URL management
3. **Analytics** - Professional charts and graphs
4. **Settings** - Account and billing management
5. **Help** - Support and documentation

### Payment Flow

1. User clicks "Upgrade Plan" in Settings
2. Payment modal opens with Card/PayPal options
3. User selects payment method
4. Redirects to Stripe checkout
5. Webhook updates user plan automatically

### Chatbot Features

- **Intelligent Responses** for common questions
- **Quick Replies** for faster interaction
- **Context-Aware** help based on user queries
- **Professional UI** with typing indicators

### Analytics Features

- **4 Interactive Charts**:
  - Clicks Over Time (Area Chart)
  - Top Performing Links (Bar Chart)
  - Performance Distribution (Pie Chart)
  - Click Trends (Line Chart)
- **KPI Cards** with gradient backgrounds
- **Detailed Rankings** with performance indicators
- **Real-time Updates** via Socket.io

---

## 🔐 Security Features

- JWT authentication with HTTP-only cookies
- OAuth 2.0 for social login
- CORS protection
- Rate limiting
- Helmet.js security headers
- Password hashing with bcrypt
- Stripe secure payments

---

## 📱 Responsive Design

- Mobile-first approach
- Dark mode support
- Tailwind CSS styling
- Modern UI components
- Smooth animations

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 4000
kill -9 $(lsof -ti:4000)

# Kill process on port 5173
kill -9 $(lsof -ti:5173)
```

### MongoDB Connection Error
```bash
# Start MongoDB
brew services start mongodb-community

# Or use Docker
docker run -d -p 27017:27017 mongo
```

### OAuth Not Working
- Check callback URLs match exactly
- Verify credentials in `.env`
- Ensure OAuth apps are in development mode
- Check CORS settings

### Stripe Webhook Failing
- Run `stripe listen` in separate terminal
- Copy webhook secret to `.env`
- Restart backend server

---

## 📚 API Endpoints

### Authentication
- `POST /api/auth/signup` - Email/password signup
- `POST /api/auth/login` - Email/password login
- `GET /api/auth/google` - Google OAuth
- `GET /api/auth/github` - GitHub OAuth
- `GET /api/auth/facebook` - Facebook OAuth
- `GET /api/auth/twitter` - Twitter OAuth
- `GET /api/auth/linkedin` - LinkedIn OAuth

### URLs
- `GET /api/urls` - Get user's URLs
- `POST /api/urls` - Create short URL
- `DELETE /api/urls/:id` - Delete URL
- `GET /api/urls/:id/qr` - Get QR code

### Analytics
- `GET /api/analytics/overview` - Get stats
- `GET /api/analytics/:urlId` - Get URL analytics

### Billing
- `POST /api/billing/create-checkout` - Create Stripe checkout
- `POST /api/billing/create-portal` - Open billing portal

---

## 🎯 Next Steps

1. ✅ Test all features locally
2. ✅ Configure OAuth providers
3. ✅ Set up Stripe products
4. ✅ Test payment flow
5. ✅ Deploy to production

---

## 📄 License

MIT

---

**Happy URL Shortening! 🎉**
