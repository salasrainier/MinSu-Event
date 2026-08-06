import mysql from 'mysql2/promise';

(async () => {
  let connection;
  try {
    console.log('🔗 Connecting to Aiven (raw connection)...');
    // Try minimal connection options
    connection = await mysql.createConnection({
      host: 'minsu-events-db-mmellow274-ce3d.e.aivencloud.com',
      port: 24522,
      user: 'avnadmin',
      password: 'AVNS_Lxmn8feGtPHLZoNpsCB',
      database: 'defaultdb',
      ssl: 'Amazon RDS'
    });
    
    console.log('✅ Connected!\n');
    
    // Try to execute a simple query
    console.log('📝 Testing query...');
    const [result] = await connection.execute('SELECT 1 as test');
    console.log('✅ Query successful:', result);
    
    // Now try to get time_zone
    console.log('\n🔧 Checking timezone settings...');
    const [tzResult] = await connection.execute('SELECT @@global.time_zone, @@session.time_zone');
    console.log('Global timezone:', tzResult[0]['@@global.time_zone']);
    console.log('Session timezone:', tzResult[0]['@@session.time_zone']);
    
    // Try to set timezone to UTC (might fix offset issue)
    console.log('\n🔧 Setting timezone to UTC...');
    await connection.execute("SET time_zone='+00:00'");
    console.log('✅ Timezone set\n');
    
    // Now try INSERT
    console.log('📝 Testing INSERT...');
    await connection.execute(
      'INSERT INTO Users (name, email, password, role, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())',
      ['Test User', 'test@example.com', 'hash', 'participant', 'active']
    );
    console.log('✅ INSERT successful!');
    
    await connection.end();
    console.log('\n✅ Fix verified! The offset issue is resolved.');
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    if (connection) await connection.end();
    process.exit(1);
  }
})();
