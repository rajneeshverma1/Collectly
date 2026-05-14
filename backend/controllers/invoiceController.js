/**
 * @file invoiceController.js
 * @description Controllers for managing invoices and revenue summaries.
 */
const Invoice = require("../models/Invoice");
const Organization = require("../models/Organization");
const { Op } = require("sequelize");

exports.getAllInvoices = async (req, res, next) => {
  try {
    const organization = await Organization.findOne({
      where: { clerkId: req.user.id },
    });

    if (!organization) {
      return res.status(404).json({
        status: "fail",
        message: "Organization not found for this user",
      });
    }

    const invoices = await Invoice.findAll({
      where: { organizationId: organization.id },
      order: [["createdAt", "DESC"]],
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

exports.getInvoice = async (req, res, next) => {
  try {
    const invoice = await Invoice.findByPk(req.params.id);

    if (!invoice) {
      return res.status(404).json({
        status: "fail",
        message: "Invoice not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        invoice,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.createInvoice = async (req, res, next) => {
  try {
    const organization = await Organization.findOne({
      where: { clerkId: req.user.id },
    });

    if (!organization) {
      return res.status(404).json({
        status: "fail",
        message: "Organization not found for this user",
      });
    }

    const invoice = await Invoice.create({
      ...req.body,
      organizationId: organization.id,
      createdBy: organization.ownerId || organization.id, // Fallback if ownerId not set
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

exports.getMonthlyRevenue = async (req, res, next) => {
  try {
    const organization = await Organization.findOne({
      where: { clerkId: req.user.id },
    });

    if (!organization) {
      return res.status(404).json({
        status: "fail",
        message: "Organization not found for this user",
      });
    }

    // Simple revenue summary by month and client
    const invoices = await Invoice.findAll({
      where: { 
        organizationId: organization.id,
        status: 'paid'
      },
    });

    // Grouping by month and client
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
