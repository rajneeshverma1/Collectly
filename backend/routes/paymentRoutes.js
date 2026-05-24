/** Payment API Routes */
const express = require("express");
const paymentController = require("../controllers/paymentController");
const { requireAuth } = require("../middleware/clerkAuth");

const router = express.Router();

// Public Webhook endpoints (Stripe & Razorpay call these without Auth headers)
router.post("/webhooks/stripe", paymentController.stripeWebhook);
router.post("/webhooks/razorpay", paymentController.razorpayWebhook);

// Protected Merchant Routes
router.use(requireAuth);

router.route("/credentials")
  .get(paymentController.getCredentials)
  .post(paymentController.saveCredentials);

router.post("/create-intent", paymentController.createPaymentIntent);

module.exports = router;
