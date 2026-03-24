import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from '../services/course';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './courses.html',
  styleUrls: ['./courses.css']
})
export class CoursesComponent {

  courseList:any[] = [];

  constructor(private cs:CourseService, private router:Router){}

  ngOnInit(){
    this.courseList = this.cs.getCourses();   // ⭐ VERY IMPORTANT
  }

  openCourse(id:number){
    this.router.navigate(['/course', id]);
  }

}