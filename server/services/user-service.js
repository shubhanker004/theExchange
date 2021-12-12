const { User } = require('../models/user')
const httpStatus = require('http-status');
const { HttpError } = require('../middlewares/http-error');
const jwt = require('jsonwebtoken');
const { NOT_EXTENDED } = require('http-status');
require('dotenv').config();


const findUserByEmail = async(email) => {
  const user = await User.findOne({email});
  return user;
};

const findUserById = async(_id) => {
  const user = await User.findById(_id);
  return user;
};

const updateUserProfile = async(req) => {
  try {
    const user = await User.findOneAndUpdate(
      {
        _id : req.user._id
      },
      {
        "$set": {
          ...req.body
        }
      },
      {new: true}
    );

    if(!user) {
      throw new HttpError("Requested user was not found!", httpStatus.NOT_FOUND);
    }

    return user;

  } catch(error) {
    throw error;
  }
};

const updateUserEmail = async(req) => {
  try {
    if(await User.emailTaken(req.body.newemail)){
      throw new HttpError('Email already in use, please try some other email address.', httpStatus.BAD_REQUEST);
    }

    const user = await User.findOneAndUpdate(
      { _id: req.user._id, email: req.user.email },
      {
        "$set":{ 
          email: req.body.newemail,
          verified:false
        }
      },
      { new: true }
    );
    if(!user){
      throw new HttpError('User not found', httpStatus.NOT_FOUND);
    }
    return user
  }catch(error){
    throw error;
  }
};

const validateToken = async(token) => {
  try {
    return jwt.verify(token, process.env.DB_SECRET)
  } catch(error) {
    next(error);
  }
  
}


module.exports = {
  findUserByEmail,
  findUserById,
  updateUserProfile,
  updateUserEmail,
  validateToken
}
