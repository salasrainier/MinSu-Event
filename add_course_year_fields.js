import mysql from 'mysql2/promise';

console.log('🔧 Adding course and year columns to Users table...\n');

async function addColumns() {
  try {
    // Connect to Railway
    console.log('🔗 Connecting to Railway...');
    const railway = await mysql.createConnection({
      host: 'sakura.proxy.rlwy.net',
      port: 49559,
      user: 'root',
      password: 'CpgcgTVUzrshcGmtyhEroMKBTOeRyOmc',
      database: 'railway'
    });
    console.log('✅ Connected to Railway\n');

    // Add course column if it doesn't exist
    console.log('📝 Adding course column...');
    try {
      await railway.execute(`
        ALTER TABLE Users 
        ADD COLUMN course VARCHAR(255) NULL
      `);
      console.log('  ✅ course column added\n');
    } catch (err) {
      if (err.code === 'ER_DUP_FIELDNAME') {
        console.log('  ℹ️  course column already exists\n');
      } else {
        throw err;
      }
    }

    // Add year column if it doesn't exist
    console.log('📝 Adding year column...');
    try {
      await railway.execute(`
        ALTER TABLE Users 
        ADD COLUMN year VARCHAR(255) NULL
      `);
      console.log('  ✅ year column added\n');
    } catch (err) {
      if (err.code === 'ER_DUP_FIELDNAME') {
        console.log('  ℹ️  year column already exists\n');
      } else {
        throw err;
      }
    }

    // Verify columns were added
    console.log('🔍 Verifying columns...');
    const [columns] = await railway.execute(`
      SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_NAME = 'Users' AND TABLE_SCHEMA = 'railway'
      ORDER BY ORDINAL_POSITION
    `);

    console.log('\n📊 Users table columns:');
    columns.forEach(col => {
      console.log(`  ✓ ${col.COLUMN_NAME}`);
    });

    console.log('\n✨ Migration complete!');
    console.log('Users can now log in and update their profile with course and year.\n');

    await railway.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

addColumns();
