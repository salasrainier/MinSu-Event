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

    // Check the schema
    const [schema] = await connection.execute(
      `SELECT COLUMN_NAME, COLUMN_TYPE, COLUMN_KEY, EXTRA FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Users' AND TABLE_SCHEMA = 'content_event_system'`
    );

    console.log("\n📊 Users Table Schema:");
    schema.forEach(col => {
      console.log(`  ${col.COLUMN_NAME}: ${col.COLUMN_TYPE} ${col.COLUMN_KEY ? '(Key: ' + col.COLUMN_KEY + ')' : ''}`);
    });

    // Check the current role column specifically
    const roleCol = schema.find(c => c.COLUMN_NAME === 'role');
    console.log("\n🔍 Role Column Details:");
    console.log(`  Type: ${roleCol.COLUMN_TYPE}`);

    // Check all current values in role column
    const [roles] = await connection.execute("SELECT DISTINCT role FROM Users");
    console.log("\n📋 Distinct Role Values in Database:");
    roles.forEach(r => console.log(`  - '${r.role}'`));

    await connection.end();
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
})();
