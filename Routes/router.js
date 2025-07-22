const express = require('express');
const router = express.Router();

console.log('🔍 Testing router definitions...');

try {
  // Test each route one by one
  console.log('Defining route: POST /authors');
  router.post('/authors', (req, res) => res.json({message: 'createAuthor'}));
  
  console.log('Defining route: GET /authors');
  router.get('/authors', (req, res) => res.json({message: 'getAuthors'}));
  
  console.log('Defining route: GET /blogs');
  router.get('/blogs', (req, res) => res.json({message: 'getBlogs'}));
  
  console.log('Defining route: POST /admin/login');
  router.post('/admin/login', (req, res) => res.json({message: 'adminLogin'}));
  
  // Test the problematic routes (with parameters)
  console.log('Defining route: POST /blogs');
  router.post('/blogs', (req, res) => res.json({message: 'createBlog'}));
  
  console.log('Defining route: PUT /blogs/:id');
  router.put('/blogs/:id', (req, res) => res.json({message: 'updateBlog', id: req.params.id}));
  
  console.log('Defining route: DELETE /blogs/:id');
  router.delete('/blogs/:id', (req, res) => res.json({message: 'deleteBlog', id: req.params.id}));
  
  console.log('✅ All router definitions successful!');
  
} catch (error) {
  console.error('❌ Error in router definition:', error.message);
  console.error('The error occurred at the last route being defined');
}

module.exports = router;