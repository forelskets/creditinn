const express = require('express');
const router = express.Router();

const serviceController = require('../controller/serviceController');

router.get('/:id', serviceController.getServiceById);
router.get('/', serviceController.getServiceList);
router.post('/', serviceController.createService);
router.put('/:id', serviceController.updateService);
router.delete('/:id', serviceController.deleteService);

module.exports = router;
