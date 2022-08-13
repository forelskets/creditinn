const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const bcrypt = require("bcrypt");

const adminSchema = new Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    Mobile: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    Type: {
      type: String,
      required: true,
    },
    Password: {
      type: String,
      required: true,
      select: false,
    },
    passwordOtp: {
      type: String,
      select: false,
    },
    passwordOtpExpire: {
      type: String,
      select: true,
    },
  },
  { timestamps: true }
);

adminSchema.pre("save", async function (next) {
  if (this.isModified("Password")) {
    this.Password = await bcrypt.hash(this.Password, 12);
  }
  next();
});

adminSchema.methods.generatePasswordOTP = function () {
  const otp = Math.trunc(Math.random() * 10000);
  this.passwordOtp = otp;
  this.passwordOtpExpire = Date.now() + 5 * 60 * 1000;
  this.save();
  console.log(this);
  return otp;
};
const Admin = new model("admin", adminSchema);
module.exports = Admin;
