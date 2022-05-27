const express = require('express');
const router = express.Router();
const wishlistController = require('../controller/wishlistController')

router.get('/' , wishlistController.getAllWishList)

module.exports = router;