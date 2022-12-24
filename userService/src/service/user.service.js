const User = require('../model/user.model');
const Token = require('../model/token.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const transformer = require('../utils/transformer');
const { v4: uuidv4 } = require('uuid');

/**

getUsers is a function that retrieves all users from the database.
@returns {Array} users - An array of all the users in the database.
*/

const getUsers = async () => {
  const users = await User.find({});
  const usersTransformed = transformer(users);
  return usersTransformed;
};

/**

getUserById is a function that retrieves a single user from the database by their unique identifier (ID).
@param {Object} data - An object containing the request data, including the user's ID as a parameter.
@returns {Object} user - An object representing the user with the specified ID.
*/
const getUserById = async (data) => {
  const user = await User.findById(data.params.userId);
  return user.toObject();
};

/**
 * createUser is a function that creates a new user in the database based on the data in the request body, and returns a JWT for the newly created user.
 * @param {Object} data - An object containing the request data, including the user's data in the body.
 * @returns {Object} token - An object containing the JWT for the newly created user.
 */
const createUser = async (data) => {
  // check if the username is already in use
  const user = await User.findOne({ username: data.body.username });
  if (user) {
    return 'Username already exists';
  }
  // create the new user
  const createdUser = await User.create(data.body);

  if (!createdUser) {
    return 'User creation failed';
  }

  // generate a JWT for the new user
  const token = jwt.sign(
    {
      _id: createdUser._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: 86400 }
  );

  return { token };
};

const loginUser = async (data) => {
  const { username, password } = data.body;

  // Verify if password given is correct
  const user = await User.findOne({ username: username });
  if (!user) {
    return 'Username does not exist';
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return 'Authentication failed';
  }

  // generate a JWT for the new user
  const token = jwt.sign(
    {
      _id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: 86400 }
  );

  return { token };
};

const logoutUser = async (data) => {
  const jti = uuidv4();

  const invalidatedToken = jwt.sign(
    { _id: data.user._id, jti },
    process.env.JWT_SECRET,
    { expiresIn: 86400 }
  );
  await Token.create({ jti });
  return { token: invalidatedToken };
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  loginUser,
  logoutUser,
};
