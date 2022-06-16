const express = require('express');
const  path  = require('path');
const router = express.Router();
const multer = require('multer');
const Category = require('../models/category')


const bankOfferController = require('../controller/bankOfferController');

router.get('/:id', bankOfferController.getBankOfferById);
router.get('/', bankOfferController.getBankOfferList);
 

const storage = multer.diskStorage({
    destination: 'adminmain/public/uploads/',
    filename: (req, file, callback) =>{
        callback(
            null,
            file.fieldname + '_'+ Date.now() + path.extname(file.originalname)
        )
    },
});

const upload = multer({storage: storage})

router.post('/updateOffer/:id',upload.fields([{
    name: 'Picture'
}]) , bankOfferController.updateBankOffer);
router.post('/', upload.fields([{
    name: 'Picture'
}]), bankOfferController.createBankOffer);

router.put('/status/:id', bankOfferController.ChangeOfferStatus);
router.post('/:id', bankOfferController.BankOfferIextEditor);

router.delete('/:id', bankOfferController.deleteBankOffer);

module.exports = router;
