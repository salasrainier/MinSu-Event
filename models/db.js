/*
  MIT License
  
  Copyright (c) 2025 Christian I. Cabrera || XianFire Framework
  Mindoro State University - Philippines
*/

import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  process.env.DB_NAME || "content_event_system",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
    logging: false,
    dialectOptions: {
      supportBigNumbers: true,
      bigNumberStrings: true,
    },
  }
);

// ✅ Initialize database connection and auto-sync models
export const initDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL connection established successfully.");

    // Automatically create missing tables (without altering existing ones to avoid key limit issues)
    await sequelize.sync({ force: false });
    console.log("✅ All models synchronized successfully.");
  } catch (error) {
    console.error("❌ Database connection or sync failed:", error);
  }
};
