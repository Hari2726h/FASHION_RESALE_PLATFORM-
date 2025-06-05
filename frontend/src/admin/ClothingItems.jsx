import React, { useEffect, useState } from "react";
import { api } from "../api/api";

const ClothingItems = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    name: "",
    price: 0,
    stock: 0,
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await api.getClothingItems();
      setItems(res.data);
    } catch (error) {
      console.error("Failed to fetch clothing items", error);
    }
  };

  const addItem = async () => {
    if (!newItem.name || newItem.price <= 0 || newItem.stock < 0) {
      alert("Please fill all fields correctly");
      return;
    }
    try {
      const res = await api.createClothingItem(newItem);
      setItems([...items, res.data]);
      setNewItem({ name: "", price: 0, stock: 0 });
    } catch (error) {
      console.error("Failed to add item", error);
    }
  };

  const deleteItem = async (id) => {
    if (window.confirm("Delete this item?")) {
      try {
        await api.deleteClothingItem(id);
        setItems(items.filter(item => item.id !== id));
      } catch (error) {
        console.error("Failed to delete item", error);
      }
    }
  };

  return (
    <div>
      <h1>Clothing Items</h1>

      <h3>Add New Item</h3>
      <input
        type="text"
        placeholder="Name"
        value={newItem.name}
        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Price"
        value={newItem.price}
        onChange={(e) => setNewItem({ ...newItem, price: Number(e.target.value) })}
      />
      <input
        type="number"
        placeholder="Stock"
        value={newItem.stock}
        onChange={(e) => setNewItem({ ...newItem, stock: Number(e.target.value) })}
      />
      <button onClick={addItem}>Add Item</button>

      <h3>Inventory List</h3>
      <table border="1" cellPadding="8" style={{ marginTop: 10 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price ($)</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.price.toFixed(2)}</td>
              <td>{item.stock}</td>
              <td>
                <button onClick={() => deleteItem(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr>
              <td colSpan="4">No items found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ClothingItems;
