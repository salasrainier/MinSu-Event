import bcrypt from "bcrypt";
import { User } from "./models/userModel.js";

async function resetPasswords() {
  try {
    console.log("🔄 Resetting test account passwords...\n");

    // Password reset for admin
    const adminPassword = await bcrypt.hash("admin123", 10);
    await User.update(
      { password: adminPassword },
      { where: { email: "admin@msu.edu" } }
    );
    console.log("✅ Admin password reset to: admin123");

    // Password reset for organizer
    const organizerPassword = await bcrypt.hash("testpassword123", 10);
    await User.update(
      { password: organizerPassword },
      { where: { email: "organizer@test.com" } }
    );
    console.log("✅ Organizer password reset to: testpassword123");

    // Password reset for participant
    const participantPassword = await bcrypt.hash("testpassword123", 10);
    await User.update(
      { password: participantPassword },
      { where: { email: "participant@test.com" } }
    );
    console.log("✅ Participant password reset to: testpassword123");

    console.log("\n✨ All test account passwords have been reset!");
    console.log("\n📌 Login Credentials:");
    console.log("   Admin: admin@msu.edu / admin123");
    console.log("   Organizer: organizer@test.com / testpassword123");
    console.log("   Participant: participant@test.com / testpassword123");

    process.exit(0);
  } catch (err) {
    console.error("❌ Error resetting passwords:", err);
    process.exit(1);
  }
}

resetPasswords();
