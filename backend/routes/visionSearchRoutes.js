import express from 'express';
import { visionSearch } from '../controllers/visionSearchController.js';

const router = express.Router();

router.route('/').post(visionSearch);

export default router;