import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';

console.log('Testing login with local MySQL...\n');

try {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'content_event_system'
  });

  console.log('✅ Connected to MySQL');
  
  // Test: Find user and compare password
  const email = 'participant@test.com';
  const password = 'newpass123';
  
  const [rows] = await connection.execute(
    'SELECT user_id, email, password FROM Users WHERE email = ?',
    [email]
  );
  
  if (rows.length === 0) {
    console.error(`❌ User ${email} not found`);
  } else {
    const user = rows[0];
    console.log(`✅ Found user: ${user.email}`);
    
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      console.log(`✅ Password matches!`);
      console.log(`\nUser can log in successfully:`);
      console.log(`  Email: ${email}`);
      console.log(`  Password: ${password}`);
    } else {
      console.error(`❌ Password does NOT match`);
    }
  }
  
  await connection.end();
  
} catch (error) {
  console.error('❌ Error:', error.message);
}
