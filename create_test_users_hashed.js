import bcrypt from 'bcrypt';
import mysql from 'mysql2/promise';

console.log('🔐 Creating test users with hashed passwords...\n');

// Generate bcrypt hashes for password "password123"
const SALT_ROUNDS = 10;
const testPassword = 'password123';

async function createHashedUsers() {
  try {
    const passwordHash = await bcrypt.hash(testPassword, SALT_ROUNDS);
    console.log(`Generated hash for password "${testPassword}":\n${passwordHash}\n`);

    // Connect to Railway
    console.log('Connecting to Railway...');
    const railway = await mysql.createConnection({
      host: 'sakura.proxy.rlwy.net',
      port: 49559,
      user: 'root',
      password: 'CpgcgTVUzrshcGmtyhEroMKBTOeRyOmc',
      database: 'railway'
    });

    console.log('✅ Connected to Railway\n');

    // Clear existing users
    await railway.execute('DELETE FROM Users');
    console.log('Cleared existing users\n');

    // Create test users with proper hashes
    const testUsers = [
      {
        name: 'Rainier Salas',
        email: 'rainiersalas@gmail.com',
        role: 'participant',
        department: 'Engineering',
        contact_number: '1234567890'
      },
      {
        name: 'Rain Salas',
        email: 'rain@gmail.com',
        role: 'participant',
        department: 'Engineering',
        contact_number: '1234567891'
      },
      {
        name: 'John Doe',
        email: 'john@gmail.com',
        role: 'organizer',
        department: 'Events',
        contact_number: '1234567892'
      },
      {
        name: 'Test Participant',
        email: 'participant@test.com',
        role: 'participant',
        department: 'Testing',
        contact_number: '1234567893'
      },
      {
        name: 'Test Organizer',
        email: 'organizer@test.com',
        role: 'organizer',
        department: 'Events',
        contact_number: '1234567894'
      },
      {
        name: 'Admin User',
        email: 'admin@msu.edu',
        role: 'admin',
        department: 'Administration',
        contact_number: '1234567895'
      }
    ];

    console.log('Inserting users with hashed passwords...\n');

    for (const user of testUsers) {
      try {
        const now = new Date();
        await railway.execute(
          `INSERT INTO Users (name, email, password, role, department, contact_number, status, created_at, updated_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [user.name, user.email, passwordHash, user.role, user.department, user.contact_number, 'active', now, now]
        );
        console.log(`  ✅ ${user.email}`);
      } catch (err) {
        console.log(`  ⚠️  ${user.email}: ${err.message.substring(0, 60)}`);
      }
    }

    // Verify
    const [result] = await railway.query('SELECT COUNT(*) as count FROM Users');
    console.log(`\n✅ Railway Users table now has ${result[0].count} users!\n`);

    console.log('📝 Test Credentials:');
    console.log(`  Email: participant@test.com`);
    console.log(`  Password: ${testPassword}\n`);
    console.log('  Email: organizer@test.com');
    console.log(`  Password: ${testPassword}\n`);
    console.log('  Email: admin@msu.edu');
    console.log(`  Password: ${testPassword}\n`);

    await railway.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

createHashedUsers();
