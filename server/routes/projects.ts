import express, { Request, Response } from 'express';
import pool from '../modules/pool';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  console.log('GET /api/projects endpoint hit');
  const queryText = `SELECT * FROM project_inventory;`;

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
  const queryText = `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'project_inventory';`;
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
  console.log('POST /api/project endpoint hit');
  const newProject = req.body;
  const queryText = `INSERT INTO project_inventory (name) VALUES ($1);`;
  pool
    .query(queryText, [newProject.name])
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.error('Error executing query', error);
      res.sendStatus(500);
    });
});
export default router;
