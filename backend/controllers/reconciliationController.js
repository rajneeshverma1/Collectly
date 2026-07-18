/**
 * @file reconciliationController.js
 * @description Controllers for managing incoming transactions and invoice matching.
 */
const IncomingTransaction = require("../models/IncomingTransaction");
const Invoice = require("../models/Invoice");
const Payment = require("../models/Payment");
const InvoiceEvent = require("../models/InvoiceEvent");
const { Op } = require("sequelize");

/**
 * Get all incoming transactions
 */
exports.getTransactions = async (req, res, next) => {
  try {
    const organizationId = req.user.organizationId;
    const transactions = await IncomingTransaction.findAll({
      where: { organizationId },
      order: [["date", "DESC"]],
      include: [
        { model: Invoice, as: "matchedInvoice", attributes: ["invoiceNumber", "clientName", "status"] }
      ]
    });

    res.status(200).json({
      status: "success",
      data: { transactions }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Match a transaction to an invoice
 */
exports.matchTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { invoiceId } = req.body;
    const organizationId = req.user.organizationId;

    const transaction = await IncomingTransaction.findOne({
      where: { id, organizationId }
    });

    if (!transaction) {
      return res.status(404).json({ status: "fail", message: "Transaction not found" });
    }

    if (transaction.status === "matched") {
      return res.status(400).json({ status: "fail", message: "Transaction is already matched" });
    }

    const invoice = await Invoice.findOne({
      where: { id: invoiceId, organizationId }
    });

    if (!invoice) {
      return res.status(404).json({ status: "fail", message: "Invoice not found" });
    }

    // Record the payment
    const payment = await Payment.create({
      invoiceId: invoice.id,
      amount: transaction.amount,
      paymentMethod: "bank_transfer",
      transactionId: transaction.externalReference,
      organizationId,
      recordedBy: req.user.id,
      paidAt: transaction.date,
      notes: "Auto-reconciled from Incoming Transaction"
    });

    // Update Transaction
    transaction.status = "matched";
    transaction.matchedInvoiceId = invoice.id;
    await transaction.save();

    // Re-evaluate Invoice Status
    const totalPayments = await Payment.sum("amount", { where: { invoiceId: invoice.id } }) || 0;
    let newStatus = invoice.status;
    if (totalPayments >= parseFloat(invoice.amount || 0)) {
      newStatus = "paid";
      invoice.paidAt = new Date();
    } else if (totalPayments > 0) {
      newStatus = "partially_paid";
    }
    
    invoice.status = newStatus;
    await invoice.save();

    // Log the event
    await InvoiceEvent.create({
      invoiceId: invoice.id,
      eventType: "PaymentMatched",
      metadata: { transactionId: transaction.id, amount: transaction.amount }
    });

    res.status(200).json({
      status: "success",
      message: "Transaction successfully matched and reconciled",
      data: { transaction, invoice, payment }
    });
  } catch (error) {
    next(error);
  }
};
