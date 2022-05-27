const express = require('express')
const router = express.Router();

const useremiController = require('../controller/useremiController')

router.get('/', useremiController.getAllUserEmis)


module.exports = router;