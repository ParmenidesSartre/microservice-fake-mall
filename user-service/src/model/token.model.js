const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  jti: {
    type: String,
  },
});

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;
