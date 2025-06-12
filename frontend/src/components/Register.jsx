import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';

const UserDashboard = ({ user, setUser }) => {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.id) return;

    api.getAllClothingItems()
      .then((res) => setItems(res.data))
      .catch((err) => console.error('Failed to load items', err));

    api.getCartByUserId(user.id)
      .then((res) => setCart(res.data))
      .catch((err) => console.error('Failed to load cart', err));
  }, [user]);

  const handleAddToCart = (itemId) => {
    api.addItemToCart(user.id, itemId)
      .then(() => api.getCartByUserId(user.id))
      .then((res) => setCart(res.data))
      .catch((err) => console.error('Error adding to cart:', err));
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-4">
        <h3>Welcome, {user.name}</h3>
        <button className="btn btn-danger" onClick={logout}>Logout</button>
      </div>

      <h4>Available Clothing</h4>
      <div className="row">
        {items.length === 0 ? (
          <p>No items available.</p>
        ) : (
          items.map(item => (
            <div className="col-md-4" key={item.id}>
              <div className="card mb-3">
                <div className="card-body">
                  <p>{item.description}</p>
                  <p>Size: {item.size}</p>
                  <button className="btn btn-primary" onClick={() => handleAddToCart(item.id)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <h4 className="mt-4">Your Cart</h4>
      <ul className="list-group">
        {cart?.clothingItems?.length ? (
          cart.clothingItems.map((item, idx) => (
            <li key={idx} className="list-group-item">
              {item.description} - Size: {item.size}
            </li>
          ))
        ) : (
          <li className="list-group-item">Cart is empty</li>
        )}
      </ul>
    </div>
  );
};

export default UserDashboard;
