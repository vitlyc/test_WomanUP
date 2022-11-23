const mongoose = require("mongoose")

const TodoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, "добавьте текст"],
    trim: true,
    maxlength: [300, "не более 300 символов"],
    minlength: [1, "не менее 1 символа"],
  },
})
