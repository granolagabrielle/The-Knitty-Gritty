import express, { Request, Response } from 'express';
import pool from '../modules/pool';

const router = express.Router();

pool.on('connect', () => {
  console.log('Connected to the database');
});

router.get('/', (req: Request, res: Response) => {
  const queryText = `SELECT * FROM pattern_inventory;`;

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

router.get('/db', (req: Request, res: Response) => {
  const queryText = `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'pattern_inventory';`;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.error('Error executing query', error);
      res.sendStatus(500);
    });
});

router.post('/', (req: Request, res: Response) => {
  const newPattern = req.body;
  const queryText = `INSERT INTO pattern_inventory (name) VALUES ($1);`;
  pool
    .query(queryText, [newPattern.name])
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.error('Error executing query', error);
      res.sendStatus(500);
    });
});

export default router;
