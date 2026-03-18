import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-dashboard.html',
  styleUrl: './student-dashboard.css'
})
export class StudentDashboard {

  students = [
    { name: 'Aman', marks: 92 },
    { name: 'Riya', marks: 78 },
    { name: 'Kunal', marks: 45 },
    { name: 'Sneha', marks: 88 },
    { name: 'Rahul', marks: 33 }
  ];
getGrade(marks: number): string {

  if (marks >= 85) return 'A';
  else if (marks >= 70) return 'B';
  else if (marks >= 50) return 'C';
  else return 'F';

}
}