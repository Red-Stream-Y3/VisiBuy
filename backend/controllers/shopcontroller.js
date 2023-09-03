import asyncHandler from 'express-async-handler';
import Shop from '../models/shopModel.js';

// @desc    Create a new shop
// @route   POST /api/shops
// @access  Private
const createShop = asyncHandler(async (req, res) => {
  const { shopName, shopEmail, shopAddress, shopPhone, shopDescription } =
    req.body;

  const shop = new Shop({
    shopDetails: {
      user,
      shopName,
      shopEmail,
      shopAddress,
      shopPhone,
      shopDescription,
    },
  });

  const createdShop = await shop.save();
  res.status(201).json(createdShop);
});

// @desc    Fetch shop by id
// @route   GET /api/shops/:id
// @access  Public
const getshopById = asyncHandler(async (req, res) => {
  const shop = await Shop.findById(req.params.id);

  if (shop) {
    res.json(shop);
  } else {
    res.status(404);
    throw new Error('Shop not found');
  }
});

// @desc    Fetch all shops
// @route   GET /api/shops
// @access  Public

const getshops = asyncHandler(async (req, res) => {
  const shops = await Shop.find({});
  res.json(shops);
  console.log(shops);
});

// @desc    Fetch  shop to specific user
// @route   GET /api/products/shops/:id
// @access  Public
const getShopByUser = asyncHandler(async (req, res) => {
  const shop = await Shop.find({ user: req.params.id });

  res.json(shop);
});

// @desc    Update a shop
// @route   PUT /api/shops/:id
// @access  Private/Admin
const updateshop = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const shop = req.body;
    await Shop.findByIdAndUpdate(id, shop);
    res.json({ message: 'Shop updated' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Delete a shop
// @route   DELETE /api/shops/:id
// @access  Private/Admin
const deleteshop = asyncHandler(async (req, res) => {
  const shop = await Shop.findByIdAndDelete(req.params.id);

  if (shop) {
    res.json({ message: 'Shop removed' });
  } else {
    res.status(404);
    throw new Error('Shop not found');
  }
});

const getAllShops = asyncHandler(async (req, res) => {
  const shops = await Shop.find({});

  if (shops) {
    res.json(shops);
    console.log(shops);
  } else {
    res.status(404);
  }
});

export {
  getshopById,
  getshops,
  updateshop,
  createShop,
  getAllShops,
  deleteshop,
  getShopByUser,
};
