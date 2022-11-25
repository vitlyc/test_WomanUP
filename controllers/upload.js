const path = require("path")
const asyncHandler = require("../middlewares/asyncHandler")
const ErrorRespons = require("../utils/errorResponse")

exports.uploadFile = asyncHandler(async (req, res, next) => {
  if (!req.files) {
    return next(new ErrorRespons(`upload a file`, 400))
  }
  const file = req.files.File

  //   console.log(req.files.File)
  if (file.size > process.env.MAX_FILE_SIZE) {
    return next(
      new ErrorResponse(`file size is more than ${process.env.MAX_FILE_SIZE}`, 400)
    )
  }

  file.mv(`${process.env.UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error(err)
      return next(new ErrorResponse(`error with upload`, 500))
    }
    res.status(200).json({
      success: true,
      msg: `upload success`,
      data: file.name,
    })
  })
})
