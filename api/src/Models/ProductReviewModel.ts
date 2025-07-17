import mongoose, { Document, Schema, Types, Model } from "mongoose";

interface IProductReview extends Document {
  userId: Types.ObjectId;
  productId: Types.ObjectId;
  rating: number;
  comment?: string;
  verifiedPurchase: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductReviewSchema = new Schema<IProductReview>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      maxlength: 1000,
    },
    verifiedPurchase: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Garante que um usuário só possa avaliar um produto uma vez
ProductReviewSchema.index({ userId: 1, productId: 1 }, { unique: true });

const ProductReviewModel: Model<IProductReview> = mongoose.model<IProductReview>(
  'ProductReview',
  ProductReviewSchema
);

export default ProductReviewModel;
