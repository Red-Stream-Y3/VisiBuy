import mongoose from 'mongoose';

const shopSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    shopDetails: {
      shopName: {
        type: String,
        required: true,
      },
      shopEmail: {
        type: String,
        required: true,
        unique: true,
      },
      shopAddress: {
        type: String,
        required: true,
      },
      shopPhone: {
        type: String,
        required: true,
        unique: true,
      },
      shopImage: {
        type: String,
        default:
          'https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      },
      shopDescription: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Shop = mongoose.model('Shop', shopSchema);

export default Shop;
