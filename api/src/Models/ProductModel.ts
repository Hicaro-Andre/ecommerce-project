import mongoose, { Document, Schema, Model } from "mongoose";

interface IProduct extends Document {
  productName: string;
  price: number;
  description?: string;
  stock?: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    productName: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    stock: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const ProductModel: Model<IProduct> = mongoose.model<IProduct>("Products", ProductSchema);

export default ProductModel;
