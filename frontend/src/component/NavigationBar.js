// src/components/NavigationBar.jsx
import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NavigationBar({ user }) {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="px-3 mb-4">
      <Navbar.Brand as={Link} to="/">Clothify</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link as={Link} to="/">Dashboard</Nav.Link>
        <Nav.Link as={Link} to="/my-orders">My Orders</Nav.Link>
        {user?.role === 'admin' && (
          <Nav.Link as={Link} to="/admin/orders">Manage Orders</Nav.Link>
        )}
      </Nav>
    </Navbar>
  );
}

export default NavigationBar;
