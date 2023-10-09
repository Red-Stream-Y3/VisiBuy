import asyncHandler from 'express-async-handler';
import Cart from '../models/cartModel.js';
import { json } from 'express';

// @desc    Create new cart
// @route   POST /api/carts
// @access  Private
const addCartItems = asyncHandler(async (req, res) => {
    const { uId, orderItems } = req.body;

    const cart = new Cart({
        orderItems,
        user: uId,
    });

    const createdCart = await cart.save();

    res.status(201).json(createdCart);
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
    const cart = await Cart.findById(req.params.id);
    const { orderItems } = req.body;

    if (cart) {
        orderItems.forEach((newItem) => {
            const existingItem = cart.orderItems.find((item) => item.product === newItem.product);
            console.log('existingItem: ', existingItem);

            if (existingItem) {
                existingItem.quantity += newItem.quantity;
            } else {
                cart.orderItems.push(newItem);
            }
        });

        try {
            const updatedCart = await cart.save();
            res.json(updatedCart);
        } catch (error) {
            res.status(500).json({ error: 'Error updating cart: ' + error.message });
        }
    } else {
        res.status(404).json({ error: 'Cart not found' });
    }
});

export { addCartItems, getCartById, updateCartById };
