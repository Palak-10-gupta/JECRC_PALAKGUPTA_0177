import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";

import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";

import Home from "./pages/public/Home";
import About from "./pages/public/About";
import Contact from "./pages/public/Contact";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import DashboardHome from "./pages/dashboard/DashboardHome";
import Analytics from "./pages/dashboard/Analytics";
import Settings from "./pages/dashboard/Settings";
import ProductList from "./pages/products/ProductList";
import ProductDetail from "./pages/products/ProductDetail";
import Reviews from "./pages/products/Reviews";
import Specs from "./pages/products/Specs";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:productId" element={<ProductDetail />}>
              <Route index element={<Navigate to="reviews" replace />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="specs" element={<Specs />} />
            </Route>
          </Route>

          {/* Auth */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Dashboard - Protected */}
          <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
            <Route path="/dashboard" element={<DashboardHome />} />
            <Route path="/dashboard/analytics" element={<Analytics />} />
            <Route path="/dashboard/settings" element={<Settings />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;