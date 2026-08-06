import 'dotenv/config.js';
import bcrypt from 'bcrypt';
import mysql from 'mysql2/promise';

const testUsers = [
  { name: 'Rainier', email: 'rainiersalas@gmail.com', password: 'newpass123', role: 'participant' },
  { name: 'Rain', email: 'rain@gmail.com', password: 'newpass123', role: 'participant' },
  { name: 'John Doe', email: 'john@gmail.com', password: 'newpass123', role: 'organizer' },
  { name: 'Test Participant', email: 'participant@test.com', password: 'newpass123', role: 'participant' },
  { name: 'Test Organizer', email: 'organizer@test.com', password: 'newpass123', role: 'organizer' },
  { name: 'MinSU Administrator', email: 'admin@msu.edu', password: 'newpass123', role: 'admin' },
];

(async () => {
  let connection;
  try {
    console.log('🔗 Connecting to Aiven database...');
    connection = await mysql.createConnection({
      host: 'minsu-events-db-mmellow274-ce3d.e.aivencloud.com',
      port: 24522,
      user: 'avnadmin',
      password: 'AVNS_Lxmn8feGtPHLZoNpsCB',
      database: 'defaultdb',
      ssl: 'Amazon RDS',
      timezone: '+00:00',
      dateStrings: true
    });
    console.log('✅ Connection successful!\n');

    console.log('👥 Adding test users...\n');

    for (const userData of testUsers) {
      try {
        // Hash password
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        // Insert user
        await connection.execute(
          'INSERT INTO Users (name, email, password, role, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())',
          [userData.name, userData.email, hashedPassword, userData.role, 'active']
        );

        console.log(`✅ Created: ${userData.email} (${userData.role})`);
      } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          console.log(`⚠️  Already exists: ${userData.email}`);
        } else {
          console.error(`❌ Error creating ${userData.email}:`, err.message);
        }
      }
    }

    console.log('\n✅ Seeding complete!');
    console.log('\n📝 You can now log in with any of these accounts:');
    testUsers.forEach(u => {
      console.log(`  • ${u.email} / newpass123 (${u.role})`);
    });

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Seeding failed:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
})();
