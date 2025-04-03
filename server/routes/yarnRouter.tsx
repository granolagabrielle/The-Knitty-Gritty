import express, { Request, Response } from 'express';
import pool from '../modules/pool';

const router = express.Router();

pool.on('connect', () => {
  console.log('Connected to the database');
});

router.get('/', (req: Request, res: Response) => {
  console.log('GET /api/yarn endpoint hit');
  const queryText = `SELECT * FROM yarn_inventory;`;

  pool
    .query(queryText)
    .then((result) => {
      console.log('Query result:', result.rows);
      res.send(result.rows);
    })
    .catch((error) => {
      console.error('Error executing query', error);
      res.sendStatus(500);
    });
});

export default router;
