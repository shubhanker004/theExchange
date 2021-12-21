const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users-controller');
const auth = require('../middlewares/auth');


router.route('/profile')
.get(auth('readOwn', 'profile'), usersController.profile)
.patch(auth('updateOwn', 'profile'), usersController.updateProfile)

router.patch('/email', auth('updateOwn', 'profile'), usersController.updateEmail)

router.get('/verify', usersController.verifyAccount);

// router
// .get('/cart', auth('readOwn', 'cart'), usersController.getCart)


module.exports = router;