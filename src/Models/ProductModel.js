const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const ProductSchema = new Schema({

  productName:{
    type:String,
    required: true,
  },
  price:{
    type: Number,
    required: true,
    description: String,
  },
  stock:{
    type:Number
  },

},{timestamps: true});

const ProductModel = mongoose.model("Products" , ProductSchema);
module.exports = ProductModel;