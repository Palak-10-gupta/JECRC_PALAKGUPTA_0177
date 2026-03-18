import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  showProducts = true;

  products = [
    { name: 'Laptop', price: 60000, status: 'available'},
      { name: 'Mobile', price: 15000, status: 'out'},
        { name: 'Tablet', price: 25000, status: 'limited'}
  ];
}
