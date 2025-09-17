const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Conecta ao banco de dados
connectDB();

const app = express();

// Middleware para permitir requisições de origens diferentes (CORS)
app.use(cors());

// Middleware para fazer o parse do corpo das requisições como JSON
app.use(express.json());

// Rotas de Autenticação
const authRoutes = require('./routes/auth.js');
app.use('/api/users', authRoutes);

// Rotas de Listas
const listRoutes = require('./routes/lists.js');
app.use('/api/lists', listRoutes);

// Rotas de Tarefas
const taskRoutes = require('./routes/tasks.js');
app.use('/api/tasks', taskRoutes);

// Rota de teste para verificar se o servidor está no ar
app.get('/', (req, res) => {
  res.send('API do Sistema de Tarefas está rodando...');
});

// Define a porta do servidor. Usa a variável de ambiente PORT ou 5000 como padrão.
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
