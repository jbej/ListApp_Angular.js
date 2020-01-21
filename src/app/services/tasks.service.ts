import { HttpService } from './http.service';
import { Task } from './../model/task';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable()

export class TaskService {
  saveTasksInDb() {
    throw new Error("Method not implemented.");
  }

  private taskListObs = new BehaviorSubject<Array<Task>>([]);


  constructor(private httpService: HttpService) {
    const taskList = [
      { name: 'Zakupy', created: new Date().toLocaleString(), isDone: false },
      { name: 'Nauka Angulara', created: new Date().toLocaleString(), isDone: false },
      { name: 'Podlewanie kwiatów', created: new Date().toLocaleString(), isDone: false },
      { name: 'Sprzatanie', created: new Date().toLocaleString(), isDone: false },
      { name: 'Odkurzanie', created: new Date().toLocaleString(), end: new Date().toLocaleString(), isDone: true }
    ];
    this.taskListObs.next(taskList);
  }

  add(task: Task) {
    const list = this.taskListObs.getValue();
    list.push(task);
    this.taskListObs.next(list);
  }

  remove(task: Task) {
    const list = this.taskListObs.getValue().filter(e => e !== task);
    this.taskListObs.next(list);
  }

  done(task: Task) {
    task.end = new Date().toLocaleString();
    task.isDone = true;
    const list = this.taskListObs.getValue();
    this.taskListObs.next(list);
  }

  getTaskListObs(): Observable<Array<Task>> {
    return this.taskListObs.asObservable();
  }
}
