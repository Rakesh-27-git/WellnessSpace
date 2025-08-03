# 🌿 WellnessSpace

A full-stack wellness platform where users can create, share, and discover guided wellness sessions. Built with React, Node.js, and MongoDB.

## ✨ Features

- **User Authentication**: Secure login/register system with JWT tokens
- **Session Management**: Create, edit, and publish wellness sessions
- **Draft System**: Save sessions as drafts before publishing
- **Tagging System**: Organize sessions with custom tags
- **Responsive Design**: Beautiful UI that works on all devices
- **Real-time Auto-save**: Automatic draft saving while editing

## 🚀 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Shadcn/ui** for UI components
- **React Router** for navigation
- **Axios** for API calls

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose
- **JWT** for authentication
- **bcrypt** for password hashing
- **CORS** for cross-origin requests

## 📁 Project Structure

```
wellnessSpace/
├── backend/                 # Node.js API server
│   ├── controllers/         # Route controllers
│   ├── db/                  # Database connection
│   ├── middlewares/         # Express middlewares
│   ├── models/              # MongoDB schemas
│   ├── routes/              # API routes
│   ├── utils/               # Utility functions
│   ├── index.js             # Server entry point
│   └── server.js            # Express app setup
├── frontend/                # React application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── hooks/           # Custom hooks
│   │   ├── lib/             # API and utilities
│   │   ├── pages/           # Page components
│   │   └── utils/           # Helper functions
│   └── public/              # Static assets
└── README.md               # This file
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB database

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables**
   ```env
   MONGODB_URL=your_mongodb_connection_string
   ACCESS_TOKEN_SECRET=your_access_token_secret
   REFRESH_TOKEN_SECRET=your_refresh_token_secret
   ACCESS_TOKEN_EXPIRY=1d
   REFRESH_TOKEN_EXPIRY=10d
   PORT=5000
   NODE_ENV=development
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:8080`

## 🌐 API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `POST /api/users/logout` - Logout user
- `POST /api/users/refresh-token` - Refresh access token

### Sessions
- `GET /api/sessions` - Get all published sessions
- `GET /api/my-sessions` - Get user's sessions (authenticated)
- `GET /api/my-sessions/:id` - Get specific session (authenticated)
- `POST /api/my-sessions/save-draft` - Save session as draft (authenticated)
- `POST /api/my-sessions/publish` - Publish session (authenticated)

## 🚀 Deployment

### Backend Deployment (Render)

1. **Connect your GitHub repository to Render**
2. **Create a new Web Service**
3. **Configure the service:**
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`
4. **Add environment variables in Render dashboard**
5. **Deploy**

### Frontend Deployment (Vercel)

1. **Connect your GitHub repository to Vercel**
2. **Configure the project:**
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. **Add environment variables if needed**
4. **Deploy**

### Environment Variables for Production

#### Backend (Render)
```env
MONGODB_URL=your_mongodb_atlas_url
ACCESS_TOKEN_SECRET=your_secure_secret
REFRESH_TOKEN_SECRET=your_secure_refresh_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_EXPIRY=10d
NODE_ENV=production
```

#### Frontend (Vercel)
```env
VITE_API_BASE_URL=https://your-backend-url.onrender.com/api
```

## 🔧 Development Scripts

### Backend
```bash
npm run dev          # Start development server with nodemon
npm start           # Start production server
npm test            # Run tests (if configured)
```

### Frontend
```bash
npm run dev         # Start development server
npm run build       # Build for production
npm run preview     # Preview production build
npm run lint        # Run ESLint
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/wellnessspace/issues) page
2. Create a new issue with detailed information
3. Contact the maintainers

## 🙏 Acknowledgments

- [Shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS
- [Vite](https://vitejs.dev/) for fast development experience
- [MongoDB](https://www.mongodb.com/) for database
- [Render](https://render.com/) for backend hosting
- [Vercel](https://vercel.com/) for frontend hosting

---

Made with ❤️ for the wellness community 