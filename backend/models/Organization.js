const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Organization = sequelize.define(
  "Organization",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Please provide an organization name",
        },
      },
    },
    type: {
      type: DataTypes.ENUM("Freelancer", "Agency"),
      allowNull: false,
      validate: {
        isIn: {
          args: [["Freelancer", "Agency"]],
          msg: "Type must be either Freelancer or Agency",
        },
      },
    },
    ownerId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    tableName: "organizations",
    timestamps: true,
  },
);

module.exports = Organization;
