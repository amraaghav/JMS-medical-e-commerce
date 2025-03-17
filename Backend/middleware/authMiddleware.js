import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/UserModel.js';

// 🔹 Middleware to protect routes (for logged-in users)
const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]; // Extract JWT Token
            const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify Token

            req.user = await User.findById(decoded.id).select('-password'); // Fetch user & remove password

            next(); // Move to next middleware
        } catch (error) {
            console.error('JWT Verification Error:', error);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

// 🔹 Middleware to check if user is Admin
const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(403);
        throw new Error('Not authorized as an admin');
    }
};

export { protect, admin };
