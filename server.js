const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

const mongoose = require('./db') 

// CORS configuration
app.use(cors({
    origin: ['http://127.0.0.1:5500', 'http://localhost:5500', 'http://127.0.0.1:3000', 'http://localhost:3000','https://blog-frontend-admin-hss7.vercel.app'],
    credentials: true
}))

app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))  
const router = require('./Routes/router')
app.use('/', router)

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))