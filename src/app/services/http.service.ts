import { AuthService } from './../auth/auth.service';
import { Task } from './../model/task';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  readonly URL_DB = 'https://api.mlab.com/api/1/databases/angular_db/collections/tasks';

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  getParams(): HttpParams {
    this.getTasks();
    const uid = this.authService.user.uid;
    const query = { userId: uid };
    return new HttpParams().set('apiKey', 'BhPwQGX6BZVlXx4v-AKprVBnC-mXuXzV').append('q', JSON.stringify(query));
  }

  getTasks(): Observable<Array<Task>> {
    return this.http.get<Array<Task>>
      (this.URL_DB, { params: this.getParams() });
  }

  seveTasks(list: Array<Task>) {
    this.http.put(this.URL_DB, list, { params: this.getParams() }).subscribe(data => {
      console.log(data);
    });
  }
}
