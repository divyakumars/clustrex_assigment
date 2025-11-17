import React, { useEffect, useState } from "react";
import { API_BASE } from "../api";
import authHeader from "../utils/authHeader";

export default function Analytics() {
  const [data, setData] = useState(null);

  const loadAnalytics = async () => {
    const res = await fetch(`${API_BASE}/analytics`, { headers: authHeader() });
    setData(await res.json());
  };

  useEffect(() => {
    loadAnalytics();
  }, []);

  if (!data) return <div className="card">Loading analytics…</div>;

  return (
    <div className="card">
      <h3>Analytics</h3>
      <ul className="metrics">
        <li>Total before discount: {data.total_before_discount}</li>
        <li>Total after discount: {data.total_after_discount}</li>
        <li>Average discount: {data.average_discount_percentage}%</li>
        <li>Most expensive: {data.most_expensive_product.title}</li>
        <li>Cheapest: {data.cheapest_product.title}</li>
        <li>Highest discount: {data.highest_discount_product.title}</li>
        <li>Total Quantity: {data.total_quantity}</li>
        <li>Unique products: {data.unique_products}</li>
      </ul>
    </div>
  );
}
