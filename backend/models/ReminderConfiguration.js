const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ReminderConfiguration = sequelize.define(
  "ReminderConfiguration",
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
    offsetDays: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    templateSubject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    templateBody: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "reminder_configurations",
    timestamps: true,
    indexes: [
      { fields: ["organizationId"] },
    ],
  }
);

module.exports = ReminderConfiguration;
