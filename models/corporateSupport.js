const mongoose = require('mongoose')
const corporateSupportSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
       type: String,
       required: true
    },
    mobile:{
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
})

const Corporate = new mongoose.model('corporateSupport', corporateSupportSchema);
 module.exports = Corporate;