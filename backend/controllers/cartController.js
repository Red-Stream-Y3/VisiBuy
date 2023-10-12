import asyncHandler from 'express-async-handler';
import Cart from '../models/cartModel.js';
import e, { json } from 'express';

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
    const orderItem = req.body;

    if (cart) {
        const existItemIndex = cart.orderItems.findIndex((x) => x.product.toString() === orderItem.product.toString());
        console.log(existItemIndex);
        if (existItemIndex !== -1) {
            cart.orderItems[existItemIndex].quantity += orderItem.quantity;
        } else {
            cart.orderItems.push(orderItem);
        }

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

// @desc   Empty cart items by ID
// @route  PATCH /api/carts/:id/empty
// @access Private

const emptyCartById = asyncHandler(async (req, res) => {
    const cart = await Cart.findById(req.params.id);

    if (cart) {
        cart.orderItems = [];

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

// @desc    Remove items from cart by ID and product name
// @route   PATCH /api/carts/:id/removeItem
// @access  Private

const removeItemFromCartById = asyncHandler(async (req, res) => {
    const cartId = req.params.id;
    const itemName = req.body.name;

    try {
        const cart = await Cart.findOne({
            _id: cartId,
            orderItems: { $elemMatch: { name: { $regex: itemName, $options: 'i' } } },
        });

        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        const existingItem = cart.orderItems.findIndex((item) => item.name.match(new RegExp(itemName, 'i')));

        if (existingItem === -1) {
            return res.status(404).json({ error: 'Item not found' });
        } else {
            if (cart.orderItems[existingItem].quantity > 1) {
                cart.orderItems[existingItem].quantity -= 1;
            } else {
                cart.orderItems.splice(existingItem, 1);
            }
        }

        const updatedCart = await cart.save();
        res.json(updatedCart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating cart: ' + error.message });
    }
});

export { addCartItems, getCartById, updateCartById, emptyCartById, removeItemFromCartById };
