import express from 'express';
import {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    getOrders,
    updateOrderToConfirm,
    updateOrderToReject,
    queryOrders,
    getOrdersByUserId,
    updateOrderToDeliver,
    getOrdersforSeller,
    updateOrderProductsToShipped,
    getDeliveredOrdersByUserId,
} from '../controllers/orderController.js';

const router = express.Router();

router.route('/').post(addOrderItems).get(getOrders);
router.route('/:id').get(getOrderById);
router.route('/:id/pay').put(updateOrderToPaid);
router.route('/:id/confirm').put(updateOrderToConfirm);
router.route('/:id/reject').put(updateOrderToReject);
router.route('/:id/deliver').put(updateOrderToDeliver);
router.route('/query').post(queryOrders);
router.route('/user/:id').get(getOrdersByUserId);
router.route('/seller/products/:id').get(getOrdersforSeller);
router.route('/:id/shipped').put(updateOrderProductsToShipped);
router.route('/user/delivered/:id').get(getDeliveredOrdersByUserId);

export default router;
