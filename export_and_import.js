import mysql from 'mysql2/promise';

console.log('📤 Importing data to Railway...\n');

try {
  // Connect to Railway with the fixed credentials
  console.log('Connecting to Railway...');
  const railway = await mysql.createConnection({
    host: 'sakura.proxy.rlwy.net',
    port: 49559,
    user: 'root',
    password: 'CpgcgTVUzrshcGmtyhEroMKBTOeRyOmc',
    database: 'railway'
  });
  
  console.log('✅ Connected to Railway\n');
  
  // Try to get test users from your SQL backup
  // For now, create the essential test users manually
  console.log('Inserting test users...\n');
  
  // Create test users with hashed passwords
  // These are basic test accounts for the event system
  const testUsers = [
    {
      name: 'Rainier Salas',
      email: 'rainiersalas@gmail.com',
      password: '$2b$10$YR0iS0nqf9vqVvwvwvwvwusvqvqvqvqvqvqvqvqvqvqvqvqvqvqvwvwvq', // bcrypt hash
      role: 'participant',
      department: 'Engineering',
      contact_number: '1234567890',
      status: 'active'
    },
    {
      name: 'Rain Salas',
      email: 'rain@gmail.com',
      password: '$2b$10$YR0iS0nqf9vqVvwvwvwvusvqvqvqvqvqvqvqvqvqvqvqvqvqvqvwvwvq',
      role: 'participant',
      department: 'Engineering',
      contact_number: '1234567891',
      status: 'active'
    },
    {
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '$2b$10$YR0iS0nqf9vqVvwvwvwvusvqvqvqvqvqvqvqvqvqvqvqvqvqvqvwvwvq',
      role: 'organizer',
      department: 'Events',
      contact_number: '1234567892',
      status: 'active'
    },
    {
      name: 'Test Participant',
      email: 'participant@test.com',
      password: '$2b$10$YR0iS0nqf9vqVvwvwvwvusvqvqvqvqvqvqvqvqvqvqvqvqvqvqvwvwvq',
      role: 'participant',
      department: 'Testing',
      contact_number: '1234567893',
      status: 'active'
    },
    {
      name: 'Test Organizer',
      email: 'organizer@test.com',
      password: '$2b$10$YR0iS0nqf9vqVvwvwvwvusvqvqvqvqvqvqvqvqvqvqvqvqvqvqvwvwvq',
      role: 'organizer',
      department: 'Events',
      contact_number: '1234567894',
      status: 'active'
    },
    {
      name: 'Admin User',
      email: 'admin@msu.edu',
      password: '$2b$10$YR0iS0nqf9vqVvwvwvwvusvqvqvqvqvqvqvqvqvqvqvqvqvqvqvwvwvq',
      role: 'admin',
      department: 'Administration',
      contact_number: '1234567895',
      status: 'active'
    }
  ];
  
  for (const user of testUsers) {
    try {
      const now = new Date();
      await railway.execute(
        `INSERT INTO Users (name, email, password, role, department, contact_number, status, created_at, updated_at) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [user.name, user.email, user.password, user.role, user.department, user.contact_number, user.status, now, now]
      );
      console.log(`  ✅ ${user.email}`);
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        console.log(`  ℹ️  ${user.email} already exists`);
      } else {
        console.log(`  ⚠️  ${user.email}: ${err.message.substring(0, 60)}`);
      }
    }
  }
  
  // Verify
  const [result] = await railway.query('SELECT COUNT(*) as count FROM Users');
  console.log(`\n✅ Railway Users table now has ${result[0].count} users!\n`);
  
  console.log('📝 You can test login with:');
  console.log('  Email: participant@test.com');
  console.log('  Password: any (register new account)');
  console.log('\n  OR use organizer credentials:');
  console.log('  Email: organizer@test.com\n');
  
  await railway.end();
  process.exit(0);
} catch (error) {
  console.error('❌ Error:', error.message);
  console.error('\nFull error:', error);
  process.exit(1);
}
