import { sequelize } from './models/db.js';
import { User } from './models/userModel.js';

(async () => {
  try {
    console.log('\n📋 All User Accounts:\n');
    
    const users = await User.findAll({
      attributes: ['user_id', 'name', 'email', 'role', 'department'],
      raw: true
    });

    console.log('╔════════╦══════════════════════╦════════════════════════╦═══════════╦════════════════╗');
    console.log('║ ID     ║ Name                 ║ Email                  ║ Role       ║ Department     ║');
    console.log('╠════════╬══════════════════════╬════════════════════════╬═══════════╬════════════════╣');
    
    users.forEach(user => {
      const id = String(user.user_id).padEnd(6);
      const name = (user.name || '-').substring(0, 20).padEnd(20);
      const email = (user.email || '-').substring(0, 22).padEnd(22);
      const role = (user.role || '-').padEnd(9);
      const dept = (user.department || '-').substring(0, 14).padEnd(14);
      
      console.log(`║ ${id} ║ ${name} ║ ${email} ║ ${role} ║ ${dept} ║`);
    });
    
    console.log('╚════════╩══════════════════════╩════════════════════════╩═══════════╩════════════════╝');
    console.log(`\n✅ Total Users: ${users.length}\n`);

    // Show default test accounts
    console.log('📌 Default Test Accounts:');
    console.log('   Admin: admin@msu.edu (Password: admin123)');
    console.log('   Organizer: organizer@test.com (Password: testpassword123)');
    console.log('   Participant: participant@test.com (Password: testpassword123)\n');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await sequelize.close();
    process.exit(0);
  }
})();
