import { Routes } from "@angular/router";
import { UsersComponent } from "./users.component";
import { UserComponent } from "./user/user.component";

export const UsersRoutes: Routes = [
  {
    path: '',
    component: UsersComponent
  },
  {
    path: ':id',
    component: UserComponent
  }
]