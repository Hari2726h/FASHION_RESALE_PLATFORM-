import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Footer() {
  return (
    <footer
      className="text-white pt-5 pb-3 mt-auto"
      style={{ background: 'linear-gradient(135deg, #2f2e41, #1e1e2f)' }}
    >
      <div className="container text-center text-md-start">
        <div className="row gy-4">

          {/* About Section */}
          <div className="col-md-4">
            <h5 className="fw-bold mb-3">👗 FashionRental</h5>
            <p  color='white' style={{color:'white'}}>
              Buy, Purchase, and Wear fashion. Discover
               stylish
               outfits at unbeatable prices — sustainably.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="col-md-4">
            <h5 className="fw-bold mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-white text-decoration-none">
                  <i className="bi bi-house-door me-2"></i>Home
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/cart" className="text-white text-decoration-none">
                  <i className="bi bi-cart me-2"></i>Cart
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/login" className="text-white text-decoration-none">
                  <i className="bi bi-box-arrow-in-right me-2"></i>Login
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/profile" className="text-white text-decoration-none">
                  <i className="bi bi-box-seam me-2"></i>Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-4">
            <h5 className="fw-bold mb-3">Contact Us</h5>
            <p className="mb-2">
              <i className="bi bi-envelope-fill me-2"></i>hari2726h@gmail.com
            </p>
            <p className="mb-2">
              <i className="bi bi-telephone-fill me-2"></i>+91 994310 5704
            </p>
            <div className="d-flex gap-3 fs-5 mt-3">
              <a href="#" className="text-white"><i className="bi bi-facebook"></i></a>
              <a href="#" className="text-white"><i className="bi bi-instagram"></i></a>
              <a href="#" className="text-white"><i className="bi bi-twitter-x"></i></a>
            </div>
          </div>
        </div>

        <hr className="border-light opacity-25 mt-5" />
        <div className="text-center text-muted small mt-3">
          © {new Date().getFullYear()} <span className="fw-semibold">FashionRental</span>. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
