import express, { Request, Response } from 'express';
import pool from '../modules/pool';

const router = express.Router();

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

// get specific details for pattern inventory page
router.get('/', (req: Request, res: Response) => {
  const queryText = `SELECT pattern_inventory.id,
  pattern_inventory.title,
  pattern_inventory.is_favorite,
  pattern_designers.name AS pattern_designer,
  pattern_types.type AS pattern_type,
  pattern_difficulties.level AS difficulty_level,
  yarn_weights.weight AS yarn_weight
  FROM pattern_inventory
  JOIN pattern_designers
  ON pattern_designers.id=pattern_inventory.pattern_designer
  JOIN pattern_types
  ON pattern_types.id=pattern_inventory.pattern_type
  JOIN pattern_difficulties
  ON pattern_difficulties.id=pattern_inventory.difficulty_level
  JOIN yarn_weights
  ON yarn_weights.id=pattern_inventory.yarn_weight
   ;`;

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

// get details for a certain pattern
router.get('/:id', (req: Request, res: Response) => {
  const queryText = `SELECT pattern_inventory.id,
  pattern_inventory.title,
  pattern_inventory.is_favorite,
  pattern_designers.name AS pattern_designer,
  pattern_types.type AS pattern_type,
  pattern_difficulties.level AS difficulty_level,
  yarn_weights.weight AS yarn_weight
  FROM pattern_inventory
  JOIN pattern_designers
  ON pattern_designers.id=pattern_inventory.pattern_designer
  JOIN pattern_types
  ON pattern_types.id=pattern_inventory.pattern_type
  JOIN pattern_difficulties
  ON pattern_difficulties.id=pattern_inventory.difficulty_level
  JOIN yarn_weights
  ON yarn_weights.id=pattern_inventory.yarn_weight
  WHERE pattern_inventory.id=$1
   ;`;

  pool
    .query(queryText, [req.params.id])
    .then((result) => {
      console.log('Query result:', result.rows);
      res.send(result.rows);
    })
    .catch((error) => {
      console.error('Error executing query', error);
      res.sendStatus(500);
    });
});

router.post('/', (req: Request, res: Response) => {
  const newPattern = req.body;
  const queryText = `INSERT INTO pattern_inventory (title, pattern_designer, pattern_type, difficulty_level, yarn_weight) VALUES ($1, $2, $3, $4, $5);`;
  pool
    .query(queryText, [
      newPattern.title,
      newPattern.pattern_designer,
      newPattern.pattern_type,
      newPattern.difficulty_level,
      newPattern.yarn_weight,
    ])
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.error('Error executing query', error);
      res.sendStatus(500);
    });
});

router.put('/favorite/:id', (req: Request, res: Response) => {
  console.log('marking pattern as fav, check req.body', req.body);
  const queryText = `
  UPDATE "pattern_inventory"
    SET "is_favorite" = TRUE
    WHERE "id"=$1;`;
  pool
    .query(queryText, [req.params.id])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error('Error marking pattern as favorite', error);
      res.sendStatus(500);
    });
});

router.delete('/:id', (req: Request, res: Response) => {
  console.log('in pattern delete router, check req.body', req.body);
  const queryText = `DELETE FROM pattern_inventory WHERE "id"=$1;`;
  pool
    .query(queryText, [req.params.id])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error('Error deleting pattern', error);
      res.sendStatus(500);
    });
});

export default router;
