import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { api } from '../api';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TransactionPage.css';

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
          style={{ fontSize: '2rem', cursor: 'pointer', color: starValue <= (hoverRating || rating) ? '#ffc107' : '#e4e5e9' }}
        >
          ★
        </span>
      );
    });
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100">
      {stage === 'processing' && (
        <div className="text-center animate__animated animate__fadeIn">
          <div className="spinner-border text-info mb-4" style={{ width: '4rem', height: '4rem' }} role="status">
            <span className="visually-hidden">Processing...</span>
          </div>
          <h3 className="fw-bold">Processing your payment...</h3>
          <p className="text-muted">Please wait while we confirm your order.</p>
        </div>
      )}

      {stage === 'error' && (
        <div className="text-center animate__animated animate__shakeX">
          <div className="text-danger display-3">❌</div>
          <h3 className="mt-3 fw-bold">Payment Failed</h3>
          <p>Something went wrong. Redirecting you to your cart...</p>
        </div>
      )}

      {stage === 'review' && firstItem && (
        <div className="card p-4 shadow-lg animate__animated animate__fadeInUp w-100" style={{ maxWidth: '600px' }}>
          <div className="text-center">
            <div className="text-success display-4 mb-3">✅</div>
            <h3 className="fw-bold">Thanks for your purchase!</h3>
            <p className="text-muted">We value your feedback for:</p>
            <h5 className="fw-bold text-primary">{firstItem.name}</h5>
          </div>

          <div className="rating-stars d-flex justify-content-center my-3">
            {renderStars()}
          </div>

          <div className="my-3">
            <textarea
              className="form-control shadow-sm"
              placeholder="Tell us what you liked (or didn't)..."
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          <div className="d-flex justify-content-between mt-4">
            <button className="btn btn-success px-4 fw-bold" onClick={handleSubmitReview}>
              Submit Review
            </button>
            <button className="btn btn-outline-secondary px-4" onClick={handleSkipReview}>
              Skip
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TransactionPage;
