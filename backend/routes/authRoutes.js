const express = require("express");
const authController = require("../controllers/authController");
const googleAuthController = require("../controllers/googleAuthController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

// Google OAuth routes
router.get("/auth/google", googleAuthController.googleAuth);
router.get("/auth/google/callback", googleAuthController.googleCallback);

// Protected routes
router.use(authController.protect);
router.get("/me", authController.getMe);
router.post("/create-organization", authController.createOrganization);

module.exports = router;
