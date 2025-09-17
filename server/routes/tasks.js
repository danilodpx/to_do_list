const express = require('express');
const router = express.Router();
const {
  getTasksByList,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController.js');
const { protect } = require('../middleware/authMiddleware.js');

// Aplica o middleware de proteção a todas as rotas de tarefas
router.use(protect);

// Rota para obter todas as tarefas de uma lista específica
router.get('/list/:listId', getTasksByList);

// Rota para criar uma nova tarefa
router.post('/', createTask);

// Rotas para atualizar e deletar uma tarefa específica
router.route('/:id').put(updateTask).delete(deleteTask);

module.exports = router;
