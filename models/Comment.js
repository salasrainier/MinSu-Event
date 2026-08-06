import { DataTypes } from "sequelize";
import { sequelize } from "./db.js";
import { User } from "./userModel.js";
import { EventRequest } from "./Eventrequest.js";

export const Comment = sequelize.define(
  "Comment",
  {
    comment_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "EventRequests",
        key: "id",
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "user_id",
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Comment cannot be empty" },
      },
    },
  },
  {
    tableName: "Comments",
    timestamps: true,
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    freezeTableName: true,
  }
);

// Associations
Comment.belongsTo(User, { foreignKey: "user_id" });
Comment.belongsTo(EventRequest, { foreignKey: "event_id" });
User.hasMany(Comment, { foreignKey: "user_id" });
EventRequest.hasMany(Comment, { foreignKey: "event_id" });
