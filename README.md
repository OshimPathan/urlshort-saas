# 🚀 URLShort - Professional URL Shortener SaaS Platform

[![React](https://img.shields.io/badge/React-18.0-blue?logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.0-green?logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0-green?logo=mongodb)](https://mongodb.com/)
[![Express](https://img.shields.io/badge/Express-4.18-black?logo=express)](https://expressjs.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0-blue?logo=tailwind-css)](https://tailwindcss.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Payment-purple?logo=stripe)](https://stripe.com/)

> **A full-stack SaaS platform for URL shortening with enterprise-grade features, built with modern technologies and best practices.**

## 🌟 **Live Demo**
- **Frontend**: [Demo Link](http://localhost:5173) 
- **API Documentation**: [API Docs](http://localhost:4000/health)
- **Features**: URL shortening, analytics, payments, multi-language support

---

## 🎯 **Project Overview**

URLShort is a comprehensive SaaS platform that provides URL shortening services with advanced analytics, payment integration, and multi-language support. Built with modern web technologies and following industry best practices.

### **Key Achievements**
- ✅ **Full-Stack Development**: Complete React frontend + Node.js backend
- ✅ **Database Design**: MongoDB with optimized schemas and indexing
- ✅ **Payment Integration**: Stripe subscription system with webhooks
- ✅ **Real-time Features**: Socket.io for live analytics updates
- ✅ **Internationalization**: 7-language support system
- ✅ **Security**: JWT authentication, rate limiting, input validation
- ✅ **DevOps**: Docker containerization and deployment ready

---

## 🛠️ **Technical Stack**

### **Frontend Technologies**
- **React 18** - Modern UI library with hooks and context
- **Vite** - Fast build tool and development server
- **TailwindCSS** - Utility-first CSS framework
- **Zustand** - Lightweight state management
- **Axios** - HTTP client with interceptors
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icon library

### **Backend Technologies**
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **Socket.io** - Real-time bidirectional communication
- **JWT** - JSON Web Token authentication
- **bcrypt** - Password hashing and security
- **Stripe** - Payment processing and subscription management

### **DevOps & Tools**
- **Docker** - Containerization for easy deployment
- **Git** - Version control and collaboration
- **ESLint** - Code linting and quality assurance
- **Nodemon** - Development server with auto-restart

---

## 🚀 **Features Implemented**

### **Core Functionality**
- 🔗 **URL Shortening**: Create custom short links with optional aliases
- 📊 **Analytics Dashboard**: Real-time click tracking and performance metrics
- 🎨 **Modern UI/UX**: Responsive design with dark/light theme toggle
- 🔐 **User Authentication**: Secure JWT-based authentication system
- 📱 **QR Code Generation**: Generate and download QR codes for links

### **Advanced Features**
- 💳 **Payment System**: Stripe integration with subscription management
- 🌍 **Multi-language Support**: 7 languages (English, Nepali, German, Hindi, French, Spanish, Japanese)
- 🔐 **Social Login**: OAuth integration (Google, GitHub, Facebook, Twitter, LinkedIn)
- 📈 **Real-time Analytics**: Live click tracking with Socket.io
- 🎯 **Custom Domains**: Support for branded short URLs
- 📊 **Data Visualization**: Interactive charts and performance metrics

### **Enterprise Features**
- 🛡️ **Security**: Rate limiting, CORS, Helmet.js security headers
- 📊 **Analytics**: Detailed click tracking with IP, user agent, referrer data
- 🔄 **API Integration**: RESTful API with comprehensive endpoints
- 🐳 **Docker Support**: Containerized deployment ready
- 📚 **Documentation**: Comprehensive setup and API documentation

---

## 📁 **Project Structure**

```
urlshort-saas/
├── 📁 backend/                 # Node.js/Express API
│   ├── 📁 src/
│   │   ├── 📁 models/          # MongoDB schemas
│   │   ├── 📁 routes/          # API endpoints
│   │   ├── 📁 utils/           # Helper functions
│   │   └── 📄 server.js        # Main server file
│   ├── 📄 package.json         # Backend dependencies
│   └── 📄 Dockerfile           # Backend container
├── 📁 frontend/                # React application
│   ├── 📁 src/
│   │   ├── 📁 components/      # Reusable UI components
│   │   ├── 📁 pages/           # Application pages
│   │   ├── 📁 contexts/        # React contexts
│   │   ├── 📁 hooks/            # Custom React hooks
│   │   ├── 📁 store/            # State management
│   │   └── 📁 lib/              # Utility functions
│   ├── 📄 package.json         # Frontend dependencies
│   └── 📄 Dockerfile           # Frontend container
├── 📄 docker-compose.yml       # Multi-container setup
├── 📄 README.md                # Project documentation
└── 📄 .env.example             # Environment variables template
```

---

## 🚀 **Quick Start**

### **Prerequisites**
- Node.js 18+
- MongoDB (local or Atlas)
- Git

### **Installation**

```bash
# Clone the repository
git clone https://github.com/oshimkhan/urlshort-saas.git
cd urlshort-saas

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Configure environment variables
cp .env.example .env
cp .env.example backend/.env

# Frontend Vite env
cat <<EOF > frontend/.env
VITE_API_URL=http://localhost:4000
VITE_SOCKET_URL=http://localhost:4000
EOF

# Edit .env and backend/.env with your configuration

# Start MongoDB (if using local)
brew services start mongodb-community

# Start backend server
cd ../backend
npm start

# Start frontend server (in new terminal)
cd frontend
npm run dev
```

### **Access the Application**
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:4000
- **Health Check**: http://localhost:4000/health

---

## 🔧 **API Endpoints**

### **Authentication**
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### **URL Management**
- `GET /api/urls` - Get user's URLs
- `POST /api/urls` - Create short URL
- `GET /api/urls/:id` - Get URL details
- `PUT /api/urls/:id` - Update URL
- `DELETE /api/urls/:id` - Delete URL
- `GET /api/urls/:id/qr` - Generate QR code

### **Analytics**
- `GET /api/analytics/overview` - Get user statistics
- `GET /api/analytics/:urlId` - Get URL analytics

### **Redirect**
- `GET /r/:shortId` - Redirect to original URL

---

## 🎨 **Screenshots**

### **Dashboard**
![Dashboard](https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=Analytics+Dashboard)

### **URL Management**
![URL Management](https://via.placeholder.com/800x400/059669/FFFFFF?text=URL+Management+Interface)

### **Multi-language Support**
![Multi-language](https://via.placeholder.com/800x400/DC2626/FFFFFF?text=Multi-language+Support)

---

## 🏆 **Technical Achievements**

### **Performance Optimizations**
- ⚡ **Fast Loading**: Vite build tool for optimized bundle size
- 🚀 **Real-time Updates**: Socket.io for instant analytics updates
- 📊 **Efficient Queries**: MongoDB indexing for fast data retrieval
- 🎯 **Code Splitting**: React lazy loading for better performance

### **Security Implementation**
- 🔐 **Authentication**: JWT tokens with HTTP-only cookies
- 🛡️ **Input Validation**: Comprehensive request validation
- 🚫 **Rate Limiting**: API protection against abuse
- 🔒 **Password Security**: bcrypt hashing with salt rounds

### **Scalability Features**
- 🐳 **Containerization**: Docker for easy deployment
- 📊 **Database Design**: Optimized MongoDB schemas
- 🔄 **API Design**: RESTful architecture with proper status codes
- 📈 **Monitoring**: Health checks and error logging

---

## 🛠️ **Development Process**

### **Code Quality**
- ✅ **ESLint**: Code linting and style enforcement
- ✅ **Git Workflow**: Feature branches and commit conventions
- ✅ **Documentation**: Comprehensive README and code comments
- ✅ **Error Handling**: Proper error boundaries and logging

### **Testing Strategy**
- 🧪 **API Testing**: Manual testing of all endpoints
- 🔍 **Frontend Testing**: Component testing and user flows
- 📊 **Database Testing**: Data integrity and query optimization
- 🚀 **Performance Testing**: Load testing and optimization

---

## 🌟 **Key Learning Outcomes**

### **Technical Skills Developed**
- **Full-Stack Development**: End-to-end application development
- **Database Design**: MongoDB schema design and optimization
- **API Development**: RESTful API design and implementation
- **Frontend Architecture**: React component design and state management
- **Payment Integration**: Stripe API integration and webhook handling
- **Real-time Features**: Socket.io implementation for live updates
- **Internationalization**: Multi-language support system
- **DevOps**: Docker containerization and deployment

### **Soft Skills Demonstrated**
- **Problem Solving**: Complex feature implementation and bug fixing
- **Project Management**: Feature planning and implementation timeline
- **Documentation**: Comprehensive technical documentation
- **Code Organization**: Clean, maintainable, and scalable code structure

---

## 📈 **Future Enhancements**

- [ ] **Mobile App**: React Native mobile application
- [ ] **Advanced Analytics**: Machine learning insights
- [ ] **API Rate Limiting**: Tiered API access plans
- [ ] **Custom Domains**: User-defined domain support
- [ ] **Team Collaboration**: Multi-user workspace features
- [ ] **Bulk Operations**: CSV import/export functionality

---

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 **Developer**

**Oseem Pathan**
- **GitHub**: [@oshimkhan](https://github.com/oshimkhan)
- **LinkedIn**: [Your LinkedIn Profile](https://linkedin.com/in/yourprofile)
- **Email**: oshimpathan8@gmail.com
- **Portfolio**: [Your Portfolio Website](https://yourportfolio.com)

---

## 🙏 **Acknowledgments**

- **React Team** - For the amazing frontend framework
- **Express.js** - For the robust backend framework
- **MongoDB** - For the flexible database solution
- **Stripe** - For the payment processing platform
- **TailwindCSS** - For the utility-first CSS framework

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

[![GitHub stars](https://img.shields.io/github/stars/oshimkhan/urlshort-saas?style=social)](https://github.com/oshimkhan/urlshort-saas)
[![GitHub forks](https://img.shields.io/github/forks/oshimkhan/urlshort-saas?style=social)](https://github.com/oshimkhan/urlshort-saas)

</div>
- Input validation

## 💳 Stripe Integration

1. Create products in Stripe Dashboard
2. Get price IDs for Pro and Business plans
3. Add price IDs to `.env`
4. Configure webhook endpoint in Stripe
5. Add webhook secret to `.env`

## 📊 Database Schema

### User
- email, passwordHash, name
- plan (free/pro/business)
- stripeCustomerId, stripeSubscriptionId
- subscriptionStatus
- limits (maxUrls, customDomains)

### Url
- shortId, longUrl, owner
- title, tags, domain
- expiresAt, clicks

### Click
- url, ip, userAgent
- referrer, country
- timestamp

## 🚀 Deployment

### Backend
- Deploy to Railway, Render, or Heroku
- Set environment variables
- Connect to MongoDB Atlas

### Frontend
- Deploy to Vercel, Netlify, or Cloudflare Pages
- Set `VITE_API_URL` and `VITE_SOCKET_URL`

### MongoDB
- Use MongoDB Atlas for production
- Set up indexes for performance

## 📱 Screenshots

- Landing page with hero and animations
- Auth page with modern design
- Dashboard with real-time stats
- URL table with copy/QR/delete actions
- QR modal with download
- Dark mode support

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first.

## 📄 License

MIT

## 🙏 Credits

Inspired by Bitly and Canva's beautiful UI/UX design.

---

**Happy URL Shortening! 🎉**
