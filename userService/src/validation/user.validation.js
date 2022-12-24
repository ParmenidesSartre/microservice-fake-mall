const joi = require("joi");
const { objectId } = require("./custom.validation");

const getUserById = {
  params: joi.object().keys({
    userId: joi.string().custom(objectId),
  }),
};

const createUser = {
  body: joi.object().keys({
    username: joi.string().required(),
    password: joi.string().required(),
  }),
};

const loginUser = {
  body: joi.object().keys({
    username: joi.string().required(),
    password: joi.string().required(),
  }),
};

module.exports = {
  getUserById,
  createUser,
  loginUser,
};
