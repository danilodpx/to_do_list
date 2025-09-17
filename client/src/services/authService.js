import api from './api';

const register = async (name, email, password) => {
  const { data } = await api.post('/users', { name, email, password });
  return data;
};

const login = async (email, password) => {
  const { data } = await api.post('/users/login', { email, password });
  return data;
};

const authService = {
  register,
  login,
};

export default authService;
