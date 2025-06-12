// src/component/Login.jsx

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../api';

const ADMIN_EMAIL = 'admin@example.com';
const ADMIN_PASSWORD = 'admin123';

function Login({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // If admin credentials entered, bypass backend login call
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        // Fake admin user data (no backend call)
        const adminUser = {
          id: 'admin-0000',
          email: ADMIN_EMAIL,
          role: 'ADMIN',
          name: 'Administrator',
          // add other fields if needed
        };
        setUser(adminUser);
        localStorage.setItem('user', JSON.stringify(adminUser));
        navigate('/');
        return;
      }

      // Normal user login flow via backend
      const res = await api.login({ email, password });
      const tokenData = res.data;

      // Fetch full user info by email
      const allUsersRes = await api.getAllUsers();
      const userInfo = allUsersRes.data.find((u) => u.email === email);

      if (!userInfo) {
        setError('User not found after login');
        return;
      }

      // Assign USER role (no admin override here)
      const userData = { ...userInfo, role: 'USER' };

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid email or password');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit} className="p-4 shadow-sm border rounded bg-light">
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
        <p className="mt-3">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
