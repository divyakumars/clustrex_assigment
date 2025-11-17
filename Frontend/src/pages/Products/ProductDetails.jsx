import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../api";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    api.getProduct(id).then((res) => {
      if (res?.error) {
        setProduct(null);
      } else {
        setProduct(res);
      }
      setLoading(false);
    });
  }, [id]);

  if (loading) return <div className="small">Loading...</div>;
  if (!product) return <div style={{ color: "crimson" }}>Product not found</div>;

  return (
    <div style={{ maxWidth: 720, margin: "1rem auto" }} className="card">
      <div style={{ display: "flex", gap: 16 }}>
        <div style={{ width: 180 }}>
          {product.thumbnail ? (
            <img
              src={product.thumbnail}
              alt={product.title}
              style={{ width: "100%", borderRadius: 8 }}
            />
          ) : (
            <div className="small">No image</div>
          )}
        </div>

        <div style={{ flex: 1 }}>
          <h2 className="title">{product.title}</h2>

          <div className="small">Price: {product.price}</div>
          <div className="small">Quantity: {product.quantity}</div>
          <div className="small">Total: {product.total}</div>
          <div className="small">Discount %: {product.discount_percentage}</div>
          <div className="small">Discounted Total: {product.discounted_total}</div>

          <div style={{ marginTop: 12 }}>
            <button
              className="btn"
              onClick={() => navigate(`/products/edit/${product.id}`)}
            >
              Edit
            </button>{" "}
            <button className="btn" onClick={() => navigate("/products")}>
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
