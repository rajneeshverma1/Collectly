const Client = require("../models/Client");
const Organization = require("../models/Organization");
const AppError = require("../utils/appError");
const crypto = require("crypto");
const emailService = require("../services/emailService");
const firebaseService = require("../services/firebaseService");
const transporter = require("../config/mail");

/**
 * Add a new client
 */
exports.addClient = async (req, res, next) => {
  try {
    const { name, email, phone, company, address } = req.body;
    const organizationId = req.user.organizationId;

    if (!organizationId) {
      return next(new AppError("User must belong to an organization", 400));
    }

    const client = await Client.create({
      name,
      email,
      phone,
      company,
      address,
      organizationId,
      createdBy: req.user.id,
    });

    // Automated Client Notification (Welcome)
    emailService.sendClientNotification(client, "welcome");
    
    // Sync to Firebase for real-time management
    firebaseService.syncClientToFirebase(client);

    res.status(201).json({
      status: "success",
      data: {
        client,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Send invitation with PDF to client
 */
exports.sendInvitation = async (req, res, next) => {
  try {
    const { name, email, phone, company, address, pdfBase64 } = req.body;
    const organizationId = req.user.organizationId;

    if (!organizationId) {
      return next(new AppError("User must belong to an organization", 400));
    }

    const token = crypto.randomBytes(32).toString("hex");

    const client = await Client.create({
      name,
      email,
      phone,
      company,
      address,
      organizationId,
      createdBy: req.user.id,
      status: "pending",
      invitationToken: token,
    });

    const approvalUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/agreement/${token}`;

    const mailOptions = {
      from: '"Collectly" <no-reply@collectly.com>',
      to: email,
      subject: 'New Business Agreement from Collectly',
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>Hello ${name},</h2>
          <p>A freelancer has sent you a new business agreement and bill receipt.</p>
          <p>Please review the attached PDF and click the button below to agree and finalize the partnership.</p>
          <a href="${approvalUrl}" style="background: black; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block; margin: 20px 0;">Review & Agree</a>
          <p>Best regards,<br/>The Collectly Team</p>
        </div>
      `,
      attachments: [
        {
          filename: 'receipt.pdf',
          content: pdfBase64.split("base64,")[1],
          encoding: 'base64'
        }
      ]
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      status: "success",
      message: "Invitation sent successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Approve client via token
 */
exports.approveClient = async (req, res, next) => {
  try {
    const { token } = req.params;

    const client = await Client.findOne({
      where: { invitationToken: token, status: "pending" },
    });

    if (!client) {
      return next(new AppError("Invalid or expired token", 400));
    }

    client.status = "active";
    client.invitationToken = null;
    await client.save();

    // Notify client that their account is now active
    emailService.sendClientNotification(client, "welcome");
    firebaseService.syncClientToFirebase(client);

    res.status(200).json({
      status: "success",
      message: "Agreement approved successfully! You are now added as a client.",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update a client
 */
exports.updateClient = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, phone, company, address, status } = req.body;
    const organizationId = req.user.organizationId;

    const client = await Client.findOne({
      where: { id, organizationId }
    });

    if (!client) {
      return next(new AppError("Client not found", 404));
    }

    await client.update({ name, email, phone, company, address, status });

    // Trigger update notification
    emailService.sendClientNotification(client, "update");
    firebaseService.syncClientToFirebase(client);

    res.status(200).json({
      status: "success",
      data: {
        client,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all clients for the organization
 */
exports.getAllClients = async (req, res, next) => {
  try {
    const organizationId = req.user.organizationId;

    if (!organizationId) {
      return next(new AppError("User must belong to an organization", 400));
    }

    const clients = await Client.findAll({
      where: { organizationId },
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      status: "success",
      results: clients.length,
      data: {
        clients,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get client count
 */
exports.getClientCount = async (req, res, next) => {
  try {
    const organizationId = req.user.organizationId;

    if (!organizationId) {
      return next(new AppError("User must belong to an organization", 400));
    }

    const count = await Client.count({
      where: { organizationId },
    });

    res.status(200).json({
      status: "success",
      data: {
        count,
      },
    });
  } catch (error) {
    next(error);
  }
};
