import express, { Request, Response } from 'express';
import pool from '../modules/pool';
import { query } from '../db';

const router = express.Router();

router.get('/db', (req: Request, res: Response) => {
  const queryText = `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'yarn_inventory';`;
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

router.get('/', (req: Request, res: Response) => {
  const queryText = `SELECT * FROM yarn_inventory;`;
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
  const newYarn = req.body;
  const queryText = `INSERT INTO yarn_inventory (name, color, dye_lot, skeins, skein_grams) VALUES ($1, $2, $3, $4, $5);`;
  pool
    .query(queryText, [newYarn.name, newYarn.color, newYarn.dye_lot, newYarn.skeins, newYarn.skein_grams])
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.error('Error executing query', error);
      res.sendStatus(500);
    });
});

router.delete('/:id', (req: Request, res: Response) => {
  console.log('in yarn delete router, check req.body', req.body);
  const queryText = `DELETE FROM yarn_inventory WHERE "id"=$1;`;
  pool
    .query(queryText, [req.params.id])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error('Error deleting yarn', error);
      res.sendStatus(500);
    });
});

export default router;
