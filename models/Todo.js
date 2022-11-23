const mongoose = require("mongoose")

const TodoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, "добавьте текст"],
        trim: true,
        maxlength: [300, "не более 300 символов"],
        minlength: [2, "не менее 2 символов"],
    },
})
module.exports = mongoose.model("Todo", TodoSchema)