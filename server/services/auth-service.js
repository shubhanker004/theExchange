const { User } = require('../models/user')
const httpStatus = require('http-status');
const { HttpError } = require('../middlewares/http-error');
const userService = require('./user-service');

const createUser = async (email, password) => {
  try {
    if(await User.emailTaken(email)) {
      throw new HttpError("This email is already in use. Please try signing in.", httpStatus.BAD_REQUEST);
    }
    const user = new User({
      email,
      password
    });
    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
};

const genAuthToken = (user) => {
  const token = user.generateAuthToken();
  return token;
};

const signInWithEmailAndPassword = async(email, password) => {
  try {
    const user = await userService.findUserByEmail(email);
    if(!user) {
      throw new HttpError("Invalid email. Please try again.", httpStatus.UNAUTHORIZED);
    }
    if(!(await user.comparePassword(password))) {
      throw new HttpError("Incorrect password. Please try again.", httpStatus.UNAUTHORIZED);
    }
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUser,
  genAuthToken,
  signInWithEmailAndPassword
}