/** Payment API Routes */
const express = require("express");
const paymentController = require("../controllers/paymentController");
const { requireAuth } = require("../middleware/clerkAuth");

const router = express.Router();

// Public Webhook and Checkout endpoints
router.post("/webhooks/stripe", paymentController.stripeWebhook);
router.post("/webhooks/razorpay", paymentController.razorpayWebhook);
router.post("/create-intent", paymentController.createPaymentIntent);

// Protected Merchant Routes
router.use(requireAuth);

router.get("/transactions", paymentController.getTransactions);

router.route("/credentials")
  .get(paymentController.getCredentials)
  .post(paymentController.saveCredentials);

module.exports = router;
