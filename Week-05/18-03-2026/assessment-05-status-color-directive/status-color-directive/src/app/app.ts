import { Component } from '@angular/core';
import { ResultDashboard } from './result-dashboard/result-dashboard';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ResultDashboard],
  template: `<app-result-dashboard></app-result-dashboard>`
})
export class App {}