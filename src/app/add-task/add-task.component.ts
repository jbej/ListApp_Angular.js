import { TaskService } from './../services/tasks.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from '../model/task';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})

export class AddTaskComponent implements OnInit {
  addForm: FormGroup;

  constructor(private tasksService: TaskService) {
  }

  ngOnInit() {
    this.addForm = this.initForm();
  }

  initForm(){
    return new FormGroup({
      taskName: new FormArray([new FormControl(null, Validators.required)])
    });
  }

  add() {
    const tasksList = this.createTaskList();
    this.tasksService.add(tasksList);
    this.addForm = this.initForm();
  }

  createTaskList(): Array<Task> {
    const tasksList = new Array<Task>();
    const tasksArr = <[string]>this.addForm.get('taskName').value;
    tasksArr.forEach(taskName => {
      const task = { name: taskName, created: new Date().toLocaleString(), isDone: false };
      tasksList.push(task);
    });
    return tasksList;
  }

  addField() {
    const arr = <FormArray>this.addForm.get('taskName');
    arr.push(new FormControl(null, Validators.required));
  }
}
