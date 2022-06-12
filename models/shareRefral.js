

const mongoose = require('mongoose');
const { Schema } = mongoose;
const shareRefralSchema = new mongoose.Schema({
    userId:{
        type:Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    Name : {
        type: String, 
        required: true
    },
    Mobile: {
        type: Number,
        required: true
    },
    Product: {
        type: String,
        required: true
    },
    State:{
        type: String
    },
    City:{
        type: String
    }
},{timestamps : true })

const ShareRefral = new mongoose.model("shareRefral" , shareRefralSchema);
module.exports = ShareRefral;

