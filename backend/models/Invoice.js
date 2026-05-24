const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Invoice = sequelize.define(
  "Invoice",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    invoiceNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    clientName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    clientEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("draft", "sent", "paid", "overdue", "cancelled", "partially_paid"),
      defaultValue: "draft",
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    organizationId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "organizations",
        key: "id",
      },
    },
    createdBy: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    paidAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    sentAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "invoices",
    timestamps: true,
    indexes: [
      { fields: ["organizationId"] },
      { fields: ["status"] },
      { fields: ["dueDate"] },
      { fields: ["createdBy"] },
      { fields: ["organizationId", "status"] },
      { fields: ["organizationId", "dueDate"] },
    ],
  },
);

// Instance method to check if invoice is overdue
Invoice.prototype.isOverdue = function () {
  return this.status !== "paid" && this.status !== "cancelled" && new Date(this.dueDate) < new Date();
};

// Instance method to check if due this week
Invoice.prototype.isDueThisWeek = function () {
  if (this.status === "paid" || this.status === "cancelled") return false;
  const today = new Date();
  const dueDate = new Date(this.dueDate);
  const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  return dueDate >= today && dueDate <= nextWeek;
};

module.exports = Invoice;
