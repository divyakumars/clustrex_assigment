import React, { useState } from "react";
import authHeader from "../utils/authHeader";
import { API_BASE } from "../api";

export default function ProductForm({ initial, onSaved, onCancel }) {
  const [title, setTitle] = useState(initial?.title || "");
  const [price, setPrice] = useState(initial?.price || 0);
  const [quantity, setQuantity] = useState(initial?.quantity || 1);
  const [discount, setDiscount] = useState(initial?.discount_percentage || 0);
  const [thumbnail, setThumbnail] = useState(initial?.thumbnail || "");

  const submit = async (e) => {
    e.preventDefault();

    const payload = {
      title,
      price,
      quantity,
      discount_percentage: discount,
      thumbnail,
    };

    const url = initial
      ? `${API_BASE}/products/${initial.id}`
      : `${API_BASE}/products`;

    await fetch(url, {
      method: initial ? "PUT" : "POST",
      headers: { "Content-Type": "application/json", ...authHeader() },
      body: JSON.stringify(payload),
    });

    onSaved();
  };

  return (
    <div className="card">
      <h3>{initial ? "Edit Product" : "New Product"}</h3>

      <form onSubmit={submit}>
        <label>Title<input value={title} onChange={(e) => setTitle(e.target.value)} /></label>
        <label>Price<input type="number" value={price} onChange={(e) => setPrice(e.target.value)} /></label>
        <label>Quantity<input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} /></label>
        <label>Discount %<input type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} /></label>
        <label>Thumbnail URL<input value={thumbnail} onChange={(e) => setThumbnail(e.target.value)} /></label>

        <button type="submit">Save</button>
        <button type="button" className="link" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
}
