import { createPool } from 'mysql2/promise';
import bcrypt from 'bcrypt';

const pool = createPool({
  host: 'minsu-events-db-mmellow274-ce3d.a.aivencloud.com',
  port: 24522,
  user: 'avnadmin',
  password: 'AVNS_znTqCSOSE1at_Z-BLE6',
  database: 'defaultdb',
  ssl: 'Amazon RDS',
  waitForConnections: true,
  connectionLimit: 1
});

const users = [
  { name: 'Rainier', email: 'rainiersalas@gmail.com', password: 'newpass123', role: 'participant' },
  { name: 'Rain', email: 'rain@gmail.com', password: 'newpass123', role: 'participant' },
  { name: 'John Doe', email: 'john@gmail.com', password: 'newpass123', role: 'organizer' },
  { name: 'Test Participant', email: 'participant@test.com', password: 'newpass123', role: 'participant' },
  { name: 'Test Organizer', email: 'organizer@test.com', password: 'newpass123', role: 'organizer' },
  { name: 'MinSU Admin', email: 'admin@msu.edu', password: 'newpass123', role: 'admin' },
];

(async () => {
  try {
    const conn = await pool.getConnection();
    
    // Create Users table if it doesn't exist
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS Users (
        user_id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role ENUM('participant', 'organizer', 'admin') DEFAULT 'participant',
        status ENUM('active', 'pending', 'banned') DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    
    console.log('✅ Users table ready\n');
    console.log('👥 Creating test users...\n');
    
    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      try {
        await conn.execute(
          'INSERT INTO Users (name, email, password, role, status) VALUES (?, ?, ?, ?, ?)',
          [user.name, user.email, hashedPassword, user.role, 'active']
        );
        console.log(`✅ ${user.email} (${user.role})`);
      } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          console.log(`⚠️  ${user.email} already exists`);
        } else {
          console.error(`❌ ${user.email}:`, err.message);
        }
      }
    }
    
    conn.release();
    await pool.end();
    
    console.log('\n✅ Done!');
    console.log('\nLog in with:');
    users.forEach(u => console.log(`  • ${u.email} / newpass123`));
    
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
})();
