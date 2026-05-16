const express = require("express")
const authRoutes = require('./routes/auth.routes')
const app = express()
const cookieParser = require('cookie-parser')
const cors = require("cors")
const userRoutes = require('./routes/user.routes')
const projectRoutes = require('./routes/project.routes')
const blogRoutes = require('./routes/blog.routes')


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.send("Hello")
})

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/projects", projectRoutes)
app.use("/api/blog", blogRoutes)

module.exports = app;