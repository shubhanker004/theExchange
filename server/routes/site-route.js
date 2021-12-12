const express = require('express');
const router = express.Router();

const siteController = require('../controllers/site-controller');
const auth = require('../middlewares/auth');

router.route('/')
.get(siteController.getSiteArgs)
.post(auth('createAny', 'site'), siteController.getSiteArgs)
.patch(auth('updateAny', 'site'), siteController.updateSiteArgs)

module.exports = router;