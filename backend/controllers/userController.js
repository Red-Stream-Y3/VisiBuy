import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import asyncHandler from 'express-async-handler';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isSeller: user.isSeller,
      profilePic: user.profilePic,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      number: user.shippingInfo.number,
      line1: user.shippingInfo.line1,
      line2: user.shippingInfo.line2,
      city: user.shippingInfo.city,
      state: user.shippingInfo.state,
      zip: user.shippingInfo.zip,
      country: user.shippingInfo.country,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({
      error: 'Invalid email and password',
    });
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isSeller: user.isSeller,
      profilePic: user.profilePic,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      number: user.shippingInfo.number,
      line1: user.shippingInfo.line1,
      line2: user.shippingInfo.line2,
      city: user.shippingInfo.city,
      state: user.shippingInfo.state,
      zip: user.shippingInfo.zip,
      country: user.shippingInfo.country,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// desc    Update user
// route   PUT /api/users/account
// access  Private/
// make it handle authorization token

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const {
    name,
    email,
    isAdmin,
    isSeller,
    profilePic,
    firstName,
    lastName,
    phone,
    number,
    line1,
    line2,
    city,
    state,
    zip,
    country,
  } = req.body;

  if (user) {
    user.name = name || user.name;
    user.email = email || user.email;
    user.isAdmin = isAdmin || user.isAdmin;
    user.isSeller = isSeller || user.isSeller;
    user.profilePic = profilePic || user.profilePic;
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.phone = phone || user.phone;
    user.shippingInfo.number = number || user.shippingInfo.number;
    user.shippingInfo.line1 = line1 || user.shippingInfo.line1;
    user.shippingInfo.line2 = line2 || user.shippingInfo.line2;
    user.shippingInfo.city = city || user.shippingInfo.city;
    user.shippingInfo.state = state || user.shippingInfo.state;
    user.shippingInfo.zip = zip || user.shippingInfo.zip;
    user.shippingInfo.country = country || user.shippingInfo.country;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      profilePic: updatedUser.profilePic,
      isAdmin: updatedUser.isAdmin,
      isSeller: updatedUser.isSeller,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      phone: updatedUser.phone,
      number: updatedUser.shippingInfo.number,
      line1: updatedUser.shippingInfo.line1,
      line2: updatedUser.shippingInfo.line2,
      city: updatedUser.shippingInfo.city,
      state: updatedUser.shippingInfo.state,
      zip: updatedUser.shippingInfo.zip,
      country: updatedUser.shippingInfo.country,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const adminPrivileges = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.isAdmin = req.body.isAdmin;

    await user.save();
    res.json({ message: 'User updated' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export {
  authUser,
  registerUser,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  adminPrivileges,
};
