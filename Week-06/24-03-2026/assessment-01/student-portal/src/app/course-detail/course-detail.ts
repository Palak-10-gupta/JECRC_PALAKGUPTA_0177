import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CourseService } from '../services/course';
import { Router } from '@angular/router';


@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-detail.html',
  styleUrls: ['./course-detail.css']
})
export class CourseDetailComponent {

  course:any;

  constructor(private route:ActivatedRoute, private cs:CourseService){}

  ngOnInit(){
    let id = Number(this.route.snapshot.paramMap.get('id'));
    this.course = this.cs.getCourseById(id);
  }

}