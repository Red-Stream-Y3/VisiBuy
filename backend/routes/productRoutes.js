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
} from '../controllers/productController.js';
import { protect, adminSeller } from '../middleware/authMiddleware.js';

const router = express.Router();
router.route('/').get(getProducts).post(createProduct);
router.get('/user/:id', getProductsByUser);
router.get('/top', getTopProducts);
router.get('/search/:searchTerm', getProductsBySearch);
router.route('/:id/reviews').post(protect, createProductReview);
router
  .route('/:id')
  .get(getProductById)
  .delete(deleteProduct)
  .put(updateProduct);

export default router;
