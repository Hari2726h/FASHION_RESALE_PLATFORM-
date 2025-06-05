import React, { useState, useEffect } from "react";
import { api } from "../api/api";

const Settings = () => {
  // Example settings, you can expand or connect to real APIs
  const [shippingOptions, setShippingOptions] = useState("Standard");
  const [paymentGateway, setPaymentGateway] = useState("Stripe");
  const [adminProfile, setAdminProfile] = useState({
    id: 1, // assuming admin id 1, adjust accordingly
    name: "",
    email: "",
  });

  useEffect(() => {
    // Fetch admin profile (assuming user id 1 for admin)
    const fetchAdmin = async () => {
      try {
        const res = await api.getUser(adminProfile.id);
        setAdminProfile(res.data);
      } catch (error) {
        console.error("Failed to fetch admin profile", error);
      }
    };
    fetchAdmin();
  }, []);

  const updateSettings = () => {
    // Save settings logic here
    alert(`Shipping: ${shippingOptions}, Payment: ${paymentGateway}`);
  };

  const updateAdminProfile = async () => {
    try {
      await api.updateUser(adminProfile.id, adminProfile);
      alert("Admin profile updated");
    } catch (error) {
      console.error("Failed to update admin profile", error);
    }
  };

  return (
    <div>
      <h1>Settings</h1>

      <div>
        <h3>Platform Settings</h3>
        <label>
          Shipping Options:
          <select
            value={shippingOptions}
            onChange={(e) => setShippingOptions(e.target.value)}
          >
            <option value="Standard">Standard</option>
            <option value="Express">Express</option>
            <option value="Overnight">Overnight</option>
          </select>
        </label>
        <br />
        <label>
          Payment Gateway:
          <select
            value={paymentGateway}
            onChange={(e) => setPaymentGateway(e.target.value)}
          >
            <option value="Stripe">Stripe</option>
            <option value="PayPal">PayPal</option>
            <option value="Razorpay">Razorpay</option>
          </select>
        </label>
        <br />
        <button onClick={updateSettings}>Save Platform Settings</button>
      </div>

      <div style={{ marginTop: 30 }}>
        <h3>Admin Profile</h3>
        <label>
          Name:
          <input
            type="text"
            value={adminProfile.name}
            onChange={(e) =>
              setAdminProfile({ ...adminProfile, name: e.target.value })
            }
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            value={adminProfile.email}
            onChange={(e) =>
              setAdminProfile({ ...adminProfile, email: e.target.value })
            }
          />
        </label>
        <br />
        <button onClick={updateAdminProfile}>Update Profile</button>
      </div>
    </div>
  );
};

export default Settings;
