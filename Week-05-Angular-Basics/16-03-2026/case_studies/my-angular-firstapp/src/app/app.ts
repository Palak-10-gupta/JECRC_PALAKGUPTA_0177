import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Greeting } from './greeting/greeting';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Greeting],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {

  title = signal('Simple Standalone App');

}