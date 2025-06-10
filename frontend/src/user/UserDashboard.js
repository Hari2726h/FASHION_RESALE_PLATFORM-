import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, ListGroup, Spinner } from 'react-bootstrap';
import UserClothingView from './UserClothingView';
import { useCart } from '../component/CartContext';
import PlaceOrderButton from './PlaceOrderButton';

function UserDashboard({ user }) {
  const navigate = useNavigate();
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart,
    loading
  } = useCart();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
    window.location.reload();
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Welcome, {user.name}</h2>
        <Button variant="danger" onClick={handleLogout}>Logout</Button>
      </div>

      <p><strong>Email:</strong> {user.email}</p>
      <hr />

      <h4>Your Cart</h4>
      {loading ? (
        <Spinner animation="border" />
      ) : cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ListGroup>
          {cart.map(item => (
            <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center">
              <div>
                <strong>{item.description}</strong> - Size: {item.size} | Qty: {item.quantity}
              </div>
              <div>
                <Button variant="secondary" size="sm" onClick={() => decreaseQuantity(item.id)} disabled={item.quantity <= 1}>-</Button>{' '}
                <Button variant="secondary" size="sm" onClick={() => increaseQuantity(item.id)}>+</Button>{' '}
                <Button variant="danger" size="sm" onClick={() => removeItem(item.id)}>Remove</Button>
              </div>
            </ListGroup.Item>
          ))}
          <ListGroup.Item>
            <Button variant="warning" onClick={clearCart}>Clear Cart</Button>
          </ListGroup.Item>
        </ListGroup>
      )}

      {cart.length > 0 && (
        <div className="mt-3">
          <PlaceOrderButton userId={user.id} />
        </div>
      )}

      <hr />
      <UserClothingView userId={user.id} />
    </div>
  );
}

export default UserDashboard;
