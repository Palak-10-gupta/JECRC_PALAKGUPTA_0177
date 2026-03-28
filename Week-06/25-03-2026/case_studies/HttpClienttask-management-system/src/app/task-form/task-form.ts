import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../task.service';
import { Task } from '../task';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './task-form.html',
  styleUrls: ['./task-form.css']
})
export class TaskFormComponent implements OnChanges {

  @Input() task?: Task;
  @Output() close = new EventEmitter<boolean>();

  model: Task = {
    title: '',
    completed: false
  };

  constructor(private taskService: TaskService) {}

  ngOnChanges() {
    if (this.task) {
      this.model = { ...this.task };
    }
  }

  save() {
    if (this.model.id) {
      this.taskService.updateTask(this.model)
        .subscribe(() => this.close.emit(true));
    } else {
      this.taskService.addTask(this.model)
        .subscribe(() => this.close.emit(true));
    }
  }

  cancel() {
    this.close.emit(false);
  }
}