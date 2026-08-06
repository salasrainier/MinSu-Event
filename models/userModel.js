

      /*
    MIT License
    
    Copyright (c) 2025 Christian I. Cabrera || XianFire Framework
    Mindoro State University - Philippines

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
    */
// models/userModel.js
/*
  MIT License
  Copyright (c) 2025 Christian I. Cabrera || XianFire Framework
  Mindoro State University - Philippines
*/

import { DataTypes } from "sequelize";
import { sequelize } from "./db.js"; // ✅ Import your sequelize instance

export const User = sequelize.define(
  "User",
  {
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    email: { 
      type: DataTypes.STRING, 
      allowNull: false, 
      unique: true 
    },
    password: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    role: { 
      type: DataTypes.ENUM("participant", "organizer", "admin"),
      allowNull: false,
      defaultValue: "participant" // 👤 Default participant
    },
    department: {
      type: DataTypes.STRING,
      allowNull: true, // e.g., "CCS", "HM", "Education"
    },
    course: {
      type: DataTypes.STRING,
      allowNull: true, // e.g., "BS Information Technology", "BS Hospitality"
    },
    year: {
      type: DataTypes.STRING,
      allowNull: true, // e.g., "1st Year", "2nd Year", "3rd Year", "4th Year"
    },
    contact_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("active", "pending", "banned"),
      allowNull: false,
      defaultValue: "active", // admin can disable accounts later
    },
    profile_picture: {
      type: DataTypes.STRING,
      allowNull: true, // optional URL for user/organizer avatar
    },
  },
  {
    tableName: "Users",
    timestamps: true,           // ✅ Enable timestamps
    underscored: true,          // snake_case columns
    createdAt: "created_at",
    updatedAt: "updated_at",
    freezeTableName: true,
  }
);

export { sequelize };
