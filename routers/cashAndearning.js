const express = require('express');
const router = express.Router();

const cashAndEarningController = require('../controller/cashAndEarningController');

router.post('/create' , cashAndEarningController.createUserTransaction)
router.get('/getTransactionList' , cashAndEarningController.getTransactionList)
router.get('/getTransactionList/:id' , cashAndEarningController.getTransaction)

module.exports = router;