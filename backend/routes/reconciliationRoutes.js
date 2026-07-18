const express = require("express");
const reconciliationController = require("../controllers/reconciliationController");
const { requireAuth } = require("../middleware/clerkAuth");

const router = express.Router();

router.use(requireAuth);

router.get("/transactions", reconciliationController.getTransactions);
router.post("/transactions/:id/match", reconciliationController.matchTransaction);

module.exports = router;
