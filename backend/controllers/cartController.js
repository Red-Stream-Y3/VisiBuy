import asyncHandler from 'express-async-handler';
import Cart from '../models/cartModel.js';

// @desc    Create new cart
// @route   POST /api/carts
// @access  Private
const addCartItems = asyncHandler(async (req, res) => {
    const { uId, orderItems } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items');
    } else {
        const cart = new Cart({
            orderItems,
            user: uId,
        });

        const createdCart = await cart.save();

        res.status(201).json(createdCart);
    }
});

// @desc    Get cart by ID
// @route   GET /api/carts/:id
// @access  Private
const getCartById = asyncHandler(async (req, res) => {
    const cart = await Cart.findById(req.params.id);

    if (cart) {
        res.json(cart);
    } else {
        res.status(404);
        throw new Error('Cart not found');
    }
});

// @desc    Update cart by ID
// @route   PATCH /api/carts/:id
// @access  Private

const updateCartById = asyncHandler(async (req, res) => {
    console.log("updateCartById id " + req.params.id);
    console.log("updateCartById body " + req.body.orderItems);
    const { orderItems } = req.body.orderItems;
    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items');
    } else {
        const cart = await Cart.findById(req.params.id);
        if (cart) {
            cart.orderItems = cart.orderItems.concat(orderItems);
            const updatedCart = await cart.save();
            res.json(updatedCart);
            console.log("updateCartById updatedCart" + updatedCart);
        } else {
            res.status(404);
            throw new Error('Cart not found');
        }
    }
});

export { addCartItems, getCartById, updateCartById };