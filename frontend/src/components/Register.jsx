import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../api';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const existingUsers = await api.getAllUsers();
      const exists = existingUsers.data.find((user) => user.email === formData.email);
      if (exists) {
        setError('User with this email already exists.');
        return;
      }

      const newUser = {
        ...formData,
        role: 'USER'
      };

      await api.register(newUser);

      // Optional: Store data locally if needed
      localStorage.setItem('user_registered', JSON.stringify(newUser));

      // Redirect to login
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 1500); // Wait for a short message display
    } catch (err) {
      console.error('Registration error:', err);
      setError('Something went wrong during registration');
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '90vh' }}>
      <div className="col-md-6 col-lg-5">
        <div className="card shadow border-0">
          <div className="card-body p-4">
            <h3 className="mb-4 text-center text-primary">Create an Account</h3>

            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label fw-semibold">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control"
                  required
                  placeholder="Enter your name"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-semibold">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
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
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-control"
                  required
                  placeholder="Create a password"
                />
              </div>

              <div className="d-grid mt-4">
                <button type="submit" className="btn btn-success btn-block">Register</button>
              </div>
            </form>

            <p className="mt-4 text-center">
              Already have an account? <Link to="/login" className="text-decoration-none text-primary">Login here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
