const jwt = require('jsonwebtoken');
const Token = require('../model/token.model');
const httpStatus = require('http-status');

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send('Access denied. No token provided.');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const invalidatedToken = await Token.findOne({ jti: decoded.jti });

    if (invalidatedToken) {
      return res.status(httpStatus.BAD_REQUEST).send('Invalid token.');
    }
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send('Invalid token.');
  }
};

module.exports = auth;
