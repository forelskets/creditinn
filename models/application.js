const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema(
  {
    Id: {
      type: String,
      require: true,
    },
    UserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
    ProfileId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'profile',
    },
    EploymentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'employmentDetail',
    },
    KycId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'kycdetail',
    },
    ApplicationNo: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      default: 'pending',
      require: true,
    },
    Purpose: {
      type: String,
      require: true,
    },
    Amount: {
      type: String,
      require: true,
    },
    Profession: {
      type: String,
      require: true,
    },
    ApplicationStatus: {
      type: String,
      // require:true
    },
    Status: {
      type: Boolean,
      // require:true
    },
  },
  { timestamps: true }
);

const Application = new mongoose.model('applicaiton', ApplicationSchema);

module.exports = Application;
