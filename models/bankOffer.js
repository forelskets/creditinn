const mongoose = require('mongoose');

const planSchema = new mongoose.Schema(
  {
    
    // BankName: {
    //     type: String,
    //     required: true,
    // },
    BankName: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'bank',
    },
    Note: {
      type: String,
      required: true,
    },
    BankService: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'service',
      },
    ],
    Category: {
      type: String,
      required: true 
    },
    Status:{
      type: Boolean,
      default : true
    },
    Picture:{
      type: String,
      required: true
    },
    Type:{
      type:String,
      required:true
    },
    RTEditor:{
      type: String
    }
  },
  { timestamps: true }
);

const Plan = new mongoose.model('bankOffer', planSchema);

module.exports = Plan;
