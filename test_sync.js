import 'dotenv/config.js';
import { sequelize } from './models/db.js';
import { User } from './models/userModel.js';
import { EventRequest } from './models/Eventrequest.js';
import { Participation } from './models/Participation.js';
import { Comment } from './models/Comment.js';
import { Reaction } from './models/Reaction.js';

console.log('🔍 Testing Railway connection and sync...\n');

try {
  // Test connection
  console.log('1️⃣  Testing connection...');
  await sequelize.authenticate();
  console.log('✅ Connected to Railway!\n');

  // Sync all models
  console.log('2️⃣  Syncing models...');
  await sequelize.sync({ alter: false, force: false });
  console.log('✅ Models synced!\n');

  // Check tables
  console.log('3️⃣  Checking tables...');
  const result = await sequelize.query(`
    SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES 
    WHERE TABLE_SCHEMA = 'railway'
  `, { raw: true });
  
  console.log('📊 Tables in Railway database:');
  result[0].forEach(row => {
    console.log(`   ✓ ${row.TABLE_NAME}`);
  });
  
  console.log('\n✅ Everything looks good!\n');
  process.exit(0);
} catch (err) {
  console.error('❌ Error:', err.message);
  console.error('\nFull error:', err);
  process.exit(1);
}
