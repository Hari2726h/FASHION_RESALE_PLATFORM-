import React, { useEffect, useState } from "react";
import { api } from "../api/api";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalSales: 0,
    ordersPending: 0,
    ordersDelivered: 0,
    totalReviews: 0,
    lowInventoryCount: 0,
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const users = await api.getUsers();
        const orders = await api.getOrders();
        const reviews = await api.getReviews();
        const clothingItems = await api.getClothingItems();

        const totalUsers = users.data.length;
        const totalSales = orders.data.reduce((sum, order) => sum + order.totalPrice, 0);
        const ordersPending = orders.data.filter(o => o.status === "pending").length;
        const ordersDelivered = orders.data.filter(o => o.status === "delivered").length;
        const totalReviews = reviews.data.length;
        const lowInventoryCount = clothingItems.data.filter(item => item.stock <= 5).length;

        setStats({
          totalUsers,
          totalSales,
          ordersPending,
          ordersDelivered,
          totalReviews,
          lowInventoryCount,
        });
      } catch (error) {
        console.error("Error fetching dashboard stats", error);
      }
    }

    fetchStats();
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div>Total Users: {stats.totalUsers}</div>
      <div>Total Sales: ${stats.totalSales.toFixed(2)}</div>
      <div>Orders Pending: {stats.ordersPending}</div>
      <div>Orders Delivered: {stats.ordersDelivered}</div>
      <div>Total Reviews: {stats.totalReviews}</div>
      <div>Low Inventory Items: {stats.lowInventoryCount}</div>
    </div>
  );
};

export default Dashboard;
