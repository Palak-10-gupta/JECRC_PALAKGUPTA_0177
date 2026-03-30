import React from "react";

const CartSummary = ({ cart, onClearCart }) => {
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="cart-summary empty-summary">
        <div className="empty-cart-icon">🛒</div>
        <h3>Your cart is empty</h3>
        <p>Add some products to get started!</p>
      </div>
    );
  }

  return (
    <div className="cart-summary">
      <div className="summary-header">
        <h3>Order Summary</h3>
        <span className="summary-count">{totalItems} item{totalItems !== 1 ? "s" : ""}</span>
      </div>

      <div className="summary-rows">
        <div className="summary-row">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Tax (10%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="summary-row summary-row-free">
          <span>🚚 Delivery</span>
          <span className="free-tag">FREE</span>
        </div>
        <div className="summary-divider" />
        <div className="summary-row summary-total-row">
          <span>Total</span>
          <span className="total-amount">${total.toFixed(2)}</span>
        </div>
      </div>

      <button className="clear-btn" onClick={onClearCart}>
        Clear Cart
      </button>
    </div>
  );
};

export default CartSummary;