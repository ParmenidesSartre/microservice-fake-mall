const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim : true,
    lowercase: true
  },
  name: {
    type: String,
    lowercase: true
  },
  address: {
    type: String
  },
  defaultAddress: {
    type: String
  },
  password: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;