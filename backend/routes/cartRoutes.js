import express from 'express';
import { addCartItems, getCartById, updateCartById } from '../controllers/cartController.js';

const router = express.Router();

router.route('/').post(addCartItems);
router.route('/:id').get(getCartById);
router.route('/:id').put(updateCartById);

export default router;
