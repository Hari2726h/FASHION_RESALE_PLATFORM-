import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Footer() {
  return (
    <footer className="bg-dark text-white pt-4 pb-2 mt-5">
      <div className="container text-center text-md-start">
        <div className="row">
          {/* About */}
          <div className="col-md-4 mb-3">
            <h5 className="text-uppercase">👗 FashionRental</h5>
            <p>
              Rent, reuse, and redefine fashion. Discover stylish outfits at unbeatable prices — sustainably.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-3">
            <h5 className="text-uppercase">Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-white text-decoration-none">Home</a></li>
              <li><a href="/cart" className="text-white text-decoration-none">Cart</a></li>
              <li><a href="/admin/orders" className="text-white text-decoration-none">Orders</a></li>
              <li><a href="/login" className="text-white text-decoration-none">Login</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-4 mb-3">
            <h5 className="text-uppercase">Contact Us</h5>
            <p><i className="bi bi-envelope-fill me-2"></i> support@fashionrental.com</p>
            <p><i className="bi bi-telephone-fill me-2"></i> +91 98765 43210</p>
            <div className="d-flex gap-3">
              <a href="#" className="text-white"><i className="bi bi-facebook"></i></a>
              <a href="#" className="text-white"><i className="bi bi-instagram"></i></a>
              <a href="#" className="text-white"><i className="bi bi-twitter"></i></a>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-3 border-top border-secondary pt-2">
        © {new Date().getFullYear()} FashionRental. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
