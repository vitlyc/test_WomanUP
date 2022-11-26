/**
 * @file вспомогательная функция для обработки асинхронных запросов
 */

/**
 *
 * @param {*} fn
 * @returns Promise
 */
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next)

module.exports = asyncHandler
