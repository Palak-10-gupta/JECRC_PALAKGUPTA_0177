import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriceHighlightDirective } from '../price-highlight';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, PriceHighlightDirective],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList {

  products = [
    { name: 'Laptop', price: 75000 },
    { name: 'Mobile', price: 30000 },
    { name: 'LED TV', price: 62000 },
    { name: 'Headphones', price: 4000 },
    { name: 'Refrigerator', price: 54000 }
  ];

}