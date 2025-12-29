import api from './api';

export const createBook = async (payload) => {
  const response = await api.post('/books', payload);
  return response.data;
};

export const updateBook = async (id, payload) => {
  const response = await api.put(`/books/${id}`, payload);
  return response.data;
};

export const deleteBook = async (id) => {
  const response = await api.delete(`/books/${id}`);
  return response.data;
};
