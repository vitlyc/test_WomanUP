const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "enter email"],
      unique: [true, "email already exists"],
      validate: {
        validator: (email) => validator.isEmail(email),
        message: "not an email",
      },
    },
    password: {
      type: String,
      required: [true, "enter password"],
      minlength: 5,
      select: false,
    },
    name: {
      type: String,
      required: [true, "enter name"],
      minlength: 2,
      maxlength: 30,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
)

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  })
}

//сравнение паролей
UserSchema.methods.matchPassword = async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password)
}

module.exports = mongoose.model("User", UserSchema)
