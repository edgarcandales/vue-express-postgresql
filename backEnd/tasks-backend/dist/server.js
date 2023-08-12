"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
let tasks = [
    { id: 1, title: 'title 1', description: 'description 1' },
    { id: 2, title: 'title 2', description: 'description 2' },
];
// GET all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});
// GET a specific task by ID
app.get('/tasks/:id', (req, res) => {
    const task = tasks.find((t) => t.id === parseInt(req.params.id));
    if (!task)
        return res.status(404).json({ message: 'Task not found' });
    res.json(task);
});
// POST a new task
app.post('/tasks', (req, res) => {
    const newTask = {
        id: Date.now(),
        title: req.body.title,
        description: req.body.description,
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});
// PUT (update) a task by ID
app.put('/tasks/:id', (req, res) => {
    const index = tasks.findIndex((t) => t.id === parseInt(req.params.id));
    if (index === -1)
        return res.status(404).json({ message: 'Task not found' });
    tasks[index] = { id: tasks[index].id, ...req.body };
    res.json(tasks[index]);
});
// DELETE a task by ID
app.delete('/tasks/:id', (req, res) => {
    tasks = tasks.filter((t) => t.id !== parseInt(req.params.id));
    res.json({ message: 'Task deleted successfully' });
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
