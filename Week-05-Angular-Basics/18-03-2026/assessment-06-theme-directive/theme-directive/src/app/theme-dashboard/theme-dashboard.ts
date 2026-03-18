import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeDirective } from '../theme';

@Component({
  selector: 'app-theme-dashboard',
  standalone: true,
  imports: [CommonModule, ThemeDirective],
  templateUrl: './theme-dashboard.html',
  styleUrl: './theme-dashboard.css'
})
export class ThemeDashboard {

  currentTheme = 'light';

  toggleTheme() {

    this.currentTheme =
      this.currentTheme === 'light' ? 'dark' : 'light';

  }

}