const asyncHandler = require("../middlewares/asyncHandler")
const ErrorRespons = require("../utils/errorResponse")
const Todo = require("../models/Todo")

exports.getTodos = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.filtering)
})

exports.getTodo = asyncHandler(async (req, res, next) => {
  const todo = await Todo.findById(req.params.id)

  if (!todo) {
    return next(new ErrorRespons(`todo not found id:${req.params.id}`, 404))
  }
  res.status(200).json({
    success: true,
    msg: `show todo id:${req.params.id}`,
    data: todo,
  })
})

exports.createTodo = asyncHandler(async (req, res, next) => {
  const todo = await Todo.create(req.body)

  res.status(201).json({
    success: true,
    msg: "create todo",
    data: todo,
  })
})

exports.updateTodo = asyncHandler(async (req, res, next) => {
  const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
  if (!todo) {
    return next(new ErrorRespons(`todo not found id:${req.params.id}`, 404))
  }
  res.status(200).json({
    success: true,
    msg: `update todo id:${req.params.id}`,
    data: todo,
  })
})

exports.deleteTodo = asyncHandler(async (req, res, next) => {
  const todo = await Todo.findByIdAndDelete(req.params.id)

  if (!todo) {
    return next(new ErrorRespons(`todo not found id:${req.params.id}`, 404))
  }
  res.status(200).json({
    success: true,
    msg: `delete todo id:${req.params.id}`,
    data: todo,
  })
})
