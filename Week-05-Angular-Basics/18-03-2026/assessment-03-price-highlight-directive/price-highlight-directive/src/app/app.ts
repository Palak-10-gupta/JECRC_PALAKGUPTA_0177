import { Component } from '@angular/core';
import { ProductList } from './product-list/product-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductList],
  template: `<app-product-list></app-product-list>`
})
export class App {}