const express = require("express")
const router = express.Router()
const userBankDetailsController = require('../controller/userBankDetailsController')

router.get('/' , userBankDetailsController.getUserBankDetails)

module.exports = router;