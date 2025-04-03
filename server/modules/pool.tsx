import { Pool } from 'pg';

let pool: Pool;

if (process.env.DATABASE_URL) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
} else {
  // When running locally, connect to the local Postgres database
  pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'Knitty-Gritty-Mobile',
  });
}

export default pool;
