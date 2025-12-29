import api from './api';

export const fetchProfile = async () => {
  const response = await api.get('/users/me');
  return response.data;
};

export const updateProfile = async (payload) => {
  const response = await api.patch('/users/me', payload);
  return response.data;
};
