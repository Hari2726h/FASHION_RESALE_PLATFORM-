import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './component/Login';
import Register from './component/Register';
import UserDashboard from './user/UserDashboard';
import AdminDashboard from './admin/AdminDashboard';
import UpdateAccount from './user/UpdateAccount';
import AdminClothingManager from './admin/AdminClothingManager';
import UserClothingView from './user/UserClothingView';
import AdminUserManager from './admin/AdminUserManager';
import { CartProvider } from './component/CartContext'; // ✅ Add this
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  const logout = () => {
    localStorage.removeItem('user');
    window.location.reload(); // full reload so context resets
  };

  if (!user) {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    );
  }

  return (
    <CartProvider user={user}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={user.role === 'ADMIN' ? (
              <AdminDashboard user={user} logout={logout} />
            ) : (
              <UserDashboard user={user} logout={logout} />
            )}
          />
          <Route path="/account/update" element={<UpdateAccount user={user} setUser={setUser} />} />

          {user.role === 'ADMIN' && (
            <>
              <Route path="/admin/clothing" element={<AdminClothingManager />} />
              <Route path="/admin/users" element={<AdminUserManager />} />
            </>
          )}

          {user.role === 'USER' && (
            <Route path="/clothing" element={<UserClothingView userId={user.id} />} />
          )}

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
