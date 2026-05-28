const transporter = require("../config/mail");
const EmailLog = require("../models/EmailLog");

/**
 * Professional HTML Email Template Wrapper
 */
const getEmailTemplate = (clientName, content, actionUrl = "http://localhost:3000") => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        .container { font-family: 'Inter', -apple-system, sans-serif; max-width: 600px; margin: 0 auto; background: #fafafa; padding: 40px 20px; }
        .card { background: #ffffff; border-radius: 24px; padding: 40px; border: 1px solid #eeeeee; box-shadow: 0 4px 24px rgba(0,0,0,0.05); }
        .logo { font-size: 24px; font-weight: 900; letter-spacing: -1px; margin-bottom: 32px; color: #000000; }
        .greeting { font-size: 20px; font-weight: 700; color: #111111; margin-bottom: 16px; }
        .content { font-size: 16px; line-height: 1.6; color: #444444; margin-bottom: 32px; }
        .button { background: #000000; color: #ffffff !important; padding: 14px 28px; border-radius: 12px; text-decoration: none; font-weight: 600; display: inline-block; font-size: 14px; }
        .footer { margin-top: 32px; font-size: 12px; color: #999999; text-align: center; }
    </style>
</head>
<body>
    <div class="container">
        <div class="card">
            <div class="logo">COLLECTLY</div>
            <div class="greeting">Hello ${clientName},</div>
            <div class="content">
                ${content}
            </div>
            <a href="${actionUrl}" class="button">Open Dashboard</a>
        </div>
        <div class="footer">
            &copy; 2026 Collectly Inc. All rights reserved.<br/>
            Unsubscribe from these notifications
        </div>
    </div>
</body>
</html>
`;

/**
 * Send Automated Client Notification
 */
exports.sendClientNotification = async (client, type, freelancer = {}, metadata = {}) => {
  const log = await EmailLog.create({
    clientId: client.id,
    emailType: type,
    recipientEmail: client.email,
    status: "pending",
    metadata: { ...metadata, freelancer }
  });

  const freelancerName = freelancer.name || "A Freelancer";
  const freelancerEmail = freelancer.email || "";

  let subject = "";
  let content = "";

  switch (type) {
    case "welcome":
      subject = `${freelancerName} has added you on Collectly`;
      content = `
        <p><strong>${freelancerName}</strong> (${freelancerEmail}) has added you to their secure client workspace on Collectly.</p>
        <p>You can now manage your projects, view agreement terms, track milestones, and pay invoices instantly.</p>
      `;
      break;
    case "update":
      subject = `New project update from ${freelancerName}`;
      content = `
        <p><strong>${freelancerName}</strong> has posted a new update on your project dashboard.</p>
        <p>Please review the latest files, milestones, and details to ensure everything is aligned.</p>
      `;
      break;
    case "agreement":
      subject = `Business Agreement & Receipt from ${freelancerName}`;
      content = `
        <p><strong>${freelancerName}</strong> has sent you a new business agreement and bill receipt for review.</p>
        <p>Please check the details and sign the agreement to finalize your contract.</p>
      `;
      break;
    case "reminder":
      {
        const reminderType = metadata.reminderType || "default";
        const amt = parseFloat(metadata.amount || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        if (reminderType === "upcoming") {
          subject = `Upcoming Payment Reminder: Invoice ${metadata.invoiceNumber || ""} from ${freelancerName}`;
          content = `
            <p>This is a friendly reminder that invoice <strong>${metadata.invoiceNumber || ""}</strong> from <strong>${freelancerName}</strong> is due soon on <strong>${metadata.dueDate || ""}</strong>.</p>
            <p><strong>Amount Due:</strong> $${amt}</p>
            <p>To ensure smooth operations, please review the invoice details and complete payment at your earliest convenience.</p>
          `;
        } else if (reminderType === "due-today") {
          subject = `Invoice ${metadata.invoiceNumber || ""} is Due Today from ${freelancerName}`;
          content = `
            <p>This is a reminder that invoice <strong>${metadata.invoiceNumber || ""}</strong> from <strong>${freelancerName}</strong> is due today, <strong>${metadata.dueDate || ""}</strong>.</p>
            <p><strong>Amount Due:</strong> $${amt}</p>
            <p>Please use the direct link below to settle this balance today. If you have already made the transfer, thank you!</p>
          `;
        } else if (reminderType === "overdue") {
          subject = `Action Required: Invoice ${metadata.invoiceNumber || ""} is OVERDUE from ${freelancerName}`;
          content = `
            <p style="color: #ef4444; font-weight: 700; margin-bottom: 12px; font-size: 14px; text-transform: uppercase; tracking: 0.05em;">Urgent: Overdue Account Balance</p>
            <p>Our records show that invoice <strong>${metadata.invoiceNumber || ""}</strong> from <strong>${freelancerName}</strong> is now overdue. It was due on <strong>${metadata.dueDate || ""}</strong>.</p>
            <p><strong>Outstanding Balance:</strong> $${amt}</p>
            <p>Please finalize your payment immediately to keep your account in good standing and avoid service disruptions.</p>
          `;
        } else {
          subject = `Payment Reminder: Invoice ${metadata.invoiceNumber || ""} from ${freelancerName}`;
          content = `
            <p>This is a friendly reminder that invoice <strong>${metadata.invoiceNumber || ""}</strong> from <strong>${freelancerName}</strong> is due on <strong>${metadata.dueDate || ""}</strong>.</p>
            <p><strong>Amount Due:</strong> $${amt}</p>
            <p>Please log in to your secure client portal or use the checkout link to settle this balance.</p>
          `;
        }
      }
      break;
    default:
      subject = `Notification from ${freelancerName} via Collectly`;
      content = `You have a new update regarding your project details from ${freelancerName}.`;
  }

  try {
    const mailOptions = {
      from: `"${freelancerName} via Collectly" <no-reply@collectly.com>`,
      to: client.email,
      subject: subject,
      html: getEmailTemplate(client.name, content),
    };

    const info = await transporter.sendMail(mailOptions);
    
    await log.update({
      status: "sent",
      sentAt: new Date(),
      metadata: { ...metadata, messageId: info.messageId }
    });

    return true;
  } catch (error) {
    console.error("Email sending failed:", error);
    await log.update({
      status: "failed",
      errorMessage: error.message
    });
    return false;
  }
};
