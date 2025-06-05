import React, { useEffect, useState } from "react";
import { api } from "../api/api";

const Reports = () => {
  const [salesTotal, setSalesTotal] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [inventoryLowCount, setInventoryLowCount] = useState(0);

  useEffect(() => {
    generateReports();
  }, []);

  const generateReports = async () => {
    try {
      const users = await api.getUsers();
      const orders = await api.getOrders();
      const clothingItems = await api.getClothingItems();

      setTotalUsers(users.data.length);
      setTotalOrders(orders.data.length);
      setSalesTotal(
        orders.data.reduce((sum, order) => sum + order.totalPrice, 0)
      );
      setInventoryLowCount(
        clothingItems.data.filter(item => item.stock <= 5).length
      );
    } catch (error) {
      console.error("Failed to generate reports", error);
    }
  };

  return (
    <div>
      <h1>Reports</h1>
      <div>
        <h3>Sales Report</h3>
        <p>Total Sales: ${salesTotal.toFixed(2)}</p>
        <p>Total Orders: {totalOrders}</p>
      </div>

      <div>
        <h3>User Activity Report</h3>
        <p>Total Registered Users: {totalUsers}</p>
      </div>

      <div>
        <h3>Inventory Report</h3>
        <p>Items with Low Stock (&le; 5): {inventoryLowCount}</p>
      </div>
    </div>
  );
};

export default Reports;
