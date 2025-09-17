import api from './api';

const getTasksByList = async (listId) => {
  const { data } = await api.get(`/tasks/list/${listId}`);
  return data;
};

const createTask = async (taskData) => {
  const { data } = await api.post('/tasks', taskData);
  return data;
};

const updateTask = async (id, taskData) => {
  const { data } = await api.put(`/tasks/${id}`, taskData);
  return data;
};

const deleteTask = async (id) => {
  const { data } = await api.delete(`/tasks/${id}`);
  return data;
};

const taskService = {
  getTasksByList,
  createTask,
  updateTask,
  deleteTask,
};

export default taskService;
