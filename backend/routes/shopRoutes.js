import express from 'express';
import {
  getshopById,
  getshops,
  updateshop,
  createShop,
  deleteshop,
  getShopByUser,
  getAllShops,
} from '../controllers/shopcontroller.js';
import { protect, adminSeller } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(createShop);
router.route('/').get(getshops);
router.route('/user/:id').get(getShopByUser);
router.route('/all').get(getAllShops);
router
  .route('/:id')
  .get(getshopById)
  .put(updateshop)
  .delete(protect, adminSeller, deleteshop);

export default router;
