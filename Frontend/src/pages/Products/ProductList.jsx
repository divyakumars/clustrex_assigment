import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../api";
import "./ProductList.css";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  async function load() {
  setLoading(true);
  setError(null);

  const res = await api.getProducts();

  if (res?.error) {
    setError(res.error || "Failed to fetch");
  } else {
    setProducts(res.products || []);  // <-- FIX
  }

  setLoading(false);
}


  useEffect(() => {
    load();
  }, []);

  async function handleDelete(id) {
    if (!confirm("Delete this product?")) return;
    await api.deleteProduct(id);
    load();
  }

  return (
    <div className="products-container">

      {/* PAGE HEADER */}
      <div className="prod-header">
        <h2 className="page-title">Products</h2>
        <button className="btn-primary" onClick={() => navigate("/products/new")}>
          + Create Product
        </button>
      </div>

      {/* CARD WRAPPER */}
      <div className="card modern-card">
        {loading ? (
          <div className="small">Loading...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <div className="table-responsive">
            <table className="modern-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Total</th>
                  <th>Discount %</th>
                  <th>Final</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {products.map((p) => (
                  <tr key={p.id}>
                    <td>
                      {p.thumbnail ? (
                        <img src={p.thumbnail} alt={p.title} className="img-thumb" />
                      ) : (
                        <span className="small">No Image</span>
                      )}
                    </td>

                    <td>
                      <Link to={`/products/${p.id}`} className="prod-link">
                        {p.title}
                      </Link>
                    </td>

                    <td>{p.price}</td>
                    <td>{p.quantity}</td>
                    <td>{p.total}</td>
                    <td>{p.discount_percentage}</td>
                    <td>{p.discounted_total}</td>

                    <td className="action-buttons">
                      <button
                        className="btn-edit"
                        onClick={() => navigate(`/products/edit/${p.id}`)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(p.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
