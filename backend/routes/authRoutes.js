const express = require('express');
const clerkAuthController = require('../controllers/clerkAuthController');
const { requireAuth } = require('../middleware/clerkAuth');

const router = express.Router();

/**
 * Public Routes
 */
// (Most auth logic happens on the frontend via Clerk's <SignIn /> or <SignUp /> components)
// These routes are used for backend interactions after the frontend is authenticated.

/**
 * Protected Routes
 */
router.use(requireAuth);

// Get current user profile
router.get('/me', clerkAuthController.getMe);

// Synchronize user data with backend DB
router.post('/sync', clerkAuthController.handleSync);

// Create organization
router.post('/create-org', clerkAuthController.createOrg);

// Protected test route
router.get('/test-protected', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'You have access to this protected route!',
    userId: req.auth.userId,
  });
});

module.exports = router;
