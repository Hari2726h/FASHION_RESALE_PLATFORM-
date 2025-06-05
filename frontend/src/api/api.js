import axios from 'axios';

const API_BASE = 'http://localhost:8080/api';

export const api = {
  // User APIs
  getUsers: () => axios.get(`${API_BASE}/users`),
  getUser: (id) => axios.get(`${API_BASE}/users/${id}`),
  createUser: (data) => axios.post(`${API_BASE}/users`, data),
  updateUser: (id, data) => axios.put(`${API_BASE}/users/${id}`, data),
  deleteUser: (id) => axios.delete(`${API_BASE}/users/${id}`),

  // Clothing Item APIs
  getClothingItems: () => axios.get(`${API_BASE}/clothing-items`),
  getClothingItem: (id) => axios.get(`${API_BASE}/clothing-items/${id}`),
  createClothingItem: (data) => axios.post(`${API_BASE}/clothing-items`, data),
  updateClothingItem: (id, data) => axios.put(`${API_BASE}/clothing-items/${id}`, data),
  deleteClothingItem: (id) => axios.delete(`${API_BASE}/clothing-items/${id}`),

  // Order APIs
  getOrders: () => axios.get(`${API_BASE}/orders`),
  getOrder: (id) => axios.get(`${API_BASE}/orders/${id}`),
  createOrder: (data) => axios.post(`${API_BASE}/orders`, data),
  updateOrder: (id, data) => axios.put(`${API_BASE}/orders/${id}`, data),
  deleteOrder: (id) => axios.delete(`${API_BASE}/orders/${id}`),

  // Transaction APIs
  getTransactions: () => axios.get(`${API_BASE}/transactions`),
  getTransaction: (id) => axios.get(`${API_BASE}/transactions/${id}`),
  createTransaction: (data) => axios.post(`${API_BASE}/transactions`, data),
  updateTransaction: (id, data) => axios.put(`${API_BASE}/transactions/${id}`, data),
  deleteTransaction: (id) => axios.delete(`${API_BASE}/transactions/${id}`),

  // Review APIs
  getReviews: () => axios.get(`${API_BASE}/reviews`),
  getReview: (id) => axios.get(`${API_BASE}/reviews/${id}`),
  createReview: (data) => axios.post(`${API_BASE}/reviews`, data),
  updateReview: (id, data) => axios.put(`${API_BASE}/reviews/${id}`, data),
  deleteReview: (id) => axios.delete(`${API_BASE}/reviews/${id}`),

  // Authentication APIs
  register: (data) => axios.post(`${API_BASE}/auth/register`, data),
  login: (data) => axios.post(`${API_BASE}/auth/login`, data),
};
