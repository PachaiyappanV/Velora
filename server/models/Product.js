const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Please provide product name"],
    maxlength: [100, "Name can not be more than 100 characters"],
  },
  price: {
    type: Number,
    required: [true, "Please provide product price"],
    default: 0,
  },
  description: {
    type: String,
    required: [true, "Please provide product description"],
    maxlength: [1000, "Description can not be more than 1000 characters"],
  },
  image: {
    type: Array,
    required: [true, "Please provide product images"],
  },
  category: {
    type: String,
    required: [true, "Please provide product category"],
  },
  subCategory: {
    type: String,
    required: [true, "Please provide product subCategory"],
  },
  sizes: {
    type: Array,
    required: [true, "Please provide product sizes"],
  },
  bestSeller: {
    type: Boolean,
  },
  date: {
    type: Number,
    required: [true, "Please provide product date"],
  },
});

module.exports = mongoose.model("Product", ProductSchema);
