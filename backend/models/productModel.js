import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const imageSchema = mongoose.Schema(
  {
    url: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    images: [imageSchema],
    category: {
      type: String,
      required: true,
      default: '',
    },
    brand: {
      type: String,
      required: true,
      default: '',
    },
    detail: {
      type: String,
      required: true,
      default: '',
    },
    description: {
      type: String,
      required: true,
      default: '',
    },
    uses: [String],
    ingredients: {
      type: String,
      required: true,
      default: '',
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Shop',
      default: '64458bd232c4bea2a2cbd9ef',
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
