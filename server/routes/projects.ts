import express, { Request, Response } from 'express';
import pool from '../modules/pool';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  console.log('GET /api/projects endpoint hit');
  const queryText = `SELECT * FROM project_tracking;`;

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
  const queryText = `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'project_tracking';`;
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
  const queryText = `INSERT INTO project_tracking (name) VALUES ($1);`;
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

router.put('/favorite/:id', (req: Request, res: Response) => {
  console.log('marking project as fav, check req.body', req.body);
  const queryText = `
  UPDATE "project_tracking"
    SET "is_favorite" = TRUE
    WHERE "id"=$1;`;
  pool
    .query(queryText, [req.params.id])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error('Error marking project as favorite', error);
      res.sendStatus(500);
    });
});

router.delete('/:id', (req: Request, res: Response) => {
  console.log('in project delete router, check req.body', req.body);
  const queryText = `DELETE FROM project_tracking WHERE "id"=$1;`;
  pool
    .query(queryText, [req.params.id])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error('Error deleting project', error);
      res.sendStatus(500);
    });
});

export default router;
