/**
 * @file файл с контроллерами обработки запроса к /users
 */
const ErrorRespons = require("../utils/errorResponse")
const asyncHandler = require("../middlewares/asyncHandler")
const User = require("../models/User")

exports.registerUser = asyncHandler(async (req, res, next) => {
  const { email, password, name } = req.body

  const user = await User.create({ email, password, name })

  const token = user.getSignedJwtToken()

  res.status(200).json({
    success: true,
    msg: "create user",
    data: user,
    token,
  })
})

exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password, name } = req.body

  if (!email || !password) {
    return next(new ErrorRespons(`enter email and password`, 400))
  }

  const user = await User.findOne({ email }).select("+password")

  if (!user) {
    return next(new ErrorRespons(`invalid email or password`, 401))
  }

  //проверка паролей
  const isMatch = await user.matchPassword(password)

  if (!isMatch) {
    return next(new ErrorRespons(`invalid email or password`, 401))
  }

  const token = user.getSignedJwtToken()

  res.status(200).json({
    success: true,
    msg: "login user",
    data: user,
    token,
  })
})

exports.updateUser = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    email: req.body.email,
    name: req.body.name,
  }

  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true,
  })

  res.status(200).json({
    success: true,
    msg: "update user",
    data: user,
  })
})
