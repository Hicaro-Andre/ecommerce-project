import mongoose, { Document, Schema, Types, Model } from "mongoose";

interface ICartItem {
  productID: Types.ObjectId;
  quantity: number;
  priceAtPurchase: number;
}

interface ICart extends Document {
  userId: Types.ObjectId;
  itens: ICartItem[];
  createdAt: Date;
  updateAt: Date;
}

const CartItemSchema = new Schema<ICartItem>({
  productID: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  priceAtPurchase: {
    type: Number,
    required: true,
  },
});

const CartSchema = new Schema<ICart>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    itens: [CartItemSchema],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updateAt: {
      type: Date,
      default: Date.now,
    },
  }
);

const CartModel: Model<ICart> = mongoose.model<ICart>("Cart", CartSchema);

export default CartModel;
