const mongoose = require('mongoose');
const {Schema , model} = mongoose;
const bcrypt = require('bcrypt')

const adminSchema = new Schema({
    Email:{
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    }

},{timestamps: true});

adminSchema.pre('save' , async function(next){
    if(this.isModified('Password')){
        this.Password = await bcrypt.hash(this.Password , 12);
    }
    next();
})
const Admin = new model("admin" , adminSchema );
module.exports = Admin