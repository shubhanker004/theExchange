const express = require('express');
const router = express.Router();
const formidableMiddleware = require('express-formidable');

const productsController = require('../controllers/products-controller');
const auth = require('../middlewares/auth');
const { addProductValidator } = require('../middlewares/validations')
 
router.post('/', auth('createAny', 'product'), addProductValidator, productsController.addProduct);

router.route('/product/:id')
.get(productsController.getProduct)
.patch(auth('updateAny', 'product'), productsController.updateProduct)
.delete(auth('deleteAny', 'product'), productsController.deleteProduct);

router.get('/all', productsController.getAllProducts);

router.post('/paginate/all', productsController.paginateProducts);

router.post('/upload', auth('createAny', 'product'), formidableMiddleware(), productsController.picUpload)

module.exports = router;