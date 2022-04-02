const express = require('express');
const router = express.Router();

const supportController = require('../controller/supportController')

router.post('/customerSupport', supportController.customerSupport);
router.post('/corporateSupport', supportController.corporateSupport);

module.exports = router;