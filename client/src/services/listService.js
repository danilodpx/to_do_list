import api from './api';

const getLists = async () => {
  const { data } = await api.get('/lists');
  return data;
};

const createList = async (listData) => {
  const { data } = await api.post('/lists', listData);
  return data;
};

const updateList = async (id, listData) => {
  const { data } = await api.put(`/lists/${id}`, listData);
  return data;
};

const deleteList = async (id) => {
  const { data } = await api.delete(`/lists/${id}`);
  return data;
};

const listService = {
  getLists,
  createList,
  updateList,
  deleteList,
};

export default listService;
