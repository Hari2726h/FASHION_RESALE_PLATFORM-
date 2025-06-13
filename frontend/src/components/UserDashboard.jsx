import React, { useEffect, useState } from 'react';
import { api } from '../api';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

    fetchClothingItems();
  }, [search, page]);

  const fetchClothingItems = async () => {
    try {
      const res = await api.getAllClothingItems();
      const filtered = res.data.filter((item) =>
        item.description.toLowerCase().includes(search.toLowerCase())
      );
      setClothingItems(filtered);
      setTotalPages(Math.ceil(filtered.length / 6)); // 6 per page for better layout
    } catch (error) {
      console.error('Failed to fetch clothing items:', error);
    }
  };

  const handleAddToCart = async (itemId) => {
    try {
      const response = await api.addItemToCart(user.id, itemId);
      const added = response?.data?.clothingItems?.find((item) => item.id === itemId);
      added
        ? toast.success('✅ Item successfully added to cart!')
        : toast.warning('⚠️ Could not confirm item was added.');
    } catch (error) {
      console.error('Error adding item to cart:', error);
      toast.error('❌ Failed to add item to cart.');
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

  return (
    <>
      <Navbar user={user} />
      <div className="container py-4">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
          <h2 className="text-primary mb-3 mb-md-0">Welcome, {user?.name} 👋</h2>
          <button className="btn btn-outline-dark" onClick={() => navigate('/cart')}>
            🛒 View Cart
          </button>
        </div>

        <input
          type="text"
          className="form-control mb-4 shadow-sm"
          placeholder="Search clothing items..."
          value={search}
          onChange={handleSearchChange}
        />

        <div className="row">
          {clothingItems.length > 0 ? (
            clothingItems
              .slice((page - 1) * 6, page * 6)
              .map((item) => (
                <div className="col-md-4 mb-4" key={item.id}>
                  <div className="card h-100 shadow-sm border-0">
                    <div className="card-body d-flex flex-column justify-content-between">
                      <div>
                        <h5 className="card-title">{item.description}</h5>
                        <p className="card-text">Size: <strong>{item.size}</strong></p>
                      </div>
                      <button
                        className="btn btn-success mt-3"
                        onClick={() => handleAddToCart(item.id)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))
          ) : (
            <div className="text-center py-5">
              <h5 className="text-muted">No clothing items found 😕</h5>
            </div>
          )}
        </div>

        {clothingItems.length > 6 && (
          <div className="d-flex justify-content-between align-items-center mt-4">
            <button
              className="btn btn-outline-secondary"
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              ⬅️ Previous
            </button>
            <span className="fw-medium">Page {page} of {totalPages}</span>
            <button
              className="btn btn-outline-secondary"
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
            >
              Next ➡️
            </button>
          </div>
        )}
      </div>

      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </>
  );
}

export default UserDashboard;
