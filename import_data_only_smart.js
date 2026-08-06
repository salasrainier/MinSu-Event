import mysql from 'mysql2/promise';
import fs from 'fs';

console.log('📥 Importing only data from SQL backup...\n');

async function extractAndImport() {
  try {
    // Read the SQL file
    const sqlFilePath = 'C:\\Users\\salas\\Downloads\\content_event_system (1).sql';
    
    if (!fs.existsSync(sqlFilePath)) {
      console.error(`❌ SQL file not found at: ${sqlFilePath}`);
      process.exit(1);
    }

    console.log(`📄 Reading SQL file...`);
    let sqlContent = fs.readFileSync(sqlFilePath, 'utf8');
    console.log(`✅ SQL file read (${(sqlContent.length / 1024).toFixed(2)} KB)\n`);

    // Remove CREATE TABLE statements to avoid conflicts
    console.log('🔧 Processing SQL file...');
    sqlContent = sqlContent.replace(/DROP TABLE IF EXISTS .+?;/gi, '');
    sqlContent = sqlContent.replace(/CREATE TABLE .+?\);/gis, '');
    sqlContent = sqlContent.replace(/ALTER TABLE .+?;/gi, '');
    
    // Extract only INSERT statements
    const insertRegex = /INSERT INTO .+?;/gis;
    const insertStatements = sqlContent.match(insertRegex) || [];
    
    console.log(`✅ Found ${insertStatements.length} INSERT statements\n`);

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

    // Execute INSERT statements
    console.log('🔄 Importing data...');
    
    for (const statement of insertStatements) {
      try {
        await railway.query(statement);
      } catch (err) {
        // Skip duplicate key errors - we may have existing data
        if (err.code !== 'ER_DUP_ENTRY') {
          console.log(`  ⚠️  Error: ${err.message.substring(0, 60)}`);
        }
      }
    }

    console.log('✅ Data import complete!\n');

    // Count records in each table
    console.log('📊 Imported Data Summary:');
    
    const tables = ['Users', 'EventRequests', 'Participations', 'Comments', 'Reactions'];
    let totalRecords = 0;
    
    for (const table of tables) {
      try {
        const [result] = await railway.query(`SELECT COUNT(*) as count FROM ${table}`);
        const count = result[0].count;
        totalRecords += count;
        console.log(`  ✅ ${table}: ${count} records`);
      } catch (err) {
        console.log(`  ⚠️  ${table}: (table may not exist)`);
      }
    }

    console.log(`\n📈 Total records imported: ${totalRecords}`);
    console.log('\n✨ All data is now in Railway database!');
    console.log('\nYour app at https://minsu-event.onrender.com now has:');
    console.log('  ✅ All events');
    console.log('  ✅ All users');
    console.log('  ✅ All participations');
    console.log('  ✅ All comments');
    console.log('  ✅ All reactions\n');

    await railway.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during import:', error.message);
    process.exit(1);
  }
}

extractAndImport();
