import mysql from 'mysql2/promise';

console.log('Setting up Railway database...\n');

const railwayUrl = 'mysql://root:CpgcgTVUzrshcGmtyhEroMKBTOeRyOmc@sakura.proxy.rlwy.net:49559/railway';
const railwayConnection = await mysql.createConnection(railwayUrl);

try {
  // 1. Create Users table
  console.log('1️⃣  Creating Users table...');
  
  await railwayConnection.execute(`
    CREATE TABLE IF NOT EXISTS Users (
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
  console.log('✅ Users table created');
  
  // 2. Get users from local Laragon
  console.log('2️⃣  Importing users from Laragon...');
  
  const localConnection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'content_event_system'
  });
  
  const [localUsers] = await localConnection.execute('SELECT * FROM Users');
  console.log(`✅ Found ${localUsers.length} users locally`);
  
  // 3. Insert users into Railway
  console.log('3️⃣  Inserting users to Railway...');
  
  for (const user of localUsers) {
    await railwayConnection.execute(
      `INSERT INTO Users (user_id, name, email, password, role, department, contact_number, status, profile_picture, created_at, updated_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user.user_id, 
        user.name, 
        user.email, 
        user.password, 
        user.role, 
        user.department || null, 
        user.contact_number || null, 
        user.status || 'active', 
        user.profile_picture || null, 
        user.created_at, 
        user.updated_at
      ]
    );
  }
  console.log(`✅ ${localUsers.length} users imported!`);
  
  // 4. Verify
  console.log('4️⃣  Verifying...');
  const [result] = await railwayConnection.execute('SELECT COUNT(*) as count FROM Users');
  console.log(`✅ Railway now has ${result[0].count} users\n`);
  
  console.log('✅ Setup complete!');
  console.log('\nYou can now log in with:');
  console.log('  Email: participant@test.com');
  console.log('  Password: newpass123');
  
  await localConnection.end();
} catch (error) {
  console.error('❌ Error:', error.message);
} finally {
  await railwayConnection.end();
}
