const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/blog-db';

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.error('Connection error:', err));

module.exports = mongoose;