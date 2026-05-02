import { Component, Input } from '@angular/core';

interface CityWeather {
  name: string;
  temperature: string;
  wind: string;
  humidity: string;
}

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent {
  @Input() cities: CityWeather[] = [];
  searchQuery: string = '';

  get result(): CityWeather | undefined {
    if (!this.searchQuery.trim()) return undefined;
    return this.cities.find(
      c => c.name.toLowerCase() === this.searchQuery.trim().toLowerCase()
    );
  }

  get showNoResults(): boolean {
    return this.searchQuery.trim().length > 0 && !this.result;
  }
}