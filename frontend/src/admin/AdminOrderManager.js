// src/pages/AdminOrderManager.jsx
import React, { useEffect, useState } from 'react';
import { api } from '../api';
import { Button, Table } from 'react-bootstrap';

function AdminOrderManager() {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const res = await api.getAllOrders();
      setOrders(res.data || []);
    } catch (error) {
      alert('Error loading orders');
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const confirmOrder = async (orderId) => {
    try {
      await api.confirmOrder(orderId);
      alert('Order confirmed');
      fetchAllOrders(); // refresh
    } catch (err) {
      alert('Error confirming order');
    }
  };

  return (
    <div className="container mt-5">
      <h2>All Orders</h2>
      <Table bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Items</th>
            <th>Confirmed</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr><td colSpan="5">No orders found.</td></tr>
          ) : (
            orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.user?.name}</td>
                <td>
                  {order.clothingItems.map(item => (
                    <div key={item.id}>{item.description}</div>
                  ))}
                </td>
                <td>{order.confirmed ? 'Yes' : 'No'}</td>
                <td>
                  {!order.confirmed && (
                    <Button size="sm" onClick={() => confirmOrder(order.id)}>Confirm</Button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default AdminOrderManager;
