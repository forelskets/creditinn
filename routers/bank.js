const express = require('express');
const router = express.Router();

const bankController = require('../controller/bankController');

router.get('/:id', bankController.getBankById);
router.get('/', bankController.getBankList);
router.post('/', bankController.createBank);
router.put('/:id', bankController.updateBank);
router.delete('/:id', bankController.deleteBank);

module.exports = router;
