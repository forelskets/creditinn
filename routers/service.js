const express = require('express');
const router = express.Router();

const serviceController = require('../controller/serviceController');


router.get('/getList', serviceController.getServiceList);
router.get('/mobile', serviceController.getMobileServiceList);
router.get('/:id', serviceController.getServiceById);
router.post('/', serviceController.createService);
router.put('/:id', serviceController.updateService);
router.put('/status/:id', serviceController.ChangeServiceStatus);
router.delete('/:id', serviceController.deleteService);

module.exports = router;
