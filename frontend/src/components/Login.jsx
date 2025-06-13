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
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        const adminUser = {
          id: 'admin-0000',
          email: ADMIN_EMAIL,
          role: 'ADMIN',
          name: 'Administrator',
        };
        setUser(adminUser);
        localStorage.setItem('user', JSON.stringify(adminUser));
        navigate('/');
        return;
      }

      const res = await api.login({ email, password });
      const tokenData = res.data;

      const allUsersRes = await api.getAllUsers();
      const userInfo = allUsersRes.data.find((u) => u.email === email);

      if (!userInfo) {
        setError('User not found after login');
        return;
      }

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
    <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '90vh' }}>
      <div className="col-md-6 col-lg-5">
        <div className="card shadow border-0">
          <div className="card-body p-4">
            <h3 className="mb-4 text-center text-primary">Login to FashionRental</h3>

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-semibold">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  required
                  placeholder="Enter your email"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label fw-semibold">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  required
                  placeholder="Enter your password"
                />
              </div>

              <div className="d-grid mt-4">
                <button type="submit" className="btn btn-primary btn-block">Login</button>
              </div>
            </form>

            <p className="mt-4 text-center">
              Don't have an account? <Link to="/register" className="text-decoration-none text-primary">Register here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
