import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusColorDirective } from '../status-color';

@Component({
  selector: 'app-result-dashboard',
  standalone: true,
  imports: [CommonModule, StatusColorDirective],
  templateUrl: './result-dashboard.html',
  styleUrl: './result-dashboard.css'
})
export class ResultDashboard {

  students = [
    { name: 'Aman', marks: 82 },
    { name: 'Riya', marks: 64 },
    { name: 'Kunal', marks: 41 },
    { name: 'Sneha', marks: 90 },
    { name: 'Rahul', marks: 35 }
  ];

  getStatus(marks: number) {
    return marks >= 50 ? 'PASS' : 'FAIL';
  }

}