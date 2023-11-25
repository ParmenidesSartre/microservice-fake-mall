const httpStatus = require("http-status");
const cartService = require("../service/cart.service");

/**
 * @function
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @description Retrieves a list of items in cart from the database and sends them in the response.
 */
const getCart = async (req, res) => {
  try {
    const cart = await cartService.getCart(req);
    res.status(httpStatus.OK).send(cart);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

/**
 * @function
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @description Save a list of items into cart , save into database and sends them in the response.
 */
const addProduct = async (req, res) => {
  try {
    const cart = await cartService.addProduct(req);
    res.status(httpStatus.OK).send(cart);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

module.exports = {
  getCart,
  addProduct,
};
