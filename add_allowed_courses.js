import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function addAllowedCoursesColumn() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: { rejectUnauthorized: false },
  });

  try {
    console.log('🔄 Checking if allowed_courses column exists...');
    
    // Check if column exists
    const [columns] = await connection.execute(`
      SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_NAME='EventRequests' AND COLUMN_NAME='allowed_courses'
    `);

    if (columns.length > 0) {
      console.log('✅ allowed_courses column already exists');
      return;
    }

    // Add column (without default)
    console.log('➕ Adding allowed_courses column...');
    await connection.execute(`
      ALTER TABLE EventRequests 
      ADD COLUMN allowed_courses JSON NULL AFTER is_expired
    `);

    console.log('✅ allowed_courses column added successfully');

    // Update existing events to have default value
    await connection.execute(`
      UPDATE EventRequests 
      SET allowed_courses = JSON_ARRAY('All Courses (Public Event)') 
      WHERE allowed_courses IS NULL
    `);

    console.log('✅ Existing events updated with default allowed_courses');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await connection.end();
  }
}

addAllowedCoursesColumn();
