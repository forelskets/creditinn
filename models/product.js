const mongoose = require("mongoose");
const { Schema } = mongoose;
const ProductSchema = new mongoose.Schema(
  {
    UserId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    Name: {
      type: String,
      required: true,
    },
    Mobile: {
      type: Number,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    Product: {
      type: String,
      required: true,
    },
    Status: {
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Product = new mongoose.model("product", ProductSchema);
module.exports = Product;
