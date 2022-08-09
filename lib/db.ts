import { Client } from 'pg';

const db = new Client({
  connectionString: process.env.DB_URL
});

export default db;
