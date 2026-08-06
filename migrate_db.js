import mysql from "mysql2/promise";

(async () => {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "content_event_system"
    });

    console.log("✅ MySQL Connected\n");

    // Step 1: Add 'participant' to the ENUM (but keep 'user' for now)
    console.log("Step 1️⃣ Adding 'participant' to ENUM...");
    try {
      await connection.execute(
        `ALTER TABLE Users MODIFY role ENUM('user','organizer','admin','participant') DEFAULT 'participant'`
      );
      console.log("✅ ENUM updated to include 'participant'\n");
    } catch (e) {
      console.log("ℹ️ (Already has 'participant')\n");
    }

    // Step 2: Migrate 'user' values to 'participant'
    console.log("Step 2️⃣ Converting 'user' roles to 'participant'...");
    const [result] = await connection.execute(
      `UPDATE Users SET role = 'participant' WHERE role = 'user'`
    );
    console.log(`✅ Updated ${result.affectedRows} rows\n`);

    // Step 3: Now remove 'user' from ENUM
    console.log("Step 3️⃣ Removing 'user' from ENUM...");
    await connection.execute(
      `ALTER TABLE Users MODIFY role ENUM('participant','organizer','admin') DEFAULT 'participant'`
    );
    console.log("✅ ENUM cleaned up\n");

    // Check current state
    const [roles] = await connection.execute("SELECT DISTINCT role FROM Users ORDER BY role");
    console.log("📋 Distinct Role Values Now:");
    roles.forEach(r => console.log(`  - '${r.role}'`));

    const [users] = await connection.execute("SELECT user_id, name, email, role FROM Users ORDER BY role");
    console.log("\n👥 All Users:");
    users.forEach(u => console.log(`  - ${u.name} (${u.email}) → ${u.role}`));

    await connection.end();
    console.log("\n✅ Database migration complete!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
})();
