import 'dotenv/config.js';
import { sequelize } from './models/db.js';

console.log('\n🔌 Testing Aiven connection with timezone fix...\n');

try {
  await sequelize.authenticate();
  console.log('✅ Connection successful!');
  
  const [result] = await sequelize.query('SELECT COUNT(*) as count FROM Users');
  console.log(`✅ Users in database: ${result[0].count}`);
  
  await sequelize.close();
} catch (error) {
  console.error('❌ Error:', error.message);
  console.error('\nFull error:', error);
}
