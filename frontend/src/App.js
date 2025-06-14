import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import CartPage from './components/CartPage';
import AdminOrders from './components/AdminOrders';
import TransactionPage from './components/TransactionPage';
import AdminReviewPage from './components/AdminReviewPage';
import UserProfile from './components/UserProfile';
import MyOrders from './components/MyOrders';


function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              user.role === 'ADMIN' ? (
                <AdminDashboard user={user} setUser={setUser} />
              ) : (
                <UserDashboard user={user} setUser={setUser} />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/admin"
          element={
            user && user.role === 'ADMIN' ? (
              <AdminDashboard user={user} setUser={setUser} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/user"
          element={
            user && user.role === 'USER' ? (
              <UserDashboard user={user} setUser={setUser} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={user ? <CartPage user={user} /> : <Navigate to="/login" />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/reviews" element={<AdminReviewPage />} />
<Route path="/profile" element={<UserProfile user={user} />} />
        <Route path="/transaction" element={<TransactionPage user={user} />} />
        <Route path="/my-orders" element={<MyOrders />} />

      </Routes>
    </Router>
  );
}

export default App;