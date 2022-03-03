const mongoose = require(mongoose);

const loanTypeSchema = new mongoose.Schema({
    LoanId:{
        type: Number,
        required: true
    },
    BankId:{
        type: Number,
        required: true
    },
    LoanType :{
        type: String,
        required: true
    }
})

const loanType = new mongoose.model("loanType", loanTypeSchema)

module.exports = loanType;