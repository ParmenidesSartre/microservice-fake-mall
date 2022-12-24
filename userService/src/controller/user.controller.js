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

module.exports = {
  getUsers,
  getUserById,
  createUser,
};
