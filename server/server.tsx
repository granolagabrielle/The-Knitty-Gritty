import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import yarnRouter from './routes/yarnRouter';
import patternRouter from './routes/patternRouter';
import projectRouter from './routes/projectRouter';

dotenv.config();

const app: Application = express();
const PORT: number = parseInt(process.env.PORT || '5001', 10);

// Express Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || '*', // Allow the frontend URL from the environment variable
    methods: ['GET', 'POST'], // Allow specific HTTP methods
    credentials: true, // Allow cookies if needed
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('build'));

// Routes
app.use('/api/yarn', yarnRouter);
app.use('/api/patterns', patternRouter);
app.use('/api/projects', projectRouter);

// Catch-all route to serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Listen Server & Port
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
