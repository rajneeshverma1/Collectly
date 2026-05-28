const express = require("express");
const clientController = require("../controllers/clientController");
const { requireAuth } = require("../middleware/clerkAuth");

const router = express.Router();

// Public route for client approval
router.get("/approve/:token", clientController.approveClient);

// Protected routes
router.use(requireAuth);

router
  .route("/")
  .get(clientController.getAllClients)
  .post(clientController.addClient);

router.put("/:id", clientController.updateClient);

// Unified Client Profile Route (Aggregates stats, invoices, payments, and reminders)
router.get("/:id/profile", clientController.getClientProfile);

router.post("/send-invitation", clientController.sendInvitation);

router.get("/count", clientController.getClientCount);

module.exports = router;
