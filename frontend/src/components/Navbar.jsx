import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api';
import 'bootstrap/dist/css/bootstrap.min.css';

function Navbar({ user }) {
  const navigate = useNavigate();
  const [reviewCount, setReviewCount] = useState(0);

  useEffect(() => {
    if (user?.role === 'ADMIN') {
      api.getAllReviews()
        .then(res => {
          const seenReviewIds = JSON.parse(localStorage.getItem('seenReviews')) || [];
          const unseen = res.data.filter(r => !seenReviewIds.includes(r.id));
          setReviewCount(unseen.length);
        })
        .catch(err => console.error('Failed to fetch reviews:', err));
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const goToOrders = () => {
    if (user?.role === 'ADMIN') {
      navigate('/admin/orders');
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg shadow-sm sticky-top"
      style={{ backgroundColor: '#6C63FF' }}
    >
      <div className="container">
        <Link className="navbar-brand text-white fw-bold fs-4" to="/">
          👗 FashionRental
        </Link>
        <button
          className="navbar-toggler text-white"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/">Home</Link>
            </li>

            {user?.role === 'ADMIN' && (
              <>
                
                <li className="nav-item">
                  <button className="btn btn-link nav-link text-white" onClick={goToOrders}>
                    Orders
                  </button>
                </li>
                <li className="nav-item position-relative">
                  <Link className="nav-link text-white" to="/admin/reviews">
                    Reviews
                    {reviewCount > 0 && (
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {reviewCount}
                      </span>
                    )}
                  </Link>
                </li>
              </>
            )}

            {user?.role === 'USER' && (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/cart">Cart</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/profile">Profile</Link>
                </li>
              </>
            )}

            <li className="nav-item ms-lg-3">
              {user ? (
                <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
                  Logout
                </button>
              ) : (
                <Link className="btn btn-light btn-sm" to="/login">
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
