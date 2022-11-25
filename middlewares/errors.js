const ErrorRespons = require("../utils/errorResponse")

const errorHandler = (err, req, res, next) => {
  let error = { ...err }
  error.message = err.message

  console.log(err.name)

  //mongoose errors
  if (err.name === "CastError") {
    const message = `todo not found id:${err.value}`
    error = new ErrorRespons(message, 400)
  }
  //validation errors
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((value) => value.message)
    error = new ErrorRespons(message, 400)
  }
  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "server error 🎅",
  })
}
module.exports = errorHandler
