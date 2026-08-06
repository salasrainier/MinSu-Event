import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';

console.log('📥 Importing all data from SQL backup to Railway...\n');

async function importAllData() {
  try {
    // Path to the SQL backup file
    const sqlFilePath = 'C:\\Users\\salas\\Downloads\\content_event_system (1).sql';
    
    if (!fs.existsSync(sqlFilePath)) {
      console.error(`❌ SQL file not found at: ${sqlFilePath}`);
      process.exit(1);
    }

    console.log(`📄 Reading SQL file: ${sqlFilePath}`);
    const sqlContent = fs.readFileSync(sqlFilePath, 'utf8');
    console.log(`✅ SQL file read (${(sqlContent.length / 1024).toFixed(2)} KB)\n`);

    // Connect to Railway
    console.log('Connecting to Railway...');
    const railway = await mysql.createConnection({
      host: 'sakura.proxy.rlwy.net',
      port: 49559,
      user: 'root',
      password: 'CpgcgTVUzrshcGmtyhEroMKBTOeRyOmc',
      database: 'railway',
      multipleStatements: true
    });

    console.log('✅ Connected to Railway\n');

    // Execute the SQL file - this imports ALL data
    console.log('🔄 Importing all tables and data...');
    await railway.query(sqlContent);
    console.log('✅ SQL file executed successfully!\n');

    // Count records in each table
    console.log('📊 Imported Data Summary:');
    
    const tables = ['Users', 'EventRequests', 'Participations', 'Comments', 'Reactions'];
    
    for (const table of tables) {
      try {
        const [result] = await railway.query(`SELECT COUNT(*) as count FROM ${table}`);
        const count = result[0].count;
        console.log(`  ${table}: ${count} records`);
      } catch (err) {
        console.log(`  ${table}: (error fetching count)`);
      }
    }

    console.log('\n✅ Import complete! All data is now in Railway database.\n');

    await railway.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during import:', error.message);
    if (error.sql) {
      console.error('SQL:', error.sql.substring(0, 200));
    }
    process.exit(1);
  }
}

importAllData();
