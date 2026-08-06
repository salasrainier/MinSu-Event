import { DataTypes } from "sequelize";
import { sequelize } from "./db.js";
import { User } from "./userModel.js";
import { EventRequest } from "./Eventrequest.js";

export const Reaction = sequelize.define(
  "Reaction",
  {
    reaction_id: {
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
    reaction_type: {
      type: DataTypes.ENUM("like", "love", "haha", "wow", "sad", "angry"),
      defaultValue: "like",
      allowNull: false,
    },
  },
  {
    tableName: "Reactions",
    timestamps: true,
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    freezeTableName: true,
    indexes: [
      {
        unique: true,
        fields: ["event_id", "user_id"],
      },
    ],
  }
);

// Associations
Reaction.belongsTo(User, { foreignKey: "user_id" });
Reaction.belongsTo(EventRequest, { foreignKey: "event_id" });
User.hasMany(Reaction, { foreignKey: "user_id" });
EventRequest.hasMany(Reaction, { foreignKey: "event_id" });
