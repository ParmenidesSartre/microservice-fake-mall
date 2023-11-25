const jwt = require("jsonwebtoken");
const httpStatus = require("http-status");
const amqplib = require("amqplib/callback_api");

const auth = async (req, res, next) => {
  try {
    const token = req?.headers?.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send("Access denied. No token provided.");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    /*
      My decision is to check for the existence of jti in the token. But will face problem with removal
      of JTI
    */
    if (decoded.jti) {
      return res.status(httpStatus.BAD_REQUEST).send("Invalid token.");
    }

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send("Invalid token.");
  }
};

module.exports = auth;
