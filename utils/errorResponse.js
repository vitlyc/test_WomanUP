/**
 * @file файл со вспомогательным классом для обработки ошибок
 */
class ErrorRespons extends Error {
  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode
  }
}

module.exports = ErrorRespons
