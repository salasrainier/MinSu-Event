import { DataTypes } from "sequelize";
import { sequelize } from "./db.js";
import { User } from "./userModel.js"; // import User model

export const EventRequest = sequelize.define(
  "EventRequest",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    organizer_name: { // snake_case aligned with DB
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Organizer name cannot be empty" },
      },
    },
    event_title: { // snake_case
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Event title cannot be empty" },
      },
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Department cannot be empty" },
      },
    },
    event_date: { // snake_case - Start date and time
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Event start date cannot be empty" },
        isDate: { msg: "Invalid date format" },
      },
    },
    event_end_date: { // snake_case - End date and time
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Event end date cannot be empty" },
        isDate: { msg: "Invalid date format" },
      },
    },
    venue: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Venue cannot be empty" },
      },
    },
    purpose: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Purpose cannot be empty" },
      },
    },
    proposal_file: { // snake_case
      type: DataTypes.STRING,
      allowNull: true,
    },
    event_images: { // JSON array of image paths
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
    },
    event_video: { // Video file path
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("Pending", "Approved", "Denied"),
      defaultValue: "Pending",
      allowNull: false,
    },
    remarks: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    user_id: { // snake_case
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    is_expired: { // Track if event is manually expired/closed
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  {
    tableName: "EventRequests",
    timestamps: true,
    underscored: true, // keep underscored for snake_case columns
    createdAt: "created_at",
    updatedAt: "updated_at",
    freezeTableName: true,
    comment: "Stores event requests submitted by departments or organizers",
  }
);

// ✅ Associations
EventRequest.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(EventRequest, { foreignKey: "user_id" });
