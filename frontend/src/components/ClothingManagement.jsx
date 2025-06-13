import React, { useEffect, useState } from 'react';
import { api } from '../api';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    <div className="container py-4">
      <div className="text-center mb-4">
        <h2 className="text-primary fw-bold">👕 Clothing Inventory Management</h2>
        <p className="text-muted">Add, search, and manage clothing items easily</p>
      </div>

      <div className="card shadow-sm mb-4">
        <div className="card-header bg-dark text-white">➕ Add New Clothing Item</div>
        <div className="card-body">
          <form className="row g-3" onSubmit={handleAddClothingItem}>
            <div className="col-md-5">
              <input
                type="text"
                className="form-control"
                placeholder="Description"
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Size (S, M, L, XL)"
                value={newItem.size}
                onChange={(e) => setNewItem({ ...newItem, size: e.target.value })}
              />
            </div>
            <div className="col-md-2">
              <button className="btn btn-success w-100" type="submit">
                Add
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">🧾 Clothing Items List</div>
        <div className="card-body">
          <input
            type="text"
            className="form-control mb-3"
            placeholder="🔍 Search clothing items"
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
                  <div>
                    <strong>{item.description}</strong> <span className="text-muted">(Size: {item.size})</span>
                  </div>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDeleteClothingItem(item.id)}
                  >
                    🗑️ Delete
                  </button>
                </li>
              ))}
          </ul>

          <div className="d-flex justify-content-between align-items-center">
            <button
              className="btn btn-outline-secondary"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              ◀ Previous
            </button>
            <span className="fw-semibold">Page {page} of {totalPages}</span>
            <button
              className="btn btn-outline-secondary"
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
            >
              Next ▶
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClothingManagement;