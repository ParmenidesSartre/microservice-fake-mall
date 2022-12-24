const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const toObject = require("./plugin/toObject");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  name: {
    type: String,
    lowercase: true,
  },
  address: {
    type: String,
  },
  defaultAddress: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
});

// add a custom method to the user schema
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.plugin(toObject);

const User = mongoose.model("User", userSchema);
module.exports = User;
