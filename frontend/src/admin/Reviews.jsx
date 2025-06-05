import React, { useEffect, useState } from "react";
import { api } from "../api/api";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await api.getReviews();
      setReviews(res.data);
    } catch (error) {
      console.error("Failed to fetch reviews", error);
    }
  };

  const approveReview = async (id) => {
    try {
      const review = reviews.find(r => r.id === id);
      if (!review) return;
      const updatedReview = { ...review, approved: true };
      await api.updateReview(id, updatedReview);
      setReviews(reviews.map(r => (r.id === id ? updatedReview : r)));
    } catch (error) {
      console.error("Failed to approve review", error);
    }
  };

  const removeReview = async (id) => {
    if (window.confirm("Remove this review?")) {
      try {
        await api.deleteReview(id);
        setReviews(reviews.filter(r => r.id !== id));
      } catch (error) {
        console.error("Failed to remove review", error);
      }
    }
  };

  return (
    <div>
      <h1>Product Reviews</h1>
      <table border="1" cellPadding="8" style={{ marginTop: 10 }}>
        <thead>
          <tr>
            <th>Product</th>
            <th>User</th>
            <th>Rating</th>
            <th>Comment</th>
            <th>Approved</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map(review => (
            <tr key={review.id}>
              <td>{review.productName || "Unknown"}</td>
              <td>{review.userName || "Anonymous"}</td>
              <td>{review.rating}</td>
              <td>{review.comment}</td>
              <td>{review.approved ? "Yes" : "No"}</td>
              <td>
                {!review.approved && (
                  <button onClick={() => approveReview(review.id)}>Approve</button>
                )}
                <button onClick={() => removeReview(review.id)}>Remove</button>
              </td>
            </tr>
          ))}
          {reviews.length === 0 && (
            <tr>
              <td colSpan="6">No reviews found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Reviews;
