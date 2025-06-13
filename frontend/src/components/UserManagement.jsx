import React, { useEffect, useState } from 'react';
import { api } from '../api';
import 'bootstrap/dist/css/bootstrap.min.css';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [userSearch, setUserSearch] = useState('');
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.getAllUsers();
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    const { name, email, password } = newUser;
    if (!name || !email || !password) {
      alert('Please fill in all user fields.');
      return;
    }
    try {
      await api.register(newUser);
      setNewUser({ name: '', email: '', password: '' });
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert('Failed to add user. Make sure the email is unique.');
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

  return (
    <div className="container py-4">
      <div className="card shadow-sm border-0">
        <div className="card-header bg-info text-white fw-bold">
          👥 User Management
        </div>
        <div className="card-body">
          <form className="row g-3 mb-4" onSubmit={handleAddUser}>
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              />
            </div>
            <div className="col-md-4">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              />
            </div>
            <div className="col-md-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              />
            </div>
            <div className="col-md-2">
              <button className="btn btn-success w-100" type="submit">
                ➕ Add User
              </button>
            </div>
          </form>

          <input
            type="text"
            className="form-control mb-3"
            value={userSearch}
            onChange={(e) => setUserSearch(e.target.value)}
            placeholder="🔍 Search users"
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
                  <div>
                    <strong>{user.name}</strong><br />
                    <small className="text-muted">{user.email}</small>
                  </div>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    🗑️ Delete
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default UserManagement;
