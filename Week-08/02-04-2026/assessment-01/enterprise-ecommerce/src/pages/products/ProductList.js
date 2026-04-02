import React, { useState } from "react";
import { Link } from "react-router-dom";

const PRODUCTS = [
  { id: 1, name: "Wireless Pro Headphones", category: "Electronics", price: 299, rating: 4.8, reviews: 1240, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80", badge: "Bestseller" },
  { id: 2, name: "Minimalist Leather Watch", category: "Accessories", price: 189, rating: 4.6, reviews: 856, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80", badge: "New" },
  { id: 3, name: "Ergonomic Office Chair", category: "Furniture", price: 549, rating: 4.9, reviews: 432, image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=300&q=80", badge: null },
  { id: 4, name: "Mechanical Keyboard TKL", category: "Electronics", price: 149, rating: 4.7, reviews: 2103, image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=300&q=80", badge: "Hot" },
  { id: 5, name: "Premium Notebook Set", category: "Stationery", price: 45, rating: 4.5, reviews: 678, image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=300&q=80", badge: null },
  { id: 6, name: "4K Webcam Ultra", category: "Electronics", price: 199, rating: 4.7, reviews: 934, image: "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=300&q=80", badge: "New" },
  { id: 7, name: "Bamboo Desk Organizer", category: "Furniture", price: 79, rating: 4.4, reviews: 312, image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=300&q=80", badge: null },
  { id: 8, name: "Smart Water Bottle", category: "Accessories", price: 59, rating: 4.6, reviews: 1567, image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&q=80", badge: null },
];

const categories = ["All", "Electronics", "Accessories", "Furniture", "Stationery"];

const ProductList = () => {
  const [active, setActive] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = PRODUCTS.filter((p) => {
    const matchCat = active === "All" || p.category === active;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="page-wrapper">
      <div className="page-hero">
        <h1>Our Products</h1>
        <p>Discover our curated collection of premium products.</p>
      </div>

      {/* Filters */}
      <div className="product-filters">
        <input
          className="search-input"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="category-tabs">
          {categories.map((c) => (
            <button
              key={c}
              className={`cat-tab ${active === c ? "cat-active" : ""}`}
              onClick={() => setActive(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="products-grid">
        {filtered.map((p) => (
          <Link to={`/products/${p.id}`} key={p.id} className="product-card-link">
            <div className="pl-card">
              <div className="pl-img-wrap">
                <img src={p.image} alt={p.name} className="pl-img" />
                {p.badge && <span className="pl-badge">{p.badge}</span>}
              </div>
              <div className="pl-info">
                <span className="pl-category">{p.category}</span>
                <h3 className="pl-name">{p.name}</h3>
                <div className="pl-meta">
                  <span className="pl-rating">★ {p.rating}</span>
                  <span className="pl-reviews">({p.reviews})</span>
                </div>
                <div className="pl-footer">
                  <span className="pl-price">${p.price}</span>
                  <span className="pl-view-btn">View Details →</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="no-results">
          <p>No products found for "{search}"</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;