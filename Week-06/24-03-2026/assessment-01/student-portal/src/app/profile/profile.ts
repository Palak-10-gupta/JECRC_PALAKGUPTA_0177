import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class ProfileComponent {

  student = {
    name: 'Palak Gupta',
    email: 'palak@gmail.com',
    course: 'Angular',
    progress: 75
  };

}