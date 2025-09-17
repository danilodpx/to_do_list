const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Pega o token do cabeçalho (removendo o "Bearer ")
      token = req.headers.authorization.split(' ')[1];

      // Verifica e decodifica o token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Encontra o usuário pelo ID do token e anexa ao request
      // O '-password' remove o campo da senha do resultado
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        res.status(401);
        throw new Error('Não autorizado, usuário não encontrado');
      }

      next(); // Continua para a próxima função do middleware
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Não autorizado, token falhou');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Não autorizado, sem token');
  }
};

module.exports = { protect };
