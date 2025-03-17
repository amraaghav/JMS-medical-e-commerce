import express from 'express';
import { registerUser, authUser, getUserProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);  // User Registration
router.post('/login', authUser);         // User Login
router.get('/profile', protect, getUserProfile);  // Get User Profile (Protected Route)

export default router;
