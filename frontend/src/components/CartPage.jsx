import React, { useEffect, useState } from 'react';
import { api } from '../api';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Footer';
import Navbar from './Navbar';

function CartPage({ user }) {
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      fetchCart();
    }
  }, [user]);

  const fetchCart = async () => {
    try {
      const res = await api.getCartByUserId(user.id);
      setCart(res.data);
    } catch (error) {
      console.error('Failed to load cart:', error);
    }
  };

  const getCartItemsWithCount = () => {
    if (!cart?.clothingItems) return [];
    const counts = {};
    cart.clothingItems.forEach((item) => {
      if (counts[item.id]) {
        counts[item.id].count += 1;
      } else {
        counts[item.id] = { ...item, count: 1 };
      }
    });
    return Object.values(counts);
  };

  const updateItemCountLocally = (itemId, change) => {
    if (!cart) return;
    const items = [...cart.clothingItems];
    if (change > 0) {
      const itemToAdd = items.find((item) => item.id === itemId);
      if (itemToAdd) items.push(itemToAdd);
    } else {
      const indexToRemove = items.findIndex((item) => item.id === itemId);
      if (indexToRemove !== -1) items.splice(indexToRemove, 1);
    }
    setCart({ ...cart, clothingItems: items });
  };

  const handleIncrease = async (itemId) => {
    try {
      updateItemCountLocally(itemId, 1);
      await api.addItemToCart(user.id, itemId);
    } catch (error) {
      console.error('Failed to increase item count:', error);
      updateItemCountLocally(itemId, -1);
    }
  };

  const handleDecrease = async (itemId) => {
    const currentCount = getCartItemsWithCount().find(item => item.id === itemId)?.count || 0;
    if (currentCount === 1) {
      await handleRemove(itemId);
    } else {
      try {
        updateItemCountLocally(itemId, -1);
        await api.removeItemFromCart(user.id, itemId);
      } catch (error) {
        console.error('Failed to decrease item count:', error);
        updateItemCountLocally(itemId, 1);
      }
    }
  };

  const handleRemove = async (itemId) => {
    try {
      await api.removeItemFromCart(user.id, itemId, true);
      await fetchCart();
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
  };

  const handleClearCart = async () => {
    try {
      await api.clearCart(user.id);
      setCart({ ...cart, clothingItems: [] });
    } catch (error) {
      console.error('Failed to clear cart:', error);
    }
  };

  const handlePlaceOrder = () => {
    if (!cart?.clothingItems?.length) return;
    const totalAmount = cart.clothingItems.length * 100;
    navigate('/transaction', { state: { totalAmount } });
  };

  const cartItems = getCartItemsWithCount();
  const totalPrice = cart?.clothingItems?.length * 100 || 0;

  return (
    <>
      <Navbar user={user} />
      <div className="container mt-5">
        <h2 className="mb-4">🛒 Your Shopping Cart</h2>

        {(!cart || !cart.clothingItems.length) ? (
          <div className="alert alert-info text-center">Your cart is empty. Go add something fashionable!</div>
        ) : (
          <div className="card shadow-sm">
            <div className="card-body">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Description</th>
                    <th>Size</th>
                    <th>Qty</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map(item => (
                    <tr key={item.id}>
                      <td>{item.description}</td>
                      <td>{item.size}</td>
                      <td className="text-center fw-bold">{item.count}</td>
                      <td className="text-end">
                        <div className="btn-group">
                          <button
                            className="btn btn-outline-success btn-sm"
                            onClick={() => handleIncrease(item.id)}
                            title="Increase"
                          >
                            ➕
                          </button>
                          <button
                            className="btn btn-outline-warning btn-sm"
                            onClick={() => handleDecrease(item.id)}
                            title="Decrease"
                          >
                            ➖
                          </button>
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleRemove(item.id)}
                            title="Remove All"
                          >
                            ❌
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="d-flex justify-content-between align-items-center mt-4">
                <div>
                  <button className="btn btn-outline-danger me-2" onClick={handleClearCart}>
                    🧹 Clear Cart
                  </button>
                  <button className="btn btn-success" onClick={handlePlaceOrder}>
                    ✅ Place Order ({cart?.clothingItems?.length} items, ₹{totalPrice})
                  </button>
                </div>
                <div className="fw-bold text-success">
                  Total: ₹{totalPrice}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default CartPage;
