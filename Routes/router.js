const express = require('express');
const router = express.Router();
const mongoose = require('../db');
const { createAuthor, getAuthors } = require('../Controller/AuthorController');
const { createBlog, getBlogs, updateBlog, deleteBlog } = require('../Controller/BlogController');
const { adminLogin } = require('../admin');
const jwtAuthMiddleware = require('../Middleware/jwtAuthMiddleware');
const upload = require('../Middleware/upload');

// Public routes
router.post('/authors', createAuthor);
router.get('/authors', getAuthors);
router.get('/blogs', getBlogs);
router.post('/admin/login', adminLogin);

// Protected routes (require authentication)
router.post('/blogs', jwtAuthMiddleware, upload.single('image'), createBlog);
router.put('/blogs/:id', jwtAuthMiddleware, updateBlog);
router.delete('/blogs/:id', jwtAuthMiddleware, deleteBlog);

module.exports = router;