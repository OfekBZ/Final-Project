import api from './api';

export const getReviewsForBook = async (bookId) => {
  const response = await api.get(`/reviews/book/${bookId}`);
  return response.data;
};

export const addReview = async (bookId, payload) => {
  const response = await api.post(`/reviews/book/${bookId}`, payload);
  return response.data;
};

export const deleteReview = async (reviewId) => {
  const response = await api.delete(`/reviews/${reviewId}`);
  return response.data;
};
