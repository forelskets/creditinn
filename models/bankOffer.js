const mongoose = require('mongoose');

const planSchema = new mongoose.Schema(
  {
    Id: {
      type: String,
      // required: true
    },
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
  },
  { timestamps: true }
);

const Plan = new mongoose.model('bankOffer', planSchema);

module.exports = Plan;
