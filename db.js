// test-db.js
require('dotenv').config();
const mongoose = require('mongoose');

const uri = "mongodb+srv://spiritual_user:spiritual%40123@cluster0.49wblvc.mongodb.net/admin-panel?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri)
  .then(() => {
    console.log('✅ MongoDB connection test successful!');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ MongoDB connection test failed:', err);
    process.exit(1);
  });