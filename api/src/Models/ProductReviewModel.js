const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

const ProductReviewSchema = new Schema({

  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    maxlength: 1000
  },
  verifiedPurchase: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true

})

// Garante que um usuário só possa avaliar um produto uma vez
ProductReviewSchema.index({ userId: 1, productId: 1 }, { unique: true });

module.exports = mongoose.model('ProductReview', ProductReviewSchema);