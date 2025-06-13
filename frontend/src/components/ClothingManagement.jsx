import React, { useEffect, useState } from 'react';
import { api } from '../api';

function ClothingManagement() {
  const [clothingItems, setClothingItems] = useState([]);
  const [clothingSearch, setClothingSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [newItem, setNewItem] = useState({ description: '', size: '' });

  useEffect(() => {
    fetchClothingItems();
  }, [page]);

  const fetchClothingItems = async () => {
    try {
      const res = await api.getAllClothingItems();
      setClothingItems(res.data);
      setTotalPages(Math.ceil(res.data.length / 10));
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddClothingItem = async (e) => {
    e.preventDefault();
    if (!newItem.description || !newItem.size) return;
    try {
      await api.createClothingItem(newItem);
      setNewItem({ description: '', size: '' });
      fetchClothingItems();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteClothingItem = async (id) => {
    try {
      await api.deleteClothingItem(id);
      fetchClothingItems();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-3 border rounded bg-white shadow-sm">
      <h4>Clothing Items</h4>

      <form className="mb-4 row g-2" onSubmit={handleAddClothingItem}>
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Description"
            value={newItem.description}
            onChange={(e) =>
              setNewItem({ ...newItem, description: e.target.value })
            }
          />
        </div>
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Size (e.g., S, M, L, XL)"
            value={newItem.size}
            onChange={(e) => setNewItem({ ...newItem, size: e.target.value })}
          />
        </div>
        <div className="col-md-2">
          <button className="btn btn-success w-100" type="submit">
            Add Item
          </button>
        </div>
      </form>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search clothing items"
        value={clothingSearch}
        onChange={(e) => setClothingSearch(e.target.value)}
      />

      <ul className="list-group mb-3">
        {clothingItems
          .filter(
            (item) =>
              typeof item?.description === 'string' &&
              item.description.toLowerCase().includes(clothingSearch.toLowerCase())
          )
          .slice((page - 1) * 10, page * 10)
          .map((item) => (
            <li
              key={item.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {item.description} - Size: {item.size}
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => handleDeleteClothingItem(item.id)}
              >
                Delete
              </button>
            </li>
          ))}
      </ul>

      <div className="d-flex justify-content-between align-items-center">
        <button
          className="btn btn-outline-primary"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          className="btn btn-outline-primary"
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ClothingManagement;
