import mysql from 'mysql2/promise';

console.log('📥 Importing legacy data from Laragon to Railway...\n');

async function importLegacyData() {
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

    // Import EventRequests (events)
    console.log('📥 Importing EventRequests...');
    try {
      const [events] = await laragon.execute('SELECT * FROM eventrequests');
      console.log(`  Found ${events.length} events`);
      
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
              event.status,
              event.remarks,
              event.user_id,
              event.created_at,
              event.updated_at,
              event.event_end_date,
              event.event_images,
              event.event_video,
              event.is_expired
            ]
          );
        } catch (err) {
          if (err.code !== 'ER_DUP_ENTRY') {
            console.log(`    ⚠️  Event ${event.id}: ${err.message.substring(0, 50)}`);
          }
        }
      }
      console.log(`  ✅ ${events.length} events imported\n`);
    } catch (err) {
      console.log(`  ⚠️  Could not import events: ${err.message}\n`);
    }

    // Import Participations
    console.log('📥 Importing Participations...');
    try {
      const [participations] = await laragon.execute('SELECT * FROM participations');
      console.log(`  Found ${participations.length} participations`);
      
      for (const p of participations) {
        try {
          await railway.execute(
            `INSERT INTO Participations (participant_id, user_id, event_id, status, created_at, updated_at)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [p.participant_id, p.user_id, p.event_id, p.status, p.created_at, p.updated_at]
          );
        } catch (err) {
          if (err.code !== 'ER_DUP_ENTRY') {
            console.log(`    ⚠️  Participation ${p.participant_id}: ${err.message.substring(0, 50)}`);
          }
        }
      }
      console.log(`  ✅ ${participations.length} participations imported\n`);
    } catch (err) {
      console.log(`  ⚠️  Could not import participations: ${err.message}\n`);
    }

    // Import Comments
    console.log('📥 Importing Comments...');
    try {
      const [comments] = await laragon.execute('SELECT * FROM comments');
      console.log(`  Found ${comments.length} comments`);
      
      for (const c of comments) {
        try {
          await railway.execute(
            `INSERT INTO Comments (comment_id, event_id, user_id, content, created_at, updated_at)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [c.comment_id, c.event_id, c.user_id, c.content, c.created_at, c.updated_at]
          );
        } catch (err) {
          if (err.code !== 'ER_DUP_ENTRY') {
            console.log(`    ⚠️  Comment ${c.comment_id}: ${err.message.substring(0, 50)}`);
          }
        }
      }
      console.log(`  ✅ ${comments.length} comments imported\n`);
    } catch (err) {
      console.log(`  ⚠️  Could not import comments: ${err.message}\n`);
    }

    // Import Reactions
    console.log('📥 Importing Reactions...');
    try {
      const [reactions] = await laragon.execute('SELECT * FROM reactions');
      console.log(`  Found ${reactions.length} reactions`);
      
      for (const r of reactions) {
        try {
          await railway.execute(
            `INSERT INTO Reactions (reaction_id, event_id, user_id, reaction_type, created_at, updated_at)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [r.reaction_id, r.event_id, r.user_id, r.reaction_type, r.created_at, r.updated_at]
          );
        } catch (err) {
          if (err.code !== 'ER_DUP_ENTRY') {
            console.log(`    ⚠️  Reaction ${r.reaction_id}: ${err.message.substring(0, 50)}`);
          }
        }
      }
      console.log(`  ✅ ${reactions.length} reactions imported\n`);
    } catch (err) {
      console.log(`  ⚠️  Could not import reactions: ${err.message}\n`);
    }

    // Summary
    console.log('📊 Final Data in Railway:');
    
    const [usersCount] = await railway.query('SELECT COUNT(*) as count FROM Users');
    console.log(`  Users: ${usersCount[0].count}`);
    
    const [eventsCount] = await railway.query('SELECT COUNT(*) as count FROM EventRequests');
    console.log(`  Events: ${eventsCount[0].count}`);
    
    const [particCount] = await railway.query('SELECT COUNT(*) as count FROM Participations');
    console.log(`  Participations: ${particCount[0].count}`);
    
    const [commentsCount] = await railway.query('SELECT COUNT(*) as count FROM Comments');
    console.log(`  Comments: ${commentsCount[0].count}`);
    
    const [reactionsCount] = await railway.query('SELECT COUNT(*) as count FROM Reactions');
    console.log(`  Reactions: ${reactionsCount[0].count}`);

    console.log('\n✨ All legacy data imported successfully!');
    console.log('Your app at https://minsu-event.onrender.com now has all the data.\n');

    await laragon.end();
    await railway.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

importLegacyData();
