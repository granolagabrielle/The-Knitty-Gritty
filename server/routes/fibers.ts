import express, { Request, Response } from 'express';
import pool from '../modules/pool';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  const queryText = `SELECT * FROM fibers;`;
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

export default router;
