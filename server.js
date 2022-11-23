const dotenv = require("dotenv").config()
const express = require("express")
const connectDB = require("./middlewares/mongoose")

const PORT = process.env.PORT || 3003
connectDB()

//routes
const todos = require("./routes/todos")
const users = require("./routes/users")

const app = express()

app.use("/api/v1/todos", todos)
// app.use("/api/v1/users", users)

const server = app.listen(PORT, console.log(`server running on port ${PORT}`))

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red)
  // Close server & exit process
  // server.close(() => process.exit(1));
})
