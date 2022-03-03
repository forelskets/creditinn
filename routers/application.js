const express = require('express');
const router = express.Router();

const applicationController = require('../controller/applicationController');

// router.get('/:id', bankController.getBankById);
router.get('/', applicationController.getApplicationList);
// router.post('/', bankController.createBank);
router.put('/status/:id', applicationController.updateApplicationStatus);
// router.delete('/:id', bankController.deleteBank);

module.exports = router;
