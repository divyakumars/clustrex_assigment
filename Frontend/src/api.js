const BASE_URL = "http://127.0.0.1:5000/api";

// --------------------------------------
// Save / Get Token
// --------------------------------------
export function setToken(token) {
  localStorage.setItem("token", token);
}
export function getToken() {
  return localStorage.getItem("token");
}
export function clearToken() {
  localStorage.removeItem("token");
}

// --------------------------------------
// Generic Request Helper
// --------------------------------------
async function request(endpoint, options = {}) {
  const headers = {
    "Content-Type": "application/json",
  };

  const token = getToken();
  if (token && options.auth !== false) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: options.method || "GET",
    headers,
    body: options.body ? JSON.stringify(options.body) : null,
  });

  return res.json().catch(() => ({}));
}

// --------------------------------------
// API Methods
// --------------------------------------
export const api = {
  // AUTH
  login: (body) => request("/auth/login", { method: "POST", body, auth: false }),
  register: (body) =>
    request("/auth/register", { method: "POST", body, auth: false }),

  googleAuth: (body) =>
    request("/auth/google", { method: "POST", body, auth: false }),

  // PRODUCTS
  getProducts: () => request("/products", { method: "GET" }),
  getProduct: (id) => request(`/products/${id}`, { method: "GET" }),

  createProduct: (body) =>
    request("/products", { method: "POST", body }),

  updateProduct: (id, body) =>
    request(`/products/${id}`, { method: "PUT", body }),

  deleteProduct: (id) => request(`/products/${id}`, { method: "DELETE" }),

  // ANALYTICS
  getAnalytics: () => request("/analytics", { method: "GET" }),
};
