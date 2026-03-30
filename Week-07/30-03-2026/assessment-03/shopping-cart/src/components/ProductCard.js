import React from "react";

const ProductCard = ({ product, onAddToCart, cartQuantity }) => {
  return (
    <div className="product-card">
      <div className="product-emoji">{product.emoji}</div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-category">{product.category}</p>
        <p className="product-price">${product.price.toFixed(2)}</p>
      </div>
      <div className="product-action">
        {cartQuantity > 0 && (
          <span className="in-cart-badge">✓ {cartQuantity} in cart</span>
        )}
        <button className="add-btn" onClick={() => onAddToCart(product)}>
          {cartQuantity > 0 ? "Add More" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;