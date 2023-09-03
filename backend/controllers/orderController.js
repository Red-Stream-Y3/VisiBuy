import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import mongoose from 'mongoose';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingDetails,
    phone,
    price,
    shippingMethod,
    commission,
    shippingPrice,
    totalPrice,
    seller,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
    return;
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingDetails,
      phone,
      price,
      shippingMethod,
      commission,
      shippingPrice,
      totalPrice,
      seller,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({});
  res.json(orders);
});

const updateOrderToConfirm = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isConfirmed = true;
    order.confirmedAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

const updateOrderToDeliver = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

const updateOrderToReject = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isRejected = true;
    order.rejectedAt = Date.now();

    if (req.body.rejectReason) order.rejectReason = req.body.rejectReason;

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

const queryOrders = asyncHandler(async (req, res) => {
  const { start, end } = req.body;

  //get queried list of orders from db
  const queryData = await Order.find({
    createdAt: {
      $gte: new Date(start),
      $lt: new Date(end),
    },
  });

  if (queryData) {
    res.status(200).json(queryData);
  } else {
    res.status(404);
    throw new Error('No orders found');
  }
});

// get orders by user id and only output the order id and order status for each order

const getOrdersByUserId = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.params.id });
  if (!orders) {
    res.status(404);
    throw new Error('No orders found');
  }
  const orderIds = orders.map((order) => {
    return {
      _id: order._id,
      date: order.paidAt ? order.paidAt : order.createdAt,
      amount: order.totalPrice,
      isConfirmed: order.isConfirmed,
      isRejected: order.isRejected,
      isPaid: order.isPaid,
      isDelivered: order.isDelivered,
    };
  });
  res.status(200).json(orderIds);
});

//get products for seller to ship

const getOrdersforSeller = asyncHandler(async (req, res) => {
  const orders = await Order.find({
    orderItems: { $elemMatch: { seller: req.params.id } },
  });

  if (!orders) {
    res.status(404);
    throw new Error('No orders found');
  }

  return res.status(200).json(orders);
});

//update order to shipped
const updateOrderProductsToShipped = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isShipped = true;
    order.shippedAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
  updateOrderToConfirm,
  updateOrderToReject,
  queryOrders,
  getOrdersByUserId,
  updateOrderToDeliver,
  getOrdersforSeller,
  updateOrderProductsToShipped,
};
