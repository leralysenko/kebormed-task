import { Injectable, inject } from "@angular/core";
import { UserService } from "../../services/user.service";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UsersActions from '../actions/user.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastrService } from "ngx-toastr";

@Injectable()
export class UsersEffects {
  private readonly actions$: Actions = inject(Actions);
  private readonly userService: UserService = inject(UserService);
  private readonly toastr: ToastrService = inject(ToastrService);

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.loadUsers),
      mergeMap(() =>
        this.userService.getUsers().pipe(
          map((users) => UsersActions.loadUsersSuccess({ users })),
          catchError((error) => {
            this.toastr.error('Users are not loaded.');
            return of(UsersActions.loadUsersFailure({ error }))
          })
        )
      )
    )
  );

  loadUserDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.loadUserDetails),
      mergeMap(({ userId }) =>
        this.userService.getUserById(userId).pipe(
          map((user) => UsersActions.loadUserDetailsSuccess({ user })),
          catchError((error) => {
            this.toastr.error('User details are not loaded.');
            return of(UsersActions.loadUserDetailsFailure({ error }))
          })
        )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.deleteUser),
      mergeMap(({ userId }) =>
        this.userService.deleteUser(userId).pipe(
          map(() => {
            this.toastr.success('User is deleted.');
            return UsersActions.deleteUserSuccess({ userId })
          }),
          catchError((error) => {
            this.toastr.error('User is not deleted.');
            return of(UsersActions.deleteUserFailure({ error }))
          })
        )
      )
    )
  );
}