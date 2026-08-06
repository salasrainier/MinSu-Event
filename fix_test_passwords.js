import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';

console.log('🔐 Fixing test user passwords in Railway...\n');

async function fixPasswords() {
  try {
    // Generate hash for "password123"
    const passwordHash = await bcrypt.hash('password123', 10);
    console.log(`Generated password hash: ${passwordHash}\n`);

    // Connect to Railway
    console.log('🔗 Connecting to Railway...');
    const railway = await mysql.createConnection({
      host: 'sakura.proxy.rlwy.net',
      port: 49559,
      user: 'root',
      password: 'CpgcgTVUzrshcGmtyhEroMKBTOeRyOmc',
      database: 'railway',
      waitForConnections: true,
      connectionLimit: 1,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelayMs: 0
    });
    console.log('✅ Connected to Railway\n');

    // Update test users with correct password hash
    const testEmails = [
      'participant@test.com',
      'organizer@test.com',
      'admin@msu.edu'
    ];

    console.log('🔄 Updating test user passwords...\n');

    for (const email of testEmails) {
      try {
        await railway.execute(
          'UPDATE Users SET password = ? WHERE email = ?',
          [passwordHash, email]
        );
        console.log(`  ✅ ${email}`);
      } catch (err) {
        console.log(`  ⚠️  ${email}: ${err.message.substring(0, 60)}`);
      }
    }

    console.log('\n✨ Test user passwords updated!\n');
    console.log('📝 Test Credentials:');
    console.log('  Email: participant@test.com');
    console.log('  Password: password123\n');
    console.log('  Email: organizer@test.com');
    console.log('  Password: password123\n');
    console.log('  Email: admin@msu.edu');
    console.log('  Password: password123\n');

    await railway.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

fixPasswords();
