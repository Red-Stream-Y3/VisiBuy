import express from 'express';
import {
    authUser,
    registerUser,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
    adminPrivileges,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(registerUser).get(protect, admin, getUsers);
router.post('/login', authUser);
router.route('/account').put(protect, updateUser);
router.route('/:id').put(protect, admin, adminPrivileges).delete(protect, deleteUser).get(protect, getUserById);

export default router;
