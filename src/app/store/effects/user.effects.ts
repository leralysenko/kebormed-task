import { Injectable } from "@angular/core";
import { UserService } from "../../services/user.service";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UsersActions from '../actions/user.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class UsersEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.loadUsers),
      mergeMap(() =>
        this.userService.getUsers().pipe(
          map((users) => UsersActions.loadUsersSuccess({ users })),
          catchError((error) => of(UsersActions.loadUsersFailure({ error })))
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
          catchError((error) => of(UsersActions.loadUserDetailsFailure({ error })))
        )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.deleteUser),
      mergeMap(({ userId }) =>
        this.userService.deleteUser(userId).pipe(
          map(() => UsersActions.deleteUserSuccess({ userId })),
          catchError((error) => of(UsersActions.deleteUserFailure({ error })))
        )
      )
    )
  );
}