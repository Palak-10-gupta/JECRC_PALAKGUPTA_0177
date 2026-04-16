import React from "react";
import { useParams, NavLink, Outlet, Link } from "react-router-dom";

const PRODUCTS = {
  1: { name: "Wireless Pro Headphones", category: "Electronics", price: 299, rating: 4.8, reviews: 1240, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80", desc: "Industry-leading noise cancellation with 30-hour battery life and premium sound quality. Perfect for professionals who demand the best audio experience." },
  2: { name: "Minimalist Leather Watch", category: "Accessories", price: 189, rating: 4.6, reviews: 856, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80", desc: "Handcrafted genuine leather strap with a Swiss quartz movement. A timeless piece that blends modern minimalism with classic craftsmanship." },
  3: { name: "Ergonomic Office Chair", category: "Furniture", price: 549, rating: 4.9, reviews: 432, image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=600&q=80", desc: "Designed by ergonomics experts to support your posture during long work sessions. Adjustable lumbar support and breathable mesh back." },
  4: { name: "Mechanical Keyboard TKL", category: "Electronics", price: 149, rating: 4.7, reviews: 2103, image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600&q=80", desc: "Tenkeyless layout with Cherry MX switches. RGB backlighting with per-key customization. The ultimate typing experience for developers." },
  5: { name: "Premium Notebook Set", category: "Stationery", price: 45, rating: 4.5, reviews: 678, image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=600&q=80", desc: "Set of 3 premium notebooks with dot-grid, lined, and blank pages. Acid-free 100gsm paper that works with all pen types." },
  6: { name: "4K Webcam Ultra", category: "Electronics", price: 199, rating: 4.7, reviews: 934, image: "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=600&q=80", desc: "4K 30fps with HDR and auto-focus. Built-in dual noise-cancelling microphones. Plug and play with all major platforms." },
  7: { name: "Bamboo Desk Organizer", category: "Furniture", price: 79, rating: 4.4, reviews: 312, image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80", desc: "Sustainably sourced bamboo desktop organizer with 8 compartments. Keeps your workspace clutter-free and beautiful." },
  8: { name: "Smart Water Bottle", category: "Accessories", price: 59, rating: 4.6, reviews: 1567, image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&q=80", desc: "Tracks your hydration goals with LED reminders. Double-wall insulation keeps drinks cold 24h or hot 12h. BPA-free stainless steel." },
};

const ProductDetail = () => {
  const { productId } = useParams();
  const product = PRODUCTS[productId];

  if (!product) return (
    <div className="page-wrapper">
      <div className="not-found-box">
        <h2>Product not found</h2>
        <Link to="/products" className="btn-primary">← Back to Products</Link>
      </div>
    </div>
  );

  return (
    <div className="page-wrapper">
      <Link to="/products" className="back-link">← Back to Products</Link>

      <div className="product-detail-layout">
        {/* Image */}
        <div className="pd-img-wrap">
          <img src={product.image} alt={product.name} className="pd-img" />
        </div>

        {/* Info */}
        <div className="pd-info">
          <span className="pd-category">{product.category}</span>
          <h1 className="pd-name">{product.name}</h1>
          <div className="pd-rating">
            <span className="stars">★★★★★</span>
            <span className="rating-val">{product.rating}</span>
            <span className="rating-count">({product.reviews} reviews)</span>
          </div>
          <p className="pd-price">${product.price}</p>
          <p className="pd-desc">{product.desc}</p>
          <div className="pd-actions">
            <button className="btn-primary pd-btn">Add to Cart</button>
            <button className="btn-ghost pd-btn">Wishlist ♡</button>
          </div>
        </div>
      </div>

      {/* Nested Route Tabs */}
      <div className="nested-tabs">
        <NavLink
          to="reviews"
          className={({ isActive }) => `nested-tab ${isActive ? "nested-tab-active" : ""}`}
        >
          Customer Reviews
        </NavLink>
        <NavLink
          to="specs"
          className={({ isActive }) => `nested-tab ${isActive ? "nested-tab-active" : ""}`}
        >
          Specifications
        </NavLink>
      </div>

      <div className="nested-content">
        <Outlet context={{ product }} />
      </div>
    </div>
  );
};

export default ProductDetail;