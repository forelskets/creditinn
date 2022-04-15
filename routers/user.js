const express = require('express');
const router = express.Router();

const userController = require('../controller/userController');

router.get('/referral-count/:id', userController.getReferralCountById);
router.get('/getAllUsers', userController.getAllUsers);
router.get('/getAllRefrals', userController.getAllRefrals);
router.get('/getAllProducts', userController.getAllProducts);
router.put('/update-profile/:id', userController.updateProfileById);
router.post('/shareRefralDataStore/:id', userController.ShareRefralDataStor);
router.post('/productDataSave/:id', userController.ProductStor);



// forgetPassword

router.post('/otpEmail' , userController.getgenerateOtp);

module.exports = router;
