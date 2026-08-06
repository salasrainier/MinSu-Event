import 'dotenv/config.js';
import fs from 'fs';
import mysql from 'mysql2/promise';
import path from 'path';

(async () => {
  try {
    console.log('📂 Reading SQL file...');
    const downloadsPath = path.join(process.env.USERPROFILE || process.env.HOME, 'Downloads');
    const sqlFile = path.join(downloadsPath, 'content_event_system (1).sql');
    
    if (!fs.existsSync(sqlFile)) {
      console.error('❌ File not found:', sqlFile);
      process.exit(1);
    }

    let sqlContent = fs.readFileSync(sqlFile, 'utf8');
    console.log('✅ SQL file read\n');

    // Remove CREATE TABLE statements and keep only INSERT statements
    console.log('🔧 Filtering SQL (keeping only INSERT statements)...');
    const lines = sqlContent.split('\n');
    const insertLines = lines.filter(line => 
      line.trim().startsWith('INSERT INTO') || 
      line.trim().startsWith('VALUES') ||
      line.trim() === '' ||
      line.trim() === ';'
    );
    const filteredSQL = insertLines.join('\n');

    console.log('📝 Found ' + (filteredSQL.match(/INSERT INTO/g) || []).length + ' INSERT statements\n');

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

    console.log('📝 Creating tables via Sequelize first...');
    // First, let Sequelize create the tables
    const { sequelize } = await import('./models/db.js');
    await sequelize.sync({ alter: false, force: false });
    console.log('✅ Tables created\n');

    console.log('📝 Inserting data... (this may take a minute)');
    const results = await connection.query(filteredSQL);
    console.log('✅ Data inserted successfully!\n');

    await connection.end();

    console.log('✅ Import complete!');
    console.log('🎉 Your data is now in Aiven!');
    console.log('\n📍 Visit: https://minsu-event.onrender.com');
    console.log('📝 You can now log in with your old credentials!');

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Import failed:', error.message);
    console.error('Error Code:', error.code);
    process.exit(1);
  }
})();
