import express from 'express';
import { addCartItems, getCartById, updateCartById } from '../controllers/cartController.js';

const router = express.Router();

router.use((req, res, next) => {
    console.log('Request received at /api/carts');
    console.log('Request body:');
    console.log(req.body); // Log the request body
    console.log('Request params:');
    console.log(req.params); // Log the request params
    // console.log('Request whole');
    // console.log(req); // Log the whole request

    next();
});

router.route('/').post(addCartItems);
router.route('/:id').get(getCartById);
router.route('/:id').put(updateCartById);

export default router;
