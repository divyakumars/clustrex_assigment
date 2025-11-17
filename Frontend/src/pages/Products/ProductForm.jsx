import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../api";
import "./ProductForm.css";

export default function ProductForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    price: "",
    quantity: "",
    discount_percentage: "",
    thumbnail: ""
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEdit) {
      api.getProduct(id).then((res) => {
        if (res.error) return setError(res.error);

        setForm({
          title: res.title,
          price: res.price,
          quantity: res.quantity,
          discount_percentage: res.discount_percentage,
          thumbnail: res.thumbnail
        });
      });
    }
  }, [id, isEdit]);

  function updateField(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function submit(e) {
    e.preventDefault();
    setError(null);

    try {
      if (isEdit) {
        await api.updateProduct(id, form);
      } else {
        await api.createProduct(form);
      }
      navigate("/products");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="form-container">
      <div className="form-card">
        
        <h2 className="form-title">
          {isEdit ? "Edit Product" : "Create Product"}
        </h2>

        <form className="form-fields" onSubmit={submit}>
          <input
            className="form-input"
            placeholder="Title"
            value={form.title}
            onChange={(e) => updateField("title", e.target.value)}
          />

          <input
            type="number"
            className="form-input"
            placeholder="Price"
            value={form.price}
            onChange={(e) => updateField("price", e.target.value)}
          />

          <input
            type="number"
            className="form-input"
            placeholder="Quantity"
            value={form.quantity}
            onChange={(e) => updateField("quantity", e.target.value)}
          />

          <input
            type="number"
            className="form-input"
            placeholder="Discount %"
            value={form.discount_percentage}
            onChange={(e) => updateField("discount_percentage", e.target.value)}
          />

          <input
            className="form-input"
            placeholder="Thumbnail URL"
            value={form.thumbnail}
            onChange={(e) => updateField("thumbnail", e.target.value)}
          />

          {error && <div className="form-error">{error}</div>}

          <div className="form-buttons">
            <button className="btn-submit" type="submit">
              {isEdit ? "Update" : "Create"}
            </button>

            <button
              className="btn-cancel"
              type="button"
              onClick={() => navigate("/products")}
            >
              Cancel
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
