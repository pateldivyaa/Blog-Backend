const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

console.log('🚀 Starting server...');

// CORS Configuration - THIS IS THE FIX!
const corsOptions = {
  origin: [
    'https://blog-frontend-admin-hss7.vercel.app', // Your Vercel frontend
    'http://localhost:3000', // Local development
    'http://localhost:5173', // Vite dev server
    'http://localhost:5174', // Alternative Vite port
  ],
  credentials: true, // Allow cookies and auth headers
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    'X-Requested-With',
    'Accept',
    'Origin'
  ],
  optionsSuccessStatus: 200 // For legacy browser support
};

// Apply CORS with configuration
app.use(cors(corsOptions));

// Alternative manual CORS setup (use this if above doesn't work)
// app.use((req, res, next) => {
//   const allowedOrigins = [
//     'https://blog-frontend-admin-hss7.vercel.app',
//     'http://localhost:3000',
//     'http://localhost:5173'
//   ];
//   
//   const origin = req.headers.origin;
//   if (allowedOrigins.includes(origin)) {
//     res.setHeader('Access-Control-Allow-Origin', origin);
//   }
//   
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
//   res.setHeader('Access-Control-Allow-Credentials', 'true');
//   
//   if (req.method === 'OPTIONS') {
//     res.status(200).end();
//     return;
//   }
//   
//   next();
// });

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files
app.use('/uploads', express.static('uploads'));

// Add request logging for debugging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path} - Origin: ${req.headers.origin}`);
  next();
});

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Blog Backend API is running!',
    timestamp: new Date().toISOString(),
    cors: 'enabled'
  });
});

// Import and use your existing router
const router = require('./Routes/router');
app.use('/api', router);

// Basic route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Blog Backend API is running!',
    endpoints: {
      health: '/api/health',
      blogs: '/api/blogs',
      authors: '/api/authors',
      admin: '/api/admin'
    }
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server Error:', error);
  res.status(500).json({
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

// Handle 404
app.use('*', (req, res) => {
  res.status(404).json({
    message: 'Route not found',
    availableRoutes: ['/api/health', '/api/blogs', '/api/authors', '/api/admin']
  });
});

// Use environment PORT or 3000
const PORT = process.env.PORT || 3000;
// આ line change કરો:
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${PORT}`);
});