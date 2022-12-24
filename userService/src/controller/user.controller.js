const httpStatus = require('http-status');
const userService = require('../service/user.service');

/**
 * @function
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @description Retrieves a list of all users from the database and sends them in the response.
 */
const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.status(httpStatus.OK).send(users);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

/**
 * @function
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @description Retrieves a user with the specified ID from the database and sends it in the response.
 */
const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req);
    res.status(httpStatus.OK).send(user ? user : {});
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

/**
 * @function
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @description Creates a new user in the database based on the data in the request body and sends the created user in the response.
 */
const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req);
    res.status(httpStatus.OK).send(user);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

/**
 * @function
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @description Authenticate user based on the data in the request body and sends the token in the response.
 */
const loginUser = async (req, res) => {
  try {
    const user = await userService.loginUser(req);
    res.status(httpStatus.OK).send(user);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
};


/**
 * @function
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @description Logout user based on the data in the request body and sends the token in the response.
 */
const logoutUser = async (req, res) => {
  try {
    const user = await userService.logoutUser(req);
    res.status(httpStatus.OK).send(user);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  loginUser,
  logoutUser,
};
