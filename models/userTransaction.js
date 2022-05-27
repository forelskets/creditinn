const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userTransactionSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    serviceId:{
        type: Schema.Types.ObjectId,
        ref: "service"
    },
    TransactionType:{
          type: String,
          required: true
    },
    CreditDebit:{
        type: String,
        required: true
    },
    Amount: {
        type: String,
        required: true
    },
    TransactionWallet: {
        type: String,
        default: 0,
        required: true 
    },
    TransactionNo:{
        type : String,
        unique: true,
        required: true
    }
},
{timestamps: true})



const userTransaction = new mongoose.model('usertransaction' , userTransactionSchema);

module.exports = userTransaction;