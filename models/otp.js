const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    Email : String,
    Mobile: String,
    Code : String,
    expireIn: Number
},{
    timestamps: true
}) 

let otp = new mongoose.model('otp', otpSchema);
 
module.exports = otp;
