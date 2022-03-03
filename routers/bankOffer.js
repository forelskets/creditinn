const express = require('express');
const router = express.Router();

const bankOfferController = require('../controller/bankOfferController');

router.get('/:id', bankOfferController.getBankOfferById);
router.get('/', bankOfferController.getBankOfferList);
router.post('/', bankOfferController.createBankOffer);
router.put('/:id', bankOfferController.updateBankOffer);
router.delete('/:id', bankOfferController.deleteBankOffer);

module.exports = router;
