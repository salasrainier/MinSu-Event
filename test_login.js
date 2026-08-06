import { sequelize } from "./models/db.js";
import bcrypt from "bcrypt";
import { QueryTypes } from "sequelize";

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ DB Connected");

    // FIRST: Fix old role values with raw SQL BEFORE model sync
    console.log("\n🔧 Fixing old role values...");
    try {
      await sequelize.query(
        `UPDATE Users SET role = 'participant' WHERE role = 'user' OR role IS NULL OR role = ''`,
        { type: QueryTypes.UPDATE }
      );
      console.log("✅ Old roles converted to 'participant'");
    } catch (e) {
      console.log("ℹ️ (Already converted or table not ready)");
    }

    // NOW import User model after fix
    const { User } = await import("./models/userModel.js");

    // Check existing users
    const users = await User.findAll({ raw: true });
    console.log("\n📋 Existing Users:");
    users.forEach(u => console.log(`  - ${u.name} (${u.email}) role: ${u.role}`));

    // Create test organizer if not exists
    const testOrganizerEmail = "organizer@test.com";
    const existingOrg = await User.findOne({ where: { email: testOrganizerEmail } });

    if (!existingOrg) {
      const hashedPassword = await bcrypt.hash("password123", 10);
      await User.create({
        name: "Test Organizer",
        email: testOrganizerEmail,
        password: hashedPassword,
        role: "organizer",
        department: "CCS",
        status: "active"
      });
      console.log("\n✅ Created test organizer:", { email: testOrganizerEmail, password: "password123", role: "organizer" });
    } else {
      console.log("\nℹ️ Test organizer already exists");
    }

    // Create test participant if not exists
    const testParticipantEmail = "participant@test.com";
    const existingPart = await User.findOne({ where: { email: testParticipantEmail } });

    if (!existingPart) {
      const hashedPassword = await bcrypt.hash("password123", 10);
      await User.create({
        name: "Test Participant",
        email: testParticipantEmail,
        password: hashedPassword,
        role: "participant",
        status: "active"
      });
      console.log("✅ Created test participant:", { email: testParticipantEmail, password: "password123", role: "participant" });
    }

    // Show all users again
    const allUsers = await User.findAll({ raw: true });
    console.log("\n📋 All Users Now:");
    allUsers.forEach(u => console.log(`  - ${u.name} (${u.email}) role: ${u.role}`));

    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
})();
