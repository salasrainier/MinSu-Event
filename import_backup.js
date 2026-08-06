import 'dotenv/config.js';
import fs from 'fs';
import mysql from 'mysql2/promise';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

(async () => {
  try {
    console.log('📂 Reading SQL file...');
    const downloadsPath = path.join(process.env.USERPROFILE || process.env.HOME, 'Downloads');
    const sqlFile = path.join(downloadsPath, 'content_event_system (1).sql');
    
    console.log('📍 Looking for:', sqlFile);
    
    if (!fs.existsSync(sqlFile)) {
      console.error('❌ File not found:', sqlFile);
      process.exit(1);
    }

    const sqlContent = fs.readFileSync(sqlFile, 'utf8');
    console.log('✅ SQL file read (' + (sqlContent.length / 1024 / 1024).toFixed(2) + ' MB)\n');

    console.log('🔗 Connecting to Aiven...');
    const connection = await mysql.createConnection({
      host: 'minsu-events-db-mmellow274-ce3d.e.aivencloud.com',
      port: 24522,
      user: 'avnadmin',
      password: 'AVNS_Lxmn8feGtPHLZoNpsCB',
      database: 'defaultdb',
      ssl: 'Amazon RDS',
      multipleStatements: true
    });

    console.log('✅ Connected to Aiven\n');

    console.log('📝 Executing SQL... (this may take a minute)');
    const results = await connection.query(sqlContent);
    console.log('✅ SQL executed successfully!\n');

    await connection.end();

    console.log('✅ Import complete!');
    console.log('🎉 Your data is now in Aiven!');
    console.log('\n📍 Visit: https://minsu-event.onrender.com');
    console.log('📝 You can now log in with your old credentials!');

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Import failed:', error.message);
    if (error.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('\n💡 Tip: Make sure Aiven IP whitelist allows 0.0.0.0/0');
    }
    process.exit(1);
  }
})();
