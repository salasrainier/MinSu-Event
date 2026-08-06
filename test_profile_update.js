import { User } from "./models/userModel.js";
import { sequelize } from "./models/db.js";

async function testProfileUpdate() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');

    // Find a user
    const user = await User.findOne();
    if (!user) {
      console.log('❌ No users found in database');
      return;
    }

    console.log('\n📋 Current user data:');
    console.log('   ID:', user.user_id);
    console.log('   Name:', user.name);
    console.log('   Email:', user.email);
    console.log('   Department:', user.department);

    // Try to update
    const testDepartment = 'CCS';
    console.log(`\n🔄 Updating department to: ${testDepartment}`);
    
    const [updateCount] = await User.update(
      { department: testDepartment },
      { where: { user_id: user.user_id } }
    );

    console.log(`   Rows updated: ${updateCount}`);

    // Fetch again to verify
    const updatedUser = await User.findOne({ where: { user_id: user.user_id } });
    console.log('\n✅ Updated user data:');
    console.log('   Department:', updatedUser.department);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

testProfileUpdate();
