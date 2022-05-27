const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wishlistSchema = new Schema({
    UserId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref :"user"
    },
    Product:{
        type:String,
        required: true
    },
    Planning_Time:{
        type: String,
        required: true
    },
    Budget:{
        type: String,
        required: true
    },
    Remarks:{
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
    }
},{timestamps: true})

const WishList = mongoose.model("wishlist" , wishlistSchema);

module.exports = WishList;