import React, { useEffect, useState } from 'react';
import { api } from '../api';
import { useNavigate } from 'react-router-dom';

function UserProfile({ user }) {
  const [formData, setFormData] = useState({ name: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      setFormData({ name: user.name, password: '' });
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.updateOwnAccount(user.id, formData)

      .then(res => {
        const updatedUser = { ...user, name: res.data.name }; // Update name locally
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setMessage('Profile updated successfully ✅');
      })
      .catch(() => setMessage('Failed to update profile ❌'));
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-4 text-primary">👤 User Profile</h3>
      <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
        <div className="mb-3">
          <label className="form-label">Username:</label>
          <input
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">New Password:</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button className="btn btn-primary w-100" type="submit">Update Profile</button>

        {message && (
          <div className="mt-3 alert alert-info">{message}</div>
        )}
      </form>
    </div>
  );
}

export default UserProfile;
