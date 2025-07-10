import express, { Request, Response } from 'express';
import pool from '../modules/pool';

const router = express.Router();

// get yarn column names for add yarn form
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
  WHERE yarn_inventory.id=$1;`;
  pool
    .query(queryText, [req.params.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.error('Error executing query', error);
      res.sendStatus(500);
    });
});

// add new yarn
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
router.put('/favorite/:id', (req: Request, res: Response) => {
  console.log('marking yarn as fav, check req.body', req.body);
  const queryText = `
  UPDATE "yarn_inventory"
    SET "is_favorite" = TRUE
    WHERE "id"=$1;`;
  pool
    .query(queryText, [req.params.id])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error('Error marking yarn as favorite', error);
      res.sendStatus(500);
    });
});

// remove yarn as favorite
router.put('/unfavorite/:id', (req: Request, res: Response) => {
  console.log('removing yarn as fav, check req.body', req.body);
  const queryText = `
  UPDATE "yarn_inventory"
    SET "is_favorite" = FALSE
    WHERE "id"=$1;`;
  pool
    .query(queryText, [req.params.id])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error('Error removing yarn as favorite', error);
      res.sendStatus(500);
    });
});

// delete yarn
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

// get all fiber types
router.get('/fiber', (req: Request, res: Response) => {
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

// add new fiber type
router.post('/fiber', (req: Request, res: Response) => {
  const newFiber = req.body;
  const queryText = `INSERT INTO yarn_fibers (fiber) VALUES ($1);`;
  pool
    .query(queryText, [newFiber.fiber])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.error('Error adding new fiber type', error);
      res.sendStatus(500);
    });
});

// get all yarn weights
router.get('/weights', (req: Request, res: Response) => {
  const queryText = `SELECT * FROM yarn_weights;`;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.error('Error getting yarn weights', error);
      res.sendStatus(500);
    });
});

// add yarn weight
router.post('/weights', (req: Request, res: Response) => {
  const newWeight = req.body;
  const queryText = `INSERT INTO yarn_weights (weight) VALUES ($1);`;
  pool
    .query(queryText, [newWeight.weight])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.error('Error adding new yarn weight', error);
      res.sendStatus(500);
    });
});

// get all yarn brands
router.get('/brands', (req: Request, res: Response) => {
  const queryText = `SELECT * FROM yarn_brands;`;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.error('Error getting yarn brands', error);
      res.sendStatus(500);
    });
});

// add new brand
router.post('/brands', (req: Request, res: Response) => {
  const newBrand = req.body;
  const queryText = `INSERT INTO yarn_brands (name) VALUES ($1);`;
  pool
    .query(queryText, [newBrand.name])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.error('Error adding new yarn brand', error);
      res.sendStatus(500);
    });
});

export default router;
