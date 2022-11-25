const dotenv = require("dotenv").config()
const path = require("path")
const express = require("express")
const mongoSanitize = require("express-mongo-sanitize")
const cors = require("cors")
const rateLimit = require("express-rate-limit")
const fileupload = require("express-fileupload")

const connectDB = require("./middlewares/mongoose")
const errorHandler = require("./middlewares/errors")

const PORT = process.env.PORT || 3003

connectDB()

//routes
const upload = require("./routes/upload")
const users = require("./routes/users")
const todos = require("./routes/todos")

const app = express()
app.use(express.json())

app.use(mongoSanitize())
app.use(cors())

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100,
})
app.use(limiter)

app.use(fileupload())
app.use(express.static(path.join(__dirname, "upload")))

//routes
app.use("/api/v1/upload", upload)
app.use("/api/v1/todos", todos)
app.use("/api/v1/users", users)

app.use(errorHandler)

const server = app.listen(PORT, console.log(`server running on port ${PORT}`))

process.on("необработанная ошибка", (err, promise) => {
  console.log(`error: ${err.message}🎅`)
  // Close server & exit process
  // server.close(() => process.exit(1));
})

// http://localhost:3000/api/v1/caesar-logo.jpg
