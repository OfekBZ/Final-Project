import api from './api';

export const fetchBooks = async (params = {}) => {
  const response = await api.get('/books', { params });
  return response.data;
};

export const fetchBookById = async (id) => {
  const response = await api.get(`/books/${id}`);
  return response.data;
};
