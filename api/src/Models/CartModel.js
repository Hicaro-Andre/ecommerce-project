const mongoose = require("mongoose");
const { updateMany } = require("./CadUsersModel");
const Schema = mongoose.Schema;

const CartItemSchema = new Schema({

  productID:{
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity:{
    type: Number,
    required: true,
    min: 1
  },
  priceAtPurchase:{
    type: Number,
    required: true
  }
});

const CartSchema = new Schema({

  userId:{
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },
  itens: [CartItemSchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updateAt:{
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Cart', CartSchema);