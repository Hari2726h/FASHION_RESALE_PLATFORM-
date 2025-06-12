import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function UserDashboard({ user }) {
  const [clothingItems, setClothingItems] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
useEffect(() => {
  if (!user) {
    navigate('/login');
    return;
  }

  console.log("User ID:", user.id); // this should not be undefined
  fetchClothingItems();
}, [search, page]);


  const fetchClothingItems = async () => {
    try {
      const res = await api.getAllClothingItems();
      const filtered = res.data.filter((item) =>
        item.description.toLowerCase().includes(search.toLowerCase())
      );
      setClothingItems(filtered);
      setTotalPages(Math.ceil(filtered.length / 10));
    } catch (error) {
      console.error('Failed to fetch clothing items:', error);
    }
  };

  const handleAddToCart = async (itemId) => {
    try {
      const response = await api.addItemToCart(user.id, itemId);

      if (
        response?.data?.clothingItems &&
        response.data.clothingItems.find((item) => item.id === itemId)
      ) {
        alert('✅ Item successfully added to cart!');
      } else {
        alert('⚠️ Could not confirm item was added. Please check again.');
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
      alert('❌ Failed to add item to cart.');
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
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
        <h2>User Dashboard</h2>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <input
        type="text"
        className="form-control mb-4"
        placeholder="Search clothing items..."
        value={search}
        onChange={handleSearchChange}
      />

      <div className="row">
        {clothingItems
          .slice((page - 1) * 10, page * 10)
          .map((item) => (
            <div className="col-md-4 mb-4" key={item.id}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{item.description}</h5>
                  <p className="card-text">Size: {item.size}</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleAddToCart(item.id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      <div className="d-flex justify-content-between mt-4">
        <button
          className="btn btn-outline-secondary"
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="align-self-center">Page {page} of {totalPages}</span>
        <button
          className="btn btn-outline-secondary"
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
        <button className="btn btn-secondary me-2" onClick={() => navigate('/cart')}>
  🛒 View Cart
</button>

      </div>
    </div>
  );
}

export default UserDashboard;
