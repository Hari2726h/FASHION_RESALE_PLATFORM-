import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Import your admin components
import Register from "./admin/Register";
import Login from "./admin/Login";
import Dashboard from "./admin/Dashboard"; // Your Dashboard.jsx
import Users from "./admin/Users";           // Your Users.jsx
import ClothingItems from "./admin/ClothingItems"; // Your ClothingItems.jsx
import Orders from "./admin/Orders";         // Your Orders.jsx
import Transactions from "./admin/Transactions";   // Your Transactions.jsx
import Reviews from "./admin/Reviews";       // Your Reviews.jsx
import Reports from "./admin/Reports";       // Your Reports.jsx
import Settings from "./admin/Settings";     // Your Settings.jsx

// Simple authentication check (replace with your logic)
const isAuthenticated = () => {
  return !!localStorage.getItem("authToken");
};

// Protected Route wrapper
const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/admin/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/admin/register" element={<Register />} />
        <Route path="/admin/login" element={<Login />} />

        {/* Protected admin routes */}
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <PrivateRoute>
              <Users />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/clothing-items"
          element={
            <PrivateRoute>
              <ClothingItems />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <PrivateRoute>
              <Orders />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/transactions"
          element={
            <PrivateRoute>
              <Transactions />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/reviews"
          element={
            <PrivateRoute>
              <Reviews />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/reports"
          element={
            <PrivateRoute>
              <Reports />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          }
        />

        {/* Redirect any unknown path */}
        <Route path="*" element={<Navigate to="/admin/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
