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

    const today = new Date();
    const threeDaysFromNow = new Date();
    threeDaysFromNow.setDate(today.getDate() + 3);

    // Fetch invoices that are unpaid (sent or partially_paid)
    const activeInvoices = await Invoice.findAll({
      where: {
        status: {
          [Op.in]: ["sent", "partially_paid", "overdue"]
        }
      }
    });

    console.log(`[Reminder Service] Found ${activeInvoices.length} active unpaid invoices to check.`);

    for (const invoice of activeInvoices) {
      const dueDate = new Date(invoice.dueDate);
      let needsReminder = false;

      // 1. Auto-transition sent/partially_paid invoices to overdue if past due date
      if (dueDate < today && invoice.status !== "overdue") {
        console.log(`[Reminder Service] Invoice ${invoice.invoiceNumber} is past due date (${invoice.dueDate}). Updating status to 'overdue'.`);
        invoice.status = "overdue";
        await invoice.save();
        needsReminder = true;
      }
      // 2. Trigger reminder for invoices due in next 3 days
      else if (dueDate >= today && dueDate <= threeDaysFromNow) {
        console.log(`[Reminder Service] Invoice ${invoice.invoiceNumber} is due soon (${invoice.dueDate}). Triggering near-due reminder.`);
        needsReminder = true;
      }
      // 3. Keep sending occasional reminders for already overdue invoices
      else if (invoice.status === "overdue") {
        needsReminder = true;
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

        // Find associated client record to feed to sendClientNotification
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
          }
        );
        console.log(`[Reminder Service] Successfully dispatched reminder email for Invoice ${invoice.invoiceNumber} to ${invoice.clientEmail}.`);
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
