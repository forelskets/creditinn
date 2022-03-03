const mongoose = require('mongoose');
const kycSchema = new mongoose.Schema(
  {
    UserId: {
      type: String,
      required: true,
    },
    AdhaarNo: {
      type: String,
      required: true,
    },
    Adhaar: {
      type: String,
    },
    AdhaarVerified: {
      type: Boolean,
      // required: true
    },
    PanNo: {
      type: String,
      required: true,
    },
    Pan: {
      type: String,
    },
    PanVerified: {
      type: Boolean,
      // required: true
    },
    BankName: {
      type: String,
      required: true,
    },
    AccountNo: {
      type: String,
      required: true,
    },
    IFSCcode: {
      type: String,
      required: true,
    },
    BankStmt: {
      type: String,
    },
    StatementPassword: {
      type: String,
    },
    Photo: {
      type: String,
    },
    PreviousLoan: {
      type: Boolean,
      require: true,
    },
    ActiveLoanAmount: {
      type: Number,
    },
    EMI: {
      type: Number,
    },
    KYCDone: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const KycDetails = new mongoose.model('kycdetail', kycSchema);

module.exports = KycDetails;
