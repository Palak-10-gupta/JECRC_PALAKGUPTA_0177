import React from "react";

const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => {
  const itemTotal = item.price * item.quantity;

  return (
    <div className="cart-item">
      <div className="cart-item-emoji">{item.emoji}</div>
      <div className="cart-item-details">
        <h4 className="cart-item-name">{item.name}</h4>
        <p className="cart-item-unit">${item.price.toFixed(2)} each</p>
      </div>
      <div className="cart-item-controls">
        <button className="qty-btn" onClick={() => onDecrease(item.id)}>−</button>
        <span className="qty-value">{item.quantity}</span>
        <button className="qty-btn" onClick={() => onIncrease(item.id)}>+</button>
      </div>
      <div className="cart-item-total">
        <p className="item-total-price">${itemTotal.toFixed(2)}</p>
        <button className="remove-btn" onClick={() => onRemove(item.id)}>Remove</button>
      </div>
    </div>
  );
};

export default CartItem;