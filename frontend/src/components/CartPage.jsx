import React, { useEffect, useState } from 'react';
import { api } from '../api';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

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

  // Helper to get items grouped by id with count
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

  // Optimistically update cart in state
  const updateItemCountLocally = (itemId, change) => {
    if (!cart) return;
    const items = [...cart.clothingItems];
    if (change > 0) {
      // Add one item with the itemId to the clothingItems array
      // Assuming clothingItems contains multiple identical items for quantity
      const itemToAdd = items.find((item) => item.id === itemId);
      if (itemToAdd) {
        items.push(itemToAdd); // add one more
      }
    } else if (change < 0) {
      // Remove one item with itemId from the array
      const indexToRemove = items.findIndex((item) => item.id === itemId);
      if (indexToRemove !== -1) {
        items.splice(indexToRemove, 1);
      }
    }
    setCart({ ...cart, clothingItems: items });
  };

  const handleIncrease = async (itemId) => {
    try {
      // Optimistically update UI
      updateItemCountLocally(itemId, 1);
      // Call API to update backend
      await api.addItemToCart(user.id, itemId);
      // Optionally fetch updated cart from server
      // await fetchCart();
    } catch (error) {
      console.error('Failed to increase item count:', error);
      // Revert optimistic update
      updateItemCountLocally(itemId, -1);
    }
  };

 const handleDecrease = async (itemId) => {
  const currentCount = getCartItemsWithCount().find(item => item.id === itemId)?.count || 0;

  if (currentCount === 1) {
    // If only one item left, remove it entirely
    await handleRemove(itemId);
  } else {
    try {
      updateItemCountLocally(itemId, -1);
      await api.removeItemFromCart(user.id, itemId);
    } catch (error) {
      console.error('Failed to decrease item count:', error);
      updateItemCountLocally(itemId, 1); // revert
    }
  }
};


  const handleRemove = async (itemId) => {
    try {
      await api.removeItemFromCart(user.id, itemId, true); // Assuming this clears all quantities of this item, or you can loop to remove all
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

  const handlePlaceOrder = async () => {
  if (!cart?.clothingItems?.length) return;

  const totalAmount = cart.clothingItems.length * 100; // 💵 For example, ₹100/item

  navigate('/transaction', {
    state: { totalAmount }
  });
};


  return (
    <div className="container mt-5">
      <h2>Your Cart</h2>
      {!cart || !cart.clothingItems.length ? (
        <p className="text-muted">🛒 Your cart is empty.</p>
      ) : (
        <>
          <table className="table table-bordered mt-4 align-middle">
            <thead className="table-light">
              <tr>
                <th>Description</th>
                <th>Size</th>
                <th style={{ width: '120px' }}>Quantity</th>
                <th style={{ width: '220px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {getCartItemsWithCount().map((item) => (
                <tr key={item.id}>
                  <td>{item.description}</td>
                  <td>{item.size}</td>
                  <td className="text-center align-middle">{item.count}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-success me-2"
                      onClick={() => handleIncrease(item.id)}
                      aria-label={`Increase quantity of ${item.description}`}
                    >
                      ➕
                    </button>
                    <button
  className="btn btn-sm btn-warning me-2"
  onClick={() => handleDecrease(item.id)}
  aria-label={`Decrease quantity of ${item.description}`}
>

                      ➖
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleRemove(item.id)}
                      aria-label={`Remove all ${item.description} from cart`}
                    >
                      ❌ Remove All
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="d-flex justify-content-between mt-3">
            <button className="btn btn-outline-danger" onClick={handleClearCart}>
              🧹 Clear Cart
            </button>
            <button className="btn btn-success" onClick={handlePlaceOrder}>
              ✅ Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
