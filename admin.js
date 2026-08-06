import bcrypt from "bcrypt";
import { User } from "./models/userModel.js";
import { sequelize } from "./models/db.js";

async function createAdmin() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected!");

    const hashedPass = await bcrypt.hash("Admin@123", 10);
    
    const admin = await User.create({
      name: "MinSU Administrator",
      email: "admin@msu.edu",
      password: hashedPass,
      role: "admin",
      department: "Administration",
      contact_number: "+63-912-3456789",
      status: "active"
    });

    console.log("\n✅ ADMIN ACCOUNT CREATED!\n");
    console.log("Email: admin@msu.edu");
    console.log("Password: Admin@123");
    console.log("Name: MinSU Administrator\n");
  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    process.exit(0);
  }
}

createAdmin();
