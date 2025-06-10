import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useCart } from '../component/CartContext';
import { api } from '../api';

function UserClothingView({ userId }) {
  const [clothingItems, setClothingItems] = useState([]);

  const {
    cart,
    addItem,
    increaseQuantity,
    decreaseQuantity,
    removeItem
  } = useCart();

  useEffect(() => {
    fetchClothingItems();
  }, []);

  const fetchClothingItems = async () => {
    try {
      const res = await api.getAllClothingItems();
      setClothingItems(res.data || []);
    } catch (err) {
      alert('Failed to fetch clothing items');
    }
  };

  const handleAddToCart = async (item) => {
    try {
      await addItem(item);
    } catch (err) {
      console.error('Error adding to cart', err);
    }
  };

  const isInCart = (id) => {
    return cart.find(item => item.id === id);
  };

  return (
    <div className="container mt-4">
      <h4>Available Clothing Items</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Description</th>
            <th>Size</th>
            <th>Quantity in Cart</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clothingItems.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">No items available.</td>
            </tr>
          ) : (
            clothingItems.map(item => {
              const cartItem = isInCart(item.id);
              return (
                <tr key={item.id}>
                  <td>{item.description}</td>
                  <td>{item.size}</td>
                  <td>{cartItem ? cartItem.quantity : 0}</td>
                  <td>
                    {cartItem ? (
                      <>
                        <Button variant="secondary" size="sm" className="me-2" onClick={() => decreaseQuantity(item.id)}>-</Button>
                        <Button variant="secondary" size="sm" className="me-2" onClick={() => increaseQuantity(item.id)}>+</Button>
                        <Button variant="danger" size="sm" onClick={() => removeItem(item.id)}>Remove</Button>
                      </>
                    ) : (
                      <Button variant="primary" size="sm" onClick={() => handleAddToCart(item)}>Add to Cart</Button>
                    )}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default UserClothingView;
