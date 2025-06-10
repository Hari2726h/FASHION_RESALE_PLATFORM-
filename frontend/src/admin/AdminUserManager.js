import React, { useEffect, useState } from 'react';
import { api } from '../api';

function AdminUserManager() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await api.getAllUsers();
    setUsers(res.data);
  };

  const deleteUser = async (id) => {
    await api.deleteUser(id);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Manage Users</h2>
      <table className="table table-bordered">
        <thead>
          <tr><th>Name</th><th>Email</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => deleteUser(u.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminUserManager;
