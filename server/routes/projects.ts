import express, { Request, Response } from 'express';
import pool from '../modules/pool';

const router = express.Router();

// get column names for adding new project
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

// get specific details for project inventory page
router.get('/', (req: Request, res: Response) => {
  console.log('GET /api/projects endpoint hit');
  const queryText = `SELECT 
      project_tracking.id,
      project_tracking.date_started,
      project_tracking.est_grams_needed,
      project_tracking.grams_knit,
      project_tracking.is_favorite,
      pattern_inventory.title AS title
    FROM project_tracking
    LEFT JOIN pattern_inventory ON project_tracking.pattern_id = pattern_inventory.id;`;
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

// get details for a certain project
router.get('/:id', (req: Request, res: Response) => {
  console.log('GET /api/projects endpoint hit');
  const queryText = `SELECT 
  pt.id,
  pt.date_started,
  pt.est_grams_needed,
  pt.grams_knit,
  pt.needle_size,
  pt.is_favorite,
  json_build_object(
    'id', p.id,
    'title', p.title,
    'designer', p.pattern_designer,
    'type', p.pattern_type,
    'difficulty', p.difficulty_level
  ) AS pattern,
  json_build_object(
    'id', y.id,
    'title', y.title,
    'brand', y.brand,
    'fiber', y.fiber,
    'weight', y.weight
  ) AS yarn
FROM project_tracking pt
LEFT JOIN pattern_inventory p ON pt.pattern_id = p.id
LEFT JOIN yarn_inventory y ON pt.yarn_id = y.id
WHERE pt.id =$1
GROUP BY pt.id, p.id, y.id;`;
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

// add new project
router.post('/', (req: Request, res: Response) => {
  console.log('POST /api/project endpoint hit');
  const newProject = req.body;
  const queryText = `INSERT INTO project_tracking (name, pattern_id, date_started, est_grams_needed, grams_knit, needle_size, yarn_id) VALUES ($1, $2, $3, $4, $5, $6, $7);`;
  pool
    .query(queryText, [
      newProject.name,
      newProject.pattern_id,
      newProject.date_started,
      newProject.est_grams_needed,
      newProject.grams_knit,
      newProject.needle_size,
      newProject.yarn_id,
    ])
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.error('Error executing query', error);
      res.sendStatus(500);
    });
});

// TODO: update project

// mark project as favorite
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

// remove project as favorite
router.put('/favorite/:id', (req: Request, res: Response) => {
  console.log('marking project as fav, check req.body', req.body);
  const queryText = `
  UPDATE "project_tracking"
    SET "is_favorite" = FALSE
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

// delete project
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
