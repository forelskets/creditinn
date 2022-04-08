

const mongoose = require('mongoose');
const { Schema } = mongoose;
const ProductSchema = new mongoose.Schema({
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
    Email: {
        type: String,
        required: true
    },
    Product: {
        type: String,
        required: true
    }
},{timestamps : true })

const Product = new mongoose.model("product" , ProductSchema);
module.exports = Product;

