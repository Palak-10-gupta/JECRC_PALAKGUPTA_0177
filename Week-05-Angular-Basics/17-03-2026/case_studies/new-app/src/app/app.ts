import { Component } from '@angular/core';
import { Greeting } from './greeting/greeting';
import { Home } from './home/home';
import { User } from './user/user';
import { Product } from './product/product';
import { signal } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
 imports: [Greeting, Home, User, Product],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
     protected readonly title = signal('simple stanadlone-app');
}