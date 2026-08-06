/**
 * verify_login.js — diagnose why login fails
 * Usage: node verify_login.js <email> <password>
 */
import bcrypt from 'bcrypt';
import { sequelize } from './models/db.js';
import { User } from './models/userModel.js';

const [email, password] = process.argv.slice(2);

if (!email || !password) {
  console.log('Usage: node verify_login.js <email> <password>');
  process.exit(1);
}

(async () => {
  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      console.log(`\n❌ No user found with email: ${email}`);
      process.exit(1);
    }

    console.log(`\n👤 Found user: ${user.name} (${user.email})`);
    console.log(`   Role: ${user.role} | Status: ${user.status}`);
    console.log(`   Password hash in DB: ${user.password}`);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(`\n🔐 bcrypt.compare("${password}", hash) => ${isMatch}`);

    if (isMatch) {
      console.log('✅ Password is CORRECT — login should work.\n');
    } else {
      console.log('❌ Password does NOT match the hash in DB.\n');
    }
  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    await sequelize.close();
    process.exit(0);
  }
})();
