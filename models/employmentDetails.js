const mongoose = require("mongoose");
const employmentSchema = new mongoose.Schema(
  {
    UserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    CompanyName: {
      type: String,
    },
    TotalExperience: {
      type: String,
    },
    MonthlyIncome: {
      type: String,
    },
    FirmName: {
      type: String,
    },
    TotalBusinessExperience: {
      type: String,
    },
    CurrentYearIncome: {
      type: String,
    },
    LastYearIncome: {
      type: String,
    },
    GST: {
      type: String,
    },
    ITRUpload: {
      type: String,
    },
    ActiveLoanAmount: {
      type: String,
    },
    Emi: {
      type: String,
    },
  },

  { timestamps: true }
);

const EmploymentDetails = new mongoose.model(
  "employmentDetail",
  employmentSchema
);

module.exports = EmploymentDetails;
