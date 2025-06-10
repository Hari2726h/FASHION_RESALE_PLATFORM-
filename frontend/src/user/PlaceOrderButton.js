// src/component/PlaceOrderButton.jsx
import React from 'react';
import { Button } from 'react-bootstrap';
// src/user/PlaceOrderButton.js
import { useCart } from '../component/CartContext'; // ✅ corrected path

import { api } from '../api';

function PlaceOrderButton({ userId }) {
  const { cart, clearCart } = useCart();

  const handlePlaceOrder = async () => {
    if (cart.length === 0) {
      alert('Your cart is empty.');
      return;
    }

    try {
      const res = await api.placeOrderFromCart(userId);
      if (res.status === 201) {
        alert('Order placed successfully!');
        clearCart();
      } else {
        alert('Failed to place order. Please try again.');
      }
    } catch (err) {
      console.error('Error placing order:', err);
      alert('Error placing order. Please check the console.');
    }
  };

  return (
    <Button
      variant="success"
      className="mt-3"
      onClick={handlePlaceOrder}
      disabled={cart.length === 0}
    >
      Place Order
    </Button>
  );
}

export default PlaceOrderButton;
