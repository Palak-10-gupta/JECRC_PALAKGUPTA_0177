import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  weatherData = [
    { name: 'Mumbai', temperature: '32°C', wind: '18 km/h', humidity: '78%' },
    { name: 'Delhi', temperature: '40°C', wind: '12 km/h', humidity: '45%' },
    { name: 'Bangalore', temperature: '26°C', wind: '10 km/h', humidity: '60%' },
    { name: 'Chennai', temperature: '35°C', wind: '22 km/h', humidity: '82%' },
    { name: 'Jaipur', temperature: '38°C', wind: '15 km/h', humidity: '30%' },
    { name: 'Kolkata', temperature: '33°C', wind: '14 km/h', humidity: '75%' }
  ];
}