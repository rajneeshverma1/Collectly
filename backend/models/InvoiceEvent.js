const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const InvoiceEvent = sequelize.define(
  "InvoiceEvent",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    invoiceId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "invoices",
        key: "id",
      },
    },
    eventType: {
      type: DataTypes.ENUM("Generated", "ReminderSent", "LinkViewed", "PaymentMatched", "StatusOverride", "Other"),
      allowNull: false,
    },
    metadata: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {
    tableName: "invoice_events",
    timestamps: true,
    updatedAt: false, // Audit logs usually only need createdAt
    indexes: [
      { fields: ["invoiceId"] },
      { fields: ["eventType"] },
    ],
  }
);

module.exports = InvoiceEvent;
