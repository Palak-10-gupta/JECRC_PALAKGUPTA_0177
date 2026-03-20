import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackFormComponent } from './feedback-form/feedback-form';
import { Employee } from './employee-form/employee-form';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FeedbackFormComponent,
    Employee
  ],
  template: `
  <div style="display:flex; gap:20px; justify-content:center; flex-wrap:wrap;">

    

  </div>

  <h1 style="text-align:center;">Angular 21 Template-driven Demo</h1>

  <div style="flex:1; min-width:300px; border:1px solid #ccc; padding:10px;">
    <h2>Employee Feedback</h2>
    <app-feedback-form></app-feedback-form>
  </div>
  <h1 style="text-align:center;">Angular 21 Template-driven Demo</h1>

  <div style="flex:1; min-width:300px; border:1px solid #ccc; padding:10px;">
        <h2>Employee Form</h2>
        <app-employee-form></app-employee-form>
      </div>
    
    <h1 style="text-align:center;">Angular 21 Template-driven Demo</h1>
  `
})
export class App {
  protected readonly title = signal('Forms-Demo');
}