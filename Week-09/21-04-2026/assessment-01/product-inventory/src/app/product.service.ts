import { Injectable } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  getProducts(): Product[] {
    return [
      { id: 1,  name: 'Laptop',           category: 'Electronics', price: 850.50, stock: 10 },
      { id: 2,  name: 'Wireless Mouse',   category: 'Electronics', price: 29.99,  stock: 50 },
      { id: 3,  name: 'Desk Chair',       category: 'Furniture',   price: 320.00, stock: 5  },
      { id: 4,  name: 'Standing Desk',    category: 'Furniture',   price: 549.99, stock: 0  },
      { id: 5,  name: 'Notebook Set',     category: 'Stationery',  price: 12.49,  stock: 200},
      { id: 6,  name: 'Ballpoint Pens',   category: 'Stationery',  price: 5.99,   stock: 0  },
      { id: 7,  name: 'Monitor 27"',      category: 'Electronics', price: 430.00, stock: 8  },
      { id: 8,  name: 'Bookshelf',        category: 'Furniture',   price: 189.99, stock: 3  },
      { id: 9,  name: 'Sticky Notes',     category: 'Stationery',  price: 3.49,   stock: 500},
      { id: 10, name: 'Mechanical Keyboard', category: 'Electronics', price: 110.00, stock: 0 },
    ];
  }
}