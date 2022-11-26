/**
 * @file файл с миддлевером для фильтрации запроса
 */
const filtering = (model) => async (req, res, next) => {
  let query
  const reqQuery = { ...req.query }

  // слова исключения
  /**
   * @type {Array<string>}
   */
  const removeFields = ["page", "limit"]
  /**
   * Здесь удаляются слова из запроса
   */
  removeFields.forEach((param) => delete reqQuery[param])
  /**
   * Преобразование запроса в объект вида: {key: /value/i}.
   * Для поиска значения ключа методом моеди .find()
   * regExp flag i не чувствителен к регистру
   */
  //regExp i не чувствителен к регистру
  let queryStr = Object.fromEntries(
    Object.entries(reqQuery).map(([key, value]) => [key, new RegExp(value, "i")])
  )
  /**
   * pagination
   */
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
  /**
   * помещает отфильтрованые todos в res.filtering
   */
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
