const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const EmailLog = sequelize.define("EmailLog", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  clientId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  emailType: {
    type: DataTypes.ENUM("welcome", "update", "agreement", "reminder"),
    allowNull: false,
  },
  recipientEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  status: {
    type: DataTypes.ENUM("pending", "sent", "failed"),
    defaultValue: "pending",
  },
  errorMessage: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  sentAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  metadata: {
    type: DataTypes.JSONB,
    allowNull: true,
  }
});

module.exports = EmailLog;
