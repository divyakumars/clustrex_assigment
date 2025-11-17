import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ProductList from "./pages/Products/ProductList";
import ProductForm from "./pages/Products/ProductForm";
import ProductDetails from "./pages/Products/ProductDetails";
import Analytics from "./pages/Analytics/Analytics";
import { getToken } from "./api";

function PrivateRoute({ children }) {
  return getToken() ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const location = useLocation();

  // routes where navbar should NOT appear
  const authPages = ["/login", "/register"];
  const hideNavbar = authPages.includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Show Navbar only when NOT on login/register */}
      {!hideNavbar && <Navbar />}

      <main className="p-4 max-w-6xl mx-auto">
        <Routes>
          <Route path="/" element={<Navigate to="/products" replace />} />

          {/* AUTH PAGES */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* PRIVATE ROUTES */}
          <Route
            path="/products"
            element={
              <PrivateRoute>
                <ProductList />
              </PrivateRoute>
            }
          />

          <Route
            path="/products/new"
            element={
              <PrivateRoute>
                <ProductForm />
              </PrivateRoute>
            }
          />

          <Route
            path="/products/:id"
            element={
              <PrivateRoute>
                <ProductDetails />
              </PrivateRoute>
            }
          />

          <Route
            path="/products/edit/:id"
            element={
              <PrivateRoute>
                <ProductForm />
              </PrivateRoute>
            }
          />

          <Route
            path="/analytics"
            element={
              <PrivateRoute>
                <Analytics />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}
