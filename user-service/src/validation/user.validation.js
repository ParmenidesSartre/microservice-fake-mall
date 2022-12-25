const joi = require('joi');

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


const updateUser = {
  body: joi.object().keys({
    username: joi.string(),
    name: joi.string(),
    address: joi.string(),
    defaultAddress: joi.string(),
  }),
};

const updatePassword = {
  body: joi.object().keys({
    password: joi.string().required(),
  }),
};

module.exports = {
  createUser,
  loginUser,
  updateUser,
  updatePassword,

};
