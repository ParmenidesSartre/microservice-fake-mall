const httpStatus = require("http-status");
const productService = require("../service/product.service");

/**
 * @function
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @description Retrieves a list of all products from the database and sends them in the response.
 */
const getProducts = async (req, res) => {
  try {
    const products = await productService.getProducts(req);
    res.status(httpStatus.OK).send(products);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

/**
 * @function
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @description Retrieves a product from the database and sends them in the response.
 */
const getProduct = async (req, res) => {
  try {
    const product = await productService.getProduct(req);
    res.status(httpStatus.OK).send(product);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

/**
 * @function
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @description Create a product in the database and sends them in the response.
 */
const createProduct = async (req, res) => {
  try {
    const product = await productService.createProduct(req);
    res.status(httpStatus.OK).send(product);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

/**
 * @function
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @description Update a product from the database and sends them in the response.
 */
const updateProduct = async (req, res) => {
  try {
    const product = await productService.updateProduct(req);
    res.status(httpStatus.OK).send(product);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

/**
 * @function
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @description Delete a product from the database and sends them in the response.
 */
const deleteProduct = async (req, res) => {
  try {
    const product = await productService.deleteProduct(req);
    res.status(httpStatus.OK).send(product);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

/**
 * @function
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @description Create a category in the database and sends them in the response.
 */
const createCategory = async (req, res) => {
  try {
    const category = await productService.createCategory(req);
    res.status(httpStatus.OK).send(category);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

/**
 * @function
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @description Get all categories in the database and sends them in the response.
 */
const getCategories = async (req, res) => {
  try {
    const categories = await productService.getCategories(req);
    res.status(httpStatus.OK).send(categories);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

/**
 * @function
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @description Get a category in the database and sends them in the response.
 */
const getCategory = async (req, res) => {
  try {
    const category = await productService.getCategory(req);
    res.status(httpStatus.OK).send(category);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  createCategory,
  getCategories,
  getCategory,
};
