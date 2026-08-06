import mysql from 'mysql2/promise';

console.log('Testing Aiven connection with SSL...');

const aiven = {
  host: 'minsu-events-db-mmellow274-ce3d.e.aivencloud.com',
  port: 24522,
  user: 'avnadmin',
  password: 'AVNS_nBupNldiJPAetK_sWGO',
  database: 'defaultdb',
  ssl: 'Amazon RDS',
  connectTimeout: 5000
};

try {
  console.log(`Connecting to ${aiven.host}:${aiven.port}...`);
  const connection = await mysql.createConnection(aiven);

  console.log('✅ Connected!');
  
  const [rows] = await connection.execute('SELECT 1 as test');
  console.log('✅ Query successful:', rows);
  
  await connection.end();
} catch (error) {
  console.error('❌ Error:', error.message);
  console.error('Code:', error.code);
}
