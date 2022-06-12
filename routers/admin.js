const express = require('express');
const router = express.Router();

const adminController = require('../controller/adminController');

router.post('/login', adminController.loginValidations, adminController.AdminLogin);
router.post('/update',  adminController.AdminUpdate);
router.get('/settingList',  adminController.AdminSettingList);
router.post('/settingUpdate',  adminController.AdminSettingUpdate);
router.post('/entry',  adminController.AdminLoginEntry);

module.exports = router;