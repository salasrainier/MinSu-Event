import mysql from 'mysql2/promise';

async function checkDatabase() {
  try {
    // Connect to MySQL without specifying database
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: ''
    });

    console.log('✅ MySQL connection successful');

    // Check if database exists
    const [databases] = await connection.query(
      "SHOW DATABASES LIKE 'content_event_system'"
    );

    if (databases.length === 0) {
      console.log('📦 Creating database...');
      await connection.query('CREATE DATABASE content_event_system');
      console.log('✅ Database created successfully');
    } else {
      console.log('✅ Database already exists');
    }

    await connection.end();
    console.log('\n🚀 You can now start your server with: node index.js');
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.log('\n⚠️  MySQL is not running!');
      console.log('Please start MySQL via XAMPP/WAMP Control Panel');
    }
  }
}

checkDatabase();
