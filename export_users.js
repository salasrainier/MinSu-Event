import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'content_event_system'
});

try {
  const [rows] = await connection.execute('SELECT email, password FROM users ORDER BY email');
  
  console.log('\n========== ALL USERS ==========\n');
  rows.forEach(row => {
    console.log(`Email: ${row.email}`);
    console.log(`Password: ${row.password}`);
    console.log('---');
  });
  
  if (rows.length === 0) {
    console.log('No users found in database');
  } else {
    console.log(`\nTotal users: ${rows.length}`);
  }
} catch (error) {
  console.error('Error:', error.message);
} finally {
  await connection.end();
}
