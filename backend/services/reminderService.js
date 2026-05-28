/**
 * @file reminderService.js
 * @description Background service that scans for overdue or near-due invoices and triggers polite email reminders.
 */
const { Op } = require("sequelize");
const Invoice = require("../models/Invoice");
const Client = require("../models/Client");
const User = require("../models/User");
const emailService = require("./emailService");
const clerkClient = require("../config/clerk");

/**
 * Main worker task that scans and processes invoice reminders
 */
const processInvoiceReminders = async () => {
  try {
    console.log("[Reminder Service] Scanning database for near-due or overdue invoices...");

    const Organization = require("../models/Organization");

    // Fetch invoices that are unpaid (sent, partially_paid, or overdue)
    const activeInvoices = await Invoice.findAll({
      where: {
        status: {
          [Op.in]: ["sent", "partially_paid", "overdue"]
        }
      }
    });

    console.log(`[Reminder Service] Found ${activeInvoices.length} active unpaid invoices to check.`);

    const today = new Date();
    const todayMs = new Date(today).setHours(0, 0, 0, 0);

    for (const invoice of activeInvoices) {
      // Load organization custom reminder settings
      const org = await Organization.findByPk(invoice.organizationId);
      
      // Defaults if organization does not have custom config
      const automatedEnabled = org ? org.automatedRemindersEnabled : true;
      const beforeDays = org ? org.reminderBeforeDueDays : 3;
      const onDueEnabled = org ? org.reminderOnDueDate : true;
      const afterDays = org ? org.reminderAfterDueDays : 3;

      if (!automatedEnabled) {
        console.log(`[Reminder Service] Automated reminders disabled for Org ${invoice.organizationId}. Skipping Invoice ${invoice.invoiceNumber}.`);
        continue;
      }

      // Check if we already sent a reminder today to avoid duplicates
      if (invoice.lastReminderSent) {
        const lastSentMs = new Date(invoice.lastReminderSent).setHours(0, 0, 0, 0);
        if (lastSentMs === todayMs) {
          console.log(`[Reminder Service] Reminder already sent today for Invoice ${invoice.invoiceNumber}. Skipping.`);
          continue;
        }
      }

      const dueDate = new Date(invoice.dueDate);
      const dueDateMs = new Date(dueDate).setHours(0, 0, 0, 0);
      const diffDays = Math.round((dueDateMs - todayMs) / (1000 * 60 * 60 * 24));

      let needsReminder = false;
      let reminderType = "default";

      // 1. Check Auto-transition to overdue if past due date
      if (dueDateMs < todayMs && invoice.status !== "overdue") {
        console.log(`[Reminder Service] Invoice ${invoice.invoiceNumber} is past due date. Updating status to 'overdue'.`);
        invoice.status = "overdue";
        await invoice.save();
      }

      // 2. Evaluate Policy Rules
      if (diffDays === beforeDays && beforeDays > 0) {
        // A. Upcoming Reminder Rule
        console.log(`[Reminder Service] Invoice ${invoice.invoiceNumber} is exactly ${beforeDays} days before due. Triggering upcoming reminder.`);
        needsReminder = true;
        reminderType = "upcoming";
      } else if (diffDays === 0 && onDueEnabled) {
        // B. On Due Date Reminder Rule
        console.log(`[Reminder Service] Invoice ${invoice.invoiceNumber} is due today. Triggering due-today reminder.`);
        needsReminder = true;
        reminderType = "due-today";
      } else if (diffDays === -afterDays && afterDays > 0) {
        // C. Overdue Reminder Rule (X days past due date)
        console.log(`[Reminder Service] Invoice ${invoice.invoiceNumber} is exactly ${afterDays} days overdue. Triggering overdue reminder.`);
        needsReminder = true;
        reminderType = "overdue";
      }

      if (needsReminder) {
        // Fetch freelancer details from Clerk
        let freelancer = { name: "A Freelancer", email: "" };
        try {
          const clerkUser = await clerkClient.users.getUser(invoice.createdBy);
          if (clerkUser) {
            freelancer.name = `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || clerkUser.username || "Freelancer";
            freelancer.email = clerkUser.emailAddresses[0]?.emailAddress || "";
          }
        } catch (err) {
          console.error(`[Reminder Service] Failed to retrieve Clerk details for freelancer ${invoice.createdBy}:`, err.message);
        }

        // Find associated client record
        let client = await Client.findOne({
          where: {
            email: invoice.clientEmail,
            organizationId: invoice.organizationId
          }
        });

        // Fallback mockup client if no full client profile exists
        if (!client) {
          client = {
            id: invoice.id,
            name: invoice.clientName,
            email: invoice.clientEmail,
          };
        }

        // Dispatch email notification reminder
        await emailService.sendClientNotification(
          client,
          "reminder",
          freelancer,
          {
            invoiceNumber: invoice.invoiceNumber,
            amount: invoice.amount,
            dueDate: new Date(invoice.dueDate).toLocaleDateString(),
            reminderType
          }
        );

        // Update lastReminderSent timestamp
        await invoice.update({ lastReminderSent: new Date() });
        console.log(`[Reminder Service] Successfully dispatched ${reminderType} reminder email for Invoice ${invoice.invoiceNumber} to ${invoice.clientEmail}.`);
      }
    }
    console.log("[Reminder Service] Database scan and reminder dispatches successfully completed.");
  } catch (error) {
    console.error("[Reminder Service Error] Background processing failed:", error);
  }
};

/**
 * Initialize the background worker
 * Runs once at launch and then every 12 hours
 */
const initReminderService = () => {
  // Run first execution 5 seconds after server startup
  setTimeout(processInvoiceReminders, 5000);

  // Repeat every 12 hours
  const intervalMs = 12 * 60 * 60 * 1000;
  setInterval(processInvoiceReminders, intervalMs);
  
  console.log("[Reminder Service] Background worker scheduled (Interval: 12 Hours).");
};

module.exports = {
  initReminderService,
  triggerRemindersManually: processInvoiceReminders // Expose for manual test/debug triggers
};
