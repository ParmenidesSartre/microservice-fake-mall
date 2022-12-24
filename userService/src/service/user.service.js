const User = require("../model/user.model");

/**

getUsers is a function that retrieves all users from the database.
@returns {Array} users - An array of all the users in the database.
*/

const getUsers = async () => {
  const users = await User.find({});
  return users;
};

/**

getUserById is a function that retrieves a single user from the database by their unique identifier (ID).
@param {Object} data - An object containing the request data, including the user's ID as a parameter.
@returns {Object} user - An object representing the user with the specified ID.
*/
const getUserById = async (data) => {
  const user = await User.findById(data.params.userId);
  return user;
};

const createUser = async (data) => {
  console.log(data)
  const user = User.create(data.body);
  return user;
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
};
