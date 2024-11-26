import { Routes } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './services/user.service';
import { User } from './model/user';
import { inject } from '@angular/core';

export const usersResolver = (): Observable<User[]> => {
  const userService: UserService = inject(UserService);

  return userService.getUsers();
};

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.component').then(c => c.DashboardComponent),
    resolve: {
      users: usersResolver
    }
  },
  {
    path: 'users',
    loadChildren: () => import('./pages/users/users.routes').then(c => c.UsersRoutes)
  },
  {
    path: 'settings',
    loadComponent: () => import('./pages/settings/settings.component').then(c => c.SettingsComponent)
  },
];
