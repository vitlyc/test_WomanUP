exports.getTodos = (req, res, next) => {
  res.send({
    success: true,
    msg: "show all todos",
  })
}
exports.getTodo = (req, res, next) => {
  res.send({
    success: true,
    msg: `show ${req.params.id} todo`,
  })
}

exports.createTodo = (req, res, next) => {
  res.send({
    success: true,
    msg: "create todo",
  })
}

exports.updateTodo = (req, res, next) => {
  res.send({
    success: true,
    msg: `update ${req.params.id} todo`,
  })
}

exports.deleteTodo = (req, res, next) => {
  res.send({
    success: true,
    msg: `delete ${req.params.id} todo`,
  })
}
