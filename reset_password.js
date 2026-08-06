/**
 * reset_password.js
 * Usage: node reset_password.js <email> <newPassword>
 * Example: node reset_password.js admin@msu.edu newpass123
 */

import bcrypt from 'bcrypt';
import { sequelize } from './models/db.js';
import { User } from './models/userModel.js';

const SALT_ROUNDS = 10;

(async () => {
  const [email, newPassword] = process.argv.slice(2);

  if (!email || !newPassword) {
    // No args — just list all users so you can pick one
    console.log('\n📋 All Users in Database:\n');
    const users = await User.findAll({
      attributes: ['user_id', 'name', 'email', 'role', 'status'],
      raw: true,
    });

    console.log('╔════════╦══════════════════════╦════════════════════════════╦═══════════╦══════════╗');
    console.log('║ ID     ║ Name                 ║ Email                      ║ Role      ║ Status   ║');
    console.log('╠════════╬══════════════════════╬════════════════════════════╬═══════════╬══════════╣');
    users.forEach(u => {
      const id   = String(u.user_id).padEnd(6);
      const name = (u.name  || '-').substring(0, 20).padEnd(20);
      const mail = (u.email || '-').substring(0, 26).padEnd(26);
      const role = (u.role  || '-').padEnd(9);
      const stat = (u.status|| '-').padEnd(8);
      console.log(`║ ${id} ║ ${name} ║ ${mail} ║ ${role} ║ ${stat} ║`);
    });
    console.log('╚════════╩══════════════════════╩════════════════════════════╩═══════════╩══════════╝');
    console.log(`\n✅ Total: ${users.length} user(s)`);
    console.log('\n💡 To reset a password run:');
    console.log('   node reset_password.js <email> <newPassword>\n');

    await sequelize.close();
    process.exit(0);
  }

  // --- Reset mode ---
  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      console.error(`\n❌ No user found with email: ${email}\n`);
      await sequelize.close();
      process.exit(1);
    }

    if (newPassword.length < 6) {
      console.error('\n❌ Password must be at least 6 characters.\n');
      await sequelize.close();
      process.exit(1);
    }

    const hashed = await bcrypt.hash(newPassword, SALT_ROUNDS);
    await user.update({ password: hashed });

    console.log(`\n✅ Password reset successfully for: ${user.name} (${user.email})`);
    console.log(`   Role: ${user.role} | Status: ${user.status}\n`);
  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    await sequelize.close();
    process.exit(0);
  }
})();
