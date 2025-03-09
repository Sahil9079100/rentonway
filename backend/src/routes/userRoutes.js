import express from 'express';
import { 
  registerUser, 
  verifyUserOTP, 
  loginUser, 
  getUserProfile, 
  updateUserProfile,
  getUserMembership,
  getUserOrders
} from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/verify-otp', verifyUserOTP);
router.post('/login', loginUser);

// Protected routes
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.get('/membership', protect, getUserMembership);
router.get('/orders', protect, getUserOrders);

export default router; 