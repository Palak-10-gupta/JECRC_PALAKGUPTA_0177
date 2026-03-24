import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { CoursesComponent } from './courses/courses';
import { CourseDetailComponent } from './course-detail/course-detail';
import { Profile } from './profile/profile';

export const routes: Routes = [

  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  { path: 'dashboard', component:Dashboard },

  { path: 'courses', component: CoursesComponent },

  { path: 'course/:id', component: CourseDetailComponent },

  { path: 'profile', component: Profile },

  { path: '**', redirectTo: 'dashboard' }

];