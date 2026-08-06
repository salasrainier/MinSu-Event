import mysql from 'mysql2/promise';

console.log('Migrating data from Laragon to Railway...\n');

// Source: Local Laragon
const localConnection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'content_event_system'
});

// Destination: Railway
const railwayConnection = await mysql.createConnection({
  host: 'mysql.railway.internal',
  user: 'root',
  password: 'CpgcgTVUzrshcGmtyhEroMKBTOeRyOmc',
  database: 'railway'
});

try {
  // 1. Create tables on Railway
  console.log('1️⃣  Creating tables on Railway...');
  
  const tableDefinitions = `
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
  `;
  
  await railwayConnection.execute(tableDefinitions);
  console.log('✅ Tables created');
  
  // 2. Export data from Laragon
  console.log('2️⃣  Exporting users from Laragon...');
  const [localUsers] = await localConnection.execute('SELECT * FROM Users');
  console.log(`✅ Found ${localUsers.length} users`);
  
  // 3. Import to Railway
  console.log('3️⃣  Importing to Railway...');
  for (const user of localUsers) {
    await railwayConnection.execute(
      `INSERT INTO Users (user_id, name, email, password, role, department, contact_number, status, profile_picture, created_at, updated_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [user.user_id, user.name, user.email, user.password, user.role, user.department, user.contact_number, user.status, user.profile_picture, user.created_at, user.updated_at]
    );
  }
  console.log(`✅ ${localUsers.length} users imported!`);
  
  // 4. Verify
  console.log('4️⃣  Verifying...');
  const [railwayUsers] = await railwayConnection.execute('SELECT COUNT(*) as count FROM Users');
  console.log(`✅ Railway now has ${railwayUsers[0].count} users`);
  
  console.log('\n✅ Migration complete!');
  console.log('\nNext steps:');
  console.log('1. Update Render environment variables:');
  console.log('   DB_HOST=mysql.railway.internal');
  console.log('   DB_PORT=3306');
  console.log('   DB_USER=root');
  console.log('   DB_PASSWORD=CpgcgTVUzrshcGmtyhEroMKBTOeRyOmc');
  console.log('   DB_NAME=railway');
  console.log('2. Redeploy Render');
  console.log('3. Try logging in!');
  
} catch (error) {
  console.error('❌ Error:', error.message);
} finally {
  await localConnection.end();
  await railwayConnection.end();
}
