import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  courses = [
    { id: 1, name: 'Angular', duration: '2 Months', fee: 5000 },
    { id: 2, name: 'React', duration: '2 Months', fee: 4500 },
    { id: 3, name: 'Java', duration: '3 Months', fee: 6000 }
  ];

  getCourses() {
    return this.courses;
  }

  getCourseById(id: number) {
    return this.courses.find(c => c.id === id);
  }

}