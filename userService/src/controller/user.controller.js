const httpStatus = require("http-status");
const userService = require("../service/user.service");

const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.status(httpStatus.OK).send(users);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

const getUserById = async (req, res) => {
  try {
    console.log('get')
    const user = await userService.getUserById(req);
    res.status(httpStatus.OK).send(user ? user : {});
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

const createUser = async (req, res) => {
  try {
    console.log('create')
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

const updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(req);
    res.status(httpStatus.OK).send(user);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

const updatePassword = async (req, res) => {
  try {
    const user = await userService.updatePassword(req);
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
  updateUser,
  updatePassword,
};
