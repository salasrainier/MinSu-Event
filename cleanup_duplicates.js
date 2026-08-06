import mysql from 'mysql2/promise';

console.log('🧹 Cleaning up duplicate tables in Railway...\n');

async function cleanupDuplicates() {
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

    // Drop the old lowercase tables (keep the Sequelize ones)
    const oldTables = ['comments', 'eventrequests', 'participations', 'reactions', 'users'];
    
    console.log('🗑️  Dropping old duplicate tables...\n');
    
    for (const table of oldTables) {
      try {
        await railway.query(`DROP TABLE IF EXISTS ${table}`);
        console.log(`  ✅ Dropped ${table}`);
      } catch (err) {
        console.log(`  ⚠️  ${table}: ${err.message.substring(0, 50)}`);
      }
    }

    console.log('\n');

    // Show remaining tables
    console.log('📊 Remaining tables in Railway:\n');
    
    const [tables] = await railway.query(`
      SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_SCHEMA = 'railway'
      ORDER BY TABLE_NAME
    `);

    for (const row of tables) {
      const tableName = row.TABLE_NAME;
      const [countResult] = await railway.query(`SELECT COUNT(*) as count FROM ${tableName}`);
      const count = countResult[0].count;
      console.log(`  ✅ ${tableName}: ${count} records`);
    }

    console.log('\n✨ Cleanup complete! Duplicate tables removed.\n');

    await railway.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

cleanupDuplicates();
