import { DataTypes } from "sequelize";
import { sequelize } from "./db.js";
import { User } from "./userModel.js";
import { EventRequest } from "./Eventrequest.js";

export const Participation = sequelize.define(
  "Participation",
  {
    participant_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "user_id",
      },
    },
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "EventRequests",
        key: "id",
      },
    },
    status: {
      type: DataTypes.ENUM("registered", "attended", "cancelled"),
      defaultValue: "registered",
      allowNull: false,
    },
  },
  {
    tableName: "Participations",
    timestamps: true,
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

// ✅ Associations
Participation.belongsTo(User, { foreignKey: "user_id" });
Participation.belongsTo(EventRequest, { foreignKey: "event_id" });
User.hasMany(Participation, { foreignKey: "user_id" });
EventRequest.hasMany(Participation, { foreignKey: "event_id" });
