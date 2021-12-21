const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customer-controller');
const auth = require('../middlewares/auth');

router.post('/', customerController.paginateTransactions);


module.exports = router;