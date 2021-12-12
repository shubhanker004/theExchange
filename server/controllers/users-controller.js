const { userService, authService, emailService } = require('../services');
const httpStatus = require('http-status');
const { HttpError } = require('../middlewares/http-error');

const usersController = {
  async profile(req, res, next) {
    try {
      const user = await userService.findUserById(req.user._id);
      if(!user) {
        throw new HttpError("User not found.", httpStatus.NOT_FOUND)
      }
      res.json(res.locals.permission.filter(user._doc));
    } catch(error) {
      next(error);
    }
  },

  async updateProfile(req, res, next) {
    try {
      const user = await userService.updateUserProfile(req);
      res.json(res.locals.permission.filter(user._doc));
    } catch(error) {
      next(error);
    }
  },

  async updateEmail(req, res, next) {
    try {
      const user = await userService.updateUserEmail(req);
      const token = await authService.genAuthToken(user);

      await emailService.registerUpdatedEmail(user.email, user);

      res.cookie('atl-sup-token', token).send({
        user,
        token
      });

    } catch(error) {
      next(error);
    }
  },

  async verifyAccount(req, res, next) {
    try{
      const token = await userService.validateToken(req.query.validation);
      const user = await userService.findUserById(token.sub);

      if(!user) {
        throw new HttpError("User not found!", httpStatus.NOT_FOUND);
      }

      if(user.verified) {
        throw new HttpError("Seems like the user is already verified, try logging in!", httpStatus.BAD_REQUEST);
      }

      user.verified = true;
      user.save();
      res.status(httpStatus.CREATED).send({ user });

    } catch (error) {
      throw error;
    }
  }

}

module.exports = usersController;