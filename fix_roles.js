import mysql from "mysql2/promise";

(async () => {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "content_event_system"
    });

    console.log("✅ MySQL Connected");

    // Fix old role values
    const [result] = await connection.execute(
      `UPDATE Users SET role = 'participant' WHERE role = 'user' OR role IS NULL OR role = ''`
    );

    console.log(`✅ Updated ${result.affectedRows} rows - converted 'user' role to 'participant'`);

    // Check all users
    const [users] = await connection.execute("SELECT user_id, name, email, role FROM Users");
    console.log("\n📋 All Users:");
    users.forEach(u => console.log(`  - ${u.name} (${u.email}) role: ${u.role}`));

    await connection.end();
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
})();
