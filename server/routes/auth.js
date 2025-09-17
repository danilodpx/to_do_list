const express = require('express');
const router = express.Router();
const { registerUser, authUser } = require('../controllers/authController.js');

// Rota para registrar um novo usuário
router.post('/', registerUser);

// Rota para fazer login
router.post('/login', authUser);

module.exports = router;
