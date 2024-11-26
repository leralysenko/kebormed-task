import { Injectable } from "@angular/core";
import { User } from "../model/user";
import { createStore, select, withProps } from "@ngneat/elf";
import { deleteEntities, getEntity, hasEntity, selectAllEntities,
  setEntities, upsertEntities, withEntities } from "@ngneat/elf-entities";
import { filter, map } from "rxjs";


export interface UsersState {
  selectedUserId: number | null;
}

const usersStore = createStore(
  { name: 'users' },
  withEntities<User>(),
  withProps<UsersState>({ selectedUserId: null })
);

@Injectable({ providedIn: 'root' })
export class UsersRepository {
  users$ = usersStore.pipe(selectAllEntities());

  selectedUserId$ = usersStore.pipe(select((state) => state.selectedUserId));

  selectedUser$ = this.selectedUserId$.pipe(
    select((userId) => (userId ? usersStore.query(getEntity(userId)) : null)),
    filter((user): user is User => !!user)
  );

  totalUsers$ = this.users$.pipe(map((users) => users.length || 0));

  totalCompanies$ = this.users$.pipe(
    map((users) => {
      const companies = users.map((user) => user.company.name);
      return new Set(companies).size  || 0;
    })
  );

  usersPerCompany$ = this.users$.pipe(
    map((users) => {
      return users.reduce((acc, user) => {
        const companyName = user.company.name;
        acc[companyName] = (acc[companyName] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
    })
  );

  setUsers(users: User[]): void {
    usersStore.update(setEntities(users));
  }

  upsertUser(user: User): void {
    usersStore.update(upsertEntities(user));
  }

  setSelectedUser(userId: number): void {
    usersStore.update((state) => ({
      ...state,
      selectedUserId: userId,
    }));
  }

  clearSelectedUser(): void {
    usersStore.update((state) => ({
      ...state,
      selectedUserId: null,
    }));
  }

  deleteUser(userId: number): void {
    usersStore.update(deleteEntities(userId));
  }

  hasUser(userId: number): boolean {
    return usersStore.query(hasEntity(userId));
  }
}