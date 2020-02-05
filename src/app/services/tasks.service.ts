import { HttpService } from './http.service';
import { Task } from './../model/task';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable()

export class TaskService {

  private taskListObs = new BehaviorSubject<Array<Task>>([]);


  constructor(private httpService: HttpService, public angularFire: AngularFireAuth) {
    angularFire.authState.subscribe(user => {
      if (user) {
        this.init();
      } else {
        this.taskListObs.next([]);
      }
    });
  }

  init() {
    this.httpService.getTasks().subscribe(list => {
      this.taskListObs.next(list);
    });
  }

  add(task: Array<Task>) {
    const list = this.taskListObs.getValue().concat();
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
