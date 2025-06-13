import React, { useEffect, useState } from 'react';
import { api } from '../api';
import { FaStar } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function AdminReviewPage() {
  const [reviews, setReviews] = useState([]);
  const [seenReviewIds, setSeenReviewIds] = useState([]);
  const [user, setUser] = useState(null); // ✅ Add this

  useEffect(() => {
    // ✅ Load logged-in user from localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);

    api.getAllReviews()
      .then(res => {
        setReviews(res.data);
        const seen = res.data.map(r => r.id);
        localStorage.setItem('seenReviews', JSON.stringify(seen));
        setSeenReviewIds(seen);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <Navbar user={user} /> {/* ✅ Pass user to Navbar */}

      <div className="container py-4">
        <h3 className="text-center text-primary mb-4">📝 User Reviews</h3>

        <div className="card shadow-sm border-0">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover table-bordered align-middle">
                <thead className="table-dark text-center">
                  <tr>
                    <th>#</th>
                    <th>User</th>
                    <th>Item</th>
                    <th>Rating</th>
                    <th>Review</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.map((r, index) => (
                    <tr
                      key={r.id}
                      className={!seenReviewIds.includes(r.id) ? 'table-warning' : ''}
                    >
                      <td className="text-center fw-bold">{index + 1}</td>
                      <td className="text-center">
                        <span className="badge bg-info text-dark">
                          {r.user?.id ?? 'N/A'}
                        </span>
                      </td>
                      <td className="text-center">
                        <span className="badge bg-secondary">
                          {r.item?.id ?? 'N/A'}
                        </span>
                      </td>
                      <td className="text-center text-warning fs-5">
                        {r.rating} <FaStar className="mb-1" />
                      </td>
                      <td>{r.reviewText}</td>
                      <td className="text-center">
                        {new Date(r.reviewDate).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                  {reviews.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center text-muted py-4">
                        No reviews available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default AdminReviewPage;
