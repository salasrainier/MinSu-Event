import bcrypt from "bcrypt";
import { User } from "./models/userModel.js";
import { sequelize } from "./models/db.js";

async function resetAdminPassword() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected");

    const adminEmail = "admin@msu.edu";
    const adminPassword = "password123"; // Match the seed.js password

    // Check if admin exists
    let admin = await User.findOne({ where: { email: adminEmail } });

    if (admin) {
      // Update existing admin password
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      await admin.update({ password: hashedPassword });
      console.log("✅ Admin password updated!");
    } else {
      // Create new admin if doesn't exist
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      admin = await User.create({
        name: "MinSU Administrator",
        email: adminEmail,
        password: hashedPassword,
        role: "admin",
        department: "Administration",
        contact_number: "+63-912-3456789",
        status: "active",
      });
      console.log("✅ Admin account created!");
    }

    console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("✅ Admin Credentials Ready:");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(`📧 Email: ${adminEmail}`);
    console.log(`🔑 Password: ${adminPassword}`);
    console.log(`👤 Name: ${admin.name}`);
    console.log(`🔐 Role: ${admin.role}`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

    await sequelize.close();
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
}

resetAdminPassword();
