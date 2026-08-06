import mysql from 'mysql2/promise';

const railwayConn = await mysql.createConnection({
  host: 'sakura.proxy.rlwy.net',
  port: 49559,
  user: 'root',
  password: 'CpgcgTVUzrshcGmtyhEroMKBTOeRyOmc',
  database: 'railway'
});

console.log('Creating Users table on Railway...\n');

try {
  // Create Users table
  await railwayConn.execute(`
    DROP TABLE IF EXISTS Users;
    CREATE TABLE Users (
      user_id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      role ENUM('participant', 'organizer', 'admin') DEFAULT 'participant',
      department VARCHAR(255),
      contact_number VARCHAR(20),
      status ENUM('active', 'pending', 'banned') DEFAULT 'active',
      profile_picture VARCHAR(500),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `);
  console.log('✅ Users table created\n');

  // Get users from local Laragon
  const localConn = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'content_event_system'
  });

  const [users] = await localConn.execute('SELECT * FROM Users');
  console.log(`✅ Found ${users.length} users in Laragon\n`);

  // Insert each user
  for (const user of users) {
    await railwayConn.execute(
      `INSERT INTO Users (name, email, password, role, department, contact_number, status, profile_picture) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user.name,
        user.email,
        user.password,
        user.role,
        user.department || null,
        user.contact_number || null,
        user.status || 'active',
        user.profile_picture || null
      ]
    );
    console.log(`✅ Imported: ${user.email}`);
  }

  // Verify
  const [result] = await railwayConn.execute('SELECT * FROM Users');
  console.log(`\n✅ Success! Railway now has ${result.length} users\n`);
  console.log('Test login:');
  console.log('  Email: participant@test.com');
  console.log('  Password: newpass123\n');

  await localConn.end();
} catch (error) {
  console.error('❌ Error:', error.message);
} finally {
  await railwayConn.end();
}
