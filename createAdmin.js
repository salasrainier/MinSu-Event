import bcrypt from "bcrypt";
import { User } from "./models/userModel.js";
import { sequelize } from "./models/db.js";

async function createAdminAccount() {
  try {
    // Ensure database is synced
    await sequelize.sync();

    const adminEmail = "admin@msu.edu";
    const adminPassword = "Admin@123"; // Change this!

    // Check if admin already exists
    const existingAdmin = await User.findOne({ where: { email: adminEmail } });
    if (existingAdmin) {
      console.log("✅ Admin account already exists!");
      console.log(`📧 Email: ${existingAdmin.email}`);
      console.log(`👤 Name: ${existingAdmin.name}`);
      console.log(`🔐 Role: ${existingAdmin.role}`);
      process.exit(0);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    // Create admin user
    const admin = await User.create({
      name: "MinSU Administrator",
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
      department: "Administration",
      contact_number: "+63-912-3456789",
      status: "active",
      profile_picture: "/uploads/OIP.jpg"
    });

    console.log("✅ Admin Account Created Successfully!");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(`📧 Email: ${admin.email}`);
    console.log(`🔑 Password: ${adminPassword}`);
    console.log(`👤 Name: ${admin.name}`);
    console.log(`🔐 Role: ${admin.role}`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("⚠️  Change the password after first login!");
    console.log("⚠️  Do not share these credentials!");
    
    process.exit(0);
  } catch (err) {
    console.error("❌ Error creating admin:", err.message);
    process.exit(1);
  }
}

createAdminAccount();
