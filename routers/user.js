const express = require('express');
const router = express.Router();

const userController = require('../controller/userController');

router.get('/referral-count/:id', userController.getReferralCountById);
router.put('/update-profile/:id', userController.updateProfileById);

module.exports = router;
