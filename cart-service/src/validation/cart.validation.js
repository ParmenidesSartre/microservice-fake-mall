const joi = require("joi");
const { objectId } = require("./custom.validation");

const addProductToCart = {
  params: joi.custom(objectId),
  body: joi.object().keys({
    quantity: joi.number().required(),
  }),
};

const removeProductFromCart = {
  params: joi.custom(objectId),
  body: joi.object().keys({
    quantity: joi.number().required(),
  }),
};

module.exports = {
  addProductToCart,
  removeProductFromCart,
};
