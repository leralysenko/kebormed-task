import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly http = inject(HttpClient);
  private readonly endpoint: string = 'https://jsonplaceholder.typicode.com/users';

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.endpoint);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(this.endpoint + '/' + id);
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(this.endpoint + '/' + id);
  }
}
