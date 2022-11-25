const filtering = (model) => async (req, res, next) => {
  let query
  const reqQuery = { ...req.query }

  // слова исключения
  const removeFields = ["page", "limit"]

  removeFields.forEach((param) => delete reqQuery[param])

  //regExp i не чувствителен к регистру
  let queryStr = Object.fromEntries(
    Object.entries(reqQuery).map(([key, value]) => [key, new RegExp(value, "i")])
  )

  //pagination
  const page = parseInt(req.query.page, 10) || 1
  const limit = parseInt(req.query.limit, 10) || 5
  const startIndex = (page - 1) * limit
  const endIndex = page * limit

  const skip = (page - 1) * limit
  const total = await model.countDocuments()

  query = model.find(queryStr).limit(limit).skip(startIndex)

  const pagination = {}

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    }
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    }
  }

  const todos = await query

  res.filtering = {
    success: true,
    msg: "show todos",
    count: todos.length,
    pagination,
    data: todos,
  }
  next()
}

module.exports = filtering
