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
    port: parseInt(process.env.DB_PORT) || 3306,
    dialect: "mysql",
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    dialectOptions: {
      supportBigNumbers: true,
      bigNumberStrings: true,
      ssl: process.env.NODE_ENV === 'production' ? 'Amazon RDS' : false,
      waitForConnections: true,
      enableKeepAlive: true,
    },
  }
);

// ✅ Initialize database connection and auto-sync models
export const initDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL connection established successfully.");

    // Automatically create missing tables (without altering existing ones to avoid key limit issues)
    await sequelize.sync({ force: false, alter: false });
    console.log("✅ All models synchronized successfully.");
  } catch (error) {
    // Log the error but don't crash - app can continue
    if (error.message && error.message.includes("offset")) {
      console.log("⚠️  Database offset issue (Aiven bug) - this is non-critical");
    } else {
      console.error("⚠️  Database connection error:", error.message.substring(0, 80));
    }
  }
};

