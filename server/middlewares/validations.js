const { check, validationResult } =require('express-validator');
const httpStatus = require('http-status');

const addProductValidator = [
  check('model')
    .trim().not().isEmpty().withMessage("You need to specify the model SKU.").bail(),
  
  check('brand')
    .trim().not().isEmpty().withMessage("You need to specify the brand.").bail(),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(httpStatus.BAD_REQUEST).json({
        errors: errors.array()
      });
    }
    next();
  }
];



module.exports = {
  addProductValidator
}