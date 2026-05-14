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

router.post("/send-invitation", clientController.sendInvitation);

router.get("/count", clientController.getClientCount);

module.exports = router;
