# Contributing to URLShort SaaS

Thank you for your interest in contributing to URLShort! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Git
- Basic knowledge of React, Node.js, and MongoDB

### Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/YOUR_USERNAME/urlshort-saas.git
   cd urlshort-saas
   ```

2. **Install Dependencies**
   ```bash
   # Backend
   cd backend
   npm install
   
   # Frontend
   cd ../frontend
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start Development Servers**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev
   
   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

## 📋 Contribution Guidelines

### Code Style
- Follow ESLint configuration
- Use meaningful variable and function names
- Add comments for complex logic
- Follow existing code patterns

### Commit Messages
Use conventional commit format:
```
type(scope): description

Examples:
feat(auth): add social login integration
fix(api): resolve URL validation issue
docs(readme): update installation instructions
style(ui): improve button hover effects
```

### Pull Request Process

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**
   - Write clean, readable code
   - Add tests if applicable
   - Update documentation if needed

3. **Test Your Changes**
   - Test frontend functionality
   - Test API endpoints
   - Verify database operations

4. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat(scope): your commit message"
   ```

5. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

## 🎯 Areas for Contribution

### High Priority
- [ ] **Testing**: Add unit tests and integration tests
- [ ] **Performance**: Optimize database queries and API responses
- [ ] **Security**: Enhance authentication and input validation
- [ ] **Documentation**: Improve API documentation and guides

### Medium Priority
- [ ] **Features**: Add new URL management features
- [ ] **UI/UX**: Improve user interface and experience
- [ ] **Analytics**: Enhance analytics dashboard
- [ ] **Mobile**: Add mobile responsiveness improvements

### Low Priority
- [ ] **Internationalization**: Add more language support
- [ ] **Themes**: Add more theme options
- [ ] **Integrations**: Add third-party service integrations

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Description**: Clear description of the issue
2. **Steps to Reproduce**: Detailed steps to reproduce the bug
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Environment**: OS, browser, Node.js version
6. **Screenshots**: If applicable

## 💡 Feature Requests

When suggesting features:

1. **Use Case**: Explain the problem it solves
2. **Proposed Solution**: Describe your proposed solution
3. **Alternatives**: Consider alternative approaches
4. **Impact**: Explain the impact on existing users

## 📚 Development Resources

### API Documentation
- Backend API: `http://localhost:4000/health`
- Authentication endpoints: `/api/auth/*`
- URL management: `/api/urls/*`
- Analytics: `/api/analytics/*`

### Database Schema
- **Users**: Authentication and user data
- **URLs**: Short URL mappings and metadata
- **Clicks**: Click tracking and analytics

### Frontend Architecture
- **Components**: Reusable UI components
- **Pages**: Main application pages
- **Contexts**: React context for state management
- **Hooks**: Custom React hooks
- **Store**: Zustand state management

## 🤝 Code Review Process

### For Contributors
- Address review feedback promptly
- Be open to suggestions and improvements
- Ask questions if something is unclear

### For Reviewers
- Provide constructive feedback
- Focus on code quality and functionality
- Be respectful and helpful

## 📞 Getting Help

- **GitHub Issues**: For bugs and feature requests
- **Discussions**: For general questions and ideas
- **Email**: oshimpathan8@gmail.com

## 🏆 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to URLShort! 🎉
