import { TaskService } from './../services/tasks.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from '../model/task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {


  newTask: string;


  constructor(private tasksService: TaskService) {
  }

  ngOnInit() {
  }


  add() {
    const task: Task = ({ name: this.newTask, created: new Date() })
    this.tasksService.add(task);
    this.newTask = '';
  }
}
