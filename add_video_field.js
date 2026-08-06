import { sequelize } from "./models/db.js";

async function addVideoField() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected\n');

    // Add event_video column to EventRequests table
    console.log('📝 Adding event_video column to EventRequests table...');
    
    await sequelize.query(`
      ALTER TABLE EventRequests 
      ADD COLUMN event_video VARCHAR(255) NULL 
      AFTER event_images
    `);

    console.log('✅ Successfully added event_video column!');
    
    // Verify the column was added
    const [columns] = await sequelize.query("DESCRIBE EventRequests");
    console.log('\n📊 EventRequests table structure:');
    columns.forEach(col => {
      console.log(`  - ${col.Field}: ${col.Type} ${col.Null === 'NO' ? '(required)' : '(optional)'}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

addVideoField();
