import express, { Request, Response } from 'express';
import db from './db';
const corsMiddleware = require('restify-cors-middleware2');
const app = express();
const PORT = 3000;

// Set up CORS middleware
const cors = corsMiddleware({
  origins: ['http://localhost:3000/tasks'], // allows all origins. In production, you should list specific domains
  allowHeaders: ['API-Token'],
  exposeHeaders: ['API-Token-Expiry'],
});

app.use(cors.preflight);
app.use(cors.actual);

app.use(express.json());

interface Task {
  id: number;
  title: string;
  description: string;
}

// GET all tasks
app.get('/tasks', async (req: Request, res: Response) => {
  try {
    const tasks = await db.any('SELECT * FROM tasks');
    res.json(tasks);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET a specific task by ID
app.get('/tasks/:id', async (req: Request, res: Response) => {
  try {
    const task = await db.oneOrNone('SELECT * FROM tasks WHERE id = $1', [parseInt(req.params.id)]);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST a new task
app.post('/tasks', async (req: Request, res: Response) => {
  const { title, description } = req.body;
  // Check if title and description are provided
  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required' });
  }

  try {
    const task = await db.one('INSERT INTO tasks(title, description) VALUES($1, $2) RETURNING *', [
      title,
      description,
    ]);
    res.status(201).json(task);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
});

// PUT (update) a task by ID
app.put('/tasks/:id', async (req: Request, res: Response) => {
  try {
    const updatedTask = await db.oneOrNone(
      'UPDATE tasks SET title = $1, description = $2 WHERE id = $3 RETURNING *',
      [req.body.title, req.body.description, parseInt(req.params.id)]
    );
    if (!updatedTask) return res.status(404).json({ message: 'Task not found' });
    res.json(updatedTask);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE a task by ID
app.delete('/tasks/:id', async (req: Request, res: Response) => {
  try {
    const result = await db.result('DELETE FROM tasks WHERE id = $1', [parseInt(req.params.id)]);
    if (!result.rowCount) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
