const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

console.log('🚀 Starting server...');

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

// Import and use your existing router
const router = require('./Routes/router');
app.use('/api', router);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Blog Backend API is running!' });
});

// Use environment PORT or 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});