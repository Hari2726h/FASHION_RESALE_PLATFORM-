import React, { useEffect, useState } from 'react';
import { api } from '../api';
import { FaStar } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

function AdminReviewPage() {
  const [reviews, setReviews] = useState([]);
  const [seenReviewIds, setSeenReviewIds] = useState([]);

  useEffect(() => {
    api.getAllReviews()
      .then(res => {
        setReviews(res.data);

        // Store seen review IDs in localStorage
        const seen = res.data.map(r => r.id);
        localStorage.setItem('seenReviews', JSON.stringify(seen));
        setSeenReviewIds(seen);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="mb-4 text-center text-primary">📝 User Reviews</h3>

      <div className="table-responsive shadow rounded">
        <table className="table table-hover table-bordered">
          <thead className="table-dark">
            <tr className="text-center">
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
              <tr key={r.id} className={!seenReviewIds.includes(r.id) ? 'table-warning' : ''}>
                <td className="text-center">{index + 1}</td>
                <td className="text-center">
                  <span className="badge bg-info text-dark">{r.user?.id ?? 'N/A'}</span>
                </td>
                <td className="text-center">
                  <span className="badge bg-secondary">{r.item?.id ?? 'N/A'}</span>
                </td>
                <td className="text-center text-warning">
                  {r.rating} <FaStar className="mb-1" />
                </td>
                <td>{r.reviewText}</td>
                <td className="text-center">{new Date(r.reviewDate).toLocaleDateString()}</td>
              </tr>
            ))}
            {reviews.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center text-muted">
                  No reviews available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminReviewPage;
