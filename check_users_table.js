import { sequelize } from "./models/db.js";
import { User } from "./models/userModel.js";

async function checkUsersTable() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected\n');

    // Check if table exists
    const [tables] = await sequelize.query("SHOW TABLES");
    console.log('📋 All tables in database:');
    tables.forEach(table => console.log('  -', Object.values(table)[0]));

    // Check Users table structure
    console.log('\n📊 Users table structure:');
    const [columns] = await sequelize.query("DESCRIBE Users");
    columns.forEach(col => {
      console.log(`  - ${col.Field}: ${col.Type} ${col.Null === 'NO' ? '(required)' : '(optional)'}`);
    });

    // Check if there are any users
    const userCount = await User.count();
    console.log(`\n👥 Total users: ${userCount}`);

    if (userCount > 0) {
      const users = await User.findAll({ limit: 3 });
      console.log('\n📝 Sample users:');
      users.forEach(user => {
        console.log(`  - ID: ${user.user_id}, Name: ${user.name}, Email: ${user.email}, Dept: ${user.department}`);
      });
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

checkUsersTable();
