import 'dotenv/config.js';
import { sequelize } from './models/db.js';
import { User } from './models/userModel.js';
import { Event } from './models/Eventrequest.js';
import { Participation } from './models/Participation.js';
import { Comment } from './models/Comment.js';
import { Reaction } from './models/Reaction.js';

console.log('🔄 Starting database migration...');
console.log('📍 Database:', process.env.DB_NAME);
console.log('🏠 Host:', process.env.DB_HOST);

(async () => {
  try {
    // Test connection
    console.log('🔗 Testing connection to Aiven...');
    await sequelize.authenticate();
    console.log('✅ Connection successful!');

    // Force sync (creates tables from scratch)
    console.log('📝 Creating/syncing tables...');
    await sequelize.sync({ force: false, alter: true });
    console.log('✅ All tables synced successfully!');

    // Verify tables exist
    const tables = await sequelize.query(
      "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = DATABASE()"
    );
    console.log('\n📊 Tables created:');
    tables[0].forEach(t => console.log(`   ✓ ${t.TABLE_NAME}`));

    console.log('\n✅ Migration complete! Your database is ready.');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Migration failed:');
    console.error(error.message);
    process.exit(1);
  }
})();
