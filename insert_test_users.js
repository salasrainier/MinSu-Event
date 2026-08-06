import mysql from 'mysql2/promise';

const conn = await mysql.createConnection({
  host: 'sakura.proxy.rlwy.net',
  port: 49559,
  user: 'root',
  password: 'CpgcgTVUzrshcGmtyhEroMKBTOeRyOmc',
  database: 'railway'
});

console.log('Inserting test users...\n');

const users = [
  { name: 'Test Participant', email: 'participant@test.com', password: '$2b$10$JAjLDAVGXu70rZ1.yjMOFuXPKcJaSWDXpOBdDkS4bzNUHhm9ZUXLy', role: 'participant' },
  { name: 'rain', email: 'rain@gmail.com', password: '$2b$10$nh0lQ0rJsjhJMDE5.k.G/uGklY5F.rLUzROcJf.DbuFDOGcgtPQly', role: 'participant' },
  { name: 'john doe', email: 'john@gmail.com', password: '$2b$10$/hR/M42w1zfzItN2i00S8eJdXQmgdvWjYhghO/qbdaqUbk50QcV/m', role: 'organizer' },
  { name: 'Test Organizer', email: 'organizer@test.com', password: '$2b$10$WOhIHTOisCzZfCNt3GBPN.z5GS4DEnoySpAqZD9Fxc8EVjkv.AFGa', role: 'organizer' },
  { name: 'rainiersalas', email: 'rainiersalas@gmnail.com', password: '$2b$10$29YjeWrW7qqDFIGn3.0RuOU96NNOf3A9LnCcJdwYI55q72SE3J6u6', role: 'participant' },
  { name: 'MinSU Administrator', email: 'admin@msu.edu', password: '$2b$10$qmjtATTstpPPkvOFNcU4e.02arvlgQd0ZrHVlMeuOvZmUtQDAWWxq', role: 'admin' }
];

try {
  for (const user of users) {
    await conn.execute(
      'INSERT INTO Users (name, email, password, role, status) VALUES (?, ?, ?, ?, ?)',
      [user.name, user.email, user.password, user.role, 'active']
    );
    console.log(`✅ ${user.email}`);
  }
  
  const [result] = await conn.execute('SELECT COUNT(*) as count FROM Users');
  console.log(`\n✅ Total users: ${result[0].count}\n`);
  console.log('Test login:');
  console.log('  Email: participant@test.com');
  console.log('  Password: newpass123\n');
} catch (error) {
  console.error('❌ Error:', error.message);
} finally {
  await conn.end();
}
