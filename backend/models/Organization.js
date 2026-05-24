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
    experienceLevel: {
      type: DataTypes.ENUM("Beginner", "Intermediate", "Expert"),
      allowNull: true,
    },
    location: {
      type: DataTypes.ENUM("India", "USA", "Others"),
      allowNull: true,
    },
    projectsCompleted: {
      type: DataTypes.STRING, // Using string to allow "10+", "5-10", etc.
      allowNull: true,
    },
    ownerId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    stripePublishableKey: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    stripeSecretKey: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    razorpayKeyId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    razorpayKeySecret: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "organizations",
    timestamps: true,
  },
);

module.exports = Organization;
