import React, { useEffect, useState } from 'react';
import { api } from '../api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
    if (storedUser) fetchMyOrders(storedUser.id);
  }, []);

  const fetchMyOrders = async (userId) => {
    setLoading(true);
    try {
      const res = await api.getOrdersByUser(userId);
      setOrders(res.data);
    } catch (err) {
      console.error('Error fetching user orders:', err);
    } finally {
      setLoading(false);
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
        <h2 className="text-center text-primary fw-bold mb-4">🧾 My Orders</h2>
        {loading ? (
          <div className="alert alert-info text-center">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="text-muted text-center">You have no orders yet.</div>
        ) : (
          <div className="row g-4">
            {orders.map((order) => (
              <div className="col-md-6 col-lg-4" key={order.id}>
                <div className="card shadow-sm border-0 h-100">
                  <div className="card-header bg-dark text-white fw-semibold">
                    Order #{order.id}
                  </div>
                  <div className="card-body">
                    <p>
                      <strong>Status:</strong>{' '}
                      <span className={`badge ${order.confirmed ? 'bg-success' : 'bg-warning text-dark'}`}>
                        {order.confirmed ? 'Confirmed' : 'Pending'}
                      </span>
                    </p>

                    <h6 className="mt-3">🛍️ Items</h6>
                    {order.clothingItems?.length === 0 ? (
                      <p className="text-muted">No items in this order.</p>
                    ) : (
                      <ul className="list-group">
                        {getGroupedItems(order.clothingItems).map((item) => (
                          <li key={item.id} className="list-group-item d-flex justify-content-between">
                            <div>
                              {item.description} <br />
                              <small className="text-muted">Size: {item.size}</small>
                            </div>
                            <span className="badge bg-secondary align-self-center">×{item.count}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="card-footer text-end">
                    <small className="text-muted">Placed on: {new Date(order.createdAt).toLocaleDateString()}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default MyOrders;
