/*
  MIT License
  
  Copyright (c) 2025 Christian I. Cabrera || XianFire Framework
  Mindoro State University - Philippines
*/

import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  process.env.DB_NAME || "railway",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT) || 3306,
    dialect: "mysql",
    logging: false,
    timezone: '+00:00',
    define: {
      timestamps: true,
      underscored: true,
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    dialectOptions: {
      supportBigNumbers: true,
      bigNumberStrings: true,
      ssl: {
        rejectUnauthorized: false
      },
      waitForConnections: true,
      enableKeepAlive: true,
      decimalNumbers: true,
    },
  }
);

export const initDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL connection established successfully.");
    
    // Sync models - create tables if they don't exist
    await sequelize.sync({ alter: false, force: false });
    console.log("✅ Database tables synced.");
  } catch (error) {
    console.error("❌ Database error:", error.message);
  }
};
