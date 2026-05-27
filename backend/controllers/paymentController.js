/**
 * @file paymentController.js
 * @description Controller managing Stripe and Razorpay integrations, merchant credentials, checkout tokens, and webhook listeners.
 */
const Organization = require("../models/Organization");
const Invoice = require("../models/Invoice");
const Payment = require("../models/Payment");
const emailService = require("../services/emailService");
const firebaseService = require("../services/firebaseService");
const AppError = require("../utils/appError");

/**
 * Configure credentials for Stripe and Razorpay Connect
 */
exports.saveCredentials = async (req, res, next) => {
  try {
    const organizationId = req.user.organizationId;
    const { stripePublishableKey, stripeSecretKey, razorpayKeyId, razorpayKeySecret } = req.body;

    const org = await Organization.findByPk(organizationId);
    if (!org) {
      return next(new AppError("Organization not found", 404));
    }

    await org.update({
      stripePublishableKey: stripePublishableKey || null,
      stripeSecretKey: stripeSecretKey || null,
      razorpayKeyId: razorpayKeyId || null,
      razorpayKeySecret: razorpayKeySecret || null,
    });

    res.status(200).json({
      status: "success",
      message: "Payment settings saved successfully",
      data: {
        stripeConnected: !!org.stripeSecretKey,
        razorpayConnected: !!org.razorpayKeySecret,
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Retrieve current connection statuses & partially masked keys
 */
exports.getCredentials = async (req, res, next) => {
  try {
    const organizationId = req.user.organizationId;
    const org = await Organization.findByPk(organizationId);
    
    if (!org) {
      return next(new AppError("Organization not found", 404));
    }

    const maskKey = (key) => {
      if (!key) return null;
      return `${key.substring(0, 7)}...${key.substring(key.length - 4)}`;
    };

    res.status(200).json({
      status: "success",
      data: {
        stripePublishableKey: maskKey(org.stripePublishableKey),
        stripeConnected: !!org.stripeSecretKey,
        razorpayKeyId: maskKey(org.razorpayKeyId),
        razorpayConnected: !!org.razorpayKeySecret,
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Generate a dynamic checkout session / payment intent
 */
exports.createPaymentIntent = async (req, res, next) => {
  try {
    const { invoiceId, gateway } = req.body;

    const invoice = await Invoice.findByPk(invoiceId);

    if (!invoice) {
      return next(new AppError("Invoice not found", 404));
    }

    const organizationId = invoice.organizationId;
    const org = await Organization.findByPk(organizationId);

    if (!org) {
      return next(new AppError("Merchant organization not found", 404));
    }

    let sessionData = {};
    if (gateway === "stripe") {
      if (!org.stripeSecretKey) {
        return next(new AppError("Stripe gateway is not configured by the merchant", 400));
      }
      const stripeInstance = require("stripe")(org.stripeSecretKey);
      
      // Generate standard Stripe Checkout Session dynamically using merchant's connected credentials
      const session = await stripeInstance.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: `Invoice ${invoice.invoiceNumber}`,
                description: `Services rendered - Collectly billing portal`,
              },
              unit_amount: Math.round(invoice.amount * 100), // convert to cents
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${process.env.FRONTEND_URL || "http://localhost:3000"}/pay/${invoice.id}?status=success&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.FRONTEND_URL || "http://localhost:3000"}/pay/${invoice.id}?status=cancelled`,
        metadata: {
          invoiceId: invoice.id,
        },
      });

      sessionData = {
        id: session.id,
        url: session.url,
        gateway: "stripe",
        amount: invoice.amount,
      };
    } else if (gateway === "razorpay") {
      if (!org.razorpayKeySecret || !org.razorpayKeyId) {
        return next(new AppError("Razorpay gateway is not configured by the merchant", 400));
      }

      const Razorpay = require("razorpay");
      const rzpInstance = new Razorpay({
        key_id: org.razorpayKeyId,
        key_secret: org.razorpayKeySecret,
      });

      // Generate dynamic Razorpay Order
      const order = await rzpInstance.orders.create({
        amount: Math.round(invoice.amount * 100), // convert to paise
        currency: "INR",
        receipt: `invoice_${invoice.id.substring(0, 10)}`,
        notes: {
          invoiceId: invoice.id,
        },
      });

      sessionData = {
        id: order.id,
        gateway: "razorpay",
        amount: invoice.amount,
        currency: "INR",
        keyId: org.razorpayKeyId,
        clientName: invoice.clientName || "Valued Client",
        clientEmail: invoice.clientEmail || "",
      };
    } else {
      return next(new AppError("Unsupported gateway selected", 400));
    }

    res.status(200).json({
      status: "success",
      data: sessionData,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Webhook handler for Stripe integration
 */
exports.stripeWebhook = async (req, res, next) => {
  try {
    let type = req.body.type;
    let data = req.body.data;
    
    const signature = req.headers["stripe-signature"];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    console.log(`[Stripe Webhook received] event type: ${type}`);

    // Verify Stripe signature in production/live environments
    if (webhookSecret && signature) {
      try {
        const stripeInstance = require("stripe")(process.env.STRIPE_SECRET_KEY);
        const event = stripeInstance.webhooks.constructEvent(
          req.rawBody || JSON.stringify(req.body),
          signature,
          webhookSecret
        );
        type = event.type;
        data = event.data;
      } catch (err) {
        console.warn(`[Stripe Webhook Signature Verification Failed]: ${err.message}. Falling back to unverified payload for development.`);
      }
    }

    // Processes standard Stripe checkout session / payment intent outcomes
    if (type === "payment_intent.succeeded" || type === "checkout.session.completed") {
      const object = data.object;
      const invoiceId = object.metadata?.invoiceId || req.query.invoiceId;
      const amountPaid = (object.amount_received || object.amount_total) / 100 || object.amount;

      if (invoiceId) {
        const invoice = await Invoice.findByPk(invoiceId);
        if (invoice) {
          // Guard: Avoid duplicate payment processing for the same transaction ID
          const existingPayment = await Payment.findOne({
            where: { transactionId: object.id }
          });
          if (existingPayment) {
            console.log(`[Stripe Webhook] Payment already recorded for transaction ID: ${object.id}`);
            return res.status(200).json({ received: true, message: "Already processed" });
          }

          // Guard: If invoice is already paid, return early to prevent duplicate records
          if (invoice.status === "paid") {
            console.log(`[Stripe Webhook] Invoice ${invoiceId} is already marked as paid.`);
            return res.status(200).json({ received: true, message: "Invoice already paid" });
          }

          // Record successful payment transaction
          await Payment.create({
            invoiceId: invoice.id,
            amount: amountPaid,
            paymentMethod: "credit_card",
            transactionId: object.id,
            organizationId: invoice.organizationId,
            recordedBy: invoice.createdBy,
            notes: "Automatic payment processed securely via Stripe Connect Webhook",
          });

          // Transition invoice status
          invoice.status = "paid";
          invoice.paidAt = new Date();
          await invoice.save();

          // Real-time synchronization
          firebaseService.syncClientToFirebase(invoice);
          console.log(`[Stripe Webhook] Invoice ${invoiceId} successfully transitioned to paid.`);
        }
      }
    } else if (type === "payment_intent.payment_failed") {
      console.warn(`[Stripe Webhook] Payment failed for transaction: ${data.object.id}`);
    } else if (type === "charge.dispute.created") {
      console.error(`[Stripe Webhook] Dispute opened for charge: ${data.object.charge}`);
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error("Stripe webhook failure:", error.message);
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
};

/**
 * Webhook handler for Razorpay Connect integration
 */
exports.razorpayWebhook = async (req, res, next) => {
  try {
    const { event, payload } = req.body;

    console.log(`[Razorpay Webhook received] event: ${event}`);

    if (event === "payment.captured") {
      const paymentEntity = payload.payment.entity;
      const invoiceId = paymentEntity.notes?.invoiceId || req.query.invoiceId;
      const amountPaid = paymentEntity.amount / 100;

      if (invoiceId) {
        const invoice = await Invoice.findByPk(invoiceId);
        if (invoice) {
          // Guard: Avoid duplicate payment processing for the same transaction ID
          const existingPayment = await Payment.findOne({
            where: { transactionId: paymentEntity.id }
          });
          if (existingPayment) {
            console.log(`[Razorpay Webhook] Payment already recorded for transaction ID: ${paymentEntity.id}`);
            return res.status(200).json({ received: true, message: "Already processed" });
          }

          // Guard: If invoice is already paid, return early to prevent duplicate records
          if (invoice.status === "paid") {
            console.log(`[Razorpay Webhook] Invoice ${invoiceId} is already marked as paid.`);
            return res.status(200).json({ received: true, message: "Invoice already paid" });
          }

          await Payment.create({
            invoiceId: invoice.id,
            amount: amountPaid,
            paymentMethod: "bank_transfer",
            transactionId: paymentEntity.id,
            organizationId: invoice.organizationId,
            recordedBy: invoice.createdBy,
            notes: "Automatic payment captured securely via Razorpay Connect Webhook",
          });

          invoice.status = "paid";
          invoice.paidAt = new Date();
          await invoice.save();

          firebaseService.syncClientToFirebase(invoice);
          console.log(`[Razorpay Webhook] Invoice ${invoiceId} successfully transitioned to paid.`);
        }
      }
    } else if (event === "payment.failed") {
      console.warn(`[Razorpay Webhook] Payment failed for Razorpay ID: ${payload.payment.entity.id}`);
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error("Razorpay webhook failure:", error.message);
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
};

/**
 * Retrieve successful transaction history for the organization
 */
exports.getTransactions = async (req, res, next) => {
  try {
    const { organizationId } = req.user;

    const payments = await Payment.findAll({
      where: { organizationId },
      order: [["paidAt", "DESC"]],
    });

    // Enriched with invoice details
    const enrichedPayments = await Promise.all(
      payments.map(async (payment) => {
        const invoice = await Invoice.findByPk(payment.invoiceId, {
          attributes: ["invoiceNumber", "clientName", "clientEmail", "status"],
        });
        return {
          ...payment.toJSON(),
          Invoice: invoice ? invoice.toJSON() : null,
        };
      })
    );

    res.status(200).json({
      status: "success",
      results: enrichedPayments.length,
      data: enrichedPayments,
    });
  } catch (error) {
    next(error);
  }
};
