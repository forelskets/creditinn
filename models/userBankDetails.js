const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userBankDetailsSchema = new Schema({
  UserId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user"
      },
      BankName: {
        type: String,
      
      },
      IFSCcode: {
        type: String,
       
      },
      AccountNo: {
        type: String,
        
      },
      Wallet: {
        type: Number,
        required: true
      },
      AccHolderName: {
        type: String,
        
      },
      UPIID:{
        type: String
      }
},
{timestamps : true});

const UserBankDetails = new mongoose.model("userbankdetail" ,userBankDetailsSchema );

module.exports = UserBankDetails