import React, { useEffect, useState } from 'react';
import { api } from '../api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [error, setError] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
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
    const itemIds = selectedOrder.clothingItems.map(item => item.id);
    return transactions.filter(txn => itemIds.includes(txn.clothingItem?.id));
  };

  const handleConfirmOrder = async (orderId) => {
    try {
      await api.confirmOrder(orderId);
      alert('✅ Order confirmed!');
      fetchOrders();
      setSelectedOrder(null);
    } catch (err) {
      console.error(err);
      alert('❌ Failed to confirm order.');
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to delete this order?')) return;
    try {
      await api.deleteOrder(orderId);
      alert('🗑️ Order deleted!');
      fetchOrders();
      setSelectedOrder(null);
    } catch (err) {
      console.error(err);
      alert('❌ Failed to delete order.');
    }
  };

  const getGroupedItems = (items) => {
    const map = {};
    for (const item of items) {
      if (map[item.id]) {
        map[item.id].count += 1;
      } else {
        map[item.id] = { ...item, count: 1 };
      }
    }
    return Object.values(map);
  };

  return (
    <>
      <Navbar user={user} />
      <div className="container py-5">
        <h2 className="text-center text-primary fw-bold mb-4">📦 Admin Orders</h2>

        {loading && <div className="alert alert-info text-center">Loading orders...</div>}
        {error && <div className="alert alert-danger text-center">{error}</div>}
        {!loading && orders.length === 0 && (
          <div className="text-muted text-center">No orders found.</div>
        )}

        <div className="row g-4">
          {/* Orders List */}
          <div className="col-md-6">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-header bg-dark text-white fw-semibold">📋 All Orders</div>
              <ul className="list-group list-group-flush overflow-auto" style={{ maxHeight: '60vh' }}>
                {orders.map((order) => (
                  <li
                    key={order.id}
                    className={`list-group-item d-flex justify-content-between align-items-start ${selectedOrder?.id === order.id ? 'bg-light border-start border-4 border-primary' : ''}`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleSelectOrder(order)}
                  >
                    <div>
                      <span className="fw-bold">Order #{order.id}</span><br />
                      <span className="text-muted">👤 User: {order.user?.id || order.userId}</span><br />
                      <span>Status: 
                        <span className={`ms-1 badge ${order.confirmed ? 'bg-success' : 'bg-warning text-dark'}`}>
                          {order.confirmed ? 'Confirmed' : 'Pending'}
                        </span>
                      </span>
                    </div>
                    <div className="d-flex flex-column gap-2">
                      <button
                        className="btn btn-sm btn-outline-success"
                        disabled={order.confirmed}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleConfirmOrder(order.id);
                        }}
                      >
                        ✅
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteOrder(order.id);
                        }}
                      >
                        🗑️
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Order & Transactions Details */}
          <div className="col-md-6">
            {selectedOrder ? (
              <div className="card shadow-sm border-0 h-100">
                <div className="card-header bg-primary text-white fw-semibold">
                  🧾 Order Details - #{selectedOrder.id}
                </div>
                <div className="card-body">
                  <p><strong>👤 User ID:</strong> {selectedOrder.user?.id || selectedOrder.userId}</p>
                  <p><strong>Status:</strong>{' '}
                    <span className={`badge ${selectedOrder.confirmed ? 'bg-success' : 'bg-warning text-dark'}`}>
                      {selectedOrder.confirmed ? 'Confirmed' : 'Pending'}
                    </span>
                  </p>

                  <h6 className="mt-4">🛍️ Items Ordered</h6>
                  {selectedOrder.clothingItems?.length === 0 ? (
                    <p className="text-muted">No items in this order.</p>
                  ) : (
                    <ul className="list-group mb-3">
                      {getGroupedItems(selectedOrder.clothingItems).map((item) => (
                        <li key={item.id} className="list-group-item">
                          {item.description} — <strong>Size:</strong> {item.size} <span className="badge bg-secondary ms-2">×{item.count}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <h6 className="mt-4">💳 Transactions</h6>
                  {getTransactionsForOrder().length === 0 ? (
                    <p className="text-muted">No matching transactions found.</p>
                  ) : (
                    <ul className="list-group">
                      {getTransactionsForOrder().map((txn) => (
                        <li key={txn.id} className="list-group-item">
                          <strong>Txn #{txn.id}</strong> — ₹{txn.transactionAmount}<br />
                          Item: {txn.clothingItem?.description} — Size: {txn.clothingItem?.size}<br />
                          Date: {new Date(txn.transactionDate).toLocaleString()}<br />
                          Status: <span className={txn.confirmed ? "text-success fw-semibold" : "text-warning fw-semibold"}>
                            {txn.confirmed ? "Confirmed" : "Pending"}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ) : (
              <div className="card shadow-sm border-0 h-100 d-flex align-items-center justify-content-center text-muted">
                <div className="p-4">Select an order to view details.</div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AdminOrders;
