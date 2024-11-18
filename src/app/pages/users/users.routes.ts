import { ActivatedRouteSnapshot, ResolveFn, Routes } from "@angular/router";
import { UsersComponent } from "./users.component";
import { UserComponent } from "./user/user.component";
import { inject } from "@angular/core";
import { Observable, filter, take } from "rxjs";
import { User } from "../../model/user";
import { Store } from "@ngrx/store";
import { clearSelectedUser, loadUserDetails } from "../../store/actions/user.actions";
import { selectSelectedUser } from "../../store/selectors/user.selectors";

export const userDetailsResolver = (route: ActivatedRouteSnapshot): Observable<User | null> => {
  const store = inject(Store);
  const userId = Number(route.paramMap.get('id'));

  store.dispatch(clearSelectedUser());
  store.dispatch(loadUserDetails({ userId }))

  return store.select(selectSelectedUser).pipe(
    filter(user => user !== null), 
    take(1)
  );
};

export const UsersRoutes: Routes = [
  {
    path: '',
    component: UsersComponent
  },
  {
    path: ':id',
    component: UserComponent,
    resolve: {
      user: userDetailsResolver
    }
  }
]