const express = require('express');
const router = express.Router();

const cashAndEarningController = require('../controller/cashAndEarningController');

router.post('/create' , cashAndEarningController.createUserTransaction)

module.exports = router;