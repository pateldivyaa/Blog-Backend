const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

const mongoose = require('./db') 

// CORS configuration - Updated to include your frontend origin
app.use(cors({
   origin: [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'https://blog-frontend-admin-hss7.vercel.app/'  // Replace with actual Vercel frontend URL
],

    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))  
const router = require('./Routes/router')
app.use('/', router)

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))