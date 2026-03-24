import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HospitalAppointment } from './hospital-appointment/hospital-appointment';

@Component({
  selector: 'app-root',
  imports: [HospitalAppointment],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('hospital-appointment-system');
}
