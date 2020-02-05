import { TaskService } from './../services/tasks.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Task } from '../model/task';



@Component({
  selector: 'app-todo-task',
  templateUrl: './todo-task.component.html',
  styleUrls: ['./todo-task.component.css'],
  // encapsulation: ViewEncapsulation.None,
})
export class TodoTaskComponent implements OnInit {

  taskList: Array<Task> = [];


  constructor(private tasksService: TaskService) {
    this.tasksService.getTaskListObs().subscribe((tasks: Array<Task>) => {
      this.taskList = tasks.filter(task => task.isDone === false );
    });
  }

  ngOnInit() {
  }

  remove(task: Task) {
    this.tasksService.remove(task);
  }

  done(task: Task) {
    this.tasksService.done(task);
  }

  getColor(): string {
    return this.taskList.length >= 5 ? 'red' : 'green';
  }

  // save() {
  //   this.tasksService.saveTasksInDb();
  // }

}
