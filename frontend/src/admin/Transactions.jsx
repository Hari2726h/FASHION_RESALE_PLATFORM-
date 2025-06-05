import React, { useEffect, useState } from "react";
import { api } from "../api/api";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await api.getTransactions();
      setTransactions(res.data);
    } catch (error) {
      console.error("Failed to fetch transactions", error);
    }
  };

  const deleteTransaction = async (id) => {
    if (window.confirm("Delete this transaction?")) {
      try {
        await api.deleteTransaction(id);
        setTransactions(transactions.filter(t => t.id !== id));
      } catch (error) {
        console.error("Failed to delete transaction", error);
      }
    }
  };

  return (
    <div>
      <h1>Transactions</h1>
      <table border="1" cellPadding="8" style={{ marginTop: 10 }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Amount ($)</th>
            <th>Date</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(tx => (
            <tr key={tx.id}>
              <td>{tx.id}</td>
              <td>{tx.type}</td>
              <td>{tx.amount.toFixed(2)}</td>
              <td>{new Date(tx.date).toLocaleDateString()}</td>
              <td>{tx.description || "-"}</td>
              <td>
                <button onClick={() => deleteTransaction(tx.id)}>Delete</button>
              </td>
            </tr>
          ))}
          {transactions.length === 0 && (
            <tr>
              <td colSpan="6">No transactions found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
