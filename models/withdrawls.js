const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Withdrawlschema = new Schema({
    UserId:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    BankId:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: "userbankdetail"
    },
    Requestno:{
        type: String,
        required: true,

    },
    TransactionNo:{
        type: String,
        default:"none",
        
    },
    Amount:{
        type: String,
        default:"none",
        
    },
    Status:{
        type: String,
        default: 'Pending',
        required: true
    }
},{timestamps: true})

const Withdrawls = mongoose.model("withdrawal" , Withdrawlschema);

module.exports = Withdrawls