import { createReducer, on } from '@ngrx/store';
import * as UsersActions from '../actions/user.actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { User } from '../../model/user';

export interface UsersState extends EntityState<User> {
  selectedUser: User | null;
  error: any | null;
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialState: UsersState = adapter.getInitialState({
  selectedUser: null,
  error: null,
});

export const usersReducer = createReducer(
  initialState,
  on(UsersActions.loadUsersSuccess, (state, { users }) => adapter.setAll(users, state)),
  on(UsersActions.loadUserDetailsSuccess, (state, { user }) => ({ ...state, selectedUser: user, })),
  on(UsersActions.deleteUserSuccess, (state, { userId }) => adapter.removeOne(userId, state)),
  on(UsersActions.loadUsersFailure, (state, { error }) => ({ ...state, error })),
  on(UsersActions.loadUserDetailsFailure, (state, { error }) => ({ ...state, error })),
  on(UsersActions.deleteUserFailure, (state, { error }) => ({ ...state, error }))
);

export const { selectAll, selectEntities } = adapter.getSelectors();