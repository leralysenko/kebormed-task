import { createAction, props } from '@ngrx/store';
import { User } from '../../model/user';

export const loadUsers = createAction('[Users] Load Users');
export const loadUsersSuccess = createAction('[Users] Load Users Success', props<{ users: User[] }>());
export const loadUsersFailure = createAction('[Users] Load Users Failure', props<{ error: any }>());

export const loadUserDetails = createAction('[Users] Load User Details', props<{ userId: number }>());
export const loadUserDetailsSuccess = createAction('[Users] Load User Details Success', props<{ user: User }>());
export const loadUserDetailsFailure = createAction('[Users] Load User Details Failure', props<{ error: any }>());

export const deleteUser = createAction('[Users] Delete User', props<{ userId: number }>());
export const deleteUserSuccess = createAction('[Users] Delete User Success', props<{ userId: number }>());
export const deleteUserFailure = createAction('[Users] Delete User Failure', props<{ error: any }>());