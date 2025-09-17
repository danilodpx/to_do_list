const Task = require('../models/Task.js');
const List = require('../models/List.js');

// Helper para verificar se o usuário tem acesso à lista
const checkListAccess = async (listId, userId) => {
  const list = await List.findById(listId);
  return list && list.user.toString() === userId.toString();
};

// @desc    Obter todas as tarefas de uma lista
// @route   GET /api/tasks/list/:listId
// @access  Private
const getTasksByList = async (req, res) => {
  try {
    if (!(await checkListAccess(req.params.listId, req.user._id))) {
      return res.status(404).json({ message: 'Lista não encontrada ou acesso negado' });
    }
    const tasks = await Task.find({ list: req.params.listId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor' });
  }
};

// @desc    Criar uma nova tarefa em uma lista
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res) => {
  const { text, listId, dueDate, priority } = req.body;

  if (!text || !listId) {
    return res.status(400).json({ message: 'Texto da tarefa e ID da lista são obrigatórios' });
  }

  try {
    if (!(await checkListAccess(listId, req.user._id))) {
      return res.status(404).json({ message: 'Lista não encontrada ou acesso negado' });
    }

    const task = new Task({
      text,
      list: listId,
      dueDate,
      priority,
    });

    const createdTask = await task.save();
    res.status(201).json(createdTask);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar a tarefa' });
  }
};

// @desc    Atualizar uma tarefa
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res) => {
  const { text, completed, dueDate, priority } = req.body;

  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }

    if (!(await checkListAccess(task.list, req.user._id))) {
      return res.status(403).json({ message: 'Acesso negado' });
    }

    task.text = text || task.text;
    // Precisamos checar 'completed' explicitamente, pois pode ser 'false'
    if (completed !== undefined) {
      task.completed = completed;
    }
    task.dueDate = dueDate || task.dueDate;
    task.priority = priority || task.priority;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar a tarefa' });
  }
};

// @desc    Deletar uma tarefa
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }

    if (!(await checkListAccess(task.list, req.user._id))) {
      return res.status(403).json({ message: 'Acesso negado' });
    }

    await task.deleteOne();
    res.json({ message: 'Tarefa removida' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar a tarefa' });
  }
};

module.exports = {
  getTasksByList,
  createTask,
  updateTask,
  deleteTask,
};
