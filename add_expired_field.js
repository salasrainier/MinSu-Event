import { sequelize } from "./models/db.js";

async function addExpiredField() {
  try {
    console.log("🔄 Connecting to database...");
    await sequelize.authenticate();
    console.log("✅ Database connected!");

    console.log("🔄 Adding is_expired field to EventRequests table...");

    // Add the is_expired column (MySQL/MariaDB syntax)
    try {
      await sequelize.query(`
        ALTER TABLE EventRequests 
        ADD COLUMN is_expired TINYINT(1) DEFAULT 0 NOT NULL;
      `);
      console.log("✅ Successfully added is_expired field!");
    } catch (err) {
      if (err.message.includes("Duplicate column")) {
        console.log("⚠️ Column already exists, skipping...");
      } else {
        throw err;
      }
    }

    console.log("🔄 Updating expired events based on end dates...");

    // Update existing events that are past their end date
    const [results] = await sequelize.query(`
      UPDATE EventRequests 
      SET is_expired = 1 
      WHERE event_end_date < NOW() AND is_expired = 0;
    `);

    console.log(`✅ Updated ${results.affectedRows || 0} expired events!`);
    console.log("✅ Migration completed successfully!");
    
    await sequelize.close();
    process.exit(0);
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  }
}

addExpiredField();
