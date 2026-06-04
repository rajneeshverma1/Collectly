const express = require("express");
const dashboardController = require("../controllers/dashboardController");
const { requireAuth } = require("../middleware/clerkAuth");

const router = express.Router();

// Protect all dashboard routes
router.use(requireAuth);

// Dashboard summary endpoint
router.get("/summary", dashboardController.getDashboardSummary);

// Recent activity endpoint
router.get("/activity", dashboardController.getRecentActivity);

module.exports = router;
