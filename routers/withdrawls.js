const express = require('express');
const router = express.Router();
const withdrawlsController = require('../controller/withdrawlsController')

router.get('/' , withdrawlsController.getAllWithdrawls)
router.put('/status/:id' , withdrawlsController.updateStatus)
router.put('/transaction/:id' , withdrawlsController.updateTransaction)

module.exports = router;