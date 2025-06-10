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
      const res = await api.login({ email, password });
      const tokenData = res.data;

      if (email === ADMIN_EMAIL) {
        setUser({ ...tokenData, role: 'ADMIN' });
        localStorage.setItem('user', JSON.stringify({ ...tokenData, role: 'ADMIN' }));
        navigate('/');
        return;
      }

      setUser({ ...tokenData, role: 'USER' });
      localStorage.setItem('user', JSON.stringify({ ...tokenData, role: 'USER' }));
      navigate('/');
    } catch (err) {
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
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" required />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" required />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
        <p className="mt-3">Don't have an account? <Link to="/register">Register</Link></p>
      </form>
    </div>
  );
}

export default Login;
