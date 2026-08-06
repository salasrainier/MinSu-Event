/*
 * Seed test data for the content event system
 * Run with: node seed.js
 */

import bcrypt from "bcrypt";
import { User } from "./models/userModel.js";
import { sequelize } from "./models/db.js";

const seedDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connected to database");

    // Clear existing users (optional)
    // await User.destroy({ where: {} });
    // console.log("🗑️  Cleared existing users");

    // Create test users
    const hashedPassword = await bcrypt.hash("password123", 10);

    const testUsers = [
      {
        name: "Test Organizer",
        email: "organizer@test.com",
        password: hashedPassword,
        role: "organizer",
        department: "Events Department",
        contact_number: "09123456789",
      },
      {
        name: "Test Participant",
        email: "participant@test.com",
        password: hashedPassword,
        role: "participant",
        department: null,
        contact_number: "09987654321",
      },
      {
        name: "Admin User",
        email: "admin@msu.edu",
        password: hashedPassword,
        role: "admin",
        department: "Administration",
        contact_number: "09111222333",
      },
    ];

    for (const userData of testUsers) {
      const [user, created] = await User.findOrCreate({
        where: { email: userData.email },
        defaults: userData,
      });

      if (created) {
        console.log(`✅ Created user: ${user.name} (${user.role})`);
      } else {
        console.log(`ℹ️  User already exists: ${user.name} (${user.role})`);
      }
    }

    console.log("\n✅ Seeding completed!");
    console.log("\n📝 Test Credentials:");
    console.log("  Organizer: organizer@test.com / password123");
    console.log("  Participant: participant@test.com / password123");
    console.log("  Admin: admin@msu.edu / password123");
  } catch (err) {
    console.error("❌ Seeding failed:", err);
  } finally {
    await sequelize.close();
    process.exit(0);
  }
};

seedDatabase();
