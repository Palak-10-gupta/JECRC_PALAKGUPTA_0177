import { Component } from '@angular/core';
import { TaskListComponent } from './task-list/task-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TaskListComponent],
  template: `
      <h1 style="text-align:center">Angular Task CRUD</h1>
      <app-task-list></app-task-list>
  `
})
export class AppComponent {}