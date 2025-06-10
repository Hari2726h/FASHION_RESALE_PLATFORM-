import React, { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../api';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (user) fetchCart(user.id);
    else setLoading(false);
  }, []);

  const fetchCart = async (userId) => {
    try {
      const res = await api.getCartByUserId(userId);
      setCart(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('fetchCart error:', err.response || err.message);
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (item) => {
    if (!user) return;
    setLoading(true);
    try {
      console.log("Adding item:", item.id);
      await api.addToCart(user.id, item.id);
      await fetchCart(user.id);
    } catch (err) {
      console.error('addItem error:', err.response || err.message);
    } finally {
      setLoading(false);
    }
  };

  const increaseQuantity = async (itemId) => {
    const item = cart.find(i => i.id === itemId);
    if (!item) return;
    try {
      await api.updateCartItemQuantity(user.id, itemId, item.quantity + 1);
      await fetchCart(user.id);
    } catch (err) {
      console.error('increaseQuantity error:', err.response || err.message);
    }
  };

  const decreaseQuantity = async (itemId) => {
    const item = cart.find(i => i.id === itemId);
    if (!item || item.quantity <= 1) return;
    try {
      await api.updateCartItemQuantity(user.id, itemId, item.quantity - 1);
      await fetchCart(user.id);
    } catch (err) {
      console.error('decreaseQuantity error:', err.response || err.message);
    }
  };

  const removeItem = async (itemId) => {
    try {
      await api.removeItemFromCart(user.id, itemId);
      await fetchCart(user.id);
    } catch (err) {
      console.error('removeItem error:', err.response || err.message);
    }
  };

  const clearCart = async () => {
    try {
      await api.clearCart(user.id);
      await fetchCart(user.id);
    } catch (err) {
      console.error('clearCart error:', err.response || err.message);
    }
  };

  return (
    <CartContext.Provider value={{
      cart,
      loading,
      addItem,
      increaseQuantity,
      decreaseQuantity,
      removeItem,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
