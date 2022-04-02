const mongoose = require('mongoose')
const customerSupportSchema = new mongoose.Schema({
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

const Customer = new mongoose.model('customerSupport', customerSupportSchema);
 module.exports = Customer;