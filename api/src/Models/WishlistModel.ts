import mongoose, { Document, Schema, Types, Model } from "mongoose";

interface IWishlist extends Document {
  userId: Types.ObjectId;
  products: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const WishlistSchema = new Schema<IWishlist>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
  },
  { timestamps: true }
);

const WishlistModel: Model<IWishlist> = mongoose.model<IWishlist>('Wishlist', WishlistSchema);

export default WishlistModel;
