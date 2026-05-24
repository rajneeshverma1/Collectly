/** Invoice API Routes */
const express = require("express");
const invoiceController = require("../controllers/invoiceController");
const { requireAuth } = require("../middleware/clerkAuth");

const router = express.Router();

// All routes after this middleware are protected
router.use(requireAuth);

router
  .route("/")
  .get(invoiceController.getAllInvoices)
  .post(invoiceController.createInvoice);

router.get("/revenue-summary", invoiceController.getMonthlyRevenue);

router.route("/:id").get(invoiceController.getInvoice);
router.post("/:id/payments", invoiceController.recordPayment);

module.exports = router;
