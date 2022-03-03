const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
    UserId:{
        type: String,
        required: true
    },
    FirstName: {
        type: String,
        required: true
    },
    LastName: {
        type: String,
        required: true
    },
    FatherName: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    }, 
    Mobile: {
        type: String,
        required: true
    },
    DOB:{
        type: Date,
        required: true
    },
     CurrentAddress: {
        type: String,
        required: true
    },
    CurrentAddress2: {
        type: String,
        required: true
    },
    
    State:{
        type: String,
        required: true
    },
    City:{
        type: String,
        required: true
    },
    ZIP:{
        type: Number,
        required: true
    }
    
},{timestamps: true})

const Profile = new mongoose.model('profile', profileSchema);

module.exports = Profile;