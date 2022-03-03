const mongoose = require('mongoose');

const bankSchema = new mongoose.Schema(
  {
    Id: {
      type: String,
      // required: true
    },
    BankName: {
      type: String,
      required: true,
    },
    Note: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Bank = new mongoose.model('bank', bankSchema);

module.exports = Bank;
