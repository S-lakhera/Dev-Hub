const express = require("express")
const authRoutes = require('./routes/auth.routes')
const app = express()
const cookieParser = require('cookie-parser')
const cors = require("cors")



app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(cookieParser())
app.use(express.json())

app.get("/",(req,res) => {
    res.send("Hello")
})


app.use("/api/auth",authRoutes)

module.exports = app;