const express = require('express');
const jwt = require('jsonwebtoken');
const jwtAuthMiddleware = require('../Middleware/jwtAuthMiddleware');
const upload = require('../Middleware/upload');

// Import your existing controllers
const AuthorController = require('../Controller/AuthorController');
const BlogController = require('../Controller/BlogController');

const router = express.Router();

console.log('✅ Router loaded');

// Test route
router.get('/test', (req, res) => {
  res.json({ message: 'API is working!', timestamp: new Date() });
});

// Admin login
router.post('/admin/login', (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(
        { email, role: 'admin' },
        process.env.JWT_SECRET || 'secret123',
        { expiresIn: '24h' }
      );
      
      res.json({ success: true, token });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// Author routes
router.post('/authors', jwtAuthMiddleware, AuthorController.createAuthor);
router.get('/authors', AuthorController.getAuthors);

// Blog routes
router.post('/blogs', jwtAuthMiddleware, upload.single('image'), BlogController.createBlog);
router.get('/blogs', BlogController.getBlogs);
router.put('/blogs/:id', jwtAuthMiddleware, upload.single('image'), BlogController.updateBlog);
router.delete('/blogs/:id', jwtAuthMiddleware, BlogController.deleteBlog);

console.log('✅ All routes defined');

module.exports = router;