const mongoose = require ("mongoose")

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ProductSchema = new Schema({
  id: ObjectId,
   imageUrl:{
    type: String,
    default: null,
   },
  productName: String,
  description: String,
  price: Number,
  stock: Number,
  isActive: Boolean,
});

const ProductModel = mongoose.model("products" , ProductSchema);
module.exports = ProductModel;