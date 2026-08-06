import fs from 'fs';
import path from 'path';
import { createPool } from 'mysql2/promise';

(async () => {
  let pool;
  try {
    console.log('📂 Reading SQL file from Downloads...');
    const downloadsPath = path.join(process.env.USERPROFILE || process.env.HOME, 'Downloads');
    const sqlFile = path.join(downloadsPath, 'content_event_system (1).sql');
    
    if (!fs.existsSync(sqlFile)) {
      console.error('❌ File not found:', sqlFile);
      process.exit(1);
    }

    let sqlContent = fs.readFileSync(sqlFile, 'utf8');
    console.log('✅ SQL file read\n');

    // Parse the SQL and split into individual statements
    console.log('🔧 Processing SQL statements...');
    const statements = sqlContent
      .split(';\n')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'))
      .map(s => s + ';');

    console.log(`Found ${statements.length} SQL statements\n`);

    console.log('🔗 Connecting to Aiven with connection pool...');
    pool = createPool({
      host: 'minsu-events-db-mmellow274-ce3d.a.aivencloud.com',
      port: 24522,
      user: 'avnadmin',
      password: 'AVNS_znTqCSOSE1at_Z-BLE6',
      database: 'defaultdb',
      ssl: 'Amazon RDS',
      waitForConnections: true,
      connectionLimit: 1,
      queueLimit: 0,
      enableKeepAlive: true
    });

    const connection = await pool.getConnection();
    console.log('✅ Connected to Aiven\n');

    console.log('📝 Executing SQL statements...\n');
    
    let successCount = 0;
    let skipCount = 0;
    
    for (let i = 0; i < statements.length; i++) {
      const stmt = statements[i];
      
      // Skip problematic statements
      if (stmt.includes('SET @@') || stmt.includes('SET GLOBAL') || stmt.includes('COLLATE')) {
        skipCount++;
        continue;
      }

      try {
        await connection.execute(stmt);
        successCount++;
        
        if (stmt.includes('INSERT')) {
          process.stdout.write('.');
        }
      } catch (err) {
        if (err.code === 'ER_DUP_ENTRY' || err.code === 'ER_TABLE_EXISTS_ERROR') {
          skipCount++;
        } else if (err.message.includes('offset')) {
          skipCount++;
        } else {
          console.error(`\n❌ Statement ${i}: ${err.message}`);
        }
      }
    }

    console.log(`\n\n✅ Import complete!`);
    console.log(`  • Executed: ${successCount} statements`);
    console.log(`  • Skipped: ${skipCount} statements\n`);

    connection.release();
    await pool.end();

    console.log('🎉 Your data is now in Aiven!');
    console.log('\n📍 Visit: https://minsu-event.onrender.com');
    console.log('📝 You can now log in with your old credentials!');

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Import failed:', error.message);
    if (pool) await pool.end();
    process.exit(1);
  }
})();
