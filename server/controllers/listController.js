const List = require('../models/List.js');
const Task = require('../models/Task.js');

// @desc    Obter todas as listas do usuário logado
// @route   GET /api/lists
// @access  Private
const getLists = async (req, res) => {
  try {
    const lists = await List.find({ user: req.user._id });
    res.json(lists);
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor' });
  }
};

// @desc    Criar uma nova lista
// @route   POST /api/lists
// @access  Private
const createList = async (req, res) => {
  const { name, description, color } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'O nome da lista é obrigatório' });
  }

  try {
    const list = new List({
      name,
      description,
      color,
      user: req.user._id,
    });

    const createdList = await list.save();
    res.status(201).json(createdList);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar a lista' });
  }
};

// @desc    Obter uma lista por ID
// @route   GET /api/lists/:id
// @access  Private
const getListById = async (req, res) => {
  try {
    const list = await List.findById(req.params.id);

    if (list && list.user.toString() === req.user._id.toString()) {
      res.json(list);
    } else {
      res.status(404).json({ message: 'Lista não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor' });
  }
};

// @desc    Atualizar uma lista
// @route   PUT /api/lists/:id
// @access  Private
const updateList = async (req, res) => {
  const { name, description, color } = req.body;

  try {
    const list = await List.findById(req.params.id);

    if (list && list.user.toString() === req.user._id.toString()) {
      list.name = name || list.name;
      list.description = description || list.description;
      list.color = color || list.color;

      const updatedList = await list.save();
      res.json(updatedList);
    } else {
      res.status(404).json({ message: 'Lista não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar a lista' });
  }
};

// @desc    Deletar uma lista
// @route   DELETE /api/lists/:id
// @access  Private
const deleteList = async (req, res) => {
  try {
    const list = await List.findById(req.params.id);

    if (list && list.user.toString() === req.user._id.toString()) {
      // Deleta todas as tarefas associadas à lista
      await Task.deleteMany({ list: req.params.id });
      await list.deleteOne(); // Mongoose v6+
      res.json({ message: 'Lista removida' });
    } else {
      res.status(404).json({ message: 'Lista não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar a lista' });
  }
};

module.exports = {
  getLists,
  createList,
  getListById,
  updateList,
  deleteList,
};
