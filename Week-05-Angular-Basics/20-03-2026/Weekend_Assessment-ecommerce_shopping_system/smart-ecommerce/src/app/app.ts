import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from './product/product';
import { Cart } from './cart/cart';
import { Checkout } from './checkout/checkout';
import { Dashboard } from './dashboard/dashboard';
import { CartService } from './cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, Product, Cart, Checkout, Dashboard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  page = signal('product');

  constructor(public cart:CartService){}

}