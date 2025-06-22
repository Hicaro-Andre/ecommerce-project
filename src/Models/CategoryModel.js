const mongoose = require("mongoose")

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const CategorySchema = new Schema({
   id: ObjectId,
    imageUrl:{
    type: String,
    default: null,
   },
   categoryName: String,
   description: String,
   isActive: Boolean,
})

const CategoryModel = mongoose.model("category" , CategorySchema);
module.exports = CategoryModel