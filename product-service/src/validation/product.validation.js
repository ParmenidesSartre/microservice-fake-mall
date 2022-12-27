const joi = require("joi");

const variations = joi.object().keys({
  name: joi.string().required(),
  options: joi
    .array()
    .items({
      value: joi.string().required(),
      price: joi.number().required(),
    })
    .required(),
});

const createProduct = {
  body: joi.object().keys({
    name: joi.string().required(),
    description: joi.string().required(),
    categories: joi.array().required(),
    quantity: joi.number().required(),
    variations: joi.array().items(variations).required(),
  }),
};

// const loginUser = {
//   body: joi.object().keys({
//     username: joi.string().required(),
//     password: joi.string().required(),
//   }),
// };

// const updateUser = {
//   body: joi.object().keys({
//     username: joi.string(),
//     name: joi.string(),
//     address: joi.string(),
//     defaultAddress: joi.string(),
//   }),
// };

// const updatePassword = {
//   body: joi.object().keys({
//     password: joi.string().required(),
//   }),
// };

module.exports = {
  createProduct,
//   loginUser,
//   updateUser,
//   updatePassword,

};
