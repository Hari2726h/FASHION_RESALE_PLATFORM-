import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserManagement from './UserManagement';
import ClothingManagement from './ClothingManagement';
import Navbar from './Navbar';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar user={{ role: 'ADMIN' }} />
      <div className="container py-4">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
          <h2 className="text-primary mb-3 mb-md-0">Welcome Admin 👨‍💼</h2>
          <button
            className="btn btn-outline-dark"
            onClick={() => navigate('/admin/orders')}
          >
            📦 View Orders
          </button>
        </div>
        {/* Section: Clothing Inventory */}
        <div className="mb-5">
          <div className="mb-3">
            <h4 className="text-secondary fw-semibold border-bottom pb-2">👗 Clothing Inventory</h4>
          </div>
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <ClothingManagement />
            </div>
          </div>
        </div>

        {/* Section: User Management */}
        <div className="mb-5">
          <div className="mb-3">
            <h4 className="text-secondary fw-semibold border-bottom pb-2">👥 User Management</h4>
          </div>
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <UserManagement />
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </>
  );
}

export default AdminDashboard;
