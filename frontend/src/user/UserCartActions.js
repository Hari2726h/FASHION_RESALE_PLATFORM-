import React, { useState } from 'react';
import { api } from '../api';

const UserCartActions = ({ userId, onOrderPlaced }) => {
  const [loading, setLoading] = useState(false);

  const placeOrder = async () => {
    setLoading(true);
    try {
      await api.placeOrderFromCart(userId);
      alert('Order placed successfully!');
      onOrderPlaced(); // callback to refresh cart or orders
    } catch (err) {
      alert('Failed to place order.');
    }
    setLoading(false);
  };

  return (
    <button className="btn btn-success mt-3" onClick={placeOrder} disabled={loading}>
      {loading ? 'Placing Order...' : 'Place Order'}
    </button>
  );
};

export default UserCartActions;
