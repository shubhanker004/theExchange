const passport = require('passport');
const { HttpError } = require('./http-error');
const httpStatus = require('http-status');
const { roles } = require('../configs/roles')


const verify = (req, res, resolve, reject, rights) => async(err, user) => {
  if( err || !user) {
    return reject(new HttpError("Sorry, unauthorized access.", httpStatus.UNAUTHORIZED));
  }

  req.user = user;

  if(rights.length) {
    const action = rights[0];
    const resource = rights[1];
    const permission = roles.can(req.user.role)[action](resource);
    if(!permission.granted) {
      return reject(new HttpError("Sorry, you don't have access to do so.", httpStatus.FORBIDDEN));
    }
    res.locals.permission= permission;
  }

  resolve();
}



const auth = (...rights) => async (req, res, next) => {
  return new Promise((resolve, reject) => {
    passport.authenticate('jwt', { session: false }, verify(req, res, resolve, reject, rights))(req, res, next)
  })
  .then(() => next())
  .catch((err) => next(err))
}

module.exports = auth;