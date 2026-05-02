# Angular Product Inventory Application

## Description
An Angular application that displays a product inventory table with category filtering, price sorting, and stock status toggle functionality.

---

## Environment

- **Angular CLI Version:** 19.0.0+
- **Angular Core Version:** 19.0.0+
- **Node Version:** v22 (LTS)+

---

## Commands

```bash
npm install
npm start
npm test
```

---

## Functionality

- All products are initially displayed in the table using the `getProducts` function.
- Selecting a category from the dropdown and clicking **Filter** displays products belonging to that category. If no category is selected, no filtering occurs.
- Clicking on the **Price ($)** header sorts products in ascending order.
- A **Show In-Stock Only** checkbox, when checked, displays only products with `stock > 0`.

---

## Product Object Structure

```json
{
  "id": 1,
  "name": "Laptop",
  "category": "Electronics",
  "price": 850.50,
  "stock": 10
}
```

| Field      | Type   |
|------------|--------|
| `id`       | Number |
| `name`     | String |
| `category` | String |
| `price`    | Float  |
| `stock`    | Number |

---

## Project Structure

```
product-inventory/
├── src/
│   └── app/
│       ├── app.component.ts
│       ├── app.component.html
│       ├── app.component.css
│       ├── app.module.ts
│       └── product.service.ts
├── package.json
└── README.md
```

---

## Implementation

- `ngOnInit()` loads all products via `getProducts()` on startup.
- `applyFilter()` handles category filter, in-stock toggle, and price sort simultaneously.
- `standalone: false` is set in `@Component` to ensure compatibility with `NgModule` in Angular 19.