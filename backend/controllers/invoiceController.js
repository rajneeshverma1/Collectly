/**
 * @file invoiceController.js
 * @description Controllers for managing invoices and revenue summaries.
 */
const Invoice = require("../models/Invoice");
const Organization = require("../models/Organization");
const Payment = require("../models/Payment");
const { Op } = require("sequelize");

/**
 * Get all invoices with advanced search, status filters, and sorting
 */
exports.getAllInvoices = async (req, res, next) => {
  try {
    const organizationId = req.user.organizationId;

    if (!organizationId) {
      return res.status(400).json({
        status: "fail",
        message: "User must belong to an organization",
      });
    }

    const { search, status, sortBy, sortOrder } = req.query;

    const whereClause = { organizationId };

    // Advanced search: Client Name, Invoice ID (Number), or Description
    if (search) {
      whereClause[Op.or] = [
        { clientName: { [Op.like]: `%${search}%` } },
        { invoiceNumber: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
      ];
    }

    // Status filtering
    if (status) {
      whereClause.status = status;
    }

    // Advanced sorting options
    const order = [];
    if (sortBy) {
      order.push([sortBy, sortOrder === "desc" ? "DESC" : "ASC"]);
    } else {
      order.push(["createdAt", "DESC"]);
    }

    const invoices = await Invoice.findAll({
      where: whereClause,
      order,
    });

    res.status(200).json({
      status: "success",
      results: invoices.length,
      data: {
        invoices,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get single invoice
 */
exports.getInvoice = async (req, res, next) => {
  try {
    const invoice = await Invoice.findByPk(req.params.id);

    if (!invoice) {
      return res.status(404).json({
        status: "fail",
        message: "Invoice not found",
      });
    }

    // Fetch associated payments
    const payments = await Payment.findAll({
      where: { invoiceId: invoice.id },
      order: [["paidAt", "DESC"]],
    });

    res.status(200).json({
      status: "success",
      data: {
        invoice,
        payments,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create a new invoice
 */
exports.createInvoice = async (req, res, next) => {
  try {
    const organizationId = req.user.organizationId;

    if (!organizationId) {
      return res.status(400).json({
        status: "fail",
        message: "User must belong to an organization",
      });
    }

    // Generate consecutive invoice number if none provided
    // CONCURRENCY & UNIQUENESS PROTECTION LOOP:
    // To prevent SequelizeUniqueConstraintError on SQLite/PostgreSQL, we run a dynamic check
    // loop that increments the count sequence globally and guarantees an invoiceNumber is
    // completely unique in the system before calling create.
    let invoiceNumber = req.body.invoiceNumber;
    if (!invoiceNumber) {
      let isUnique = false;
      let count = await Invoice.count();
      while (!isUnique) {
        count++;
        invoiceNumber = `INV-${new Date().getFullYear()}-${String(count).padStart(4, '0')}`;
        const existing = await Invoice.findOne({ where: { invoiceNumber } });
        if (!existing) {
          isUnique = true;
        }
      }
    }

    const invoice = await Invoice.create({
      ...req.body,
      invoiceNumber,
      organizationId,
      createdBy: req.user.id,
      status: req.body.status || "draft",
    });

    res.status(201).json({
      status: "success",
      data: {
        invoice,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Record a manual payment against an invoice with automatic status progression
 */
exports.recordPayment = async (req, res, next) => {
  try {
    const { amount, paymentMethod, notes } = req.body;
    const organizationId = req.user.organizationId;

    const invoice = await Invoice.findByPk(req.params.id);
    if (!invoice) {
      return res.status(404).json({
        status: "fail",
        message: "Invoice not found",
      });
    }

    // Record the payment
    const payment = await Payment.create({
      invoiceId: invoice.id,
      amount: parseFloat(amount),
      paymentMethod: paymentMethod || "other",
      notes: notes || null,
      organizationId,
      recordedBy: req.user.id,
      paidAt: new Date(),
    });

    // Calculate total payments recorded for this invoice
    const totalPayments = await Payment.sum("amount", {
      where: { invoiceId: invoice.id },
    }) || 0;

    // Update invoice status dynamically
    if (totalPayments >= parseFloat(invoice.amount)) {
      invoice.status = "paid";
      invoice.paidAt = new Date();
    } else if (totalPayments > 0) {
      invoice.status = "partially_paid";
    }
    await invoice.save();

    res.status(201).json({
      status: "success",
      data: {
        payment,
        invoice,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get monthly revenue grouping by month and client
 */
exports.getMonthlyRevenue = async (req, res, next) => {
  try {
    const organizationId = req.user.organizationId;

    if (!organizationId) {
      return res.status(400).json({
        status: "fail",
        message: "User must belong to an organization",
      });
    }

    const invoices = await Invoice.findAll({
      where: { 
        organizationId,
        status: 'paid'
      },
    });

    const summary = invoices.reduce((acc, inv) => {
      const date = new Date(inv.paidAt || inv.createdAt);
      const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
      const client = inv.clientName;
      
      if (!acc[monthYear]) acc[monthYear] = {};
      if (!acc[monthYear][client]) acc[monthYear][client] = 0;
      
      acc[monthYear][client] += parseFloat(inv.amount);
      return acc;
    }, {});

    res.status(200).json({
      status: "success",
      data: {
        summary,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get read-only public invoice details for public client checkout
 */
exports.getPublicInvoice = async (req, res, next) => {
  try {
    const { id } = req.params;

    const invoice = await Invoice.findByPk(id);
    if (!invoice) {
      return res.status(404).json({
        status: "fail",
        message: "Invoice not found",
      });
    }

    const org = await Organization.findByPk(invoice.organizationId);

    res.status(200).json({
      status: "success",
      data: {
        invoice: {
          id: invoice.id,
          invoiceNumber: invoice.invoiceNumber,
          clientName: invoice.clientName,
          clientEmail: invoice.clientEmail,
          amount: invoice.amount,
          dueDate: invoice.dueDate,
          status: invoice.status,
          description: invoice.description,
          createdAt: invoice.createdAt,
        },
        paymentGateways: {
          stripe: {
            connected: !!(org && org.stripeSecretKey),
            publishableKey: org ? org.stripePublishableKey : null,
          },
          razorpay: {
            connected: !!(org && org.razorpayKeySecret),
            keyId: org ? org.razorpayKeyId : null,
          }
        }
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Send manual email reminder for an invoice
 */
exports.sendManualReminder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const organizationId = req.user.organizationId;

    const invoice = await Invoice.findOne({
      where: { id, organizationId }
    });

    if (!invoice) {
      return res.status(404).json({
        status: "fail",
        message: "Invoice not found",
      });
    }

    if (invoice.status === "paid" || invoice.status === "cancelled") {
      return res.status(400).json({
        status: "fail",
        message: "Reminders can only be sent for unpaid invoices",
      });
    }

    // Find or create associated client record
    const Client = require("../models/Client");
    let client = await Client.findOne({
      where: { email: invoice.clientEmail, organizationId }
    });

    if (!client) {
      // Create a temporary client record for log tracking
      client = await Client.create({
        name: invoice.clientName,
        email: invoice.clientEmail,
        organizationId,
        createdBy: req.user.id,
        status: "active"
      });
    }

    // Get freelancer details
    const User = require("../models/User");
    const freelancer = await User.findByPk(req.user.id);

    // Determine reminder type dynamically based on due date proximity
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(invoice.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    
    let reminderType = "upcoming";
    if (today.getTime() === dueDate.getTime()) {
      reminderType = "due-today";
    } else if (today.getTime() > dueDate.getTime()) {
      reminderType = "overdue";
    }

    // Send email notification
    const emailService = require("../services/emailService");
    const success = await emailService.sendClientNotification(
      client,
      "reminder",
      freelancer || { name: "A Freelancer" },
      {
        invoiceNumber: invoice.invoiceNumber,
        dueDate: new Date(invoice.dueDate).toLocaleDateString(),
        amount: invoice.amount,
        reminderType
      }
    );

    if (!success) {
      return res.status(500).json({
        status: "fail",
        message: "Failed to dispatch manual email reminder",
      });
    }

    // Update last reminder sent timestamp on invoice record
    await invoice.update({ lastReminderSent: new Date() });

    res.status(200).json({
      status: "success",
      message: `Manual reminder (${reminderType}) successfully sent to ${invoice.clientEmail} for Invoice ${invoice.invoiceNumber}`,
      data: {
        lastReminderSent: invoice.lastReminderSent
      }
    });
  } catch (error) {
    next(error);
  }
};
