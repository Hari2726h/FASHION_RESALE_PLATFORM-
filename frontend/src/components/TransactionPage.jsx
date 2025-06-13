import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { api } from '../api';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TransactionPage.css'; // 💡 Custom CSS for star rating

function TransactionPage({ user }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalAmount } = location.state || {};
  const [stage, setStage] = useState('processing');
  const [firstItem, setFirstItem] = useState(null);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const processTransactionAndPlaceOrder = async () => {
      if (!user || !totalAmount) {
        alert('Missing user or amount');
        navigate('/cart');
        return;
      }

      try {
        const cart = await api.getCartByUserId(user.id);
        const item = cart.data.clothingItems?.[0];
        if (!item) {
          alert('Cart is empty');
          navigate('/cart');
          return;
        }
        setFirstItem(item);

        setTimeout(async () => {
          await api.createTransaction(user.id, item.id, totalAmount);
          await api.placeOrderFromCart(user.id);
          setStage('review');
        }, 2000);
      } catch (error) {
        console.error('Transaction failed:', error);
        setStage('error');
        setTimeout(() => {
          navigate('/cart');
        }, 2000);
      }
    };

    processTransactionAndPlaceOrder();
  }, [user, totalAmount, navigate]);

  const handleSubmitReview = async () => {
    try {
      await api.createReview(user.id, firstItem.id, {
        reviewText: comment,
        rating: rating
      });
      alert('✅ Thank you for your feedback!');
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('⚠️ Could not submit review.');
    } finally {
      navigate('/user');
    }
  };

  const handleSkipReview = () => {
    navigate('/user');
  };

  const renderStars = () => {
    return [...Array(5)].map((_, i) => {
      const starValue = i + 1;
      return (
        <span
          key={i}
          className={`star ${starValue <= (hoverRating || rating) ? 'filled' : ''}`}
          onClick={() => setRating(starValue)}
          onMouseEnter={() => setHoverRating(starValue)}
          onMouseLeave={() => setHoverRating(0)}
        >
          ★
        </span>
      );
    });
  };

  return (
    <div className="container mt-5 text-center">
      {stage === 'processing' && (
        <>
          <div className="spinner-border text-primary mb-4" role="status" style={{ width: '4rem', height: '4rem' }}>
            <span className="visually-hidden">Processing...</span>
          </div>
          <h3>Processing your payment...</h3>
          <p className="text-muted">Do not refresh or close this page.</p>
        </>
      )}

      {stage === 'error' && (
        <>
          <div className="text-danger display-4">❌</div>
          <h3 className="mt-3">Payment Failed</h3>
          <p>Something went wrong. Redirecting to cart...</p>
        </>
      )}

      {stage === 'review' && firstItem && (
        <>
          <div className="text-success display-4 mb-3">✅</div>
          <h3>Thank you for your purchase!</h3>
          <p className="text-muted">Please rate your experience with:</p>
          <h5 className="fw-bold">{firstItem.name}</h5>

          <div className="rating-stars my-3">{renderStars()}</div>

          <div className="my-3">
            <textarea
              className="form-control w-75 mx-auto shadow-sm"
              placeholder="Leave a quick comment (optional)"
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          <div className="mt-4">
            <button className="btn btn-success me-3 px-4" onClick={handleSubmitReview}>
              Submit Review
            </button>
            <button className="btn btn-outline-secondary px-4" onClick={handleSkipReview}>
              Skip
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default TransactionPage;
