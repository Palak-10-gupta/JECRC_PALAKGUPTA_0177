import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleBasedDirective } from '../role-based';

@Component({
  selector: 'app-portal',
  standalone: true,
  imports: [CommonModule, RoleBasedDirective],
  templateUrl: './portal.html',
  styleUrl: './portal.css'
})
export class PortalComponent {

  role: 'admin' | 'student' = 'student';

  loginAdmin() {
    this.role = 'admin';
  }

  loginStudent() {
    this.role = 'student';
  }

}