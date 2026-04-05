const express = require("express");
const authController = require("../controllers/authController");
const googleAuthController = require("../controllers/googleAuthController");
const { signupValidation, loginValidation, organizationValidation, handleValidationErrors } = require("../middleware/validation");
const { authLimiter } = require("../utils/rateLimiter");

const router = express.Router();

// Auth routes with rate limiting and validation
router.post("/signup", authLimiter, signupValidation, handleValidationErrors, authController.signup);
router.post("/login", authLimiter, loginValidation, handleValidationErrors, authController.login);
router.get("/logout", authController.logout);

// Google OAuth routes
router.get("/auth/google", googleAuthController.googleAuth);
router.get("/auth/google/callback", googleAuthController.googleCallback);

// Protected routes
router.use(authController.protect);
router.get("/me", authController.getMe);
router.post("/create-organization", organizationValidation, handleValidationErrors, authController.createOrganization);

module.exports = router;
