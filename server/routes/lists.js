const express = require('express');
const router = express.Router();
const {
  getLists,
  createList,
  getListById,
  updateList,
  deleteList,
} = require('../controllers/listController.js');
const { protect } = require('../middleware/authMiddleware.js');

// Aplica o middleware de proteção a todas as rotas abaixo
router.use(protect);

// Rotas para obter todas as listas e criar uma nova lista
router.route('/').get(getLists).post(createList);

// Rotas para obter, atualizar e deletar uma lista específica
router.route('/:id').get(getListById).put(updateList).delete(deleteList);

module.exports = router;
