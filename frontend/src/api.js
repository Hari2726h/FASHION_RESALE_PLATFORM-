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

  // 👕 Clothing Items
  getAllClothingItems: () => axios.get(`${API_BASE}/clothing-items`),
  getClothingItemById: (id) => axios.get(`${API_BASE}/clothing-items/${id}`),
  createClothingItem: (data) => axios.post(`${API_BASE}/clothing-items`, data),
  updateClothingItem: (id, data) => axios.put(`${API_BASE}/clothing-items/${id}`, data),
  deleteClothingItem: (id) => axios.delete(`${API_BASE}/clothing-items/${id}`),

  // 🛒 Cart
  getCartByUserId: (userId) => axios.get(`${API_BASE}/cart/${userId}`),
 addToCart: (userId, itemId) =>
  axios.post(`${API_BASE}/cart/${userId}/add/${itemId}`),
  removeItemFromCart: (userId, itemId) => axios.delete(`${API_BASE}/cart/${userId}/remove/${itemId}`),
  updateCartItemQuantity: (userId, itemId, quantity) =>
    axios.put(`${API_BASE}/cart/${userId}/item/${itemId}`, { quantity }),
  clearCart: (userId) => axios.delete(`${API_BASE}/cart/${userId}/clear`),

  // 📦 Orders
  placeOrderFromCart: (userId) => axios.post(`${API_BASE}/orders/user/${userId}/place`),
  getOrdersByUserId: (userId) => axios.get(`${API_BASE}/orders/user/${userId}`),
  getAllOrders: () => axios.get(`${API_BASE}/orders`),
  confirmOrder: (orderId) => axios.put(`${API_BASE}/orders/${orderId}/confirm`),
  deleteOrder: (orderId) => axios.delete(`${API_BASE}/orders/${orderId}`),
};
