import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UsersState, adapter } from '../reducers/user.reducer';

export const selectUsersState = createFeatureSelector<UsersState>('users');

const { selectAll } = adapter.getSelectors(selectUsersState);

export const selectAllUsers = createSelector(selectUsersState, (state) => state.entities);

export const selectSelectedUser = createSelector(
  selectUsersState,
  (state) => state.selectedUser
);

export const selectTotalUsers = createSelector(
  selectAll,
  (users) => users.length
);

export const selectTotalCompanies = createSelector(
  selectAll,
  (users) => {
    const companies = users.map((user) => user.company.name);
    return new Set(companies).size;
  }
);

export const selectUsersPerCompany = createSelector(
  selectAll,
  (users) => {
    return users.reduce((acc, user) => {
      const companyName = user.company.name;
      acc[companyName] = (acc[companyName] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }
);