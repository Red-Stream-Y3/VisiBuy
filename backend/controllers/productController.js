import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import axios from 'axios';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  res.json(products);
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  const getShopById = async () => {
    const response = await axios.get(
      `http://localhost:9120/api/shops/${product.shop}`
    );
    return response.data;
  };

  if (product) {
    const shop = await getShopById(product.shop._id);
    const productWithShop = {
      ...product.toObject(),
      shop: {
        shopDetails: shop.shopDetails,
      },
    };
    res.json(productWithShop);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Fetch all products to specific user
// @route   GET /api/products/user/:id
// @access  Public
const getProductsByUser = asyncHandler(async (req, res) => {
  const products = await Product.find({ user: req.params.id });

  res.json(products);
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (product) {
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    images,
    category,
    brand,
    detail,
    description,
    uses: [],
    ingredients,
    price,
    countInStock,
    user,
  } = req.body;

  const imageUrls = images.map((image) => ({ url: image.url }));

  const product = new Product({
    user,
    name,
    images: imageUrls,
    category,
    brand,
    detail,
    description,
    uses: [],
    ingredients,
    price,
    countInStock,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    category,
    brand,
    detail,
    description,
    uses,
    ingredients,
    reviews,
    rating,
    numReviews,
    price,
    countInStock,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.category = category;
    product.brand = brand;
    product.detail = detail;
    product.description = description;
    product.uses = uses;
    product.ingredients = ingredients;
    product.reviews = reviews;
    product.rating = rating;
    product.numReviews = numReviews;
    product.price = price;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);

  res.json(products);
});

// get products by search query
// @desc    Fetch all products
// @route   GET /api/products/search/:query
// @access  Public
const getProductsBySearch = asyncHandler(async (req, res) => {
  const { searchTerm } = req.params;
  const products = await Product.find({
    $or: [
      { name: { $regex: searchTerm, $options: 'i' } },
      { brand: { $regex: searchTerm, $options: 'i' } },
    ],
  });

  console.log('products', products);

  res.json(products);
});

// @desc    Create product review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  getTopProducts,
  getProductsByUser,
  getProductsBySearch,
  createProductReview,
};
