import { Component, signal } from '@angular/core';
import { OrderParent } from './order-parent/order-parent';

@Component({
  selector: 'app-root',
  imports: [OrderParent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('lifecycle-hook-demo');
}
