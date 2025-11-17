import React, { useEffect, useState } from "react";
import { API_BASE } from "../api";
import authHeader from "../utils/authHeader";

export default function Products({ onEdit }) {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    const res = await fetch(`${API_BASE}/products`, {
      headers: authHeader(),
    });
    setProducts(await res.json());
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const remove = async (id) => {
    await fetch(`${API_BASE}/products/${id}`, {
      method: "DELETE",
      headers: authHeader(),
    });
    loadProducts();
  };

  return (
    <div className="card">
      <h3>Products ({products.length})</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Total</th>
            <th>Discount%</th>
            <th>Discounted</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.title}</td>
              <td>{p.price}</td>
              <td>{p.quantity}</td>
              <td>{p.total}</td>
              <td>{p.discount_percentage}</td>
              <td>{p.discounted_total}</td>
              <td>
                <button onClick={() => onEdit(p)}>Edit</button>
                <button className="danger" onClick={() => remove(p.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
