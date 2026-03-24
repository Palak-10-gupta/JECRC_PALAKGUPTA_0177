import { Component, signal } from '@angular/core';
import { StudentDashboard } from './student-dashboard/student-dashboard';

@Component({
  selector: 'app-root',
  imports: [StudentDashboard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('student-dashboard');
}
