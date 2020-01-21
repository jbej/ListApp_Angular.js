import { Task } from './../model/task';
import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/tasks.service';

@Component({
  selector: 'app-done-task',
  templateUrl: './done-task.component.html',
  styleUrls: ['./done-task.component.css']
})
export class DoneTaskComponent implements OnInit {


  taskDone: Array<Task> = [];


  constructor(private tasksService: TaskService) {
    this.tasksService.getTaskListObs().subscribe((tasks: Array<Task>) => {
      this.taskDone = tasks.filter(task => task.isDone === true);
    });
  }

  ngOnInit() {
  }

}
