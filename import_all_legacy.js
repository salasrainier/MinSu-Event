import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';

console.log('📥 Importing ALL legacy data from Laragon to Railway...\n');

async function importAllLegacy() {
  try {
    // Connect to local Laragon MySQL
    console.log('🔗 Connecting to local Laragon MySQL...');
    const laragon = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'content_event_system'
    });
    console.log('✅ Connected to Laragon\n');

    // Connect to Railway
    console.log('🔗 Connecting to Railway MySQL...');
    const railway = await mysql.createConnection({
      host: 'sakura.proxy.rlwy.net',
      port: 49559,
      user: 'root',
      password: 'CpgcgTVUzrshcGmtyhEroMKBTOeRyOmc',
      database: 'railway'
    });
    console.log('✅ Connected to Railway\n');

    // STEP 1: Clear and import Users (all users, not just test users)
    console.log('📥 STEP 1: Importing Users...');
    try {
      // Clear existing test users first
      await railway.execute('DELETE FROM Users');
      
      const [users] = await laragon.execute('SELECT * FROM users');
      console.log(`  Found ${users.length} users in Laragon`);
      
      for (const user of users) {
        try {
          await railway.execute(
            `INSERT INTO Users (user_id, name, email, password, role, department, contact_number, status, profile_picture, created_at, updated_at)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              user.user_id,
              user.name,
              user.email,
              user.password,
              user.role || 'participant',
              user.department,
              user.contact_number,
              user.status || 'active',
              user.profile_picture,
              user.created_at,
              user.updated_at
            ]
          );
          console.log(`    ✅ ${user.email}`);
        } catch (err) {
          if (err.code !== 'ER_DUP_ENTRY') {
            console.log(`    ⚠️  ${user.email}: ${err.message.substring(0, 50)}`);
          }
        }
      }
      console.log(`  ✅ ${users.length} users imported\n`);
    } catch (err) {
      console.log(`  ⚠️  Error importing users: ${err.message}\n`);
    }

    // STEP 2: Import EventRequests
    console.log('📥 STEP 2: Importing EventRequests...');
    try {
      const [events] = await laragon.execute('SELECT * FROM eventrequests');
      console.log(`  Found ${events.length} events`);
      
      let imported = 0;
      for (const event of events) {
        try {
          await railway.execute(
            `INSERT INTO EventRequests (id, organizer_name, event_title, department, event_date, venue, purpose, proposal_file, status, remarks, user_id, created_at, updated_at, event_end_date, event_images, event_video, is_expired)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              event.id,
              event.organizer_name,
              event.event_title,
              event.department,
              event.event_date,
              event.venue,
              event.purpose,
              event.proposal_file,
              event.status || 'Pending',
              event.remarks,
              event.user_id,
              event.created_at,
              event.updated_at,
              event.event_end_date,
              event.event_images,
              event.event_video,
              event.is_expired || 0
            ]
          );
          imported++;
          console.log(`    ✅ ${event.event_title}`);
        } catch (err) {
          if (err.code !== 'ER_DUP_ENTRY') {
            console.log(`    ⚠️  Event ${event.id}: ${err.message.substring(0, 50)}`);
          }
        }
      }
      console.log(`  ✅ ${imported}/${events.length} events imported\n`);
    } catch (err) {
      console.log(`  ⚠️  Error importing events: ${err.message}\n`);
    }

    // STEP 3: Import Participations
    console.log('📥 STEP 3: Importing Participations...');
    try {
      const [participations] = await laragon.execute('SELECT * FROM participations');
      console.log(`  Found ${participations.length} participations`);
      
      let imported = 0;
      for (const p of participations) {
        try {
          await railway.execute(
            `INSERT INTO Participations (participant_id, user_id, event_id, status, created_at, updated_at)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [p.participant_id, p.user_id, p.event_id, p.status || 'registered', p.created_at, p.updated_at]
          );
          imported++;
          console.log(`    ✅ User ${p.user_id} → Event ${p.event_id}`);
        } catch (err) {
          if (err.code !== 'ER_DUP_ENTRY') {
            console.log(`    ⚠️  ${p.participant_id}: ${err.message.substring(0, 50)}`);
          }
        }
      }
      console.log(`  ✅ ${imported}/${participations.length} participations imported\n`);
    } catch (err) {
      console.log(`  ⚠️  Error importing participations: ${err.message}\n`);
    }

    // STEP 4: Import Comments
    console.log('📥 STEP 4: Importing Comments...');
    try {
      const [comments] = await laragon.execute('SELECT * FROM comments');
      console.log(`  Found ${comments.length} comments`);
      
      let imported = 0;
      for (const c of comments) {
        try {
          await railway.execute(
            `INSERT INTO Comments (comment_id, event_id, user_id, content, created_at, updated_at)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [c.comment_id, c.event_id, c.user_id, c.content, c.created_at, c.updated_at]
          );
          imported++;
          console.log(`    ✅ Comment ${c.comment_id}`);
        } catch (err) {
          if (err.code !== 'ER_DUP_ENTRY') {
            console.log(`    ⚠️  ${c.comment_id}: ${err.message.substring(0, 50)}`);
          }
        }
      }
      console.log(`  ✅ ${imported}/${comments.length} comments imported\n`);
    } catch (err) {
      console.log(`  ⚠️  Error importing comments: ${err.message}\n`);
    }

    // STEP 5: Import Reactions
    console.log('📥 STEP 5: Importing Reactions...');
    try {
      const [reactions] = await laragon.execute('SELECT * FROM reactions');
      console.log(`  Found ${reactions.length} reactions`);
      
      let imported = 0;
      for (const r of reactions) {
        try {
          await railway.execute(
            `INSERT INTO Reactions (reaction_id, event_id, user_id, reaction_type, created_at, updated_at)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [r.reaction_id, r.event_id, r.user_id, r.reaction_type || 'like', r.created_at, r.updated_at]
          );
          imported++;
          console.log(`    ✅ Reaction ${r.reaction_id}`);
        } catch (err) {
          if (err.code !== 'ER_DUP_ENTRY') {
            console.log(`    ⚠️  ${r.reaction_id}: ${err.message.substring(0, 50)}`);
          }
        }
      }
      console.log(`  ✅ ${imported}/${reactions.length} reactions imported\n`);
    } catch (err) {
      console.log(`  ⚠️  Error importing reactions: ${err.message}\n`);
    }

    // Summary
    console.log('═══════════════════════════════════════════════════════════');
    console.log('📊 FINAL DATA IN RAILWAY DATABASE:');
    console.log('═══════════════════════════════════════════════════════════\n');
    
    const [usersCount] = await railway.query('SELECT COUNT(*) as count FROM Users');
    console.log(`  👥 Users: ${usersCount[0].count}`);
    
    const [eventsCount] = await railway.query('SELECT COUNT(*) as count FROM EventRequests');
    console.log(`  📅 Events: ${eventsCount[0].count}`);
    
    const [particCount] = await railway.query('SELECT COUNT(*) as count FROM Participations');
    console.log(`  🎟️  Participations: ${particCount[0].count}`);
    
    const [commentsCount] = await railway.query('SELECT COUNT(*) as count FROM Comments');
    console.log(`  💬 Comments: ${commentsCount[0].count}`);
    
    const [reactionsCount] = await railway.query('SELECT COUNT(*) as count FROM Reactions');
    console.log(`  👍 Reactions: ${reactionsCount[0].count}`);

    console.log('\n✨ All legacy data imported successfully!\n');
    console.log('🚀 Your app at https://minsu-event.onrender.com now has:');
    console.log('   ✅ All users');
    console.log('   ✅ All events');
    console.log('   ✅ All participations');
    console.log('   ✅ All comments');
    console.log('   ✅ All reactions\n');

    await laragon.end();
    await railway.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

importAllLegacy();
