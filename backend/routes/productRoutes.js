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
    getProductById2,
} from '../controllers/productController.js';

const router = express.Router();
router.route('/').get(getProducts).post(createProduct);
router.get('/:id', getProductById2);
router.get('/lowest', getLowestPriceProduct);
router.get('/user/:id', getProductsByUser);
router.get('/top', getTopProducts);
router.get('/search/:searchTerm', getProductsBySearch);
router.route('/:id/reviews').post(createProductReview);
router.route('/:id').get(getProductById).delete(deleteProduct).put(updateProduct);
router.route('/:productId/reviews/:reviewId').delete(deleteProductReview);

export default router;
