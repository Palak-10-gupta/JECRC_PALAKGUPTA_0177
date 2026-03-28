import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasks: Task[] = [
    { id: 1, title: 'Learn Angular', completed: false },
    { id: 2, title: 'Practice CRUD', completed: true }
  ];

  private counter = 3;

  constructor() {}

  // GET ALL
  getTasks(): Observable<Task[]> {
    return of(this.tasks);
  }

  // ADD
  addTask(task: Task): Observable<Task> {
    task.id = this.counter++;
    this.tasks.push(task);
    return of(task);
  }

  // UPDATE
  updateTask(task: Task): Observable<Task> {
    const index = this.tasks.findIndex(t => t.id === task.id);
    if (index !== -1) this.tasks[index] = task;
    return of(task);
  }

  // DELETE
  deleteTask(id: number): Observable<any> {
    this.tasks = this.tasks.filter(t => t.id !== id);
    return of(true);
  }

  // STATUS
  updateTaskStatus(id: number, completed: boolean): Observable<Task> {
    const task = this.tasks.find(t => t.id === id);
    if (task) task.completed = completed;
    return of(task!);
  }

  // SEARCH
  searchTask(term: string): Observable<Task[]> {
    const filtered = this.tasks.filter(t =>
      t.title.toLowerCase().includes(term.toLowerCase())
    );
    return of(filtered);
  }

}