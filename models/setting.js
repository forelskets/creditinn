const mongoose = require('mongoose');
const {model , Schema} = mongoose;
const settingSchema = new Schema({
    Cashbackreward:{
        type: String,
        required:true
    },
    Minamount:{
        type: String,
        required: true
    },
    RTEditor : {
       type : String
    }
})

const Setting = new model("setting" , settingSchema)

module.exports = Setting