import React, { useState } from "react";
import ProductCard from "./components/ProductCard";
import CartItem from "./components/CartItem";
import CartSummary from "./components/CartSummary";
import "./App.css";

const PRODUCTS = [
  { id: 1, name: "React T-Shirt", price: 25, category: "Clothing", emoji: "👕" },
  { id: 2, name: "JavaScript Hoodie", price: 45, category: "Clothing", emoji: "🧥" },
  { id: 3, name: "CSS Mug", price: 15, category: "Accessories", emoji: "☕" },
  { id: 4, name: "Node.js Cap", price: 20, category: "Accessories", emoji: "🧢" },
  { id: 5, name: "TypeScript Sticker Pack", price: 10, category: "Stickers", emoji: "🎨" },
  { id: 6, name: "VS Code Mousepad", price: 18, category: "Accessories", emoji: "🖱️" },
  { id: 7, name: "Git Cheat Sheet Poster", price: 12, category: "Stationery", emoji: "📋" },
  { id: 8, name: "Dev Mechanical Keyboard", price: 120, category: "Electronics", emoji: "⌨️" },
];

function App() {
  const [cart, setCart] = useState([]);
  const [activeTab, setActiveTab] = useState("shop");
  const [notification, setNotification] = useState("");

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 2500);
  };

  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    showNotification(`${product.emoji} ${product.name} added to cart!`);
  };

  const handleIncrease = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (id) => {
    setCart((prev) => {
      const item = prev.find((i) => i.id === id);
      if (item.quantity === 1) return prev.filter((i) => i.id !== id);
      return prev.map((i) =>
        i.id === id ? { ...i, quantity: i.quantity - 1 } : i
      );
    });
  };

  const handleRemove = (id) => {
    const item = cart.find((i) => i.id === id);
    setCart((prev) => prev.filter((i) => i.id !== id));
    showNotification(`🗑️ ${item.name} removed from cart`);
  };

  const handleClearCart = () => {
    setCart([]);
    showNotification("🛒 Cart cleared");
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="app">
      {/* Notification Toast */}
      {notification && (
        <div className="toast">{notification}</div>
      )}

      {/* Header */}
      <header className="header">
        <div className="header-left">
          <span className="logo">🛍️ DevShop</span>
          <span className="header-tagline">Premium Dev Merchandise</span>
        </div>
        <div className="header-right">
          <button
            className={`tab-btn ${activeTab === "shop" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("shop")}
          >
            Shop
          </button>
          <button
            className={`tab-btn ${activeTab === "cart" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("cart")}
          >
            🛒 Cart
            {totalItems > 0 && (
              <span className="cart-badge">{totalItems}</span>
            )}
          </button>
        </div>
      </header>

      <main className="main">
        {/* SHOP TAB */}
        {activeTab === "shop" && (
          <div className="shop-view">
            <div className="shop-header">
              <h2>Our Products</h2>
              <p>{PRODUCTS.length} items available</p>
            </div>
            <div className="product-grid">
              {PRODUCTS.map((product) => {
                const cartItem = cart.find((i) => i.id === product.id);
                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    cartQuantity={cartItem ? cartItem.quantity : 0}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* CART TAB */}
        {activeTab === "cart" && (
          <div className="cart-view">
            <div className="cart-header">
              <h2>Your Cart</h2>
              <p>{totalItems} item{totalItems !== 1 ? "s" : ""} selected</p>
            </div>
            <div className="cart-layout">
              <div className="cart-items-list">
                {cart.length === 0 ? (
                  <div className="empty-state">
                    <span className="empty-icon">🛒</span>
                    <h3>Your cart is empty</h3>
                    <p>Go to the shop and add some items!</p>
                    <button className="go-shop-btn" onClick={() => setActiveTab("shop")}>
                      Browse Products
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onIncrease={handleIncrease}
                      onDecrease={handleDecrease}
                      onRemove={handleRemove}
                    />
                  ))
                )}
              </div>
              <div className="cart-sidebar">
                <CartSummary cart={cart} onClearCart={handleClearCart} />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;