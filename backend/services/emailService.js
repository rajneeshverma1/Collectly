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
exports.sendClientNotification = async (client, type, metadata = {}) => {
  const log = await EmailLog.create({
    clientId: client.id,
    emailType: type,
    recipientEmail: client.email,
    status: "pending",
    metadata
  });

  let subject = "";
  let content = "";

  switch (type) {
    case "welcome":
      subject = "Welcome to your Collectly project";
      content = "We have shared the latest updates and details regarding your project. Please check the dashboard for complete information and work progress.";
      break;
    case "update":
      subject = "Project Update: New progress shared";
      content = "There have been new updates shared on your project dashboard. Please review the latest changes and progress reports.";
      break;
    case "agreement":
      subject = "New Business Agreement to Review";
      content = "A new business agreement and bill receipt have been shared with you. Please review the details and confirm to proceed.";
      break;
    default:
      subject = "Notification from Collectly";
      content = "You have a new update regarding your project details.";
  }

  try {
    const mailOptions = {
      from: '"Collectly" <no-reply@collectly.com>',
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
