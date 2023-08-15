"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db"));
const cors = require('cors');
const app = (0, express_1.default)();
const PORT = 3000;
const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
app.use(express_1.default.json());
console.log('start');
// GET all tasks
app.get('/tasks', cors(corsOptions), async (req, res) => {
    try {
        const tasks = await db_1.default.any('SELECT * FROM tasks');
        res.json(tasks);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// GET a specific task by ID
app.get('/tasks/:id', cors(corsOptions), async (req, res) => {
    try {
        const task = await db_1.default.oneOrNone('SELECT * FROM tasks WHERE id = $1', [parseInt(req.params.id)]);
        if (!task)
            return res.status(404).json({ message: 'Task not found' });
        res.json(task);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// POST a new task
app.post('/tasks', cors(corsOptions), async (req, res) => {
    const { title, description } = req.body;
    // Check if title and description are provided
    if (!title || !description) {
        return res.status(400).json({ error: 'Title and description are required' });
    }
    try {
        const task = await db_1.default.one('INSERT INTO tasks(title, description) VALUES($1, $2) RETURNING *', [
            title,
            description,
        ]);
        res.status(201).json(task);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
});
// PUT (update) a task by ID
app.put('/tasks/:id', cors(corsOptions), async (req, res) => {
    try {
        const updatedTask = await db_1.default.oneOrNone('UPDATE tasks SET title = $1, description = $2 WHERE id = $3 RETURNING *', [req.body.title, req.body.description, parseInt(req.params.id)]);
        if (!updatedTask)
            return res.status(404).json({ message: 'Task not found' });
        res.json(updatedTask);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// DELETE a task by ID
app.delete('/tasks/:id', cors(corsOptions), async (req, res) => {
    try {
        const result = await db_1.default.result('DELETE FROM tasks WHERE id = $1', [parseInt(req.params.id)]);
        if (!result.rowCount)
            return res.status(404).json({ message: 'Task not found' });
        res.json({ message: 'Task deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
