import { ActivatedRouteSnapshot, ResolveFn, Routes } from "@angular/router";
import { UsersComponent } from "./users.component";
import { UserComponent } from "./user/user.component";
import { inject } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../../model/user";
import { UsersRepository } from "../../state/user.repository";
import { UserService } from "../../services/user.service";
import { usersResolver } from "../../app.routes";

export const userDetailsResolver = (route: ActivatedRouteSnapshot): Observable<User | null> => {
  const userId = Number(route.paramMap.get('id'));
  const repo: UsersRepository = inject(UsersRepository);
  const userService: UserService = inject(UserService);

  repo.clearSelectedUser();
  if(repo.hasUser(userId)) {
    repo.setSelectedUser(userId);
    return repo.selectedUser$;
  } else {
    return userService.getUserById(userId);
  }
};

export const UsersRoutes: Routes = [
  {
    path: '',
    component: UsersComponent,
    resolve: {
      users: usersResolver
    }
  },
  {
    path: ':id',
    component: UserComponent,
    resolve: {
      user: userDetailsResolver
    }
  }
]