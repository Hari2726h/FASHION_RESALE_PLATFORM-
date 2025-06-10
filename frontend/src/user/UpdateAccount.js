import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { useNavigate } from 'react-router-dom';

function UpdateAccount({ user, setUser }) {
  const [name, setName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // fetch fresh data if needed
    api.getUser(user.id).then(res => {
      setName(res.data.name);
      setEmail(res.data.email);
    });
  }, [user.id]);

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const updatedUser = { name, email };
      if (password.trim() !== '') updatedUser.password = password;

      const res = await api.updateUser(user.id, updatedUser);
      setSuccess('Account updated successfully!');
      setUser(res.data); // update user in app state
      setTimeout(() => navigate('/user'), 1500);
    } catch {
      setError('Failed to update account.');
    }
  };

  return (
    <div className="col-md-6 offset-md-3">
      <h2>Update Account</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name:</label>
          <input type="text" className="form-control" value={name} required onChange={e => setName(e.target.value)} />
        </div>

        <div className="mb-3">
          <label>Email:</label>
          <input type="email" className="form-control" value={email} required onChange={e => setEmail(e.target.value)} />
        </div>

        <div className="mb-3">
          <label>New Password (leave blank to keep current):</label>
          <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} />
        </div>

        <button className="btn btn-primary" type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateAccount;
