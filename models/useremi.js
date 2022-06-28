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
      EmiAmount: {
        type: String,
        default: false
      },
      EmiDate: {
        type: String,
        default: false
      },
      EndDate: {
        type: String,
        default:false
      },
      Insucomp: {
        type: String,
        default: false
      },
      Type: {
        type: String,
        default: false
      },
      ProviderName:{
        type:String,
        defalut: false
      },
     
      Category:{
          type: String,
          defalut: false
      }
},
{timestamps : true});

const Useremi = new mongoose.model("useremi" ,useremiSchema );

module.exports = Useremi