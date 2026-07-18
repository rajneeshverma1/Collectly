const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const IncomingTransaction = sequelize.define(
  "IncomingTransaction",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    organizationId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "organizations",
        key: "id",
      },
    },
    externalReference: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    senderName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("unmatched", "matched"),
      defaultValue: "unmatched",
      allowNull: false,
    },
    matchedInvoiceId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "invoices",
        key: "id",
      },
    },
  },
  {
    tableName: "incoming_transactions",
    timestamps: true,
    indexes: [
      { fields: ["organizationId"] },
      { fields: ["status"] },
    ],
  }
);

module.exports = IncomingTransaction;
