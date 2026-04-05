const express = require("express");
const dashboardController = require("../controllers/dashboardController");
const authController = require("../controllers/authController");

const router = express.Router();

// Protect all dashboard routes
router.use(authController.protect);

// Dashboard summary endpoint
router.get("/summary", dashboardController.getDashboardSummary);

// Recent activity endpoint
router.get("/activity", dashboardController.getRecentActivity);

module.exports = router;
