import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserManagement from './UserManagement';
import ClothingManagement from './ClothingManagement';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';
import Footer from './Footer';

function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <>
      <Navbar user={{ role: 'ADMIN' }} />
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Admin Dashboard</h2>
          <div>
            <button
              className="btn btn-secondary me-2"
              onClick={() => navigate('/admin/orders')}
            >
              View Orders
            </button>
            {/* <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button> */}
          </div>
        </div>

        <UserManagement />
        <ClothingManagement />
      </div>
      <Footer />
    </>
  );
}

export default AdminDashboard;
