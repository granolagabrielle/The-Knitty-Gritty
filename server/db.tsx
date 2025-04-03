import { Pool, QueryResult, QueryResultRow } from 'pg';

const pool = new Pool({
  host: 'localhost',
  database: 'Knitty-Gritty-Mobile',
  port: 5432,
});

pool.on('connect', () => {
  console.log('Connected to the database');
});

export const query = <T extends QueryResultRow = any>(text: string, params?: any[]): Promise<QueryResult<T>> => {
  return pool.query<T>(text, params);
};
