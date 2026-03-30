# 🛍️ DevShop — React Shopping Cart

A premium, fully functional shopping cart application built with React.js as part of Assessment 03.

---

## 📌 Project Overview

DevShop is a mini e-commerce shopping cart that allows users to browse products, manage their cart, and complete a simulated checkout experience. The app demonstrates core React concepts including state management, component communication, and derived state using `reduce()`.

---

## 🚀 Features

- 🛒 **Product Listing** — 8 developer-themed products displayed in a responsive grid
- ➕ **Add to Cart** — Add any product with a single click; button flashes green on add
- 🔢 **Update Quantity** — Increase or decrease item quantity directly from the cart
- ❌ **Remove Item** — Remove individual items or clear the entire cart
- 💰 **Live Total Calculation** — Subtotal, 10% tax, and grand total update in real time
- 🏷️ **In-Cart Badge** — Shows how many of each item is already in the cart
- 🔔 **Toast Notifications** — Slide-in alerts for add, remove, and clear actions
- ✅ **Order Confirmation Modal** — Animated modal with order ID, item list, and totals on checkout
- 🖼️ **Real Product Images** — Unsplash photos with smooth hover zoom effect
- 📱 **Responsive Design** — Works on desktop and mobile screens

---

## 🧠 React Concepts Covered

| Concept | Where Used |
|---|---|
| `useState` | Cart state, active tab, notifications, modal visibility |
| **Lifting State Up** | Cart state lives in `App.js`, passed down to all components |
| **Props** | Product data and cart quantity passed to `ProductCard` |
| **Callbacks** | `onAddToCart`, `onIncrease`, `onDecrease`, `onRemove` passed as props |
| **Derived State** | `reduce()` used to calculate subtotal, total items, grand total |
| **Conditional Rendering** | Empty cart state, in-cart badge, toast, modal |
| **List Rendering** | `map()` used for product grid and cart items |
| **Component Composition** | App → ProductCard, CartItem, CartSummary |

---

## 🗂️ Project Structure

```
shopping-cart/
├── public/
├── src/
│   ├── components/
│   │   ├── ProductCard.js     # Individual product display with image
│   │   ├── CartItem.js        # Single cart item with quantity controls
│   │   └── CartSummary.js     # Order summary + checkout modal
│   ├── App.js                 # Root component — state & logic
│   ├── App.css                # All styles
│   └── index.css              # Base reset
├── package.json
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js (v14 or above)
- npm

### Installation & Run

```bash
# Step 1: Navigate to project folder
cd shopping-cart

# Step 2: Install dependencies
npm install

# Step 3: Start development server
npm start
```
---

## 🧩 Component Breakdown

### `App.js`
- Holds the entire cart state (`useState`)
- Defines all handler functions: `handleAddToCart`, `handleIncrease`, `handleDecrease`, `handleRemove`, `handleClearCart`
- Passes state and callbacks down as props (lifting state up)
- Controls tab navigation between Shop and Cart views

### `ProductCard.js`
- Receives `product`, `onAddToCart`, `cartQuantity`, `index` as props
- Displays product image, name, category, price
- Shows "✓ Added!" feedback animation on button click
- Shows in-cart badge overlay on product image

### `CartItem.js`
- Receives `item`, `onIncrease`, `onDecrease`, `onRemove` as props
- Displays product thumbnail, name, unit price, quantity controls
- Calculates and shows per-item total (`price × quantity`)

### `CartSummary.js`
- Uses `reduce()` to derive subtotal, tax, total from cart array
- Handles checkout modal open/close state locally
- On "Continue Shopping": closes modal and clears cart

---

## 🎨 UI Highlights

- Dark premium theme (`#0b0b10` background, `#6c63ff` accent)
- Cards fade up with staggered animation on page load
- Product images zoom smoothly on hover
- Checkout modal pops in with spring animation + SVG checkmark draw animation
- Sticky header with blur backdrop
