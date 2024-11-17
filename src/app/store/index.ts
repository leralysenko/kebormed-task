import { ActionReducerMap } from '@ngrx/store';
import { usersReducer, UsersState } from './reducers/user.reducer';

export interface AppState {
  users: UsersState;
}

export const reducers: ActionReducerMap<AppState> = {
  users: usersReducer,
};