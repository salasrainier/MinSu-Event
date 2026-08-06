import mysql from 'mysql2/promise';

console.log('Checking Railway database...\n');

const conn = await mysql.createConnection({
  host: 'sakura.proxy.rlwy.net',
  port: 49559,
  user: 'root',
  password: 'CpgcgTVUzrshcGmtyhEroMKBTOeRyOmc',
  database: 'railway'
});

try {
  const [users] = await conn.execute('SELECT email, role FROM Users ORDER BY email');
  
  if (users.length === 0) {
    console.log('❌ NO USERS IN RAILWAY\n');
  } else {
    console.log(`✅ FOUND ${users.length} USERS IN RAILWAY:\n`);
    users.forEach(user => {
      console.log(`   ${user.email} (${user.role})`);
    });
    console.log('\n✅ You can log in with: participant@test.com / newpass123\n');
  }
} catch (error) {
  console.error('❌ Error:', error.message);
} finally {
  await conn.end();
}
