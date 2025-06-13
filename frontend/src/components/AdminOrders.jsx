import React, { useEffect, useState } from 'react';
import { api } from '../api';
import 'bootstrap/dist/css/bootstrap.min.css';

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [error, setError] = useState(null);
  const [transactions, setTransactions] = useState([]);

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

 const handleSelectOrder = async (order) => {
  setSelectedOrder(order);
  try {
    const res = await api.getTransactionsByUser(order.user?.id || order.userId);
    setTransactions(res.data || []);
  } catch (err) {
    console.error("Failed to load transactions:", err);
    setTransactions([]);
  }
};
const getTransactionsForOrder = () => {
  if (!selectedOrder || !selectedOrder.clothingItems) return [];
  const itemIdsInOrder = selectedOrder.clothingItems.map(item => item.id);
  return transactions.filter(txn =>
    itemIdsInOrder.includes(txn.clothingItem?.id)
  );
};

  const handleConfirmOrder = async (orderId) => {
    try {
      await api.confirmOrder(orderId);
      alert('Order confirmed!');
      fetchOrders();
      setSelectedOrder(null);
    } catch (err) {
      console.error(err);
      alert('Failed to confirm order.');
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to delete this order?')) return;
    try {
      await api.deleteOrder(orderId);
      alert('Order deleted!');
      fetchOrders();
      setSelectedOrder(null);
    } catch (err) {
      console.error(err);
      alert('Failed to delete order.');
    }
  };

  const getGroupedItems = (items) => {
    const itemMap = {};
    for (const item of items) {
      if (itemMap[item.id]) {
        itemMap[item.id].count += 1;
      } else {
        itemMap[item.id] = { ...item, count: 1 };
      }
    }
    return Object.values(itemMap);
  };

  return (
    <div className="container mt-4">
      <h2>Admin Orders</h2>

      {loading && <p>Loading orders...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && orders.length === 0 && <p>No orders found.</p>}

      <div className="row">
        {/* Orders List */}
        <div className="col-md-6">
          <ul className="list-group mb-3">
            {orders.map((order) => (
              <li
                key={order.id}
                className={`list-group-item d-flex justify-content-between align-items-center ${
                  selectedOrder?.id === order.id ? 'active text-white bg-primary' : ''
                }`}
                style={{ cursor: 'pointer' }}
                onClick={() => handleSelectOrder(order)}
              >
                <div>
                  <strong>Order #{order.id}</strong> by User {order.user?.id || order.userId}<br />
                  Status: <span className={order.confirmed ? 'text-success' : 'text-warning'}>
                    {order.confirmed ? 'Confirmed' : 'Pending'}
                  </span>
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

        {/* Order Details */}
        <div className="col-md-6">
          {selectedOrder ? (
            <>
              <h5>Order Details - #{selectedOrder.id}</h5>
              <p><strong>User ID:</strong> {selectedOrder.user?.id || selectedOrder.userId}</p>
              <p><strong>Status:</strong>{' '}
                <span className={selectedOrder.confirmed ? 'text-success' : 'text-warning'}>
                  {selectedOrder.confirmed ? 'Confirmed' : 'Pending'}
                </span>
              </p>

              <h6>Items Ordered:</h6>
              {!selectedOrder.clothingItems || selectedOrder.clothingItems.length === 0 ? (
                <p>No items in this order.</p>
              ) : (
                <ul className="list-group">
                  {getGroupedItems(selectedOrder.clothingItems).map((item) => (
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
          <h6 className="mt-4">Transactions for this Order:</h6>
{getTransactionsForOrder().length === 0 ? (
  <p>No matching transactions found for this order.</p>
) : (
  <ul className="list-group">
    {getTransactionsForOrder().map((txn) => (
      <li key={txn.id} className="list-group-item">
        <strong>Txn #{txn.id}</strong> — ₹{txn.transactionAmount}<br />
        Item: {txn.clothingItem?.description} — Size: {txn.clothingItem?.size}<br />
        Date: {new Date(txn.transactionDate).toLocaleString()}<br />
        Status: <span className={txn.confirmed ? "text-success" : "text-warning"}>
          {txn.confirmed ? "Confirmed" : "Pending"}
        </span>
      </li>
    ))}
  </ul>
)}

        </div>
      </div>
    </div>
  );
}

export default AdminOrders;
