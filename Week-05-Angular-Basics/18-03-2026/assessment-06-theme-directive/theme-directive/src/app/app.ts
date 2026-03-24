import { Component } from '@angular/core';
import { ThemeDashboard } from './theme-dashboard/theme-dashboard';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ThemeDashboard],
  template: `<app-theme-dashboard></app-theme-dashboard>`
})
export class App {}