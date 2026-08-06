/*
  MIT License
  
  Copyright (c) 2025 Christian I. Cabrera || XianFire Framework
  Mindoro State University - Philippines
*/

import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  process.env.DB_NAME || "defaultdb",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT) || 3306,
    dialect: "mysql",
    logging: false,
    timezone: 'Z',
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
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
  }
};
