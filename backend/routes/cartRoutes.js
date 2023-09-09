import express from 'express';
import { addCartItems, getCartById } from '../controllers/cartController.js';

const router = express.Router();

router.route('/').post(addCartItems);
router.route('/:id').get(getCartById);

export default router;
