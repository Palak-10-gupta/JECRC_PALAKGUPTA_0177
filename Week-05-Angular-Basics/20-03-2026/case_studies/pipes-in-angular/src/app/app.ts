import { Component, signal } from '@angular/core';
import { CommonModule, KeyValuePipe } from '@angular/common';
import { AsyncPipe } from '@angular/common';
import { DatePipe } from '@angular/common';
import { of } from 'rxjs';
import { CustomCurrencyPipe } from './custom-currency-pipe';
@Component({
  selector: 'app-root',
  imports: [AsyncPipe, DatePipe, KeyValuePipe, CustomCurrencyPipe, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  today = new Date();

  data$ = of([
    {
      id: 1,
      productName: 'Laptop',
      price: 50000,
      status: 'Delivered'
    },
    {
      id: 2,
      productName: 'Mobile',
      price: 20000,
      status: 'Pending'
    }
  ]);

  product = {
    name: 'Laptop',
    price: 50000
  };
}
