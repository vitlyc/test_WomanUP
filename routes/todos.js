/**
 * @file файл с роутами /todos
 */
const express = require("express")
const router = express.Router()
const {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todos")

const Todo = require("../models/Todo")

const filtering = require("../middlewares/filtering")
const { protect } = require("../middlewares/auth")

router.route("/").get(protect, filtering(Todo), getTodos).post(protect, createTodo)
router
  .route("/:id")
  .get(protect, getTodo)
  .put(protect, updateTodo)
  .delete(protect, deleteTodo)

module.exports = router
