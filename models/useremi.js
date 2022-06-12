const mongoose = require('mongoose');
const Schema = mongoose.Schema

const useremiSchema = new Schema({
  UserId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user"
      },
      BankName: {
        type: String,
        default: false
      },
      Emiamount: {
        type: String,
        default: false
      },
      Emidate: {
        type: String,
        default:false
      },
      Insucomp: {
        type: String,
        default: false
      },
      LoanType: {
        type: String,
        default: false
      },
      InsuranceType:{
        type: String,
        default: false
      },
      Category:{
          type: String,
          default: false
      }
},
{timestamps : true});

const Useremi = new mongoose.model("useremi" ,useremiSchema );

module.exports = Useremi