import api from './api';

export const getFavorites = async () => {
  const response = await api.get('/favorites');
  return response.data;
};

export const addFavorite = async (bookId) => {
  const response = await api.post(`/favorites/${bookId}`);
  return response.data;
};

export const removeFavorite = async (bookId) => {
  const response = await api.delete(`/favorites/${bookId}`);
  return response.data;
};
