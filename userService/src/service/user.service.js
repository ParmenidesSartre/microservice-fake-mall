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
  const user = await User.findById(data.user._id);
  return user.toObject();
};

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

/**

loginUser is a function that verifies the username and password provided in the request body, and returns a JSON web token (JWT) for the authenticated user.
@param {Object} data - An object containing the request data, including the username and password in the body.
@returns {Object} token - An object containing the JWT for the authenticated user. If the username does not exist or the authentication fails, a string message is returned instead.
*/
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

/**

logoutUser is a function that invalidates the JSON web token (JWT) provided in the request header, and returns a new JWT with the same user ID but a different "jti" (JWT ID) claim.
@param {Object} data - An object containing the request data, including the user's JWT in the header.
@returns {Object} token - An object containing a new JWT for the user with the same user ID but a different jti claim.
*/
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

/**

updateUser is a function that updates the details of a user in the database based on the data in the request body.
@param {Object} data - An object containing the request data, including the user's updated data in the body and the user's ID as a parameter.
@returns {Object} updatedUser - An object representing the updated user. If the update fails, a string message is returned instead.
*/
const updateUser = async (data) => {
  const user = await User.findByIdAndUpdate(data.user._id, data.body, {
    new: true,
  });

  if (!user) {
    return 'User update failed';
  }

  return user.toObject();
};

/**

updatePassword is a function that updates the password of a user in the database based on the data in the request body.
@param {Object} data - An object containing the request data, including the user's updated data in the body and the user's ID as a parameter.
@returns {Object} updatedUser - An object representing the updated user. If the update fails, a string message is returned instead.
*/
const updatePassword = async (data) => {
  const { password } = data.body;
  const user = await User.findByIdAndUpdate(
    data.user._id,
    { password },
    {
      new: true,
    }
  );

  if (!user) {
    return 'Password update failed';
  }

  return user.toObject();
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
