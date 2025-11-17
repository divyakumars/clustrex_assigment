import React, { useEffect, useState } from "react";
import { api } from "../../api";

export default function Analytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getAnalytics().then((res) => {
      setData(res?.error ? null : res);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="small">Loading...</div>;
  if (!data) return <div style={{ color: "crimson" }}>No analytics available</div>;

  return (
    <div className="card" style={{ maxWidth: 900, margin: "1rem auto" }}>
      <h2 className="title">Analytics</h2>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div className="card">
          <div className="small">Total before discount</div>
          <div style={{ fontWeight: 700 }}>{data.total_before_discount}</div>
        </div>

        <div className="card">
          <div className="small">Total after discount</div>
          <div style={{ fontWeight: 700 }}>{data.total_after_discount}</div>
        </div>

        <div className="card">
          <div className="small">Average discount (%)</div>
          <div style={{ fontWeight: 700 }}>{data.average_discount_percentage}</div>
        </div>

        <div className="card">
          <div className="small">Total quantity</div>
          <div style={{ fontWeight: 700 }}>{data.total_quantity}</div>
        </div>

        <div className="card">
          <div className="small">Unique products</div>
          <div style={{ fontWeight: 700 }}>{data.unique_products}</div>
        </div>

        <div className="card">
          <div className="small">Most expensive</div>
          <div style={{ fontWeight: 700 }}>{data.most_expensive_product?.title ?? "-"}</div>
        </div>

        <div className="card">
          <div className="small">Cheapest</div>
          <div style={{ fontWeight: 700 }}>{data.cheapest_product?.title ?? "-"}</div>
        </div>

        <div className="card">
          <div className="small">Highest discount</div>
          <div style={{ fontWeight: 700 }}>{data.highest_discount_product?.title ?? "-"}</div>
        </div>
      </div>
    </div>
  );
}
