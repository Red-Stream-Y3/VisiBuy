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
            phone: user.phone,
            address: user.shippingInfo.address,
            apartment: user.shippingInfo.apartment,
            state: user.shippingInfo.state,
            city: user.shippingInfo.city,
            country: user.shippingInfo.country,
            postalCode: user.shippingInfo.postalCode,
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
            phone: user.phone,
            address: user.shippingInfo.address,
            apartment: user.shippingInfo.apartment,
            state: user.shippingInfo.state,
            city: user.shippingInfo.city,
            country: user.shippingInfo.country,
            postalCode: user.shippingInfo.postalCode,
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
    const user = await User.findById(req.body.id);
    const { name, address, apartment, state, city, country, postalCode, phone } = req.body;

    if (user) {
        user.name = name || user.name;
        user.address = address || user.address;
        user.apartment = apartment || user.apartment;
        user.state = state || user.state;
        user.city = city || user.city;
        user.country = country || user.country;
        user.postalCode = postalCode || user.postalCode;
        user.phone = phone || user.phone;

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            phone: updatedUser.phone,
            address: updatedUser.address,
            apartment: updatedUser.apartment,
            state: updatedUser.state,
            city: updatedUser.city,
            country: updatedUser.country,
            postalCode: updatedUser.postalCode,
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

export { authUser, registerUser, getUsers, deleteUser, getUserById, updateUser, adminPrivileges };
