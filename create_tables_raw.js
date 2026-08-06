import { createPool } from 'mysql2/promise';

const pool = createPool({
  host: 'minsu-events-db-mmellow274-ce3d.e.aivencloud.com',
  port: 24522,
  user: 'avnadmin',
  password: 'AVNS_nBupNldiJPAetK_sWGO',
  database: 'defaultdb',
  ssl: 'Amazon RDS',
  enableKeepAlive: true,
  waitForConnections: true,
  connectionLimit: 1
});

const tables = [
  `CREATE TABLE IF NOT EXISTS Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('participant', 'organizer', 'admin') DEFAULT 'participant',
    department VARCHAR(255),
    contact_number VARCHAR(20),
    status ENUM('active', 'pending', 'banned') DEFAULT 'active',
    profile_picture VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`,

  `CREATE TABLE IF NOT EXISTS EventRequests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    organizer_name VARCHAR(255) NOT NULL,
    event_title VARCHAR(255) NOT NULL,
    department VARCHAR(255) NOT NULL,
    event_date DATETIME NOT NULL,
    event_end_date DATETIME NOT NULL,
    venue VARCHAR(255) NOT NULL,
    purpose LONGTEXT NOT NULL,
    proposal_file VARCHAR(500),
    event_images JSON,
    event_video VARCHAR(500),
    status ENUM('Pending', 'Approved', 'Denied') DEFAULT 'Pending',
    remarks LONGTEXT,
    user_id INT NOT NULL,
    is_expired BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
  )`,

  `CREATE TABLE IF NOT EXISTS Participations (
    participant_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    status ENUM('registered', 'attended', 'cancelled') DEFAULT 'registered',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (event_id) REFERENCES EventRequests(id)
  )`,

  `CREATE TABLE IF NOT EXISTS Comments (
    comment_id INT AUTO_INCREMENT PRIMARY KEY,
    event_id INT NOT NULL,
    user_id INT NOT NULL,
    content LONGTEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES EventRequests(id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
  )`,

  `CREATE TABLE IF NOT EXISTS Reactions (
    reaction_id INT AUTO_INCREMENT PRIMARY KEY,
    event_id INT NOT NULL,
    user_id INT NOT NULL,
    reaction_type ENUM('like', 'love', 'haha', 'wow', 'sad', 'angry') DEFAULT 'like',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY unique_reaction (event_id, user_id),
    FOREIGN KEY (event_id) REFERENCES EventRequests(id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
  )`
];

(async () => {
  let conn;
  try {
    console.log('🔗 Connecting to Aiven...');
    conn = await pool.getConnection();
    console.log('✅ Connected\n');

    console.log('📝 Creating tables...\n');

    for (const sql of tables) {
      try {
        await conn.execute(sql);
        const tableName = sql.match(/CREATE TABLE IF NOT EXISTS (\w+)/)[1];
        console.log(`✅ ${tableName}`);
      } catch (err) {
        console.error('❌ Error:', err.message.substring(0, 100));
      }
    }

    conn.release();
    await pool.end();

    console.log('\n✅ Database tables created successfully!');
    console.log('\n🎉 Your app should now work!');
    console.log('\n📍 Visit: https://minsu-event.onrender.com');
    console.log('📝 Try registering a new user!');

  } catch (error) {
    console.error('\n❌ Failed:', error.message);
    if (conn) conn.release();
    await pool.end();
    process.exit(1);
  }
})();
