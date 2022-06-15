const express = require('express')
const router = express.Router();

const useremiController = require('../controller/useremiController')

router.get('/', useremiController.getAllUserEmis)
router.post('/loan/:id', useremiController.addLoan)
router.post('/insurance/:id', useremiController.addInsurance)
router.post('/creditCard/:id', useremiController.addCreditCard)


module.exports = router;