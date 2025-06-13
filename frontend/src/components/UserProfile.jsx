// Enhanced UserProfile.jsx with improved styling and layout
import React, { useEffect, useState } from 'react';
import { api } from '../api';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import './UserProfile.css'; // Custom styles

function UserProfile({ user }) {
  const [formData, setFormData] = useState({ name: '', password: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.updateOwnAccount(user.id, formData);
      const updatedUser = { ...user, name: res.data.name };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setMessage('✅ Profile updated successfully!');
    } catch (err) {
      setMessage('❌ Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar user={user} />
      <div className="profile-page container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow-lg border-0 animate__animated animate__fadeIn">
              <div className="card-body p-4">
                <h3 className="text-center text-primary mb-4">👤 Update Profile</h3>
                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-3">
                    <label className="form-label">Username</label>
                    <input
                      name="name"
                      type="text"
                      className="form-control"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group mb-4">
                    <label className="form-label">New Password</label>
                    <input
                      name="password"
                      type="password"
                      className="form-control"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary w-100 fw-semibold"
                    disabled={loading}
                  >
                    {loading ? 'Updating...' : 'Update Profile'}
                  </button>
                  {message && (
                    <div className="alert alert-info mt-3 text-center animate__animated animate__fadeIn">
                      {message}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default UserProfile;
