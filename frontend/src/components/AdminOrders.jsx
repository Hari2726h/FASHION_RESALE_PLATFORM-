import React, { useEffect, useState } from 'react';
import { api } from '../api';
import 'bootstrap/dist/css/bootstrap.min.css';

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderCart, setOrderCart] = useState(null);
  const [error, setError] = useState(null);

  // Fetch all orders on mount
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.getAllOrders();
      setOrders(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to load orders.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch cart details for the selected order (to see what was ordered)
  const fetchOrderCart = async (userId) => {
    try {
      const res = await api.getCartByUserId(userId);
      setOrderCart(res.data);
    } catch (err) {
      console.error('Failed to fetch cart for order:', err);
      setOrderCart(null);
    }
  };

  // When clicking an order, load details + cart
  const handleSelectOrder = async (order) => {
    setSelectedOrder(order);
    await fetchOrderCart(order.userId);
  };

  // Confirm an order
  const handleConfirmOrder = async (orderId) => {
    try {
      await api.confirmOrder(orderId);
      alert('Order confirmed!');
      fetchOrders();
      setSelectedOrder(null);
      setOrderCart(null);
    } catch (err) {
      console.error(err);
      alert('Failed to confirm order.');
    }
  };

  // Delete an order
  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to delete this order?')) return;
    try {
      await api.deleteOrder(orderId);
      alert('Order deleted!');
      fetchOrders();
      setSelectedOrder(null);
      setOrderCart(null);
    } catch (err) {
      console.error(err);
      alert('Failed to delete order.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Admin Orders</h2>

      {loading && <p>Loading orders...</p>}
      {error && <p className="text-danger">{error}</p>}

      {!loading && orders.length === 0 && <p>No orders found.</p>}

      <div className="row">
        <div className="col-md-6">
          <ul className="list-group mb-3">
            {orders.map((order) => (
              <li
                key={order.id}
                className={`list-group-item d-flex justify-content-between align-items-center ${
                  selectedOrder?.id === order.id ? 'active' : ''
                }`}
                style={{ cursor: 'pointer' }}
                onClick={() => handleSelectOrder(order)}
              >
                <div>
                  <strong>Order #{order.id}</strong> by User {order.userId} <br />
                  Status: {order.confirmed ? 'Confirmed' : 'Pending'}
                </div>
                <div>
                  <button
                    className="btn btn-sm btn-success me-2"
                    disabled={order.confirmed}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleConfirmOrder(order.id);
                    }}
                  >
                    Confirm
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteOrder(order.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-md-6">
          {selectedOrder ? (
            <>
              <h5>Order Details - #{selectedOrder.id}</h5>
              <p><strong>User ID:</strong> {selectedOrder.userId}</p>
              <p><strong>Status:</strong> {selectedOrder.confirmed ? 'Confirmed' : 'Pending'}</p>
              <h6>Items in Cart at Order Time:</h6>
              {!orderCart ? (
                <p>Loading cart details...</p>
              ) : !orderCart.clothingItems || orderCart.clothingItems.length === 0 ? (
                <p>No items in cart.</p>
              ) : (
                <ul className="list-group">
                  {orderCart.clothingItems.reduce((acc, item) => {
                    const found = acc.find(i => i.id === item.id);
                    if (found) {
                      found.count += 1;
                    } else {
                      acc.push({ ...item, count: 1 });
                    }
                    return acc;
                  }, []).map((item) => (
                    <li key={item.id} className="list-group-item">
                      {item.description} - Size: {item.size} — Quantity: {item.count}
                    </li>
                  ))}
                </ul>
              )}
            </>
          ) : (
            <p>Select an order to view details.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminOrders;
