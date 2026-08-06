/**
 * diagnose_dashboard.js
 * Simulates what the organizer dashboard controller does and prints the real error.
 */
import { sequelize } from './models/db.js';
import { EventRequest } from './models/Eventrequest.js';
import { User } from './models/userModel.js';
import { Participation } from './models/Participation.js';

// Use the actual organizer user_id from DB (id=4 is Test Organizer)
const TEST_USER_ID = 4;

(async () => {
  try {
    console.log('\n🔍 Diagnosing organizer dashboard...\n');

    // Step 1: Basic EventRequest query (what dashboard() does)
    console.log('Step 1: EventRequest.findAll for organizer...');
    const events = await EventRequest.findAll({
      where: { user_id: TEST_USER_ID },
      order: [['event_date', 'ASC']],
      raw: true,
    });
    console.log(`✅ Found ${events.length} events\n`);

    // Step 2: Check Participation model association
    console.log('Step 2: Checking Participation model...');
    const { Participation } = await import('./models/Participation.js');
    console.log('✅ Participation model loaded\n');

    // Step 3: Check all model associations
    console.log('Step 3: Checking EventRequest associations...');
    const assocs = Object.keys(EventRequest.associations || {});
    console.log('   Associations:', assocs.length ? assocs : 'none');

    // Step 4: Check if organizer_dashboard view file exists
    console.log('\nStep 4: Checking view file...');
    import('fs').then(fs => {
      const viewPath = './views/organizer_dashboard.xian';
      const exists = fs.default.existsSync(viewPath);
      console.log(`   organizer_dashboard.xian exists: ${exists}`);
    });

    // Step 5: Check DB columns on EventRequests table
    console.log('\nStep 5: Checking EventRequests table columns...');
    const [cols] = await sequelize.query('DESCRIBE EventRequests');
    const colNames = cols.map(c => c.Field);
    console.log('   Columns:', colNames.join(', '));

    // Check for missing columns the model expects
    const expected = ['id','organizer_name','event_title','department','event_date','event_end_date','venue','purpose','proposal_file','event_images','event_video','status','remarks','user_id','is_expired','created_at','updated_at'];
    const missing = expected.filter(c => !colNames.includes(c));
    if (missing.length) {
      console.log('\n❌ MISSING COLUMNS:', missing.join(', '));
    } else {
      console.log('✅ All expected columns present');
    }

  } catch (err) {
    console.error('\n❌ REAL ERROR:', err.message);
    console.error('   Stack:', err.stack?.split('\n').slice(0,5).join('\n'));
  } finally {
    await sequelize.close();
    process.exit(0);
  }
})();
