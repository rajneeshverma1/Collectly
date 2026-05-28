const { Op, Sequelize } = require("sequelize");
const Invoice = require("../models/Invoice");
const Payment = require("../models/Payment");
const Client = require("../models/Client");
const EmailLog = require("../models/EmailLog");
const AppError = require("../utils/appError");

// Get dashboard summary data
exports.getDashboardSummary = async (req, res, next) => {
  try {
    const organizationId = req.user.organizationId;

    if (!organizationId) {
      return next(new AppError("User must belong to an organization", 400));
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);

    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59);

    // 1. Total Outstanding (unpaid invoices: draft + sent + overdue)
    const outstandingResult = await Invoice.findOne({
      where: {
        organizationId,
        status: {
          [Op.in]: ["draft", "sent", "overdue"],
        },
      },
      attributes: [
        [Sequelize.fn("COALESCE", Sequelize.fn("SUM", Sequelize.col("amount")), 0), "total"],
        [Sequelize.fn("COUNT", Sequelize.col("id")), "count"],
      ],
      raw: true,
    });

    // 2. Overdue (past due date and not paid)
    const overdueResult = await Invoice.findOne({
      where: {
        organizationId,
        status: {
          [Op.in]: ["draft", "sent", "overdue"],
        },
        dueDate: {
          [Op.lt]: today,
        },
      },
      attributes: [
        [Sequelize.fn("COALESCE", Sequelize.fn("SUM", Sequelize.col("amount")), 0), "total"],
        [Sequelize.fn("COUNT", Sequelize.col("id")), "count"],
      ],
      raw: true,
    });

    // 3. Due This Week (next 7 days, not paid)
    const dueThisWeekResult = await Invoice.findOne({
      where: {
        organizationId,
        status: {
          [Op.in]: ["draft", "sent", "overdue"],
        },
        dueDate: {
          [Op.gte]: today,
          [Op.lte]: nextWeek,
        },
      },
      attributes: [
        [Sequelize.fn("COALESCE", Sequelize.fn("SUM", Sequelize.col("amount")), 0), "total"],
        [Sequelize.fn("COUNT", Sequelize.col("id")), "count"],
      ],
      raw: true,
    });

    // 4. Collected This Month (payments received)
    const collectedResult = await Payment.findOne({
      where: {
        organizationId,
        paidAt: {
          [Op.gte]: startOfMonth,
          [Op.lte]: endOfMonth,
        },
      },
      attributes: [
        [Sequelize.fn("COALESCE", Sequelize.fn("SUM", Sequelize.col("amount")), 0), "total"],
        [Sequelize.fn("COUNT", Sequelize.col("id")), "count"],
      ],
      raw: true,
    });

    // Calculate trends (compare with previous period)
    const prevMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const prevMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0, 23, 59, 59);

    const prevMonthCollected = await Payment.findOne({
      where: {
        organizationId,
        paidAt: {
          [Op.gte]: prevMonthStart,
          [Op.lte]: prevMonthEnd,
        },
      },
      attributes: [
        [Sequelize.fn("COALESCE", Sequelize.fn("SUM", Sequelize.col("amount")), 0), "total"],
      ],
      raw: true,
    });

    const currentMonthTotal = parseFloat(collectedResult.total) || 0;
    const prevMonthTotal = parseFloat(prevMonthCollected.total) || 0;

    let collectionTrend = 0;
    if (prevMonthTotal > 0) {
      collectionTrend = ((currentMonthTotal - prevMonthTotal) / prevMonthTotal) * 100;
    }

    // Get the newest client
    const latestClient = await Client.findOne({
      where: { organizationId },
      order: [["createdAt", "DESC"]],
      attributes: ["name"],
    });

    res.status(200).json({
      status: "success",
      data: {
        summary: {
          totalOutstanding: {
            amount: parseFloat(outstandingResult.total) || 0,
            count: parseInt(outstandingResult.count) || 0,
            label: "Total Outstanding",
          },
          overdue: {
            amount: parseFloat(overdueResult.total) || 0,
            count: parseInt(overdueResult.count) || 0,
            label: "Overdue",
          },
          dueThisWeek: {
            amount: parseFloat(dueThisWeekResult.total) || 0,
            count: parseInt(dueThisWeekResult.count) || 0,
            label: "Due This Week",
          },
          collectedThisMonth: {
            amount: currentMonthTotal,
            count: parseInt(collectedResult.count) || 0,
            label: "Collected This Month",
            trend: collectionTrend,
          },
          totalClients: {
            count: await Client.count({ where: { organizationId } }),
            label: "Total Clients",
            newestClient: latestClient ? latestClient.name : null,
          }
        },
        asOf: new Date().toISOString(),
      },
    });
  } catch (err) {
    next(err);
  }
};

// Get recent activity for dashboard
exports.getRecentActivity = async (req, res, next) => {
  try {
    const organizationId = req.user.organizationId;

    if (!organizationId) {
      return next(new AppError("User must belong to an organization", 400));
    }

    // BILLING & INVOICES PIPELINE:
    // Fetch the 5 most recent invoices created in the organization workspace.
    const recentInvoices = await Invoice.findAll({
      where: { organizationId },
      order: [["createdAt", "DESC"]],
      limit: 5,
      attributes: ["id", "invoiceNumber", "clientName", "amount", "status", "dueDate", "createdAt"],
    });

    // TRANSACTIONS & PAYMENTS PIPELINE:
    // Fetch the 5 most recent transactions/payments completed in the workspace.
    const recentPayments = await Payment.findAll({
      where: { organizationId },
      order: [["paidAt", "DESC"]],
      limit: 5,
      attributes: ["id", "amount", "paymentMethod", "paidAt"],
      include: [
        {
          model: Invoice,
          as: "invoice",
          attributes: ["invoiceNumber", "clientName"],
        },
      ],
    });

    // CLIENT DECK INTEGRATION:
    // Query and fetch the 5 most recently created clients inside the workspace.
    const recentClients = await Client.findAll({
      where: { organizationId },
      order: [["createdAt", "DESC"]],
      limit: 5,
      attributes: ["id", "name", "email", "company", "status", "createdAt"],
    });

    // AUDIT LOG INTEGRATION PIPELINE:
    // Query and fetch the 5 most recent automated/manual email reminder logs sent to clients in this org.
    // Joins dynamically with the Client table to resolve workspace name and brand properties.
    const recentReminders = (await EmailLog.findAll({
      order: [["createdAt", "DESC"]],
      limit: 5,
      attributes: ["id", "recipientEmail", "emailType", "status", "sentAt", "metadata"],
      include: [
        {
          model: Client,
          as: "client",
          where: { organizationId },
          attributes: ["name", "company"],
        }
      ]
    })) || [];

    res.status(200).json({
      status: "success",
      data: {
        recentInvoices,
        recentPayments,
        recentClients,
        recentReminders,
      },
    });
  } catch (err) {
    next(err);
  }
};
