import express from 'express';
import {
    getProductById,
    getProducts,
    deleteProduct,
    createProduct,
    updateProduct,
    getTopProducts,
    getProductsByUser,
    getProductsBySearch,
    createProductReview,
    getLowestPriceProduct,
    deleteProductReview,
} from '../controllers/productController.js';

const router = express.Router();
router.route('/').get(getProducts).post(createProduct);
router.get('/lowest', getLowestPriceProduct);
router.get('/user/:id', getProductsByUser);
router.get('/top', getTopProducts);
router.get('/search/:searchTerm', getProductsBySearch);
router.route('/:id/reviews').post(createProductReview);
router.route('/:id').get(getProductById).delete(deleteProduct).put(updateProduct);
router.route('/:id/reviews/:reviewId').delete(deleteProductReview);

export default router;
