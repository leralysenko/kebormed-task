import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { User } from '../model/user';
import { UsersRepository } from '../state/user.repository';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly http = inject(HttpClient);
  private readonly endpoint: string = 'https://jsonplaceholder.typicode.com/users';
  private readonly repo: UsersRepository = inject(UsersRepository);
  private readonly toastr: ToastrService = inject(ToastrService);

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.endpoint)
    .pipe(tap((res) => {this.repo.setUsers(res || []);}),
    catchError(() => {
      this.toastr.error('Users are not loaded.');
      return of([])
    }));
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(this.endpoint + '/' + id)
    .pipe(tap({
      next: (res) => {
        this.repo.setSelectedUser(res.id);
        this.repo.upsertUser(res);
      }}
    ),
    catchError(() => {
      this.toastr.error('User details are not loaded.');
      return of()
    }));
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(this.endpoint + '/' + id)
    .pipe(tap({
      next: () => {
        this.toastr.success('User is deleted.');
        this.repo.deleteUser(id)
      }}),
    catchError(() => {
      this.toastr.error('User is not deleted.');
      return of()
    }));
  }
}
