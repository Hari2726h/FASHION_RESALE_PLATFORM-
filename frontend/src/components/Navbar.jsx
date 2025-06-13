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
        .then(res => setReviewCount(res.data.length))
        .catch(err => console.error('Failed to fetch reviews:', err));
    }
  }, [user]);
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

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">👗 FashionRental</Link>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto">
          {user?.role === 'ADMIN' && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/admin">Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/orders">Orders</Link>
              </li>
              <li className="nav-item position-relative">
                <Link className="nav-link" to="/admin/reviews">
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
                <Link className="nav-link" to="/user">Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cart">Cart</Link>
              </li>
              <li className="nav-item">
  <Link className="nav-link" to="/profile">Profile</Link>
</li>

            </>
          )}
        </ul>
        <span className="navbar-text me-3">
          {user?.name}
        </span>
        <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
