import axios from 'axios';

const API_BASE = 'http://localhost:8080/api';

export const api = {
  // 🔐 Auth & User
  register: (data) => axios.post(`${API_BASE}/auth/register`, data),
  login: (data) => axios.post(`${API_BASE}/auth/login`, data),
  updateUser: (id, data) => axios.put(`${API_BASE}/admin/users/${id}`, data),
  getUserById: (id) => axios.get(`${API_BASE}/admin/users/${id}`),
  getAllUsers: () => axios.get(`${API_BASE}/admin/users`),
  deleteUser: (id) => axios.delete(`${API_BASE}/admin/users/${id}`),
  updateOwnAccount: (id, data) => axios.put(`${API_BASE}/account/${id}`, data),

// Clothing Items
  getAllClothingItems: () => axios.get(`${API_BASE}/clothing-items`),
  getClothingItemById: (id) => axios.get(`${API_BASE}/clothing-items/${id}`),
  createClothingItem: (data) => axios.post(`${API_BASE}/clothing-items`, data),
  updateClothingItem: (id, data) => axios.put(`${API_BASE}/clothing-items/${id}`, data),
  deleteClothingItem: (id) => axios.delete(`${API_BASE}/clothing-items/${id}`),

  // Cart
  getCartByUserId: (userId) => axios.get(`${API_BASE}/carts/${userId}`),
  addItemToCart: (userId, itemId) =>
    axios.post(`${API_BASE}/carts/${userId}/add/${itemId}`),
  removeItemFromCart: (userId, itemId) => axios.delete(`${API_BASE}/carts/${userId}/remove/${itemId}`),
  clearCart: (userId) => axios.delete(`${API_BASE}/carts/${userId}/clear`),
  // 📦 Orders
  getAllOrders: () => axios.get(`${API_BASE}/orders`), // Admin
  confirmOrder: (orderId) => axios.put(`${API_BASE}/orders/${orderId}/confirm`), // Admin
  placeOrderFromCart: (userId) => axios.post(`${API_BASE}/orders/user/${userId}/place`), // User
  getUserOrder: (userId, orderId) => axios.get(`${API_BASE}/orders/user/${userId}/${orderId}`), // User
  deleteOrder: (orderId) => axios.delete(`${API_BASE}/orders/${orderId}`), // Admin or User

  // ⭐ Reviews
  getAllReviews: () => axios.get(`${API_BASE}/reviews`),
  getUserReviews: (userId) => axios.get(`${API_BASE}/reviews/user/${userId}`),
  getReviewById: (id) => axios.get(`${API_BASE}/reviews/${id}`),
 createReview: (userId, itemId, data) =>
  axios.post(`${API_BASE}/reviews/user/${userId}/item/${itemId}`, data),
  updateReview: (id, reviewData) => axios.put(`${API_BASE}/reviews/${id}`, reviewData),
  deleteReview: (id) => axios.delete(`${API_BASE}/reviews/${id}`),

  // 💰 Transactions
  getAllTransactions: () => axios.get(`${API_BASE}/transactions`),
  getTransactionsByUser: (userId) => axios.get(`${API_BASE}/transactions/user/${userId}`),
  getTransactionById: (id) => axios.get(`${API_BASE}/transactions/${id}`),
  createTransaction: (userId, itemId, amount) =>
    axios.post(`${API_BASE}/transactions/user/${userId}/item/${itemId}`, { amount }),
  confirmTransaction: (id) => axios.put(`${API_BASE}/transactions/${id}/confirm`),
  deleteTransaction: (id) => axios.delete(`${API_BASE}/transactions/${id}`),
};
