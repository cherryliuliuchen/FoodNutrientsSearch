const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const adminMiddleware = require('../middleware/adminMiddleware');
const userController = require('../controllers/userController');

// Register
router.post('/register', userController.registerUser);

// Login
router.post('/login', userController.loginUser);

// Logout Route (use the auth middleware to check for a valid token)
router.post('/logout', auth, userController.logoutUser);

// Get the current user's information
router.get('/me', auth, userController.getCurrentUser);

// Admin create user
router.post('/admin', auth, adminMiddleware, userController.adminCreateUser);

// Admin update user
router.put('/admin/:email', auth, adminMiddleware, userController.adminManageUser);

// Validate Token Route
router.get('/validate-token', userController.validateToken);

module.exports = router;
