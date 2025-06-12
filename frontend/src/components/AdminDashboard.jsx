import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [clothingItems, setClothingItems] = useState([]);
  const [userSearch, setUserSearch] = useState('');
  const [clothingSearch, setClothingSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [newItem, setNewItem] = useState({ description: '', size: '' });

  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
    fetchClothingItems();
  }, [page]);

  const fetchUsers = async () => {
    try {
      const res = await api.getAllUsers();
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchClothingItems = async () => {
    try {
      const res = await api.getAllClothingItems();
      setClothingItems(res.data);
      setTotalPages(Math.ceil(res.data.length / 10));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await api.deleteUser(id);
      fetchUsers();
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

  const handleUserSearchChange = (e) => {
    setUserSearch(e.target.value);
  };

  const handleClothingSearchChange = (e) => {
    setClothingSearch(e.target.value);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Admin Dashboard</h2>
        <div>
          <button
            className="btn btn-secondary me-2"
            onClick={() => navigate('/admin/orders')}
          >
            View Orders
          </button>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Users Section */}
      <div className="mb-5">
        <h4>Users</h4>
        <input
          type="text"
          className="form-control mb-3"
          value={userSearch}
          onChange={handleUserSearchChange}
          placeholder="Search users"
        />
        <ul className="list-group">
          {users
            .filter(
              (user) =>
                typeof user?.name === 'string' &&
                user.name.toLowerCase().includes(userSearch.toLowerCase())
            )
            .map((user) => (
              <li
                key={user.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {user.name} ({user.email})
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Delete
                </button>
              </li>
            ))}
        </ul>
      </div>

      {/* Clothing Items Section */}
      <div>
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
              onChange={(e) =>
                setNewItem({ ...newItem, size: e.target.value })
              }
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
          onChange={handleClothingSearchChange}
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
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            className="btn btn-outline-primary"
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
