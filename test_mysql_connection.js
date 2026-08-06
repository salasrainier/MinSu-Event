import mysql from 'mysql2/promise';

console.log('Testing MySQL connection...\n');

try {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'content_event_system'
  });

  console.log('✅ Connected to MySQL successfully!');
  
  const [result] = await connection.execute('SELECT COUNT(*) as count FROM users');
  console.log(`✅ Users in database: ${result[0].count}`);
  
  await connection.end();
  console.log('✅ Connection closed');
  
} catch (error) {
  console.error('❌ Connection failed:', error.message);
  console.error('\nTroubleshooting:');
  console.error('1. Is Laragon running?');
  console.error('2. Is MySQL service running?');
  console.error('3. Does the content_event_system database exist?');
}
