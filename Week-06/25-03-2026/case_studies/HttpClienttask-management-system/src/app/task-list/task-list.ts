import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../task.service';
import { Task } from '../task';
import { FormsModule } from '@angular/forms';
import { TaskFormComponent } from '../task-form/task-form';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TaskFormComponent],
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.css']
})
export class TaskListComponent implements OnInit {

  tasks: Task[] = [];
  selectedTask?: Task;
  searchTerm = '';
  showForm = false;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(res => {
      this.tasks = res.slice(0,10); // only first 10
    });
  }

  deleteTask(id?: number) {
    if (!id) return;
    this.taskService.deleteTask(id).subscribe(() => {
      this.loadTasks();
    });
  }

  toggleStatus(task: Task) {
    if (!task.id) return;
    this.taskService
      .updateTaskStatus(task.id, !task.completed)
      .subscribe(() => this.loadTasks());
  }

  editTask(task: Task) {
    this.selectedTask = task;
    this.showForm = true;
  }

  addNew() {
    this.selectedTask = undefined;
    this.showForm = true;
  }

  formClosed(refresh: boolean) {
    this.showForm = false;
    if (refresh) this.loadTasks();
  }

  search() {
    if (!this.searchTerm) {
      this.loadTasks();
      return;
    }
    this.taskService.searchTask(this.searchTerm).subscribe(res => {
      this.tasks = res;
    });
  }
}