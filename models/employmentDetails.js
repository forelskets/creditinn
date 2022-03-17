const mongoose = require('mongoose');
const employmentSchema = new mongoose.Schema(
  {
    UserId: {
      type: String,
      required: true,
    },
    CompanyName: {
      type: String,
      required: true,
    },
    Gst: {
      type: String,
      // required: true,
    },
    Lyst: {
      type: String,
      // required: true,
    },
    TotalExperience: {
      type: String,
      required: true,
    },
    MonthlyIncome: {
      type: String,
      required: true,
    },
    // AnnualIncome: {
    //   type: String,
    //   required: true,
    // },
  },
  { timestamps: true }
);

const EmploymentDetails = new mongoose.model(
  'employmentDetail',
  employmentSchema
);

module.exports = EmploymentDetails;