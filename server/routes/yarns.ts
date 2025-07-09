/// <reference path="../../types.d.ts" />
import express, { Request, Response } from 'express';
import pool from '../modules/pool';

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

// get specific details for yarns for inventory page
router.get('/', (req: Request, res: Response) => {
  // console.log('in yarn get, check req.user.id', req.user.id);
  const queryText = `
   SELECT 
 yarn_inventory.id,
  yarn_inventory.title, 
  yarn_inventory.total_grams, 
  yarn_inventory.is_favorite, 
  yarn_fibers.fiber AS fiber,
  yarn_brands.name AS brand,
  yarn_weights.weight AS weight
  FROM yarn_inventory 
  JOIN yarn_fibers 
  ON yarn_fibers.id=yarn_inventory.fiber
  JOIN yarn_brands 
  ON yarn_brands.id=yarn_inventory.brand
  JOIN yarn_weights
  ON yarn_weights.id=yarn_inventory.weight
  WHERE is_deleted=FALSE;`;
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

// get details for one selected yarn
router.get('/:id', (req: Request, res: Response) => {
  const queryText = `
   SELECT 
 yarn_inventory.id,
  yarn_inventory.title, 
  yarn_inventory.skeins, 
  yarn_inventory.skein_grams, 
  yarn_inventory.total_grams, 
  yarn_inventory.dye_lot, 
  yarn_inventory.is_favorite, 
  yarn_inventory.is_deleted, 
  yarn_inventory.purchase_location,
  yarn_fibers.fiber AS fiber,
  yarn_brands.name AS brand,
  yarn_weights.weight AS weight
  FROM yarn_inventory 
  JOIN yarn_fibers 
  ON yarn_fibers.id=yarn_inventory.fiber
  JOIN yarn_brands 
  ON yarn_brands.id=yarn_inventory.brand
  JOIN yarn_weights
  ON yarn_weights.id=yarn_inventory.weight
  WHERE user_id=$1 AND yarn_inventory.id=$2;`;
  pool
    .query(queryText, [req.user.id, req.params.id])
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
  const queryText = `INSERT INTO yarn_inventory (brand, title, fiber, weight, skeins, skein_grams, total_grams, dye_lot, user_id, purchase_location) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`;
  pool
    .query(queryText, [
      newYarn.brand,
      newYarn.title,
      newYarn.fiber,
      newYarn.weight,
      newYarn.skeins,
      newYarn.skein_grams,
      newYarn.total_grams,
      newYarn.dye_lot,
      newYarn.user_id,
      newYarn.purchase_location,
    ])
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.error('Error executing query', error);
      res.sendStatus(500);
    });
});

// update yarn details

// mark yarn as favorite

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
