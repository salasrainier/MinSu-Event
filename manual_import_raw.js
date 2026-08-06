import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

(async () => {
  try {
    const downloadsPath = path.join(process.env.USERPROFILE || process.env.HOME, 'Downloads');
    const sqlFile = path.join(downloadsPath, 'content_event_system (1).sql');
    
    if (!fs.existsSync(sqlFile)) {
      console.error('❌ File not found:', sqlFile);
      process.exit(1);
    }

    console.log('📂 SQL file found:', sqlFile);
    console.log('📝 Preparing import command...\n');

    // Try using mysql CLI directly with workarounds
    const cmd = `mysql --no-defaults -h minsu-events-db-mmellow274-ce3d.a.aivencloud.com -P 24522 -u avnadmin -pAVNS_znTqCSOSE1at_Z-BLE6 --ssl-mode=REQUIRED defaultdb < "${sqlFile}"`;
    
    console.log('⏳ Executing import (this may take 1-2 minutes)...\n');
    
    try {
      const output = execSync(cmd, { encoding: 'utf8', stdio: 'pipe' });
      console.log(output);
      console.log('\n✅ Import successful!');
    } catch (err) {
      console.log('STDOUT:', err.stdout);
      console.log('STDERR:', err.stderr);
      throw err;
    }

    console.log('\n🎉 Your data is now in Aiven!');
    console.log('📍 Visit: https://minsu-event.onrender.com');
    console.log('📝 Log in with your old credentials!');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
})();
